// 极简 frontmatter 序列化（与 build-registry.mjs / content.ts 的解析子集对齐）
// 标量一律 JSON 引号字符串；数组/对象一律单行流式 JSON；嵌套块用显式行数组拼。
export const S = (v) => JSON.stringify(String(v));
export const FLOW = (v) => JSON.stringify(v);
export function licenseLines({ spdx, author, source_url, verified }) {
  return [
    "license:",
    "  spdx: " + S(spdx),
    "  author: " + S(author),
    "  source_url: " + S(source_url),
    "  verified: " + (verified ? "true" : "false"),
  ];
}
export function verificationLines() {
  return [
    "verification:",
    '  last_verified_model: ""',
    '  last_verified_date: ""',
    '  verified_by: ""',
    '  result: ""',
  ];
}
export function fmFile(lines, body) {
  return "---\n" + lines.join("\n") + "\n---\n\n" + body.replace(/\n*$/, "") + "\n";
}
export const SELF_LICENSE = { spdx: "CC-BY-4.0", author: "Aglaia", source_url: "aglaia.design", verified: true };
export const CODE_LICENSE = { spdx: "MIT", author: "Aglaia", source_url: "aglaia.design", verified: true };
