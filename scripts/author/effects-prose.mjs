// 30 个效果的双语名称/一句话说明/白话拆解（## 它是怎么工作的）
// 由 scripts/gen-effects-content.mjs 消费，生成 content/effects/*.md 与对应的提示词文件。
export const EFFECT_PROSE = {
  "glassmorphism": {
    zh: { name: "毛玻璃拟态", desc: "半透明面板 + 背景模糊，像一块磨砂玻璃浮在画面上", how: "核心就一句 CSS：`backdrop-filter: blur()` 把面板背后的画面实时磨糊，再叠一层半透明白压出玻璃的亮边。模糊半径决定「磨砂程度」，透明度决定「玻璃厚度」。注意两点：背景必须有内容可糊（纯色背景上看不出效果）；低端安卓机上大面积 backdrop-filter 会掉帧，面积要克制。" },
    en: { name: "Glassmorphism", desc: "A translucent panel with backdrop blur — frosted glass floating over the scene", how: "One CSS line does the work: `backdrop-filter: blur()` frosts whatever sits behind the panel in real time, and a translucent white fill adds the glassy sheen. Blur radius sets the frost level; opacity sets the glass thickness. Two caveats: the background needs actual content to frost (a flat color shows nothing), and large backdrop-filter areas can drop frames on low-end Android — keep the area modest." },
  },
  "neumorphism": {
    zh: { name: "新拟态", desc: "元素像从背景里「挤」出来一样，一道亮影一道暗影塑造体积", how: "新拟态不画边框：同一块背景色上，同时投一道向左上的白色高光影和一道向右下的深色影，眼睛就读出了「凸起」。按下去时把外影换成内影（inset），就像真的被压进材料里。代价是对比度天然偏低——文字和关键状态不能只靠它区分，无障碍上要另加手段。" },
    en: { name: "Neumorphism", desc: "Elements look extruded from the background — one light shadow, one dark shadow", how: "Neumorphism draws no borders: on the same background color, a white highlight shadow up-left plus a darker shadow down-right makes the eye read volume. Pressed states swap outer shadows for inset ones, as if pushed into the material. The cost is inherently low contrast — never let text or critical states rely on it alone; add another accessibility cue." },
  },
  "spotlight-card": {
    zh: { name: "聚光灯卡片", desc: "一团光跟着鼠标在卡片上走，照到哪亮到哪", how: "卡片上盖一层径向渐变光斑，JS 把鼠标坐标写进两个 CSS 变量（--mx / --my），渐变中心跟着变量走。光斑用 `pointer-events: none` 不挡点击。用 requestAnimationFrame 或直接写变量都行，关键是别在 mousemove 里做重排。" },
    en: { name: "Spotlight Card", desc: "A pool of light follows the cursor across the card", how: "A radial-gradient layer sits over the card; JS writes the cursor coordinates into two CSS variables (--mx / --my) and the gradient center follows. The layer uses `pointer-events: none` so it never blocks clicks. Keep the mousemove handler free of layout work." },
  },
  "tilt-card": {
    zh: { name: "3D 倾斜卡片", desc: "卡片随鼠标方向微微倾斜，像拿在手里的一张实体卡", how: "把鼠标在卡片内的相对位置换算成 rotateX / rotateY 角度（一般不超过 10 度），父级给 `perspective` 才有纵深。离开时把角度归零并让 CSS 过渡慢慢回正。倾斜角度一大就廉价且晕——克制是这个效果的全部手艺。" },
    en: { name: "3D Tilt Card", desc: "The card tilts toward the cursor, like a physical card in your hand", how: "Convert the cursor's relative position inside the card into rotateX / rotateY angles (keep them under ~10 degrees); the parent needs `perspective` for depth. On leave, reset the angles and let a CSS transition ease it back. Big angles look cheap and cause motion sickness — restraint is the whole craft here." },
  },
  "marquee": {
    zh: { name: "无缝跑马灯", desc: "一排内容匀速横滚，首尾相接看不出断点", how: "秘诀是内容复制两份并排，轨道动画平移 -50% 后瞬间归位——因为后半段和前半段长得一模一样，跳回去也看不出来。速度用「每份内容的宽度 ÷ 期望时长」算，别写死。鼠标悬停暂停是基本礼貌；重要信息不要只放在跑马灯里。" },
    en: { name: "Seamless Marquee", desc: "A row of content scrolls forever with no visible seam", how: "Duplicate the content twice side by side, animate the track to -50%, then snap back — the second half looks identical to the first, so the jump is invisible. Compute duration from one copy's width instead of hardcoding it. Pause on hover is basic courtesy, and never put critical information only in a marquee." },
  },
  "shimmer-skeleton": {
    zh: { name: "骨架屏微光", desc: "数据没到之前，用灰块占位，一道微光循环扫过", how: "骨架块就是和真实内容同尺寸的灰色圆角块；微光是一条斜向的白色渐变伪元素，从左扫到右无限循环。骨架的价值在布局稳定：内容到了不跳版。它只适合「结构已知、内容未知」的加载，超过 1 秒还没数据就该考虑空状态或错误提示了。" },
    en: { name: "Shimmer Skeleton", desc: "Gray blocks hold the layout while data loads, swept by a passing sheen", how: "Skeleton blocks are gray rounded rectangles sized exactly like the real content; the sheen is a diagonal white-gradient pseudo-element sweeping left to right forever. The value is layout stability — no jump when content lands. It only suits 'structure known, content unknown' loading; past ~1s, think empty or error states instead." },
  },
  "entrance-motion": {
    zh: { name: "入场动效", desc: "一组元素逐个淡入上浮，像排队进场", how: "每个元素从「透明 + 偏移 20 多像素」动到原位，相邻元素延迟几十毫秒，就成了队列感。曲线选 ease-out-expo 最稳妥：快起慢停，眼睛觉得利落。延迟别超过每个 120ms、总数别超过 8 个，否则用户会觉得页面在「表演」而不是在「响应」。" },
    en: { name: "Entrance Motion", desc: "A group of elements fades and rises in, one after another, like a queue", how: "Each element animates from transparent + ~24px offset to its resting place, staggered by a few dozen milliseconds — that delay is what creates the queue feel. Ease-out-expo is the safest curve: fast start, gentle landing. Keep per-item delay under ~120ms and total items under ~8, or the page feels like it's performing instead of responding." },
  },
  "animated-counter": {
    zh: { name: "数字滚动计数", desc: "数字从 0 滚到目标值，先快后慢稳稳停住", how: "用 requestAnimationFrame 按进度取缓动值，把「已过时间 ÷ 总时长」喂给 easeOutCubic 再乘目标值。数字字体记得开 tabular-nums（等宽数字），否则滚动时整行会左右抖。计数只用在「数字本身是主角」的统计场景，别给每个小数字都加。" },
    en: { name: "Animated Counter", desc: "Numbers roll from 0 to the target, fast then slow, landing softly", how: "Drive it with requestAnimationFrame: feed elapsed/duration through easeOutCubic and multiply by the target. Turn on tabular-nums (monospaced figures) or the line will jitter as digits change width. Reserve counters for stats where the number is the hero — not every small figure deserves one." },
  },
  "gradient-border": {
    zh: { name: "流光边框", desc: "一圈渐变光沿着边框缓慢旋转，专为重点内容准备", how: "用 conic-gradient 画一个旋转的锥形渐变，再用 mask 把中间镂空只剩边框一圈。旋转靠 @property 注册的 --a 角度变量做动画（现代浏览器支持）。不支持 @property 的浏览器会看到一圈静态渐变边框——优雅降级，不算坏。" },
    en: { name: "Gradient Border", desc: "A ring of gradient light slowly orbits the border — reserved for hero content", how: "Draw a rotating conic-gradient, then mask out the middle so only a border ring remains. Rotation animates a @property-registered angle variable --a (supported in modern browsers). Browsers without @property see a static gradient border — graceful degradation, not breakage." },
  },
  "mesh-gradient": {
    zh: { name: "网格渐变背景", desc: "几团柔光色块互相交融，缓慢漂移的高级感背景", how: "几团大色块各自定位、加一个大 blur 滤镜，边缘就融化在一起了；再让每团以不同速度微微漂移，背景就像活的一样。性能提示：blur 半径越大越吃 GPU，漂移用 transform 实现，别动 left/top。本站版本只用灰阶演示，换品牌色时记得压暗饱和度。" },
    en: { name: "Mesh Gradient", desc: "Soft blobs of color melt into each other and drift slowly — a premium background", how: "Position several large color blobs, give each a heavy blur filter, and their edges melt together; drift each at a different speed with transform and the background feels alive. Performance note: large blur radii are GPU-hungry; animate transform only, never left/top. This site's demo stays grayscale — if you swap in brand colors, keep saturation low." },
  },
  "noise-texture": {
    zh: { name: "噪点质感", desc: "给大色块盖一层极细的噪点，去掉「塑料感」", how: "用 SVG 的 feTurbulence 滤镜生成一张噪点图，透明度压到 0.1 上下平铺在背景上。大脑会把这层颗粒读成「材质」，扁平色立刻有了纸感。噪点太粗或太浓会显脏——slope（强度）宁小勿大，而且它应该是若有似无的那一层。" },
    en: { name: "Noise Texture", desc: "A whisper of grain over flat color kills the plastic look", how: "Generate a noise tile with SVG's feTurbulence filter, keep its alpha around 0.1, and tile it over the background. The brain reads grain as material, so flat color suddenly feels like paper. Too coarse or too strong looks dirty — keep the intensity low; the layer should be barely there." },
  },
  "dot-grid-bg": {
    zh: { name: "点阵背景", desc: "等距小圆点铺满背景，像方格纸一样的隐形坐标系", how: "一行 radial-gradient 就能画：一个小圆点 + 透明，background-size 决定间距，平铺即成。点阵的妙处是「有秩序但不抢戏」，设计工具和开发者向产品特别爱用它。点的颜色比背景深一档就够，别更深。" },
    en: { name: "Dot Grid Background", desc: "Evenly spaced dots tile the background — graph paper for the eye", how: "One radial-gradient does it: a small dot plus transparency, tiled at a background-size interval. Dot grids feel ordered without stealing attention, which is why design tools and dev products love them. Make dots just one shade darker than the background — no more." },
  },
  "grid-lines-bg": {
    zh: { name: "网格线背景", desc: "两组淡线交叉成蓝图网格，科技感的经典垫底", how: "两个 linear-gradient（横线、竖线）叠加平铺，线宽 1px、间距 24–32px。想要「蓝图感」可以把线色压得非常淡，再在中心加一团径向高光。注意内容区的对比度：网格只是垫底，正文永远优先。" },
    en: { name: "Grid Lines Background", desc: "Two sets of faint lines cross into a blueprint grid — the classic tech backdrop", how: "Stack two linear-gradients (horizontal and vertical lines), 1px wide at 24–32px intervals. For a blueprint feel keep lines very faint and add a soft radial highlight at the center. Watch content contrast: the grid is a backdrop, body text always wins." },
  },
  "avatar-stack": {
    zh: { name: "头像堆叠", desc: "一排头像互相压住一部分，一眼看出「很多人参与」", how: "每个头像负 margin 向左压住前一个，再用一圈与背景同色的描边把重叠处「切」开。最后一个位置留给「+N」计数。悬停时让单个头像上浮，能顺手解决「压在一起看不清」的问题。头像记得给 alt 或 aria-label，别让屏幕阅读器只读出一堆图片。" },
    en: { name: "Avatar Stack", desc: "Avatars overlap in a row — instant 'lots of people here' signal", how: "Each avatar uses a negative left margin to tuck under the previous one, and a border in the background color 'cuts' the overlap cleanly. The last slot is a '+N' count. Lifting an avatar on hover helps when faces get crowded. Give avatars alt text or aria-labels so screen readers don't just announce a pile of images." },
  },
  "pulsing-badge": {
    zh: { name: "呼吸徽标", desc: "小圆点一圈圈向外扩散波纹，专表「正在进行」", how: "一个实心圆点，加一个伪元素圆环：圆环从 0.5 倍放大到 1.3 倍的同时淡出，循环播放就是波纹。Tailwind 的 animate-ping 就是现成实现。它只适合真正的实时状态（直播、录制中、定位中），滥用会变成视觉噪音。" },
    en: { name: "Pulsing Badge", desc: "A dot ripples outward in rings — the universal 'live right now' signal", how: "A solid dot plus a pseudo-element ring: the ring scales from 0.5× to 1.3× while fading out, looped. Tailwind's animate-ping is this exact effect built in. Reserve it for genuinely live states (streaming, recording, locating) — overuse turns it into visual noise." },
  },
  "progress-ring": {
    zh: { name: "环形进度", desc: "一圈 SVG 弧线画出完成度，中心放百分比", how: "SVG 圆的周长是 2πr，用 stroke-dasharray 把整圈分成「一段实线 + 空缺」，调 dashoffset 就能控制画出多少。动画时让 offset 从满值动到目标值即可。圆角端点（stroke-linecap: round）会让弧线显得柔和，是细节分。" },
    en: { name: "Progress Ring", desc: "An SVG arc draws completion around a centered percentage", how: "An SVG circle's circumference is 2πr; stroke-dasharray splits it into dash + gap, and stroke-dashoffset controls how much is drawn. Animate the offset from full to target. Rounded line caps soften the arc ends — a small detail that reads as polish." },
  },
  "steps-indicator": {
    zh: { name: "步骤指示器", desc: "圆点 + 连线画出流程进度：已完成打勾，当前步高亮", how: "结构是「圆点—连线—圆点」交替排列。三种状态必须一眼可分：完成（实心 + 对勾）、当前（描边高亮）、未到（灰）。连线跟随前一步的状态变色。步骤超过 5 个时，移动端建议改成「第 2 步 / 共 5 步 + 进度条」的紧凑形态。" },
    en: { name: "Steps Indicator", desc: "Dots and connectors show flow progress: done gets a check, current gets the highlight", how: "The structure alternates dot—line—dot. Three states must read at a glance: done (filled + check), current (outlined highlight), upcoming (gray). Connectors take the color of the step before them. Beyond ~5 steps, switch mobile to a compact 'Step 2 of 5 + progress bar' form." },
  },
  "custom-toggle": {
    zh: { name: "自定义开关", desc: "轨道 + 滑块的开关，滑块滑过去就是「开」", how: "本质是一个 role=\"switch\" 的按钮：轨道是圆角长条，滑块是绝对定位的小圆，开状态时 left 从一头变到另一头配过渡。用 aria-checked 表达状态，屏幕阅读器才能读对。滑块要有阴影才看得出是「浮在轨道上」的可动件。" },
    en: { name: "Custom Toggle", desc: "A track and a thumb — slide means on", how: "At its core it's a button with role=\"switch\": a pill track, an absolutely-positioned round thumb, and a left transition between ends. Use aria-checked for state so screen readers announce it correctly. A subtle shadow on the thumb sells it as a movable piece floating on the track." },
  },
  "custom-range": {
    zh: { name: "自定义滑杆", desc: "给原生 range 换上品牌样式：填充轨道 + 圆形滑块", how: "原生 input[type=range] 能用但难看。WebKit 要写 ::-webkit-slider-thumb 和轨道伪元素，填充进度靠一个 CSS 变量或 range-progress（Firefox）。滑块热区至少 24px——看得见的部分可以小，点得中的范围不能小，这是费茨定律的现场应用。" },
    en: { name: "Custom Range Slider", desc: "Restyle the native range input: filled track + round thumb", how: "Native input[type=range] works but looks dated. WebKit needs ::-webkit-slider-thumb and track pseudo-elements; the filled portion comes from a CSS variable (or Firefox's range-progress). Keep the hit area at least 24px — the visible thumb can be small, the tappable area cannot. Fitts's Law, applied." },
  },
  "custom-checkbox": {
    zh: { name: "自定义多选框", desc: "藏起原生方框，换一个圆角方形 + 勾的自有样式", how: "套路是「真 input 隐身 + 假方框替身」：label 包住 sr-only 的 input 和一个 span 方框，用 :checked + 相邻选择器给方框上色打勾。关键是别把 input 用 display:none 删掉——键盘焦点和表单语义都靠它，焦点样式画在替身 span 上。" },
    en: { name: "Custom Checkbox", desc: "Hide the native box, show your own rounded square + check", how: "The pattern is 'real input goes invisible, fake box performs': a label wraps an sr-only input and a span box; :checked with the sibling selector fills the box and shows the check. Never display:none the input — keyboard focus and form semantics depend on it; draw the focus style on the stand-in span." },
  },
  "tooltip": {
    zh: { name: "气泡提示", desc: "悬停或聚焦时在元素上方浮出一句小字解释", how: "一个相对定位的触发元素 + 绝对定位的小气泡，默认 opacity 0，:hover 和 :focus 时淡入并微微上移，再加一个小三角指向触发点。三个规矩：提示里不放必须点的东西、不放长文本、移动端点按要有替代（很多场景干脆把解释写进正文）。" },
    en: { name: "Tooltip", desc: "A small caption floats above an element on hover or focus", how: "A relatively-positioned trigger plus an absolutely-positioned bubble: opacity 0 by default, fading in with a slight rise on :hover and :focus, with a small triangle pointing back. Three rules: nothing clickable inside, no long text, and on touch devices provide an alternative — often the explanation belongs in the body copy anyway." },
  },
  "dropdown-menu": {
    zh: { name: "下拉菜单", desc: "点开一列操作项，带分组分隔线和滑入动画", how: "触发按钮 + 绝对定位的菜单面板，打开时从 opacity 0 + 下移 5px 过渡进来。菜单项 hover 给浅底色，组与组之间用 1px 分隔线。生产代码要处理：点外部关闭、Esc 关闭、方向键导航、焦点回收——手写很容易漏，建议用 Radix 这类无样式原语打底。" },
    en: { name: "Dropdown Menu", desc: "A panel of actions opens with grouping separators and a slide-in", how: "A trigger button plus an absolutely-positioned panel that transitions from opacity 0 + 5px down. Items get a soft hover background; groups split with a 1px separator. Production menus must handle outside-click close, Esc, arrow-key navigation, and focus return — easy to miss by hand, so build on an unstyled primitive like Radix." },
  },
  "accordion": {
    zh: { name: "手风琴折叠", desc: "问答一条条收起，点标题展开答案——原生 details 零 JS", how: "HTML 自带 details/summary 元素：点击展开、自带键盘可达、零 JavaScript。要做的只有样式：去掉默认小三角，换成一个会旋转 45° 变成 × 的加号。需要「同时只开一个」时给 details 加同一个 name 属性（现代浏览器支持）。" },
    en: { name: "Accordion", desc: "Q&A rows collapse and expand — native details, zero JS", how: "HTML's details/summary elements expand on click, are keyboard-accessible, and need no JavaScript. Styling is all that's left: remove the default marker and use a plus that rotates 45° into an ×. For 'only one open at a time', give the details elements the same name attribute (modern browsers support it)." },
  },
  "sliding-tabs": {
    zh: { name: "滑动标签页", desc: "标签下的一条墨线滑到当前标签，像墨水在流动", how: "墨线是绝对定位的小条，切换时 JS 量一下目标标签的 offsetLeft 和 offsetWidth 写给它，CSS 过渡负责「滑」。字体加载会改变文字宽度，记得在字体就绪和窗口 resize 时重新量一次。用 transform 的版本性能更好，但量位置这件事躲不掉。" },
    en: { name: "Sliding Tabs", desc: "An ink bar under the tabs glides to the active one", how: "The ink bar is an absolutely-positioned strip; on switch, JS measures the target tab's offsetLeft and offsetWidth and writes them over, while a CSS transition does the gliding. Font loading changes text widths — re-measure on font readiness and window resize. A transform-based version performs better, but measuring is unavoidable either way." },
  },
  "image-zoom": {
    zh: { name: "图片悬停放大", desc: "鼠标放上图片，画面在框里慢慢推近", how: "外层框 overflow: hidden 裁住，内层图片 hover 时 scale 到 1.1 左右，配一个 0.5 秒级的 ease-out 过渡，就是「推近镜头」的感觉。放大幅度别超过 1.2，图片分辨率要留余量，不然放大后糊给你看。触屏没有 hover，这个效果在移动端自动缺席——别把关键信息藏在放大里。" },
    en: { name: "Image Hover Zoom", desc: "Hover an image and the scene slowly pushes in, inside its frame", how: "The outer frame clips with overflow: hidden; the inner image scales to ~1.1 on hover with a ~0.5s ease-out transition — that reads as a camera push-in. Don't exceed ~1.2×, and keep resolution headroom or the zoom reveals blur. Touch has no hover, so this effect is absent on mobile — never hide key information inside the zoom." },
  },
  "card-lift": {
    zh: { name: "卡片悬停上浮", desc: "鼠标一放上去，卡片抬起几像素、影子变深", how: "三件套一起动：translateY 上抬 4–6px、box-shadow 变大变柔、边框颜色加深一档，过渡 300ms 左右。它在用物理世界的隐喻说话——「被拿起来的东西就是可以拿的」。整页都是可点卡片时会失效，因为没有「没被拿起」的对照了。" },
    en: { name: "Card Hover Lift", desc: "Hover raises the card a few pixels and deepens its shadow", how: "Three things move together: translateY up 4–6px, a larger softer box-shadow, and a one-step darker border, over ~300ms. It speaks in physical metaphor — 'the thing being picked up is the thing you can take'. If every card on the page lifts, the signal dies: there's no resting state to contrast with." },
  },
  "button-press": {
    zh: { name: "按钮按压感", desc: ":active 时按钮沉下去 3 像素，底影同步变薄", how: "给按钮一条 4px 的实底边阴影装作「厚度」，:active 时 translateY 沉 3px、阴影收到 1px——眼睛立刻读成「按进去了」。要点是快：过渡 100ms 量级，拖泥带水就假了。没有实体厚度的扁平按钮，则用 scale(.97) 的微缩替代。" },
    en: { name: "Button Press Feel", desc: "On :active the button sinks 3px and its bottom shadow thins with it", how: "Give the button a 4px solid bottom shadow as fake 'thickness'; on :active, translateY down 3px and shrink the shadow to 1px — the eye instantly reads 'pressed in'. Speed is the point: transitions around 100ms; sluggish feels fake. For flat buttons without thickness, a scale(.97) micro-shrink is the substitute." },
  },
  "striped-progress": {
    zh: { name: "条纹进度条", desc: "斜条纹在填充段里持续流动，一看就知道「还在干活」", how: "填充段的背景是 repeating-linear-gradient 的 45° 斜纹，动画只动 background-position，条纹就像传送带一样走起来。它和普通进度条的分工：确定进度用平滑填充，不确定或想强调「进行中」时上条纹。条纹流动方向要和进度增长方向一致，反了会很别扭。" },
    en: { name: "Striped Progress", desc: "Diagonal stripes keep flowing inside the fill — 'still working' at a glance", how: "The fill's background is a 45° repeating-linear-gradient; animating background-position makes the stripes run like a conveyor. Division of labor: smooth fills for determinate progress, stripes for indeterminate or 'actively processing' states. Stripe flow must match the fill's growth direction — reversed looks wrong immediately." },
  },
  "focus-ring": {
    zh: { name: "焦点环", desc: "键盘 Tab 走到哪，哪里亮起一圈描边——无障碍的底线", how: "秘诀在 :focus-visible：浏览器只在键盘（等非指针）操作时匹配它，鼠标点击不出现。做法是先 :focus { outline: none } 去掉默认，再给 :focus-visible 画一圈 2–3px 的描边 + 2–3px 偏移。颜色要在任何背景上都看得见；深色 UI 里记得换浅色环。这条效果删了 outline 又不补环，就是亲手把键盘用户关在门外。" },
    en: { name: "Focus Ring", desc: "Wherever Tab lands, a ring lights up — the accessibility baseline", how: "The trick is :focus-visible: browsers match it for keyboard (non-pointer) interaction only, not mouse clicks. Remove the default with :focus { outline: none }, then draw a 2–3px outline plus 2–3px offset on :focus-visible. The color must read on any background — swap to a light ring in dark UIs. Removing outlines without restoring a ring locks keyboard users out." },
  },
  "text-shimmer": {
    zh: { name: "文字微光", desc: "一道亮光扫过文字本身，常见于「AI 正在生成」的提示", how: "还是 background-clip: text 那套：一段三站渐变（暗—亮—暗）铺在文字上，background-size 放大到 220%，动画滚动 background-position，亮带就扫过去了。它是「状态文字」的效果，别用在标题或正文上——会读不清，也显得廉价。" },
    en: { name: "Text Shimmer", desc: "A band of light sweeps across the text itself — the 'AI is generating' cue", how: "Same background-clip: text trick: a three-stop gradient (dim—bright—dim) sized to 220%, with background-position animated so the bright band sweeps through. It's a status-text effect — never for headings or body copy, where it hurts readability and looks cheap." },
  },
};
