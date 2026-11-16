#!/usr/bin/env python3
"""Bind a D1 database to the Aglaia Pages project (binding name DB).

Usage:
  bind-d1.py <database_id> [--dry-run] [--env production|preview|both]

The D1 database itself must already exist (created by hand in the
Cloudflare dashboard -- the current API token has no D1 permission).
This script only patches the Pages project config, which Pages Edit
covers. It GETs the current project first and merges, so existing
deployment_configs (compatibility_date, env vars, ...) are preserved.

IMPORTANT: bindings apply to deployments created AFTER the patch.
Redeploy (preview and/or production) after binding, otherwise the
running deployment still sees env.DB as undefined.

  --dry-run   print the PATCH body without sending it.
  --env both  bind preview + production (default). Use --env preview
              to bind preview only while the production rollout waits.

D1 shape (Pages API): deployment_configs.<env>.d1_databases is a MAP,
{"DB": {"id": "<database_id>"}}, not an array.
"""
import argparse
import copy
import json
import sys
import urllib.request

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request, read_json_response

BASE = "https://api.cloudflare.com/client/v4"
ACCOUNT_ID = "47daeff42661effa7d8c6b77eda93d25"
PROJECT = "aglaia"


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        raise RuntimeError("redirect refused, verify the endpoint")


def api_call(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    request = urllib.request.Request(BASE + path, data=data, method=method)
    request.add_header("Content-Type", "application/json")
    add_surrogate_to_request(request, "custom.cloudflare", allowed_hosts=["api.cloudflare.com"])
    try:
        with urllib.request.build_opener(NoRedirect()).open(request, timeout=60) as response:
            return read_json_response(response)
    except urllib.error.HTTPError as e:
        return read_json_response(e)


def main(argv):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("database_id", help="D1 database id (UUID from the dashboard)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--env", choices=["production", "preview", "both"], default="both")
    args = parser.parse_args(argv)

    got = api_call("GET", f"/accounts/{ACCOUNT_ID}/pages/projects/{PROJECT}")
    if not got.get("success"):
        print("GET project FAILED:", json.dumps(got)[:500])
        return 1
    configs = copy.deepcopy(got["result"].get("deployment_configs") or {})
    envs = ["production", "preview"] if args.env == "both" else [args.env]
    for env_name in envs:
        env_cfg = configs.setdefault(env_name, {})
        dbs = env_cfg.setdefault("d1_databases", {})
        dbs["DB"] = {"id": args.database_id}

    body = {"deployment_configs": configs}
    print("PATCH body:")
    print(json.dumps(body, indent=1))
    if args.dry_run:
        print("--dry-run: not sent")
        return 0

    patched = api_call("PATCH", f"/accounts/{ACCOUNT_ID}/pages/projects/{PROJECT}", body)
    if not patched.get("success"):
        print("PATCH FAILED:", json.dumps(patched)[:800])
        return 1
    result = patched["result"].get("deployment_configs") or {}
    for env_name in envs:
        print(env_name, "d1_databases:", json.dumps((result.get(env_name) or {}).get("d1_databases")))
    print("bound. Remember: redeploy so a new deployment picks up the binding.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
