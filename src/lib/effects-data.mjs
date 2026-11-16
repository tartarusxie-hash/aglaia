// 效果库单一数据源：交互效果的参数、沙箱文档、卡片预览与三档代码。
// 被站点组件（服务端 + 客户端脚本）与 scripts/author/gen-effects.mjs（生成内容文件）共同引用。
// 沙箱文档原则：自包含、无外部请求、不用 GSAP（规格 §8.4 / §11）。

const base = (inner, extra = "") => `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{font-family:Inter,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100%;padding:20px;color:#141414}
${extra}
</style></head><body>${inner}</body></html>`;

export const GLASS_BGS = [
  { id: "dusk", zh: "暮色渐变", en: "Dusk gradient", css: "linear-gradient(135deg,#3b4a6b 0%,#7a5c8f 45%,#c96f4a 100%)" },
  { id: "ocean", zh: "深海渐变", en: "Deep ocean", css: "linear-gradient(160deg,#0f2e46 0%,#17607e 55%,#3f9d8f 100%)" },
  { id: "mono", zh: "灰阶网格", en: "Mono grid", css: "linear-gradient(#d8d5cd 1px,transparent 1px),linear-gradient(90deg,#d8d5cd 1px,transparent 1px),linear-gradient(150deg,#f1eee8,#cfccc4)" },
  { id: "dark", zh: "深色", en: "Dark", css: "radial-gradient(120% 120% at 20% 10%,#3a3a38 0%,#171717 60%)" },
];

export const INTERACTIVE_EFFECTS = {
  glassmorphism: {
    params: [
      { name: "blur", label_zh: "模糊半径", label_en: "Blur", type: "length", kind: "range", min: 0, max: 30, step: 1, default: "14", unit: "px" },
      { name: "opacity", label_zh: "底色不透明度", label_en: "Tint opacity", type: "percent", kind: "range", min: 0.04, max: 0.6, step: 0.02, default: "0.22", unit: "" },
      { name: "radius", label_zh: "圆角", label_en: "Radius", type: "length", kind: "range", min: 0, max: 36, step: 1, default: "20", unit: "px" },
      { name: "border-opacity", label_zh: "描边亮度", label_en: "Border brightness", type: "percent", kind: "range", min: 0, max: 0.9, step: 0.05, default: "0.5", unit: "" },
    ],
    backgrounds: GLASS_BGS,
    doc(p, bgCss) {
      return base(
        `<div class="stage" style="background:${bgCss}"><div class="card">
          <div class="t">玻璃拟态卡片</div><p>半透明的底、被模糊的背景、一根亮边——像一块磨砂玻璃浮在画面上。</p>
          <button>开始使用</button></div></div>`,
        `.stage{width:100%;max-width:520px;border-radius:18px;padding:44px 28px;display:flex;justify-content:center}
         .card{width:300px;padding:24px;border-radius:${p.radius}px;background:rgba(255,255,255,${p.opacity});
           -webkit-backdrop-filter:blur(${p.blur}px) saturate(1.4);backdrop-filter:blur(${p.blur}px) saturate(1.4);
           border:1px solid rgba(255,255,255,${p["border-opacity"]});box-shadow:0 18px 40px rgba(10,10,10,.25);color:#fff}
         .t{font-size:19px;font-weight:700;margin-bottom:8px}
         p{font-size:13.5px;line-height:1.65;opacity:.92}
         button{margin-top:16px;border:1px solid rgba(255,255,255,.65);background:rgba(255,255,255,.14);color:#fff;
           padding:8px 16px;border-radius:999px;font-size:13px;cursor:pointer}`
      );
    },
    cardHtml: `<div class="fxc-glass stage"><div class="card"><div class="t">玻璃拟态</div><p>磨砂玻璃浮在画面上</p></div></div>`,
    cardCss: `.fxc-glass.stage{height:100%;border-radius:10px;background:linear-gradient(135deg,#3b4a6b,#7a5c8f 50%,#c96f4a);display:flex;align-items:center;justify-content:center;padding:18px}
      .fxc-glass .card{width:72%;padding:14px 16px;border-radius:16px;background:rgba(255,255,255,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.5);color:#fff}
      .fxc-glass .t{font-weight:700;font-size:14px}.fxc-glass p{font-size:11.5px;opacity:.92;margin-top:3px}`,
    codes(p) {
      const css = `.glass-card {
  background: rgba(255, 255, 255, ${p.opacity});
  -webkit-backdrop-filter: blur(${p.blur}px) saturate(1.4);
  backdrop-filter: blur(${p.blur}px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, ${p["border-opacity"]});
  border-radius: ${p.radius}px;
  box-shadow: 0 18px 40px rgba(10, 10, 10, 0.25);
}`;
      return {
        "html-css": `<div class="glass-card">…</div>\n\n<style>\n${css}\n</style>`,
        tailwind: `<!-- Tailwind 任意值写法（backdrop-blur 需 backdrop 在场） -->
<div class="rounded-[${p.radius}px] border border-white/50 bg-white/[${p.opacity}] shadow-[0_18px_40px_rgba(10,10,10,0.25)] backdrop-blur-[${p.blur}px] backdrop-saturate-150">
  …
</div>`,
        react: `export function GlassCard({ children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,${p.opacity})",
      backdropFilter: "blur(${p.blur}px) saturate(1.4)",
      WebkitBackdropFilter: "blur(${p.blur}px) saturate(1.4)",
      border: "1px solid rgba(255,255,255,${p["border-opacity"]})",
      borderRadius: ${p.radius},
      boxShadow: "0 18px 40px rgba(10,10,10,0.25)",
    }}>{children}</div>
  );
}`,
      };
    },
  },

  neumorphism: {
    params: [
      { name: "distance", label_zh: "阴影距离", label_en: "Shadow distance", type: "length", kind: "range", min: 2, max: 14, step: 1, default: "6", unit: "px" },
      { name: "blur", label_zh: "阴影模糊", label_en: "Shadow blur", type: "length", kind: "range", min: 4, max: 30, step: 1, default: "12", unit: "px" },
      { name: "intensity", label_zh: "阴影强度", label_en: "Intensity", type: "percent", kind: "range", min: 0.05, max: 0.32, step: 0.01, default: "0.16", unit: "" },
      { name: "radius", label_zh: "圆角", label_en: "Radius", type: "length", kind: "range", min: 4, max: 40, step: 1, default: "16", unit: "px" },
    ],
    doc(p) {
      const d = p.distance, b = p.blur, i = p.intensity;
      const sh = `${d}px ${d}px ${b}px rgba(90,88,80,${i}), -${d}px -${d}px ${b}px rgba(255,255,255,0.9)`;
      const shIn = `inset ${d}px ${d}px ${b}px rgba(90,88,80,${i}), inset -${d}px -${d}px ${b}px rgba(255,255,255,0.9)`;
      return base(
        `<div class="row"><div class="card"><div class="t">新拟态卡片</div><p>像从背景里压出来的浮雕。</p></div>
         <button class="round" aria-label="播放">▶</button><div class="pill">已按下<span class="dot"></span></div></div>`,
        `body{background:#E4E2DB}
         .row{display:flex;gap:26px;align-items:center;flex-wrap:wrap;justify-content:center}
         .card{width:230px;padding:20px;border-radius:${p.radius}px;background:#E4E2DB;box-shadow:${sh}}
         .t{font-weight:700;margin-bottom:6px}.card p{font-size:13px;color:#5b594f;line-height:1.6}
         .round{width:64px;height:64px;border:none;border-radius:50%;background:#E4E2DB;box-shadow:${sh};font-size:17px;color:#3c3a34;cursor:pointer}
         .round:active{box-shadow:${shIn}}
         .pill{padding:10px 18px;border-radius:999px;background:#E4E2DB;box-shadow:${shIn};font-size:13px;color:#3c3a34;display:flex;gap:8px;align-items:center}
         .dot{width:8px;height:8px;border-radius:50%;background:#3c3a34}`
      );
    },
    cardHtml: `<div class="fxc-neu"><div class="card"><div class="t">新拟态</div><p>从背景里压出的浮雕</p></div><div class="round">▶</div></div>`,
    cardCss: `.fxc-neu{height:100%;background:#E4E2DB;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:16px;padding:14px}
      .fxc-neu .card{padding:12px 14px;border-radius:14px;background:#E4E2DB;box-shadow:6px 6px 12px rgba(90,88,80,.16),-6px -6px 12px rgba(255,255,255,.9)}
      .fxc-neu .t{font-weight:700;font-size:13.5px}.fxc-neu p{font-size:11px;color:#5b594f}
      .fxc-neu .round{width:40px;height:40px;border-radius:50%;background:#E4E2DB;box-shadow:5px 5px 10px rgba(90,88,80,.16),-5px -5px 10px rgba(255,255,255,.9);display:grid;place-items:center;font-size:12px}`,
    codes(p) {
      const d = p.distance, b = p.blur, i = p.intensity;
      return {
        "html-css": `<div class="neu-card">…</div>\n\n<style>\n.neu-card {\n  background: #E4E2DB; /* 必须与页面背景同色 */\n  border-radius: ${p.radius}px;\n  box-shadow: ${d}px ${d}px ${b}px rgba(90,88,80,${i}),\n              -${d}px -${d}px ${b}px rgba(255,255,255,0.9);\n}\n.neu-pressed { /* 按下态：换内阴影 */\n  box-shadow: inset ${d}px ${d}px ${b}px rgba(90,88,80,${i}),\n              inset -${d}px -${d}px ${b}px rgba(255,255,255,0.9);\n}\n</style>`,
        tailwind: `<div class="rounded-[${p.radius}px] bg-[#E4E2DB] shadow-[${d}px_${d}px_${b}px_rgba(90,88,80,${i}),-${d}px_-${d}px_${b}px_rgba(255,255,255,0.9)]">…</div>`,
        react: `export function NeuCard({ children }) {
  return <div style={{
    background: "#E4E2DB", borderRadius: ${p.radius},
    boxShadow: "${d}px ${d}px ${b}px rgba(90,88,80,${i}), -${d}px -${d}px ${b}px rgba(255,255,255,0.9)",
  }}>{children}</div>;
}`,
      };
    },
  },

  "spotlight-card": {
    params: [
      { name: "glow-size", label_zh: "光晕大小", label_en: "Glow size", type: "length", kind: "range", min: 150, max: 520, step: 10, default: "300", unit: "px" },
      { name: "glow-opacity", label_zh: "光晕强度", label_en: "Glow opacity", type: "percent", kind: "range", min: 0.05, max: 0.5, step: 0.05, default: "0.25", unit: "" },
      { name: "radius", label_zh: "圆角", label_en: "Radius", type: "length", kind: "range", min: 6, max: 28, step: 1, default: "14", unit: "px" },
    ],
    doc(p) {
      return base(
        `<div class="grid">${[1, 2, 3].map((n) => `<div class="card"><div class="t">卡片 ${n}</div><p>光晕跟着鼠标走，像手电照在深色墙面。</p></div>`).join("")}</div>
         <script>
         document.querySelectorAll('.card').forEach(c=>{
           c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();
             c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');});
         });
         </script>`,
        `body{background:#131313}
         .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:100%;max-width:640px}
         .card{position:relative;overflow:hidden;border-radius:${p.radius}px;background:#1d1d1d;border:1px solid #2e2e2c;padding:20px;color:#f2f0eb;min-height:120px}
         .card::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;
           background:radial-gradient(${p["glow-size"]}px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,${p["glow-opacity"]}),transparent 65%)}
         .card:hover::before{opacity:1}
         .t{font-weight:700;margin-bottom:6px;position:relative}
         p{font-size:13px;color:#b4b1aa;line-height:1.6;position:relative}`
      );
    },
    cardHtml: `<div class="fxc-spot"><div class="card"><div class="t">聚光灯卡片</div><p>光晕跟着鼠标走</p></div></div>`,
    cardCss: `.fxc-spot{height:100%;background:#131313;border-radius:10px;display:grid;place-items:center;padding:16px}
      .fxc-spot .card{width:78%;padding:14px 16px;border-radius:12px;background:#1d1d1d;border:1px solid #2e2e2c;color:#f2f0eb;position:relative;overflow:hidden}
      .fxc-spot .card::before{content:"";position:absolute;inset:0;background:radial-gradient(180px circle at 70% 20%,rgba(255,255,255,.28),transparent 65%)}
      .fxc-spot .t{font-weight:700;font-size:13.5px;position:relative}.fxc-spot p{font-size:11px;color:#b4b1aa;position:relative}`,
    codes(p) {
      return {
        "html-css": `<div class="spot-card">…</div>\n<script>\ndocument.querySelectorAll('.spot-card').forEach(c => {\n  c.addEventListener('pointermove', e => {\n    const r = c.getBoundingClientRect();\n    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');\n    c.style.setProperty('--my', (e.clientY - r.top) + 'px');\n  });\n});\n</script>\n<style>\n.spot-card { position: relative; overflow: hidden; border-radius: ${p.radius}px; background: #1d1d1d; }\n.spot-card::before {\n  content: ""; position: absolute; inset: 0; opacity: 0; transition: opacity .3s;\n  background: radial-gradient(${p["glow-size"]}px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,${p["glow-opacity"]}), transparent 65%);\n}\n.spot-card:hover::before { opacity: 1; }\n</style>`,
        tailwind: `<!-- 结构同 html-css 档，外层类名换成 Tailwind： -->
<div class="group relative overflow-hidden rounded-[${p.radius}px] bg-[#1d1d1d]">…</div>
<!-- 光晕层仍建议用一段自定义 CSS（radial-gradient + CSS 变量），Tailwind 任意值也可： -->
<!-- bg-[radial-gradient(300px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.25),transparent_65%)] -->`,
        react: `export function SpotlightCard({ children }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", (e.clientX - r.left) + "px");
    ref.current.style.setProperty("--my", (e.clientY - r.top) + "px");
  };
  return <div ref={ref} onPointerMove={onMove} className="spot-card">{children}</div>;
}
/* .spot-card 的 ::before 光晕 CSS 与 html-css 档相同 */`,
      };
    },
  },

  "tilt-card": {
    params: [
      { name: "max-tilt", label_zh: "最大倾斜角", label_en: "Max tilt", type: "length", kind: "range", min: 2, max: 20, step: 1, default: "10", unit: "deg" },
      { name: "scale", label_zh: "悬停放大", label_en: "Hover scale", type: "percent", kind: "range", min: 1, max: 1.1, step: 0.01, default: "1.03", unit: "" },
      { name: "glare", label_zh: "高光", label_en: "Glare", type: "enum", kind: "select", options: ["on", "off"], default: "on", label_options: { on: "开", off: "关" } },
    ],
    doc(p) {
      return base(
        `<div class="scene"><div class="card" id="card"><div class="t">3D 倾斜卡片</div><p>移动鼠标，卡片像拿在手里一样跟着转。</p><div class="chip">PRO</div></div></div>
         <script>
         const card=document.getElementById('card');const max=${p["max-tilt"]};
         card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();
           const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
           card.style.transform=\`rotateY(\${x*2*max}deg) rotateX(\${-y*2*max}deg) scale(${p.scale})\`;
           ${p.glare === "on" ? "card.style.setProperty('--gx',(x*100+50)+'%');card.style.setProperty('--gy',(y*100+50)+'%');" : ""}
         });
         card.addEventListener('pointerleave',()=>{card.style.transform='rotateY(0) rotateX(0) scale(1)'});
         </script>`,
        `.scene{perspective:900px}
         .card{position:relative;width:300px;padding:26px;border-radius:18px;color:#f5f3ee;
           background:linear-gradient(150deg,#2b2b29,#101010);border:1px solid #3a3a37;
           transition:transform .25s ease-out;transform-style:preserve-3d;overflow:hidden}
         ${p.glare === "on" ? `.card::after{content:"";position:absolute;inset:0;background:radial-gradient(340px circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.20),transparent 60%);pointer-events:none}` : ""}
         .t{font-size:19px;font-weight:700;margin-bottom:8px}
         p{font-size:13.5px;line-height:1.65;color:#c9c6bf}
         .chip{position:absolute;right:18px;top:18px;font-size:11px;border:1px solid #55534e;border-radius:999px;padding:3px 9px;color:#e8e5de}`
      );
    },
    cardHtml: `<div class="fxc-tilt"><div class="card fx-live"><div class="t">3D 倾斜卡片</div><p>像拿在手里一样转</p></div></div>`,
    cardCss: `.fxc-tilt{height:100%;background:#F1EEE8;border-radius:10px;display:grid;place-items:center;padding:16px;perspective:600px}
      .fxc-tilt .card{width:74%;padding:14px 16px;border-radius:14px;background:linear-gradient(150deg,#2b2b29,#101010);color:#f5f3ee;transform:rotateY(-9deg) rotateX(6deg)}
      .fxc-tilt .t{font-weight:700;font-size:13.5px}.fxc-tilt p{font-size:11px;color:#c9c6bf}`,
    codes(p) {
      return {
        "html-css": `<div class="tilt-scene"><div class="tilt-card" id="tiltCard">…</div></div>
<script>
const card = document.getElementById('tiltCard'); const max = ${p["max-tilt"]};
card.addEventListener('pointermove', e => {
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = \`rotateY(\${x * 2 * max}deg) rotateX(\${-y * 2 * max}deg) scale(${p.scale})\`;
});
card.addEventListener('pointerleave', () => card.style.transform = 'rotate(0) scale(1)');
</script>
<style>
.tilt-scene { perspective: 900px; }
.tilt-card { transition: transform .25s ease-out; transform-style: preserve-3d; }
</style>`,
        tailwind: `<!-- 外层加 [perspective:900px]，卡片 transform 仍由 JS 写 style（与 html-css 档同一段脚本） -->
<div class="[perspective:900px]"><div id="tiltCard" class="transition-transform duration-200 ease-out [transform-style:preserve-3d]">…</div></div>`,
        react: `export function TiltCard({ children }) {
  const ref = React.useRef(null); const max = ${p["max-tilt"]};
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    ref.current.style.transform = \`rotateY(\${x * 2 * max}deg) rotateX(\${-y * 2 * max}deg) scale(${p.scale})\`;
  };
  return (<div style={{ perspective: 900 }}><div ref={ref} onPointerMove={onMove}
    onPointerLeave={() => ref.current.style.transform = "rotate(0) scale(1)"}
    style={{ transition: "transform .25s ease-out", transformStyle: "preserve-3d" }}>{children}</div></div>);
}`,
      };
    },
  },

  marquee: {
    params: [
      { name: "duration", label_zh: "一圈时长", label_en: "Duration", type: "length", kind: "range", min: 5, max: 40, step: 1, default: "18", unit: "s" },
      { name: "gap", label_zh: "条目间距", label_en: "Gap", type: "length", kind: "range", min: 8, max: 64, step: 2, default: "32", unit: "px" },
      { name: "direction", label_zh: "方向", label_en: "Direction", type: "enum", kind: "select", options: ["left", "right"], default: "left", label_options: { left: "向左", right: "向右" } },
    ],
    doc(p) {
      const items = ["Aglaia", "玻璃拟态", "费茨定律", "自动布局", "设计令牌", "小白友好", "共创社区"];
      const seq = items.map((t) => `<span class="it">${t}</span>`).join("");
      return base(
        `<div class="mq"><div class="track">${seq}${seq}</div></div>
         <p class="note">把内容复制一份首尾相接，整体平移 -50% 就是无缝循环；悬停暂停。</p>`,
        `.mq{width:100%;max-width:640px;overflow:hidden;border-top:1px solid #d8d5cd;border-bottom:1px solid #d8d5cd;padding:16px 0;
           -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
         .track{display:flex;gap:${p.gap}px;width:max-content;animation:mq ${p.duration}s linear infinite ${p.direction === "right" ? "reverse" : ""}}
         .mq:hover .track{animation-play-state:paused}
         .it{font-size:19px;font-weight:600;white-space:nowrap;color:#2b2b29}
         .it::after{content:"·";margin-left:${p.gap}px;color:#a09d94}
         @keyframes mq{to{transform:translateX(-50%)}}
         .note{margin-top:16px;font-size:13px;color:#55534e}`
      );
    },
    cardHtml: `<div class="fxc-mq"><div class="track fx-anim"><span>设计令牌</span><span>·</span><span>玻璃拟态</span><span>·</span><span>费茨定律</span><span>·</span><span>设计令牌</span><span>·</span><span>玻璃拟态</span><span>·</span><span>费茨定律</span><span>·</span></div></div>`,
    cardCss: `.fxc-mq{height:100%;display:flex;align-items:center;overflow:hidden;background:#fff;border-radius:10px}
      .fxc-mq .track{display:flex;gap:14px;width:max-content;font-weight:600;font-size:14px;color:#2b2b29;white-space:nowrap;animation:fxmq 9s linear infinite}
      @keyframes fxmq{to{transform:translateX(-50%)}}`,
    codes(p) {
      return {
        "html-css": `<div class="marquee"><div class="marquee-track">
  <span>条目一</span><span>条目二</span><!-- …再复制一份完全相同的内容… -->
</div></div>
<style>
.marquee { overflow: hidden; }
.marquee-track {
  display: flex; gap: ${p.gap}px; width: max-content;
  animation: marquee ${p.duration}s linear infinite ${p.direction === "right" ? "reverse" : ""};
}
.marquee:hover .marquee-track { animation-play-state: paused; }
@keyframes marquee { to { transform: translateX(-50%); } }
</style>`,
        tailwind: `<div class="overflow-hidden"><div class="flex w-max animate-[marquee_${p.duration}s_linear_infinite] gap-[${p.gap}px] hover:[animation-play-state:paused]">…×2…</div></div>
<!-- tailwind.config 里补 keyframes: marquee: { to: { transform: 'translateX(-50%)' } } -->`,
        react: `export function Marquee({ items }) {
  const seq = [...items, ...items];
  return (<div style={{ overflow: "hidden" }}>
    <div className="marquee-track">{seq.map((t, i) => <span key={i}>{t}</span>)}</div>
    <style>{\`.marquee-track{display:flex;gap:${p.gap}px;width:max-content;animation:marquee ${p.duration}s linear infinite}@keyframes marquee{to{transform:translateX(-50%)}}\`}</style>
  </div>);
}`,
      };
    },
  },
};

// ---- 追加：交互效果 6–10 ----
Object.assign(INTERACTIVE_EFFECTS, {
  "shimmer-skeleton": {
    params: [
      { name: "speed", label_zh: "微光速度", label_en: "Shimmer speed", type: "length", kind: "range", min: 0.8, max: 3, step: 0.1, default: "1.6", unit: "s" },
      { name: "sheen-width", label_zh: "微光宽度", label_en: "Sheen width", type: "percent", kind: "range", min: 20, max: 80, step: 5, default: "40", unit: "%" },
      { name: "radius", label_zh: "骨架圆角", label_en: "Radius", type: "length", kind: "range", min: 0, max: 16, step: 1, default: "8", unit: "px" },
    ],
    doc(p) {
      return base(
        `<div class="sk">
           <div class="row"><div class="skl av"></div><div class="grow"><div class="skl line w60"></div><div class="skl line w40"></div></div></div>
           <div class="skl block"></div><div class="skl line w80"></div><div class="skl line w55"></div>
         </div>`,
        `.sk{width:320px;display:flex;flex-direction:column;gap:12px}
         .row{display:flex;gap:12px;align-items:center}.grow{flex:1;display:flex;flex-direction:column;gap:8px}
         .skl{position:relative;overflow:hidden;background:#E3E0D8;border-radius:${p.radius}px}
         .skl::after{content:"";position:absolute;inset:0;transform:translateX(-100%);
           background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent);
           width:${p["sheen-width"]}%;animation:sh ${p.speed}s infinite}
         @keyframes sh{to{transform:translateX(280%)}}
         .av{width:46px;height:46px;border-radius:50%}.line{height:13px}.block{height:110px}
         .w40{width:40%}.w55{width:55%}.w60{width:60%}.w80{width:80%}`
      );
    },
    cardHtml: `<div class="fxc-shim"><div class="row"><div class="av skl"></div><div class="grow"><div class="skl l w60"></div><div class="skl l w40"></div></div></div><div class="skl block"></div></div>`,
    cardCss: `.fxc-shim{height:100%;background:#fff;border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:9px}
      .fxc-shim .row{display:flex;gap:10px;align-items:center}.fxc-shim .grow{flex:1;display:flex;flex-direction:column;gap:7px}
      .fxc-shim .skl{position:relative;overflow:hidden;background:#E3E0D8;border-radius:7px}
      .fxc-shim .skl::after{content:"";position:absolute;inset:0;width:40%;transform:translateX(-110%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.8),transparent);animation:fxsh 1.6s infinite}
      @keyframes fxsh{to{transform:translateX(290%)}}
      .fxc-shim .av{width:34px;height:34px;border-radius:50%}.fxc-shim .l{height:10px}.fxc-shim .block{height:64px}
      .fxc-shim .w40{width:40%}.fxc-shim .w60{width:60%}`,
    codes(p) {
      return {
        "html-css": `<div class="skeleton"></div>
<style>
.skeleton {
  position: relative; overflow: hidden;
  background: #E3E0D8; border-radius: ${p.radius}px; min-height: 14px;
}
.skeleton::after {
  content: ""; position: absolute; inset: 0; width: ${p["sheen-width"]}%;
  transform: translateX(-110%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent);
  animation: shimmer ${p.speed}s infinite;
}
@keyframes shimmer { to { transform: translateX(290%); } }
@media (prefers-reduced-motion: reduce) { .skeleton::after { animation: none; } }
</style>`,
        tailwind: `<div class="relative min-h-[14px] overflow-hidden rounded-[${p.radius}px] bg-[#E3E0D8] after:absolute after:inset-0 after:w-[${p["sheen-width"]}%] after:-translate-x-[110%] after:animate-[shimmer_${p.speed}s_infinite] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent)]"></div>
<!-- tailwind.config 补 keyframes shimmer: { to: { transform: 'translateX(290%)' } } -->`,
        react: `export function Skeleton({ style }) {
  return <div className="skeleton" style={style}>
    <style>{\`.skeleton{position:relative;overflow:hidden;background:#E3E0D8;border-radius:${p.radius}px;min-height:14px}
    .skeleton::after{content:"";position:absolute;inset:0;width:${p["sheen-width"]}%;transform:translateX(-110%);
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent);animation:shimmer ${p.speed}s infinite}
    @keyframes shimmer{to{transform:translateX(290%)}}\`}</style>
  </div>;
}`,
      };
    },
  },

  "entrance-motion": {
    params: [
      { name: "easing", label_zh: "缓动曲线", label_en: "Easing", type: "enum", kind: "select", options: ["ease-out-expo", "ease-out-back", "ease-in-out", "linear"], default: "ease-out-expo", label_options: { "ease-out-expo": "利落落稳", "ease-out-back": "带回弹", "ease-in-out": "对称呼吸", linear: "匀速" } },
      { name: "duration", label_zh: "时长", label_en: "Duration", type: "length", kind: "range", min: 200, max: 1200, step: 50, default: "600", unit: "ms" },
      { name: "stagger", label_zh: "逐个延迟", label_en: "Stagger", type: "length", kind: "range", min: 0, max: 200, step: 10, default: "90", unit: "ms" },
      { name: "direction", label_zh: "入场方向", label_en: "Direction", type: "enum", kind: "select", options: ["up", "down", "left", "right"], default: "up", label_options: { up: "自下而上", down: "自上而下", left: "自右向左", right: "自左向右" } },
    ],
    doc(p) {
      const curves = { "ease-out-expo": "cubic-bezier(0.22,1,0.36,1)", "ease-out-back": "cubic-bezier(0.34,1.56,0.64,1)", "ease-in-out": "cubic-bezier(0.65,0,0.35,1)", linear: "linear" };
      const from = { up: "translateY(26px)", down: "translateY(-26px)", left: "translateX(26px)", right: "translateX(-26px)" }[p.direction];
      return base(
        `<div class="col"><div class="it"><b>标题先到</b></div><div class="it">正文随后跟上，错开一点点。</div><div class="it"><button>行动按钮最后落稳</button></div></div>
         <button class="replay" onclick="play()">↻ 再播一次</button>
         <script>
         function play(){document.querySelectorAll('.it').forEach((el,i)=>{
           el.animate([{opacity:0,transform:'${from}'},{opacity:1,transform:'none'}],
             {duration:${p.duration},delay:i*${p.stagger},easing:'${curves[p.easing]}',fill:'backwards'});});}
         play();
         </script>`,
        `.col{display:flex;flex-direction:column;gap:14px;width:300px}
         .it{background:#fff;border:1px solid #E3E0D8;border-radius:12px;padding:14px 16px;font-size:14px}
         button{background:#141414;color:#fff;border:none;padding:8px 15px;border-radius:999px;font-size:13px;cursor:pointer}
         .replay{position:fixed;right:16px;bottom:16px;background:#fff;color:#141414;border:1px solid #C7C3BA}`
      );
    },
    cardHtml: `<div class="fxc-enter"><div class="it a1">标题先到</div><div class="it a2">正文随后</div><div class="it a3">按钮落稳</div></div>`,
    cardCss: `.fxc-enter{height:100%;background:#F7F5F0;border-radius:10px;display:flex;flex-direction:column;gap:8px;justify-content:center;padding:16px}
      .fxc-enter .it{background:#fff;border:1px solid #E3E0D8;border-radius:9px;padding:8px 12px;font-size:12.5px}
      .fxc-enter .a1{animation:fxen 2.8s cubic-bezier(.22,1,.36,1) infinite}
      .fxc-enter .a2{animation:fxen 2.8s cubic-bezier(.22,1,.36,1) .12s infinite}
      .fxc-enter .a3{animation:fxen 2.8s cubic-bezier(.22,1,.36,1) .24s infinite}
      @keyframes fxen{0%{opacity:0;transform:translateY(16px)}22%,80%{opacity:1;transform:none}100%{opacity:0;transform:translateY(10px)}}`,
    codes(p) {
      const curves = { "ease-out-expo": "cubic-bezier(0.22,1,0.36,1)", "ease-out-back": "cubic-bezier(0.34,1.56,0.64,1)", "ease-in-out": "cubic-bezier(0.65,0,0.35,1)", linear: "linear" };
      return {
        "html-css": `<script>
// 一组元素逐个入场（Web Animations API，无需任何库）
document.querySelectorAll('.enter-item').forEach((el, i) => {
  el.animate(
    [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }],
    { duration: ${p.duration}, delay: i * ${p.stagger}, easing: '${curves[p.easing]}', fill: 'backwards' }
  );
});
</script>`,
        tailwind: `<!-- 纯 CSS 版：给每个元素加类并递增 animation-delay -->
<div class="animate-[enter_.6s_cubic-bezier(.22,1,.36,1)_both]">…</div>
<!-- tailwind.config 补 keyframes enter: { from: { opacity: 0, transform: 'translateY(26px)' } } -->
<!-- 第 n 个元素再加 [animation-delay:90ms]、[animation-delay:180ms]… -->`,
        react: `export function EnterGroup({ children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.querySelectorAll('[data-enter]').forEach((el, i) => {
      el.animate(
        [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }],
        { duration: ${p.duration}, delay: i * ${p.stagger}, easing: '${curves[p.easing]}', fill: 'backwards' });
    });
  }, []);
  return <div ref={ref}>{children}</div>;
}`,
      };
    },
  },

  "animated-counter": {
    params: [
      { name: "target", label_zh: "目标数字", label_en: "Target", type: "length", kind: "range", min: 100, max: 99999, step: 100, default: "12800", unit: "" },
      { name: "duration", label_zh: "滚动时长", label_en: "Duration", type: "length", kind: "range", min: 400, max: 3000, step: 100, default: "1600", unit: "ms" },
      { name: "easing", label_zh: "缓动", label_en: "Easing", type: "enum", kind: "select", options: ["out", "inout"], default: "out", label_options: { out: "先快后慢", inout: "慢快慢" } },
    ],
    doc(p) {
      return base(
        `<div class="wrap"><div class="num" id="num">0</div><div class="cap">累计帮用户省下的时间（分钟）</div>
         <button onclick="run()">↻ 再数一次</button></div>
         <script>
         const el=document.getElementById('num');const target=${p.target};
         const ease=${p.easing === "out" ? "t=>1-Math.pow(1-t,3)" : "t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2"};
         let raf;function run(){cancelAnimationFrame(raf);const t0=performance.now();
           const step=t=>{const k=Math.min(1,(t-t0)/${p.duration});
             el.textContent=Math.round(target*ease(k)).toLocaleString('en-US');
             if(k<1)raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)}
         run();
         </script>`,
        `.wrap{text-align:center}
         .num{font-size:56px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
         .cap{margin-top:6px;color:#55534e;font-size:14px}
         button{margin-top:18px;background:#141414;color:#fff;border:none;padding:9px 18px;border-radius:999px;font-size:13.5px;cursor:pointer}`
      );
    },
    cardHtml: `<div class="fxc-count"><div class="num" data-count>12,800</div><div class="cap">数字自己滚到位</div></div>`,
    cardCss: `.fxc-count{height:100%;background:#fff;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
      .fxc-count .num{font-size:32px;font-weight:800;font-variant-numeric:tabular-nums}
      .fxc-count .cap{font-size:11.5px;color:#8A8781}`,
    codes(p) {
      return {
        "html-css": `<div id="counter">0</div>
<script>
function countTo(el, target, duration = ${p.duration}) {
  const t0 = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3); // easeOutCubic
  (function step(t) {
    const k = Math.min(1, (t - t0) / duration);
    el.textContent = Math.round(target * ease(k)).toLocaleString('en-US');
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
countTo(document.getElementById('counter'), ${p.target});
</script>`,
        tailwind: `<!-- Tailwind 只管样式，计数逻辑仍用 html-css 档的脚本 -->
<div id="counter" class="text-6xl font-extrabold tabular-nums tracking-tight">0</div>`,
        react: `export function Counter({ target = ${p.target}, duration = ${p.duration} }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const t0 = performance.now(); let raf;
    const step = (t) => { const k = Math.min(1, (t - t0) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <span className="tabular-nums">{v.toLocaleString('en-US')}</span>;
}`,
      };
    },
  },

  "gradient-border": {
    params: [
      { name: "speed", label_zh: "流光速度", label_en: "Speed", type: "length", kind: "range", min: 2, max: 12, step: 0.5, default: "5", unit: "s" },
      { name: "border-width", label_zh: "边框宽度", label_en: "Border width", type: "length", kind: "range", min: 1, max: 6, step: 1, default: "2", unit: "px" },
      { name: "radius", label_zh: "圆角", label_en: "Radius", type: "length", kind: "range", min: 6, max: 30, step: 1, default: "16", unit: "px" },
    ],
    doc(p) {
      return base(
        `<div class="card"><div class="t">流光边框</div><p>一圈光沿着边框慢慢走，重点内容值得这样被看见。</p><button>了解一下</button></div>`,
        `@property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
         .card{position:relative;width:320px;padding:24px;border-radius:${p.radius}px;background:#fff}
         .card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:${p["border-width"]}px;
           background:conic-gradient(from var(--a),#141414,#c9c6bf 25%,#f5f3ee 50%,#141414 75%,#c9c6bf);
           -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;
           animation:spin ${p.speed}s linear infinite}
         @keyframes spin{to{--a:360deg}}
         .t{font-weight:700;font-size:17px;margin-bottom:6px}
         p{font-size:13.5px;color:#55534e;line-height:1.65}
         button{margin-top:14px;background:#141414;color:#fff;border:none;padding:8px 16px;border-radius:999px;font-size:13px;cursor:pointer}`
      );
    },
    cardHtml: `<div class="fxc-gb"><div class="card fx-anim-wrap"><div class="t">流光边框</div><p>光沿着边框走一圈</p></div></div>`,
    cardCss: `.fxc-gb{height:100%;background:#F7F5F0;border-radius:10px;display:grid;place-items:center;padding:16px}
      .fxc-gb .card{position:relative;width:76%;padding:13px 15px;border-radius:14px;background:#fff}
      .fxc-gb .card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:2px;background:conic-gradient(from var(--a,0deg),#141414,#c9c6bf 25%,#f5f3ee 50%,#141414 75%,#c9c6bf);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:fxgb 5s linear infinite;animation-play-state:paused}
      .fx-card:hover .fxc-gb .card::before,.fx-card.is-playing .fxc-gb .card::before{animation-play-state:running}
      @property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
      @keyframes fxgb{to{--a:360deg}}
      .fxc-gb .t{font-weight:700;font-size:13.5px}.fxc-gb p{font-size:11px;color:#55534e}`,
    codes(p) {
      return {
        "html-css": `<div class="glow-border">…</div>
<style>
@property --a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
.glow-border { position: relative; border-radius: ${p.radius}px; background: #fff; }
.glow-border::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: ${p["border-width"]}px;
  background: conic-gradient(from var(--a), #141414, #c9c6bf 25%, #f5f3ee 50%, #141414 75%, #c9c6bf);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: glow-spin ${p.speed}s linear infinite;
}
@keyframes glow-spin { to { --a: 360deg; } }
</style>`,
        tailwind: `<!-- 骨架用 Tailwind，光环伪元素用一小段自定义 CSS（同 html-css 档的 ::before） -->
<div class="glow-border relative rounded-[${p.radius}px] bg-white">…</div>`,
        react: `export function GlowBorder({ children }) {
  return <div className="glow-border">{children}</div>;
}
/* CSS 与 html-css 档相同（@property --a + conic-gradient + mask 镂空） */`,
      };
    },
  },

  "mesh-gradient": {
    params: [
      { name: "speed", label_zh: "漂移速度", label_en: "Drift speed", type: "length", kind: "range", min: 6, max: 30, step: 1, default: "16", unit: "s" },
      { name: "softness", label_zh: "柔和程度", label_en: "Softness (blur)", type: "length", kind: "range", min: 20, max: 80, step: 2, default: "42", unit: "px" },
      { name: "tone", label_zh: "色调", label_en: "Tone", type: "enum", kind: "select", options: ["gray", "warm", "cool"], default: "gray", label_options: { gray: "纯灰阶", warm: "暖灰", cool: "冷灰" } },
    ],
    doc(p) {
      const tones = {
        gray: ["#d9d6cf", "#a9a69e", "#6d6b64", "#efede8"],
        warm: ["#e8dcc8", "#cbb493", "#8a6f4d", "#f4ecdd"],
        cool: ["#d3dae2", "#93a5ba", "#54687f", "#edf1f5"],
      }[p.tone];
      return base(
        `<div class="stage"><div class="b b1"></div><div class="b b2"></div><div class="b b3"></div><div class="b b4"></div>
          <div class="txt">网格渐变背景</div></div>`,
        `.stage{position:relative;width:100%;max-width:560px;height:280px;border-radius:18px;overflow:hidden;background:#eceae5}
         .b{position:absolute;border-radius:50%;filter:blur(${p.softness}px);opacity:.85}
         .b1{width:55%;height:70%;left:-8%;top:-15%;background:${tones[0]};animation:dr1 ${p.speed}s ease-in-out infinite alternate}
         .b2{width:50%;height:65%;right:-6%;top:8%;background:${tones[1]};animation:dr2 ${p.speed}s ease-in-out infinite alternate}
         .b3{width:46%;height:60%;left:22%;bottom:-22%;background:${tones[2]};opacity:.55;animation:dr1 ${Number(p.speed) * 1.3}s ease-in-out infinite alternate-reverse}
         .b4{width:34%;height:44%;right:16%;bottom:-8%;background:${tones[3]};animation:dr2 ${Number(p.speed) * 0.8}s ease-in-out infinite alternate-reverse}
         @keyframes dr1{to{transform:translate(9%,7%) scale(1.12)}}
         @keyframes dr2{to{transform:translate(-8%,10%) scale(1.08)}}
         .txt{position:absolute;inset:0;display:grid;place-items:center;font-weight:700;font-size:19px;color:#26261f;text-shadow:0 1px 0 rgba(255,255,255,.35)}`
      );
    },
    cardHtml: `<div class="fxc-mesh"><div class="b b1 fx-anim"></div><div class="b b2 fx-anim"></div><div class="b b3 fx-anim"></div></div>`,
    cardCss: `.fxc-mesh{position:relative;height:100%;border-radius:10px;overflow:hidden;background:#eceae5}
      .fxc-mesh .b{position:absolute;border-radius:50%;filter:blur(22px)}
      .fxc-mesh .b1{width:60%;height:75%;left:-10%;top:-18%;background:#d9d6cf;animation:fxm1 9s ease-in-out infinite alternate}
      .fxc-mesh .b2{width:55%;height:70%;right:-8%;top:6%;background:#a9a69e;animation:fxm2 11s ease-in-out infinite alternate}
      .fxc-mesh .b3{width:44%;height:55%;left:26%;bottom:-24%;background:#6d6b64;opacity:.5;animation:fxm1 13s ease-in-out infinite alternate-reverse}
      @keyframes fxm1{to{transform:translate(9%,7%) scale(1.12)}}
      @keyframes fxm2{to{transform:translate(-8%,10%) scale(1.08)}}`,
    codes(p) {
      const tones = { gray: ["#d9d6cf", "#a9a69e", "#6d6b64"], warm: ["#e8dcc8", "#cbb493", "#8a6f4d"], cool: ["#d3dae2", "#93a5ba", "#54687f"] }[p.tone];
      return {
        "html-css": `<div class="mesh">
  <div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
  <!-- 内容放在 .mesh 之上的一层 -->
</div>
<style>
.mesh { position: relative; overflow: hidden; background: #eceae5; }
.blob { position: absolute; border-radius: 50%; filter: blur(${p.softness}px); }
.b1 { width: 55%; height: 70%; left: -8%; top: -15%; background: ${tones[0]}; animation: drift1 ${p.speed}s ease-in-out infinite alternate; }
.b2 { width: 50%; height: 65%; right: -6%; top: 8%; background: ${tones[1]}; animation: drift2 ${p.speed}s ease-in-out infinite alternate; }
.b3 { width: 46%; height: 60%; left: 22%; bottom: -22%; background: ${tones[2]}; opacity: .55; }
@keyframes drift1 { to { transform: translate(9%, 7%) scale(1.12); } }
@keyframes drift2 { to { transform: translate(-8%, 10%) scale(1.08); } }
</style>`,
        tailwind: `<div class="relative overflow-hidden bg-[#eceae5]">
  <div class="absolute -left-[8%] -top-[15%] h-[70%] w-[55%] rounded-full blur-[${p.softness}px] bg-[${tones[0]}] animate-[drift1_${p.speed}s_ease-in-out_infinite_alternate]"></div>
  …
</div>
<!-- keyframes drift1/drift2 在 tailwind.config 里补 -->`,
        react: `export function MeshBackground() {
  return (<div style={{ position: "relative", overflow: "hidden", background: "#eceae5" }}>
    <div style={{ position: "absolute", width: "55%", height: "70%", left: "-8%", top: "-15%",
      borderRadius: "50%", filter: "blur(${p.softness}px)", background: "${tones[0]}" }} />
    {/* 其余色块同理；漂移动画用 CSS @keyframes drift（见 html-css 档） */}
  </div>);
}`,
      };
    },
  },
});

// ---- 静态预览效果（20 个）：无参数滑杆，悬停播放型在卡片上动，详情页给静态舞台 + 代码 ----
export const STATIC_EFFECTS = [
  {
    id: "noise-texture", cardCss: `.fxc-noise{height:100%;border-radius:10px;background:#eceae5;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.16'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");display:grid;place-items:center;font-weight:700;font-size:14px;color:#3c3a34}`,
    cardHtml: `<div class="fxc-noise">噪点质感</div>`,
    docCss: `body{background:#eceae5;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.16'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}
      .card{background:#fbfaf7;border:1px solid #ddd9d0;border-radius:14px;padding:26px 28px;max-width:340px}
      .t{font-weight:700;font-size:17px;margin-bottom:6px}p{font-size:13.5px;color:#55534e;line-height:1.65}`,
    docHtml: `<div class="card"><div class="t">噪点质感</div><p>一层极细的噪点盖掉大色块的「塑料感」，画面立刻像纸一样有质地。</p></div>`,
  },
  {
    id: "dot-grid-bg", cardCss: `.fxc-dots{height:100%;border-radius:10px;background:#fbfaf7;background-image:radial-gradient(#c9c6bf 1.2px,transparent 1.3px);background-size:15px 15px;display:grid;place-items:center}.fxc-dots span{background:#fff;border:1px solid #E3E0D8;border-radius:999px;padding:5px 13px;font-size:12.5px;font-weight:600}`,
    cardHtml: `<div class="fxc-dots"><span>点阵背景</span></div>`,
    docCss: `body{background:#fbfaf7;background-image:radial-gradient(#c9c6bf 1.3px,transparent 1.4px);background-size:18px 18px}
      .card{background:#fff;border:1px solid #E3E0D8;border-radius:14px;padding:26px 28px;max-width:330px;box-shadow:0 10px 26px rgba(20,20,20,.06)}
      .t{font-weight:700;font-size:17px;margin-bottom:6px}p{font-size:13.5px;color:#55534e;line-height:1.65}`,
    docHtml: `<div class="card"><div class="t">点阵背景</div><p>等距圆点铺满背景，像方格纸一样给眼睛一个隐形的坐标系。</p></div>`,
  },
  {
    id: "grid-lines-bg", cardCss: `.fxc-grid{height:100%;border-radius:10px;background:#fbfaf7;background-image:linear-gradient(#e7e4db 1px,transparent 1px),linear-gradient(90deg,#e7e4db 1px,transparent 1px);background-size:22px 22px;display:grid;place-items:center}.fxc-grid span{background:#141414;color:#fff;border-radius:999px;padding:5px 13px;font-size:12.5px;font-weight:600}`,
    cardHtml: `<div class="fxc-grid"><span>网格线背景</span></div>`,
    docCss: `body{background:#fbfaf7;background-image:linear-gradient(#e7e4db 1px,transparent 1px),linear-gradient(90deg,#e7e4db 1px,transparent 1px);background-size:26px 26px}
      .card{background:#141414;color:#f5f3ee;border-radius:14px;padding:24px 26px;max-width:330px}
      .t{font-weight:700;font-size:17px;margin-bottom:6px}p{font-size:13.5px;color:#c9c6bf;line-height:1.65}`,
    docHtml: `<div class="card"><div class="t">网格线背景</div><p>淡网格线像蓝图一样垫在内容下面，科技感就是这么来的。</p></div>`,
  },
  {
    id: "avatar-stack", cardCss: `.fxc-ava{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:0}.fxc-ava .a{width:40px;height:40px;border-radius:50%;border:2.5px solid #fff;margin-left:-11px;display:grid;place-items:center;font-weight:700;font-size:13px;color:#fff}.fxc-ava .a:first-child{margin-left:0}`,
    cardHtml: `<div class="fxc-ava"><div class="a" style="background:#3c3a34">妞</div><div class="a" style="background:#6d6b64">K</div><div class="a" style="background:#a9a69e">G</div><div class="a" style="background:#d9d6cf;color:#3c3a34">+9</div></div>`,
    docCss: `.wrap{text-align:center}
      .stack{display:flex;justify-content:center}
      .a{width:58px;height:58px;border-radius:50%;border:3px solid #FAF8F3;margin-left:-14px;display:grid;place-items:center;font-weight:700;color:#fff;font-size:17px;transition:transform .25s cubic-bezier(.22,1,.36,1)}
      .a:first-child{margin-left:0}.a:hover{transform:translateY(-7px)}
      .cap{margin-top:14px;font-size:13.5px;color:#55534e}`,
    docHtml: `<div class="wrap"><div class="stack"><div class="a" style="background:#3c3a34">妞</div><div class="a" style="background:#6d6b64">K</div><div class="a" style="background:#8a8781">G</div><div class="a" style="background:#a9a69e">M</div><div class="a" style="background:#d9d6cf;color:#3c3a34">+9</div></div><div class="cap">已有 13 人参与 · 鼠标放上任意头像试试</div></div>`,
  },
  {
    id: "pulsing-badge", cardCss: `.fxc-pulse{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:9px;font-size:13.5px;font-weight:600}.fxc-pulse .dot{position:relative;width:10px;height:10px;border-radius:50%;background:#141414}.fxc-pulse .dot::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid #141414;opacity:.5;animation:fxpl 1.8s ease-out infinite}@keyframes fxpl{from{transform:scale(.55);opacity:.7}to{transform:scale(1.25);opacity:0}}`,
    cardHtml: `<div class="fxc-pulse"><span class="dot fx-anim"></span>呼吸徽标 · 正在直播</div>`,
    docCss: `.pill{display:inline-flex;align-items:center;gap:9px;border:1px solid #d8d5cd;background:#fff;border-radius:999px;padding:10px 18px;font-weight:600;font-size:14.5px}
      .dot{position:relative;width:10px;height:10px;border-radius:50%;background:#141414}
      .dot::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid #141414;animation:pl 1.8s ease-out infinite}
      @keyframes pl{from{transform:scale(.55);opacity:.7}to{transform:scale(1.3);opacity:0}}`,
    docHtml: `<span class="pill"><span class="dot"></span>正在直播 · 128 人在看</span>`,
  },
  {
    id: "progress-ring", cardCss: `.fxc-ring{height:100%;background:#fff;border-radius:10px;display:grid;place-items:center}.fxc-ring svg{transform:rotate(-90deg)}.fxc-ring .num{font-size:12px;font-weight:700}`,
    cardHtml: `<div class="fxc-ring"><svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r="31" fill="none" stroke="#E3E0D8" stroke-width="8"/><circle class="fx-anim" cx="38" cy="38" r="31" fill="none" stroke="#141414" stroke-width="8" stroke-linecap="round" stroke-dasharray="195" stroke-dashoffset="195" style="animation:fxrg 3.2s cubic-bezier(.22,1,.36,1) infinite"/><text x="38" y="42" text-anchor="middle" class="num" transform="rotate(90 38 38)">72%</text></svg></div>`,
    docCss: `.wrap{text-align:center}
      svg{transform:rotate(-90deg)}
      .cap{margin-top:10px;font-size:13.5px;color:#55534e}`,
    docHtml: `<div class="wrap"><svg width="130" height="130" viewBox="0 0 76 76"><circle cx="38" cy="38" r="31" fill="none" stroke="#E3E0D8" stroke-width="7"/><circle id="ring" cx="38" cy="38" r="31" fill="none" stroke="#141414" stroke-width="7" stroke-linecap="round" stroke-dasharray="195" stroke-dashoffset="195"/><text x="38" y="42" text-anchor="middle" font-size="13" font-weight="700" transform="rotate(90 38 38)">72%</text></svg><div class="cap">本周目标完成度</div></div>
      <script>document.getElementById('ring').animate([{strokeDashoffset:195},{strokeDashoffset:195*(1-.72)}],{duration:1100,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});</script>`,
  },
  {
    id: "steps-indicator", cardCss: `.fxc-steps{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 20px}.fxc-steps .s{display:flex;align-items:center;gap:0}.fxc-steps .n{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;background:#E3E0D8;color:#8A8781}.fxc-steps .n.done{background:#141414;color:#fff}.fxc-steps .bar{width:30px;height:2.5px;background:#E3E0D8;margin:0 5px}.fxc-steps .bar.done{background:#141414}`,
    cardHtml: `<div class="fxc-steps"><div class="s"><div class="n done">✓</div><div class="bar done"></div><div class="n done">✓</div><div class="bar"></div><div class="n">3</div></div></div>`,
    docCss: `.steps{display:flex;align-items:flex-start}
      .step{text-align:center;width:86px}
      .n{width:34px;height:34px;margin:0 auto;border-radius:50%;display:grid;place-items:center;font-weight:700;background:#E3E0D8;color:#8A8781;font-size:14px}
      .done{background:#141414;color:#fff}
      .now{background:#fff;color:#141414;border:2.5px solid #141414}
      .bar{flex:1;height:2.5px;background:#E3E0D8;margin-top:16px}.bar.done{background:#141414}
      .cap{margin-top:7px;font-size:12.5px;color:#55534e}`,
    docHtml: `<div class="steps"><div class="step"><div class="n done">✓</div><div class="cap">填写信息</div></div><div class="bar done"></div><div class="step"><div class="n done">✓</div><div class="cap">确认订单</div></div><div class="bar"></div><div class="step"><div class="n now">3</div><div class="cap">支付</div></div><div class="bar"></div><div class="step"><div class="n">4</div><div class="cap">完成</div></div></div>`,
  },
  {
    id: "custom-toggle", cardCss: `.fxc-tgl{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:22px}.fxc-tgl .sw{width:52px;height:30px;border-radius:999px;background:#d8d5cd;position:relative;transition:background .25s}.fxc-tgl .sw::after{content:"";position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.25);transition:left .25s cubic-bezier(.22,1,.36,1)}.fxc-tgl .sw.on{background:#141414}.fxc-tgl .sw.on::after{left:25px}`,
    cardHtml: `<div class="fxc-tgl"><div class="sw"></div><div class="sw on"></div></div>`,
    docCss: `.row{display:flex;flex-direction:column;gap:18px}
      .item{display:flex;align-items:center;gap:14px;font-size:14.5px}
      .sw{width:56px;height:32px;border-radius:999px;background:#d8d5cd;position:relative;transition:background .25s;cursor:pointer;border:none;flex:none}
      .sw::after{content:"";position:absolute;top:3.5px;left:3.5px;width:25px;height:25px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.25);transition:left .25s cubic-bezier(.22,1,.36,1)}
      .sw[aria-checked="true"]{background:#141414}.sw[aria-checked="true"]::after{left:27px}`,
    docHtml: `<div class="row">
      <div class="item"><button class="sw" role="switch" aria-checked="true" onclick="this.setAttribute('aria-checked',this.getAttribute('aria-checked')!=='true')"></button>新消息通知</div>
      <div class="item"><button class="sw" role="switch" aria-checked="false" onclick="this.setAttribute('aria-checked',this.getAttribute('aria-checked')!=='true')"></button>邮件周报</div></div>`,
  },
  {
    id: "custom-range", cardCss: `.fxc-rng{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;padding:0 22px}.fxc-rng input{width:100%;accent-color:#141414}`,
    cardHtml: `<div class="fxc-rng"><input type="range" value="62"></div>`,
    docCss: `.wrap{width:320px}
      input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:26px;background:transparent;cursor:pointer}
      input[type=range]::-webkit-slider-runnable-track{height:5px;border-radius:99px;background:linear-gradient(90deg,#141414 var(--v,62%),#E3E0D8 var(--v,62%))}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:21px;height:21px;border-radius:50%;background:#fff;border:2px solid #141414;margin-top:-8px;box-shadow:0 1px 4px rgba(0,0,0,.2)}
      input[type=range]::-moz-range-track{height:5px;border-radius:99px;background:#E3E0D8}
      input[type=range]::-moz-range-progress{height:5px;border-radius:99px;background:#141414}
      input[type=range]::-moz-range-thumb{width:19px;height:19px;border-radius:50%;background:#fff;border:2px solid #141414}
      .cap{display:flex;justify-content:space-between;font-size:12.5px;color:#55534e;margin-top:4px}`,
    docHtml: `<div class="wrap"><input type="range" min="0" max="100" value="62" oninput="this.style.setProperty('--v',this.value+'%');document.getElementById('rv').textContent=this.value"><div class="cap"><span>音量</span><span><b id="rv">62</b> / 100</span></div></div>`,
  },
  {
    id: "custom-checkbox", cardCss: `.fxc-chk{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:20px}.fxc-chk .box{width:24px;height:24px;border-radius:7px;border:2px solid #C7C3BA;display:grid;place-items:center;color:transparent;font-size:14px}.fxc-chk .box.on{background:#141414;border-color:#141414;color:#fff}`,
    cardHtml: `<div class="fxc-chk"><div class="box on">✓</div><div class="box on">✓</div><div class="box"></div></div>`,
    docCss: `.col{display:flex;flex-direction:column;gap:13px}
      label{display:flex;align-items:center;gap:11px;font-size:14.5px;cursor:pointer}
      input{position:absolute;opacity:0}
      .box{width:25px;height:25px;border-radius:7px;border:2px solid #C7C3BA;display:grid;place-items:center;color:transparent;font-size:14px;transition:all .18s;flex:none}
      input:checked + .box{background:#141414;border-color:#141414;color:#fff}
      input:focus-visible + .box{outline:2px solid #141414;outline-offset:2px}`,
    docHtml: `<div class="col">
      <label><input type="checkbox" checked><span class="box">✓</span>生成后自动跑一遍检查</label>
      <label><input type="checkbox" checked><span class="box">✓</span>深色模式跟随系统</label>
      <label><input type="checkbox"><span class="box">✓</span>每周发我一份周报</label></div>`,
  },
  {
    id: "tooltip", cardCss: `.fxc-tip{height:100%;background:#fff;border-radius:10px;display:grid;place-items:center}.fxc-tip .tg{position:relative;border:1.5px dashed #C7C3BA;border-radius:9px;padding:7px 14px;font-size:13px}.fxc-tip .tp{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%) translateY(3px);background:#141414;color:#fff;font-size:11.5px;padding:5px 9px;border-radius:6px;white-space:nowrap;opacity:0;transition:all .22s}.fx-card:hover .fxc-tip .tp,.fx-card.is-playing .fxc-tip .tp{opacity:1;transform:translateX(-50%) translateY(0)}`,
    cardHtml: `<div class="fxc-tip"><div class="tg">把鼠标放上来<span class="tp">这就是气泡提示</span></div></div>`,
    docCss: `.tg{position:relative;border:1.5px dashed #C7C3BA;background:#fff;border-radius:10px;padding:9px 16px;font-size:14px;cursor:help}
      .tp{position:absolute;left:50%;bottom:calc(100% + 9px);transform:translateX(-50%) translateY(4px);background:#141414;color:#fff;font-size:12.5px;padding:6px 10px;border-radius:7px;white-space:nowrap;opacity:0;pointer-events:none;transition:all .22s cubic-bezier(.22,1,.36,1)}
      .tp::after{content:"";position:absolute;left:50%;top:100%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#141414}
      .tg:hover .tp,.tg:focus .tp{opacity:1;transform:translateX(-50%) translateY(0)}`,
    docHtml: `<span class="tg" tabindex="0">这个操作不可撤销<span class="tp">删掉之后找不回来，先想三秒</span></span>`,
  },
  {
    id: "dropdown-menu", cardCss: `.fxc-dd{height:100%;background:#F7F5F0;border-radius:10px;display:grid;place-items:center}.fxc-dd .menu{background:#fff;border:1px solid #E3E0D8;border-radius:11px;box-shadow:0 12px 28px rgba(20,20,20,.10);padding:5px;width:150px}.fxc-dd .mi{padding:6.5px 10px;border-radius:7px;font-size:12.5px}.fxc-dd .mi.hot{background:#F1EEE8;font-weight:600}`,
    cardHtml: `<div class="fxc-dd"><div class="menu"><div class="mi hot">重命名</div><div class="mi">复制一份</div><div class="mi">导出…</div></div></div>`,
    docCss: `.wrap{position:relative}
      button.trigger{background:#141414;color:#fff;border:none;padding:9px 18px;border-radius:999px;font-size:13.5px;cursor:pointer}
      .menu{position:absolute;left:50%;transform:translateX(-50%) translateY(5px);top:calc(100% + 8px);background:#fff;border:1px solid #E3E0D8;border-radius:12px;box-shadow:0 14px 32px rgba(20,20,20,.12);padding:5px;width:180px;opacity:0;pointer-events:none;transition:all .2s cubic-bezier(.22,1,.36,1)}
      .wrap.open .menu{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
      .mi{padding:8px 11px;border-radius:8px;font-size:13.5px;cursor:pointer}.mi:hover{background:#F1EEE8}
      .sep{height:1px;background:#E3E0D8;margin:5px 4px}`,
    docHtml: `<div class="wrap" id="w"><button class="trigger" onclick="document.getElementById('w').classList.toggle('open')">文件操作 ▾</button>
      <div class="menu"><div class="mi">重命名</div><div class="mi">复制一份</div><div class="mi">移动到…</div><div class="sep"></div><div class="mi">导出为图片</div></div></div>`,
  },
  {
    id: "accordion", cardCss: `.fxc-acc{height:100%;background:#fff;border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;justify-content:center;gap:0}.fxc-acc .q{padding:8px 2px;font-size:13px;font-weight:600;display:flex;justify-content:space-between;border-bottom:1px solid #E3E0D8}.fxc-acc .a{font-size:11.5px;color:#55534e;padding:7px 2px 9px;border-bottom:1px solid #E3E0D8;line-height:1.55}`,
    cardHtml: `<div class="fxc-acc"><div class="q">收费吗？<span>−</span></div><div class="a">核心资源库永久免费。</div><div class="q">要注册吗？<span>+</span></div></div>`,
    docCss: `.acc{width:340px;border-top:1px solid #d8d5cd}
      details{border-bottom:1px solid #d8d5cd}
      summary{list-style:none;cursor:pointer;padding:13px 2px;font-weight:600;font-size:14.5px;display:flex;justify-content:space-between;align-items:center}
      summary::-webkit-details-marker{display:none}
      summary::after{content:"+";font-size:17px;color:#8A8781;transition:transform .25s}
      details[open ] summary::after{transform:rotate(45deg)}
      .a{padding:0 2px 14px;font-size:13.5px;color:#55534e;line-height:1.7}`,
    docHtml: `<div class="acc">
      <details open><summary>这个站收费吗？</summary><div class="a">核心资源库永久免费。内容 CC BY 4.0，代码 MIT。</div></details>
      <details><summary>提示词能直接用吗？</summary><div class="a">能。每条都是填空式：把占位符换成你的参数，复制给你的 AI 就能生成。</div></details>
      <details><summary>不懂设计能用吗？</summary><div class="a">能。这个站就是给不懂设计的人做的，先查名字，再拿提示词。</div></details></div>`,
  },
  {
    id: "sliding-tabs", cardCss: `.fxc-tabs{height:100%;background:#fff;border-radius:10px;display:grid;place-items:center}.fxc-tabs .bar{position:relative;display:flex;gap:20px;font-size:13.5px}.fxc-tabs .t{padding:6px 2px;color:#8A8781}.fxc-tabs .t.on{color:#141414;font-weight:700}.fxc-tabs .ink{position:absolute;bottom:0;height:2.5px;background:#141414;border-radius:99px;transition:all .4s cubic-bezier(.22,1,.36,1)}`,
    cardHtml: `<div class="fxc-tabs"><div class="bar"><span class="t on">概览</span><span class="t">数据</span><span class="t">设置</span><span class="ink fx-anim" style="left:2px;width:28px;animation:fxink 3.4s cubic-bezier(.22,1,.36,1) infinite"></span></div></div>`,
    docCss: `.bar{position:relative;display:flex;gap:26px;font-size:15px}
      .t{padding:8px 2px;color:#8A8781;cursor:pointer;background:none;border:none;font-size:15px}
      .t.on{color:#141414;font-weight:700}
      .ink{position:absolute;bottom:0;height:2.5px;background:#141414;border-radius:99px;transition:all .4s cubic-bezier(.22,1,.36,1)}`,
    docHtml: `<div class="bar" id="bar"><button class="t on">概览</button><button class="t">数据</button><button class="t">评论</button><button class="t">设置</button><span class="ink" id="ink"></span></div>
      <script>const bar=document.getElementById('bar'),ink=document.getElementById('ink');
      function move(el){ink.style.left=el.offsetLeft+'px';ink.style.width=el.offsetWidth+'px'}
      bar.querySelectorAll('.t').forEach(b=>b.onclick=()=>{bar.querySelector('.on').classList.remove('on');b.classList.add('on');move(b)});
      move(bar.querySelector('.on'));</script>`,
  },
  {
    id: "image-zoom", cardCss: `.fxc-zoom{height:100%;border-radius:10px;overflow:hidden;position:relative;background:linear-gradient(140deg,#cfccc4,#8a8781)}.fxc-zoom .img{position:absolute;inset:0;background:radial-gradient(90% 90% at 30% 20%,#f5f3ee 0%,#b9b6ae 45%,#55534e 100%);transition:transform .6s cubic-bezier(.22,1,.36,1)}.fx-card:hover .fxc-zoom .img,.fx-card.is-playing .fxc-zoom .img{transform:scale(1.14)}.fxc-zoom .cap{position:absolute;left:10px;bottom:9px;background:rgba(20,20,20,.72);color:#fff;font-size:11px;padding:3.5px 9px;border-radius:999px}`,
    cardHtml: `<div class="fxc-zoom"><div class="img"></div><span class="cap">悬停放大</span></div>`,
    docCss: `.frame{width:340px;height:230px;border-radius:14px;overflow:hidden;position:relative}
      .img{position:absolute;inset:0;background:radial-gradient(90% 90% at 30% 20%,#f5f3ee 0%,#b9b6ae 45%,#55534e 100%);transition:transform .6s cubic-bezier(.22,1,.36,1)}
      .frame:hover .img{transform:scale(1.14)}
      .cap{position:absolute;left:12px;bottom:11px;background:rgba(20,20,20,.72);color:#fff;font-size:12px;padding:4px 10px;border-radius:999px}`,
    docHtml: `<div class="frame"><div class="img"></div><span class="cap">把鼠标放上来，画面会慢慢推近</span></div>`,
  },
  {
    id: "card-lift", cardCss: `.fxc-lift{height:100%;background:#F7F5F0;border-radius:10px;display:grid;place-items:center;padding:14px}.fxc-lift .card{width:78%;background:#fff;border:1px solid #E3E0D8;border-radius:12px;padding:13px 15px;transition:all .35s cubic-bezier(.22,1,.36,1)}.fx-card:hover .fxc-lift .card,.fx-card.is-playing .fxc-lift .card{transform:translateY(-5px);box-shadow:0 16px 30px rgba(20,20,20,.13);border-color:#C7C3BA}.fxc-lift .t{font-weight:700;font-size:13.5px}.fxc-lift p{font-size:11px;color:#55534e;margin-top:2px}`,
    cardHtml: `<div class="fxc-lift"><div class="card"><div class="t">悬停上浮</div><p>卡片轻轻抬起来</p></div></div>`,
    docCss: `.card{width:300px;background:#fff;border:1px solid #E3E0D8;border-radius:14px;padding:20px;transition:all .35s cubic-bezier(.22,1,.36,1)}
      .card:hover{transform:translateY(-5px);box-shadow:0 16px 30px rgba(20,20,20,.13);border-color:#C7C3BA}
      .t{font-weight:700;margin-bottom:5px}p{font-size:13.5px;color:#55534e;line-height:1.6}`,
    docHtml: `<div class="card"><div class="t">悬停上浮</div><p>鼠标一放上去，卡片抬起 5 像素、影子变深——「我可以点」就是这么暗示的。</p></div>`,
  },
  {
    id: "button-press", cardCss: `.fxc-press{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:16px}.fxc-press .b{background:#141414;color:#fff;border:none;padding:10px 20px;border-radius:999px;font-size:13px;font-weight:600;box-shadow:0 4px 0 #000;transition:all .12s}.fx-card:hover .fxc-press .b1,.fx-card.is-playing .fxc-press .b1{transform:translateY(3px);box-shadow:0 1px 0 #000}`,
    cardHtml: `<div class="fxc-press"><span class="b b1">按下去</span><span class="b">平的</span></div>`,
    docCss: `.row{display:flex;gap:18px;align-items:center}
      .b1{background:#141414;color:#fff;border:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;box-shadow:0 4px 0 #000;transition:all .12s;cursor:pointer}
      .b1:active{transform:translateY(3px);box-shadow:0 1px 0 #000}
      .b2{background:#fff;color:#141414;border:1.5px solid #141414;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;transition:transform .12s;cursor:pointer}
      .b2:active{transform:scale(.96)}
      .cap{font-size:12.5px;color:#8A8781}`,
    docHtml: `<div class="row"><button class="b1">按我试试</button><button class="b2">我会缩一下</button><span class="cap">按压反馈要在 100ms 内发生</span></div>`,
  },
  {
    id: "striped-progress", cardCss: `.fxc-strp{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;padding:0 20px}.fxc-strp .tk{width:100%;height:13px;border-radius:99px;background:#E3E0D8;overflow:hidden}.fxc-strp .fl{height:100%;width:64%;border-radius:99px;background:repeating-linear-gradient(45deg,#141414 0 10px,#3c3a34 10px 20px);background-size:28px 100%;animation:fxst 1.1s linear infinite}@keyframes fxst{to{background-position:28px 0}}`,
    cardHtml: `<div class="fxc-strp"><div class="tk"><div class="fl fx-anim"></div></div></div>`,
    docCss: `.tk{width:340px;height:15px;border-radius:99px;background:#E3E0D8;overflow:hidden}
      .fl{height:100%;width:64%;border-radius:99px;background:repeating-linear-gradient(45deg,#141414 0 10px,#3c3a34 10px 20px);background-size:28px 100%;animation:st 1.1s linear infinite}
      @keyframes st{to{background-position:28px 0}}
      .cap{margin-top:9px;font-size:12.5px;color:#55534e;text-align:center}`,
    docHtml: `<div><div class="tk"><div class="fl"></div></div><div class="cap">正在导出… 64% · 条纹在动 = 还在干活</div></div>`,
  },
  {
    id: "focus-ring", cardCss: `.fxc-focus{height:100%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:14px}.fxc-focus .b{padding:9px 17px;border-radius:999px;font-size:13px;font-weight:600;border:1.5px solid #141414;background:#fff;color:#141414}.fxc-focus .b.ring{outline:2.5px solid #141414;outline-offset:3px;background:#141414;color:#fff}`,
    cardHtml: `<div class="fxc-focus"><span class="b">普通</span><span class="b ring">被 Tab 选中</span></div>`,
    docCss: `.row{display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:center}
      button{padding:10px 19px;border-radius:999px;font-size:13.5px;font-weight:600;cursor:pointer}
      .b1{background:#141414;color:#fff;border:none}
      .b2{background:#fff;color:#141414;border:1.5px solid #141414}
      :focus{outline:none}
      :focus-visible{outline:2.5px solid #141414;outline-offset:3px}
      .cap{width:100%;text-align:center;font-size:12.5px;color:#8A8781;margin-top:6px}`,
    docHtml: `<div class="row"><button class="b1">主要按钮</button><button class="b2">次要按钮</button><span class="cap">按键盘 Tab 逐个走一遍：焦点环只在键盘操作时出现（:focus-visible）</span></div>`,
  },
  {
    id: "text-shimmer", cardCss: `.fxc-tsh{height:100%;background:#131313;border-radius:10px;display:grid;place-items:center}.fxc-tsh .tx{font-size:19px;font-weight:800;letter-spacing:.02em;background:linear-gradient(100deg,#6d6b64 40%,#f5f3ee 50%,#6d6b64 60%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:fxts 2.6s linear infinite}@keyframes fxts{to{background-position:-220% 0}}`,
    cardHtml: `<div class="fxc-tsh"><span class="tx fx-anim">文字微光</span></div>`,
    docCss: `.tx{font-size:30px;font-weight:800;letter-spacing:.02em;background:linear-gradient(100deg,#6d6b64 40%,#f5f3ee 50%,#6d6b64 60%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ts 2.6s linear infinite}
      @keyframes ts{to{background-position:-220% 0}}
      body{background:#131313}`,
    docHtml: `<span class="tx">正在为你生成…</span>`,
  },
];

export const STATIC_EFFECT_CODES = {
  "noise-texture": {
    "html-css": `<div class="noise"></div>\n<style>\n.noise {\n  background: #eceae5;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.16'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");\n}\n</style>`,
    tailwind: `<div class="bg-[#eceae5] bg-[image:url('data:image/svg+xml,...')]"></div>\n<!-- data URI 太长，Tailwind 里建议把噪点图存成 noise.svg 文件再 bg-[url(/noise.svg)] -->`,
    react: `export function Noise({ children }) {\n  return <div style={{ background: "#eceae5", backgroundImage: \`url("data:image/svg+xml,...")\` }}>{children}</div>;\n}\n/* 噪点 SVG 与 html-css 档相同；slope 控制浓淡 */`,
  },
  "dot-grid-bg": {
    "html-css": `<style>\n.dot-grid {\n  background: #fbfaf7;\n  background-image: radial-gradient(#c9c6bf 1.3px, transparent 1.4px);\n  background-size: 18px 18px;\n}\n</style>`,
    tailwind: `<div class="bg-[#fbfaf7] bg-[radial-gradient(#c9c6bf_1.3px,transparent_1.4px)] [background-size:18px_18px]"></div>`,
    react: `export function DotGrid({ children }) {\n  return <div style={{ background: "#fbfaf7", backgroundImage: "radial-gradient(#c9c6bf 1.3px, transparent 1.4px)", backgroundSize: "18px 18px" }}>{children}</div>;\n}`,
  },
  "grid-lines-bg": {
    "html-css": `<style>\n.grid-lines {\n  background: #fbfaf7;\n  background-image: linear-gradient(#e7e4db 1px, transparent 1px), linear-gradient(90deg, #e7e4db 1px, transparent 1px);\n  background-size: 26px 26px;\n}\n</style>`,
    tailwind: `<div class="bg-[#fbfaf7] bg-[linear-gradient(#e7e4db_1px,transparent_1px),linear-gradient(90deg,#e7e4db_1px,transparent_1px)] [background-size:26px_26px]"></div>`,
    react: `export function GridLines({ children }) {\n  return <div style={{ background: "#fbfaf7", backgroundImage: "linear-gradient(#e7e4db 1px, transparent 1px), linear-gradient(90deg, #e7e4db 1px, transparent 1px)", backgroundSize: "26px 26px" }}>{children}</div>;\n}`,
  },
  "avatar-stack": {
    "html-css": `<div class="stack"><span class="a" style="background:#3c3a34">妞</span><span class="a" style="background:#6d6b64">K</span><span class="a more">+9</span></div>\n<style>\n.stack { display: flex; }\n.a { width: 44px; height: 44px; border-radius: 50%; border: 3px solid #fff; margin-left: -12px;\n     display: grid; place-items: center; color: #fff; font-weight: 700; transition: transform .25s; }\n.a:first-child { margin-left: 0; }\n.a:hover { transform: translateY(-6px); }\n</style>`,
    tailwind: `<div class="flex"><span class="-ml-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-[#3c3a34] font-bold text-white first:ml-0 transition-transform hover:-translate-y-1.5">妞</span>…</div>`,
    react: `export function AvatarStack({ users }) {\n  return (<div style={{ display: "flex" }}>\n    {users.map((u, i) => (<span key={i} style={{ width: 44, height: 44, borderRadius: "50%", border: "3px solid #fff", marginLeft: i ? -12 : 0, display: "grid", placeItems: "center", background: u.color, color: "#fff", fontWeight: 700 }}>{u.initial}</span>))}\n  </div>);\n}`,
  },
  "pulsing-badge": {
    "html-css": `<span class="live"><span class="dot"></span>正在直播</span>\n<style>\n.live { display: inline-flex; align-items: center; gap: 9px; font-weight: 600; }\n.dot { position: relative; width: 10px; height: 10px; border-radius: 50%; background: #141414; }\n.dot::after { content: ""; position: absolute; inset: -5px; border-radius: 50%; border: 2px solid #141414;\n  animation: pulse 1.8s ease-out infinite; }\n@keyframes pulse { from { transform: scale(.55); opacity: .7; } to { transform: scale(1.3); opacity: 0; } }\n</style>`,
    tailwind: `<span class="relative flex h-2.5 w-2.5"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-900 opacity-60"></span><span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-neutral-900"></span></span>\n<!-- Tailwind 自带 animate-ping 就是这个效果 -->`,
    react: `export function LiveBadge({ children }) {\n  return (<span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontWeight: 600 }}>\n    <span className="live-dot" />{children}\n    <style>{\`.live-dot{position:relative;width:10px;height:10px;border-radius:50%;background:#141414}\n    .live-dot::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid #141414;animation:pl 1.8s ease-out infinite}\n    @keyframes pl{from{transform:scale(.55);opacity:.7}to{transform:scale(1.3);opacity:0}}\`}</style></span>);\n}`,
  },
  "progress-ring": {
    "html-css": `<svg width="120" height="120" viewBox="0 0 76 76" style="transform:rotate(-90deg)">\n  <circle cx="38" cy="38" r="31" fill="none" stroke="#E3E0D8" stroke-width="7"/>\n  <circle id="ring" cx="38" cy="38" r="31" fill="none" stroke="#141414" stroke-width="7"\n    stroke-linecap="round" stroke-dasharray="195" stroke-dashoffset="195"/>\n</svg>\n<script>\n// 周长 = 2πr ≈ 195；目标 72% → dashoffset = 195 × (1 − 0.72)\ndocument.getElementById('ring').animate(\n  [{ strokeDashoffset: 195 }, { strokeDashoffset: 195 * (1 - .72) }],\n  { duration: 1100, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });\n</script>`,
    tailwind: `<!-- 结构同上，svg 元素加类：class="h-[120px] w-[120px] -rotate-90"；动画逻辑同 html-css 档 -->`,
    react: `export function ProgressRing({ value = 0.72, size = 120 }) {\n  const r = 31, c = 2 * Math.PI * r;\n  const ref = React.useRef(null);\n  React.useEffect(() => { ref.current?.animate(\n    [{ strokeDashoffset: c }, { strokeDashoffset: c * (1 - value) }],\n    { duration: 1100, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }); }, [value]);\n  return (<svg width={size} height={size} viewBox="0 0 76 76" style={{ transform: "rotate(-90deg)" }}>\n    <circle cx="38" cy="38" r={r} fill="none" stroke="#E3E0D8" strokeWidth="7" />\n    <circle ref={ref} cx="38" cy="38" r={r} fill="none" stroke="#141414" strokeWidth="7"\n      strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c} />\n  </svg>);\n}`,
  },
  "steps-indicator": {
    "html-css": `<div class="steps">\n  <div class="step"><div class="n done">✓</div><div class="cap">填写信息</div></div><div class="bar done"></div>\n  <div class="step"><div class="n now">2</div><div class="cap">确认订单</div></div><div class="bar"></div>\n  <div class="step"><div class="n">3</div><div class="cap">支付</div></div>\n</div>\n<style>\n.steps { display: flex; align-items: flex-start; }\n.step { text-align: center; width: 86px; }\n.n { width: 34px; height: 34px; margin: 0 auto; border-radius: 50%; display: grid; place-items: center;\n     font-weight: 700; background: #E3E0D8; color: #8A8781; }\n.n.done { background: #141414; color: #fff; }\n.n.now { background: #fff; color: #141414; border: 2.5px solid #141414; }\n.bar { flex: 1; height: 2.5px; background: #E3E0D8; margin-top: 16px; }\n.bar.done { background: #141414; }\n.cap { margin-top: 7px; font-size: 12.5px; color: #55534e; }\n</style>`,
    tailwind: `<div class="flex items-start"><div class="w-[86px] text-center"><div class="mx-auto grid h-[34px] w-[34px] place-items-center rounded-full bg-neutral-900 font-bold text-white">✓</div><div class="mt-[7px] text-xs text-neutral-500">填写信息</div></div><div class="mt-4 h-[2.5px] flex-1 bg-neutral-900"></div>…</div>`,
    react: `export function Steps({ steps, current }) {\n  return (<div style={{ display: "flex", alignItems: "flex-start" }}>\n    {steps.map((s, i) => (<React.Fragment key={i}>\n      {i > 0 && <div style={{ flex: 1, height: 2.5, marginTop: 16, background: i <= current ? "#141414" : "#E3E0D8" }} />}\n      <div style={{ textAlign: "center", width: 86 }}>\n        <div style={{ width: 34, height: 34, margin: "0 auto", borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 700,\n          background: i < current ? "#141414" : "#E3E0D8", color: i < current ? "#fff" : "#8A8781",\n          ...(i === current ? { background: "#fff", color: "#141414", border: "2.5px solid #141414" } : {}) }}>{i < current ? "✓" : i + 1}</div>\n        <div style={{ marginTop: 7, fontSize: 12.5, color: "#55534e" }}>{s}</div>\n      </div></React.Fragment>))}\n  </div>);\n}`,
  },
  "custom-toggle": {
    "html-css": `<button class="switch" role="switch" aria-checked="false"\n  onclick="this.setAttribute('aria-checked', this.getAttribute('aria-checked') !== 'true')"></button>\n<style>\n.switch { width: 56px; height: 32px; border-radius: 999px; background: #d8d5cd; border: none;\n  position: relative; transition: background .25s; cursor: pointer; }\n.switch::after { content: ""; position: absolute; top: 3.5px; left: 3.5px; width: 25px; height: 25px;\n  border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.25);\n  transition: left .25s cubic-bezier(.22,1,.36,1); }\n.switch[aria-checked="true"] { background: #141414; }\n.switch[aria-checked="true"]::after { left: 27px; }\n</style>`,
    tailwind: `<!-- 推荐用 button + 数据状态类，或直接用无样式原语（Radix Switch）；纯 Tailwind 写法： -->\n<button role="switch" aria-checked="true" class="relative h-8 w-14 rounded-full bg-neutral-900 transition-colors after:absolute after:left-[3.5px] after:top-[3.5px] after:h-[25px] after:w-[25px] after:rounded-full after:bg-white after:shadow after:transition-all aria-checked:after:left-[27px]"></button>`,
    react: `export function Switch({ defaultChecked = false }) {\n  const [on, setOn] = React.useState(defaultChecked);\n  return (<button role="switch" aria-checked={on} onClick={() => setOn(!on)} style={{\n    width: 56, height: 32, borderRadius: 999, border: "none", cursor: "pointer", position: "relative",\n    background: on ? "#141414" : "#d8d5cd", transition: "background .25s" }}>\n    <span style={{ position: "absolute", top: 3.5, left: on ? 27 : 3.5, width: 25, height: 25, borderRadius: "50%",\n      background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,.25)", transition: "left .25s cubic-bezier(.22,1,.36,1)" }} />\n  </button>);\n}`,
  },
  "custom-range": {
    "html-css": `<input type="range" min="0" max="100" value="62"\n  oninput="this.style.setProperty('--v', this.value + '%')">\n<style>\ninput[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 26px; background: transparent; cursor: pointer; }\ninput[type=range]::-webkit-slider-runnable-track { height: 5px; border-radius: 99px;\n  background: linear-gradient(90deg, #141414 var(--v, 62%), #E3E0D8 var(--v, 62%)); }\ninput[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 21px; height: 21px; border-radius: 50%;\n  background: #fff; border: 2px solid #141414; margin-top: -8px; }\ninput[type=range]::-moz-range-progress { background: #141414; height: 5px; border-radius: 99px; }\ninput[type=range]::-moz-range-thumb { width: 19px; height: 19px; border-radius: 50%; background: #fff; border: 2px solid #141414; }\n</style>`,
    tailwind: `<input type="range" class="w-full accent-neutral-900">\n<!-- 只求能用：accent-color 一行搞定；要精细样式再换 html-css 档的伪元素写法 -->`,
    react: `export function VolumeSlider() {\n  const [v, setV] = React.useState(62);\n  return <input type="range" min={0} max={100} value={v}\n    onChange={(e) => setV(+e.target.value)}\n    style={{ accentColor: "#141414", width: "100%" }} />;\n}\n/* 精细样式（填充轨道 + 自定义滑块）见 html-css 档的伪元素写法 */`,
  },
  "custom-checkbox": {
    "html-css": `<label class="chk"><input type="checkbox" checked><span class="box">✓</span>选项文字</label>\n<style>\n.chk { display: flex; align-items: center; gap: 11px; cursor: pointer; }\n.chk input { position: absolute; opacity: 0; }\n.chk .box { width: 25px; height: 25px; border-radius: 7px; border: 2px solid #C7C3BA;\n  display: grid; place-items: center; color: transparent; transition: all .18s; }\n.chk input:checked + .box { background: #141414; border-color: #141414; color: #fff; }\n.chk input:focus-visible + .box { outline: 2px solid #141414; outline-offset: 2px; }\n</style>`,
    tailwind: `<label class="flex cursor-pointer items-center gap-[11px]"><input type="checkbox" class="peer sr-only" checked>\n<span class="grid h-[25px] w-[25px] place-items-center rounded-[7px] border-2 border-[#C7C3BA] text-transparent transition-all peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white">✓</span>选项文字</label>\n<!-- 注意：peer 要求 input 与 span 是兄弟且 input 在前 -->`,
    react: `export function Checkbox({ label, defaultChecked }) {\n  const [on, setOn] = React.useState(!!defaultChecked);\n  return (<label style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}>\n    <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} style={{ position: "absolute", opacity: 0 }} />\n    <span style={{ width: 25, height: 25, borderRadius: 7, display: "grid", placeItems: "center",\n      border: "2px solid " + (on ? "#141414" : "#C7C3BA"), background: on ? "#141414" : "transparent",\n      color: on ? "#fff" : "transparent", transition: "all .18s" }}>✓</span>{label}</label>);\n}`,
  },
  "tooltip": {
    "html-css": `<span class="tg" tabindex="0">把鼠标放上来<span class="tp">这就是气泡提示</span></span>\n<style>\n.tg { position: relative; cursor: help; }\n.tp { position: absolute; left: 50%; bottom: calc(100% + 9px); transform: translateX(-50%) translateY(4px);\n  background: #141414; color: #fff; font-size: 12.5px; padding: 6px 10px; border-radius: 7px;\n  white-space: nowrap; opacity: 0; pointer-events: none; transition: all .22s cubic-bezier(.22,1,.36,1); }\n.tp::after { content: ""; position: absolute; left: 50%; top: 100%; transform: translateX(-50%);\n  border: 5px solid transparent; border-top-color: #141414; }\n.tg:hover .tp, .tg:focus .tp { opacity: 1; transform: translateX(-50%) translateY(0); }\n</style>`,
    tailwind: `<span class="group relative cursor-help">把鼠标放上来\n  <span class="pointer-events-none absolute bottom-[calc(100%+9px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">气泡提示</span>\n</span>`,
    react: `export function Tooltip({ label, children }) {\n  const [show, setShow] = React.useState(false);\n  return (<span style={{ position: "relative", cursor: "help" }} tabIndex={0}\n    onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}\n    onFocus={() => setShow(true)} onBlur={() => setShow(false)}>{children}\n    <span style={{ position: "absolute", left: "50%", bottom: "calc(100% + 9px)", whiteSpace: "nowrap",\n      transform: \`translateX(-50%) translateY(\${show ? 0 : 4}px)\`, opacity: show ? 1 : 0, pointerEvents: "none",\n      background: "#141414", color: "#fff", fontSize: 12.5, padding: "6px 10px", borderRadius: 7,\n      transition: "all .22s cubic-bezier(.22,1,.36,1)" }}>{label}</span></span>);\n}`,
  },
  "dropdown-menu": {
    "html-css": `<div class="wrap" id="w"><button onclick="document.getElementById('w').classList.toggle('open')">文件操作 ▾</button>\n<div class="menu"><div class="mi">重命名</div><div class="mi">复制一份</div><div class="sep"></div><div class="mi">导出为图片</div></div></div>\n<style>\n.wrap { position: relative; display: inline-block; }\n.menu { position: absolute; left: 50%; top: calc(100% + 8px); transform: translateX(-50%) translateY(5px);\n  background: #fff; border: 1px solid #E3E0D8; border-radius: 12px; box-shadow: 0 14px 32px rgba(20,20,20,.12);\n  padding: 5px; width: 180px; opacity: 0; pointer-events: none; transition: all .2s cubic-bezier(.22,1,.36,1); }\n.wrap.open .menu { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }\n.mi { padding: 8px 11px; border-radius: 8px; cursor: pointer; } .mi:hover { background: #F1EEE8; }\n.sep { height: 1px; background: #E3E0D8; margin: 5px 4px; }\n</style>`,
    tailwind: `<!-- 展开状态用 group 或 JS 切类；静态结构示意： -->\n<div class="relative inline-block"><button class="rounded-full bg-neutral-900 px-4 py-2 text-white">文件操作 ▾</button>\n<div class="absolute left-1/2 top-[calc(100%+8px)] w-[180px] -translate-x-1/2 rounded-xl border border-[#E3E0D8] bg-white p-[5px] shadow-[0_14px_32px_rgba(20,20,20,.12)]"><div class="cursor-pointer rounded-lg px-[11px] py-2 hover:bg-[#F1EEE8]">重命名</div>…</div></div>`,
    react: `export function Menu({ items }) {\n  const [open, setOpen] = React.useState(false);\n  return (<div style={{ position: "relative", display: "inline-block" }}>\n    <button onClick={() => setOpen(!open)}>文件操作 ▾</button>\n    {open && (<div style={{ position: "absolute", left: "50%", top: "calc(100% + 8px)", transform: "translateX(-50%)",\n      background: "#fff", border: "1px solid #E3E0D8", borderRadius: 12, boxShadow: "0 14px 32px rgba(20,20,20,.12)", padding: 5, width: 180 }}>\n      {items.map((t, i) => <div key={i} style={{ padding: "8px 11px", borderRadius: 8, cursor: "pointer" }}>{t}</div>)}\n    </div>)}</div>);\n}\n/* 生产环境建议用 Radix DropdownMenu 等无样式原语处理键盘与焦点 */`,
  },
  "accordion": {
    "html-css": `<details open><summary>这个站收费吗？</summary><div class="a">核心资源库永久免费。</div></details>\n<style>\ndetails { border-bottom: 1px solid #d8d5cd; }\nsummary { list-style: none; cursor: pointer; padding: 13px 2px; font-weight: 600;\n  display: flex; justify-content: space-between; align-items: center; }\nsummary::-webkit-details-marker { display: none; }\nsummary::after { content: "+"; font-size: 17px; color: #8A8781; transition: transform .25s; }\ndetails[open ] summary::after { transform: rotate(45deg); }\n.a { padding: 0 2px 14px; color: #55534e; line-height: 1.7; }\n</style>\n<!-- 原生 details/summary：零 JS、自带键盘可达 -->`,
    tailwind: `<details class="border-b border-[#d8d5cd]" open><summary class="flex cursor-pointer list-none items-center justify-between py-[13px] font-semibold [&::-webkit-details-marker]:hidden">问题<span class="text-neutral-400">+</span></summary><div class="pb-[14px] leading-relaxed text-neutral-500">答案</div></details>`,
    react: `export function Faq({ q, a, defaultOpen }) {\n  return (<details open={defaultOpen} style={{ borderBottom: "1px solid #d8d5cd" }}>\n    <summary style={{ listStyle: "none", cursor: "pointer", padding: "13px 2px", fontWeight: 600 }}>{q}</summary>\n    <div style={{ padding: "0 2px 14px", color: "#55534e", lineHeight: 1.7 }}>{a}</div>\n  </details>);\n}`,
  },
  "sliding-tabs": {
    "html-css": `<div class="bar" id="bar"><button class="t on">概览</button><button class="t">数据</button><span class="ink" id="ink"></span></div>\n<script>\nconst bar = document.getElementById('bar'), ink = document.getElementById('ink');\nfunction move(el) { ink.style.left = el.offsetLeft + 'px'; ink.style.width = el.offsetWidth + 'px'; }\nbar.querySelectorAll('.t').forEach(b => b.onclick = () => {\n  bar.querySelector('.on').classList.remove('on'); b.classList.add('on'); move(b); });\nmove(bar.querySelector('.on'));\n</script>\n<style>\n.bar { position: relative; display: flex; gap: 26px; }\n.t { padding: 8px 2px; color: #8A8781; background: none; border: none; cursor: pointer; font-size: 15px; }\n.t.on { color: #141414; font-weight: 700; }\n.ink { position: absolute; bottom: 0; height: 2.5px; background: #141414; border-radius: 99px;\n  transition: all .4s cubic-bezier(.22,1,.36,1); }\n</style>`,
    tailwind: `<!-- 墨条的位置由 JS 测量 offsetLeft/offsetWidth 后写 style（同 html-css 档脚本）；类名： -->\n<div class="relative flex gap-[26px]"><button class="px-0.5 py-2 font-bold text-neutral-900">概览</button><span class="absolute bottom-0 h-[2.5px] rounded-full bg-neutral-900 transition-all duration-300"></span></div>`,
    react: `export function SlidingTabs({ tabs }) {\n  const [cur, setCur] = React.useState(0);\n  const barRef = React.useRef(null), inkRef = React.useRef(null);\n  const move = (el) => { if (el && inkRef.current) { inkRef.current.style.left = el.offsetLeft + "px"; inkRef.current.style.width = el.offsetWidth + "px"; } };\n  React.useEffect(() => { move(barRef.current?.querySelectorAll("button")[cur]); }, [cur]);\n  return (<div ref={barRef} style={{ position: "relative", display: "flex", gap: 26 }}>\n    {tabs.map((t, i) => (<button key={i} onClick={() => setCur(i)} style={{ padding: "8px 2px", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: i === cur ? "#141414" : "#8A8781", fontWeight: i === cur ? 700 : 400 }}>{t}</button>))}\n    <span ref={inkRef} style={{ position: "absolute", bottom: 0, height: 2.5, background: "#141414", borderRadius: 99, transition: "all .4s cubic-bezier(.22,1,.36,1)" }} />\n  </div>);\n}`,
  },
  "image-zoom": {
    "html-css": `<div class="frame"><div class="img"></div></div>\n<style>\n.frame { width: 340px; height: 230px; border-radius: 14px; overflow: hidden; position: relative; }\n.img { position: absolute; inset: 0; background: url(你的图片) center/cover;\n  transition: transform .6s cubic-bezier(.22,1,.36,1); }\n.frame:hover .img { transform: scale(1.14); }\n</style>`,
    tailwind: `<div class="group h-[230px] w-[340px] overflow-hidden rounded-[14px]"><div class="h-full w-full bg-cover bg-center transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.14]" style="background-image:url(你的图片)"></div></div>`,
    react: `export function ZoomImage({ src }) {\n  return (<div style={{ width: 340, height: 230, borderRadius: 14, overflow: "hidden", position: "relative" }}>\n    <div style={{ position: "absolute", inset: 0, background: \`url(\${src}) center/cover\`, transition: "transform .6s cubic-bezier(.22,1,.36,1)" }}\n      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.14)"}\n      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />\n  </div>);\n}\n/* 更推荐纯 CSS :hover（见 html-css 档），React 里也可用 group-hover */`,
  },
  "card-lift": {
    "html-css": `<div class="card">…</div>\n<style>\n.card { background: #fff; border: 1px solid #E3E0D8; border-radius: 14px; padding: 20px;\n  transition: all .35s cubic-bezier(.22,1,.36,1); }\n.card:hover { transform: translateY(-5px); box-shadow: 0 16px 30px rgba(20,20,20,.13); border-color: #C7C3BA; }\n</style>`,
    tailwind: `<div class="rounded-[14px] border border-[#E3E0D8] bg-white p-5 transition-all duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-[5px] hover:border-[#C7C3BA] hover:shadow-[0_16px_30px_rgba(20,20,20,.13)]">…</div>`,
    react: `export function LiftCard({ children }) {\n  return <div className="lift-card">{children}\n    <style>{\`.lift-card{background:#fff;border:1px solid #E3E0D8;border-radius:14px;padding:20px;transition:all .35s cubic-bezier(.22,1,.36,1)}\n    .lift-card:hover{transform:translateY(-5px);box-shadow:0 16px 30px rgba(20,20,20,.13);border-color:#C7C3BA}\`}</style></div>;\n}`,
  },
  "button-press": {
    "html-css": `<button class="press">按我试试</button>\n<style>\n.press { background: #141414; color: #fff; border: none; padding: 12px 24px; border-radius: 999px;\n  font-weight: 600; box-shadow: 0 4px 0 #000; transition: all .12s; cursor: pointer; }\n.press:active { transform: translateY(3px); box-shadow: 0 1px 0 #000; }\n/* 反馈必须在 100ms 量级发生，transition 别超过 .15s */\n</style>`,
    tailwind: `<button class="rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white shadow-[0_4px_0_#000] transition-all duration-100 active:translate-y-[3px] active:shadow-[0_1px_0_#000]">按我试试</button>`,
    react: `export function PressButton({ children, onClick }) {\n  return (<button onClick={onClick} className="press-btn">{children}\n    <style>{\`.press-btn{background:#141414;color:#fff;border:none;padding:12px 24px;border-radius:999px;font-weight:600;box-shadow:0 4px 0 #000;transition:all .12s;cursor:pointer}\n    .press-btn:active{transform:translateY(3px);box-shadow:0 1px 0 #000}\`}</style></button>);\n}`,
  },
  "striped-progress": {
    "html-css": `<div class="track"><div class="fill"></div></div>\n<style>\n.track { height: 15px; border-radius: 99px; background: #E3E0D8; overflow: hidden; }\n.fill { height: 100%; width: 64%; border-radius: 99px;\n  background: repeating-linear-gradient(45deg, #141414 0 10px, #3c3a34 10px 20px);\n  background-size: 28px 100%; animation: stripes 1.1s linear infinite; }\n@keyframes stripes { to { background-position: 28px 0; } }\n</style>`,
    tailwind: `<div class="h-[15px] overflow-hidden rounded-full bg-[#E3E0D8]"><div class="h-full w-[64%] animate-[stripes_1.1s_linear_infinite] rounded-full bg-[repeating-linear-gradient(45deg,#141414_0_10px,#3c3a34_10px_20px)] [background-size:28px_100%]"></div></div>\n<!-- tailwind.config 补 keyframes stripes: { to: { backgroundPosition: '28px 0' } } -->`,
    react: `export function StripedProgress({ value = 64 }) {\n  return (<div style={{ height: 15, borderRadius: 99, background: "#E3E0D8", overflow: "hidden" }}>\n    <div style={{ height: "100%", width: value + "%", borderRadius: 99,\n      background: "repeating-linear-gradient(45deg,#141414 0 10px,#3c3a34 10px 20px)", backgroundSize: "28px 100%",\n      animation: "stripes 1.1s linear infinite" }} />\n    <style>{\`@keyframes stripes{to{background-position:28px 0}}\`}</style></div>);\n}`,
  },
  "focus-ring": {
    "html-css": `<button>主要按钮</button>\n<style>\n/* 只去掉鼠标点的焦点，不要把键盘焦点一起杀掉 */\n:focus { outline: none; }\n:focus-visible {\n  outline: 2.5px solid #141414;\n  outline-offset: 3px;\n}\n/* 品牌色项目把 #141414 换成你的主色；深色底上用浅色环 */\n</style>`,
    tailwind: `<button class="focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-neutral-900">主要按钮</button>`,
    react: `/* React 无需特殊处理：全局 CSS 里写好 :focus-visible 规则即可（同 html-css 档）。\n   切记不要为了「好看」全局 outline: none 又不给键盘用户补环。 */`,
  },
  "text-shimmer": {
    "html-css": `<span class="shimmer-text">正在为你生成…</span>\n<style>\n.shimmer-text {\n  font-weight: 800;\n  background: linear-gradient(100deg, #6d6b64 40%, #f5f3ee 50%, #6d6b64 60%);\n  background-size: 220% 100%;\n  -webkit-background-clip: text; background-clip: text; color: transparent;\n  animation: text-shimmer 2.6s linear infinite;\n}\n@keyframes text-shimmer { to { background-position: -220% 0; } }\n</style>`,
    tailwind: `<span class="animate-[text-shimmer_2.6s_linear_infinite] bg-[linear-gradient(100deg,#6d6b64_40%,#f5f3ee_50%,#6d6b64_60%)] bg-[length:220%_100%] bg-clip-text font-extrabold text-transparent">正在为你生成…</span>\n<!-- tailwind.config 补 keyframes: text-shimmer: { to: { backgroundPosition: '-220% 0' } } -->`,
    react: `export function ShimmerText({ children }) {\n  return (<span className="shimmer-text">{children}\n    <style>{\`.shimmer-text{font-weight:800;background:linear-gradient(100deg,#6d6b64 40%,#f5f3ee 50%,#6d6b64 60%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ts 2.6s linear infinite}@keyframes ts{to{background-position:-220% 0}}\`}</style></span>);\n}`,
  },
};

export const effectDefaults = (def) => Object.fromEntries((def?.params || []).map((p) => [p.name, String(p.default)]));
export const sandboxDoc = base;
