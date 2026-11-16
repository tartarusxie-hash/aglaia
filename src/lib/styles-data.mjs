// 39 艺术风格共享数据：资源库轮播 + /styles/ 索引页共用。
// 由 scripts/extract-styles-data.mjs 从 src/pages/styles/*.astro 提取生成；
// 分类按艺术流派调研报告的五章，顺序按报告内顺序。改数据请改源页面文件后重跑脚本。
export const STYLE_CATEGORIES = [
  { key: "all", zh: "总览", en: "All" },
  { key: "early", zh: "19世纪末 · 20世纪初", en: "Late 19th – Early 20th Century" },
  { key: "modern", zh: "20世纪上半叶", en: "First Half of the 20th Century" },
  { key: "postwar", zh: "20世纪中后期", en: "Mid-to-Late 20th Century" },
  { key: "digital", zh: "数字时代", en: "Digital Era" },
  { key: "east", zh: "非西方美学", en: "Beyond the West" },
];

export const STYLES = [
  {
    "id": "impressionism",
    "category": "early",
    "nameZh": "印象派",
    "nameEn": "Impressionism",
    "years": "约 1860 年代—1886 年",
    "origin": "法国巴黎",
    "definition": "19 世纪法国画派，户外写生捕捉瞬间光色，以破碎笔触与纯色并置作画。",
    "heroTone": "light"
  },
  {
    "id": "post-impressionism",
    "category": "early",
    "nameZh": "后印象派",
    "nameEn": "Post-Impressionism",
    "years": "约 1886–1905 年",
    "origin": "法国",
    "definition": "1886–1905 年法国画派，继承印象派的亮色，却以结构、情感与象征超越光学表象。",
    "heroTone": "dark"
  },
  {
    "id": "arts-and-crafts",
    "category": "early",
    "nameZh": "工艺美术运动",
    "nameEn": "Arts and Crafts Movement",
    "years": "约 1860 年代—1910 年代",
    "origin": "英国",
    "definition": "19 世纪英国设计运动，反对工业量产的粗制滥造，主张手工艺、诚实材料与美用合一。",
    "heroTone": "light"
  },
  {
    "id": "art-nouveau",
    "category": "early",
    "nameZh": "新艺术运动",
    "nameEn": "Art Nouveau",
    "years": "约 1890–1910",
    "origin": "比利时布鲁塞尔、法国巴黎",
    "definition": "新艺术运动是约1890–1910年的欧洲装饰艺术运动，以自然曲线统一一切设计。",
    "heroTone": "dark"
  },
  {
    "id": "fauvism",
    "category": "early",
    "nameZh": "野兽派",
    "nameEn": "Fauvism",
    "years": "约 1904/1905–1908 年",
    "origin": "法国",
    "definition": "1905 年横空出世的法国先锋派，用管装纯色直接表达情感，天空可以是橙色，脸可以是绿色。",
    "heroTone": "dark"
  },
  {
    "id": "expressionism",
    "category": "early",
    "nameZh": "表现主义",
    "nameEn": "Expressionism",
    "years": "约 1905–1925 年",
    "origin": "德国（德累斯顿、慕尼黑）",
    "definition": "20 世纪初德国画派，画内心的感受而非外在世界，以扭曲造型与非自然色彩表现焦虑与孤独。",
    "heroTone": "dark"
  },
  {
    "id": "cubism",
    "category": "modern",
    "nameZh": "立体主义",
    "nameEn": "Cubism",
    "years": "约 1907–1914 年",
    "origin": "法国巴黎",
    "definition": "立体主义把物体拆解为几何切面，在同一画面中并置多个视角，抛弃了单点透视。",
    "heroTone": "light"
  },
  {
    "id": "futurism",
    "category": "modern",
    "nameZh": "未来主义",
    "nameEn": "Futurism",
    "years": "1909–1916 年（英雄期）",
    "origin": "意大利米兰",
    "definition": "未来主义是 1909 年意大利先锋运动，崇拜速度与机器，用斜线与重复形体画动感。",
    "heroTone": "dark"
  },
  {
    "id": "dadaism",
    "category": "modern",
    "nameZh": "达达主义",
    "nameEn": "Dadaism",
    "years": "约 1916–1924 年",
    "origin": "瑞士苏黎世",
    "definition": "达达主义是 1916 年苏黎世的反艺术运动，用拼贴、现成品与荒诞回应一战的荒谬。",
    "heroTone": "light"
  },
  {
    "id": "surrealism",
    "category": "modern",
    "nameZh": "超现实主义",
    "nameEn": "Surrealism",
    "years": "1924–1960 年代",
    "origin": "法国巴黎",
    "definition": "超现实主义（1924–1960 年代）以梦境与无意识为原料，把不可能的场景画得逼真。",
    "heroTone": "dark"
  },
  {
    "id": "suprematism",
    "category": "modern",
    "nameZh": "至上主义",
    "nameEn": "Suprematism",
    "years": "约 1915–1920 年代",
    "origin": "俄国（彼得格勒、莫斯科、维捷布斯克）",
    "definition": "至上主义是 1915 年马列维奇创立的俄国抽象运动，绘画归零，只剩下纯粹感觉——方块、圆、十字漂浮在白底上。",
    "heroTone": "light"
  },
  {
    "id": "constructivism",
    "category": "modern",
    "nameZh": "构成主义",
    "nameEn": "Constructivism",
    "years": "约 1913/1921–1930 年代",
    "origin": "俄国（莫斯科、彼得格勒）",
    "definition": "构成主义是 1910–1920 年代俄国的实用抽象运动，艺术不再表现感觉，而是建设新世界：海报、建筑、摄影、剧场设计。",
    "heroTone": "light"
  },
  {
    "id": "de-stijl",
    "category": "modern",
    "nameZh": "风格派",
    "nameEn": "De Stijl",
    "years": "1917–1931",
    "origin": "荷兰莱顿",
    "definition": "风格派是荷兰艺术运动（1917–1931），只用三原色、黑白灰与横竖直线，追求普遍和谐。",
    "heroTone": "light"
  },
  {
    "id": "bauhaus",
    "category": "modern",
    "nameZh": "包豪斯",
    "nameEn": "Bauhaus",
    "years": "1919–1933",
    "origin": "德国魏玛 / 德绍 / 柏林",
    "definition": "包豪斯是一所德国设计学校（1919–1933），它把艺术、手工艺与工业技术合而为一，确立了现代设计的基本语法——形式追随功能。",
    "heroTone": "dark"
  },
  {
    "id": "wiener-werkstatte",
    "category": "modern",
    "nameZh": "维也纳工坊",
    "nameEn": "Wiener Werkstätte",
    "years": "1903–1932 年",
    "origin": "奥地利维也纳",
    "definition": "维也纳工坊（1903–1932）让美术与应用艺术平起平坐，为日常生活制造艺术品。",
    "heroTone": "light"
  },
  {
    "id": "art-deco",
    "category": "modern",
    "nameZh": "装饰艺术",
    "nameEn": "Art Deco",
    "years": "约 1910 年代–1930 年代",
    "origin": "法国巴黎",
    "definition": "装饰艺术是 1920 年代巴黎的装饰风格：几何纹样、黑金配色，把现代主义变奢华时尚。",
    "heroTone": "dark"
  },
  {
    "id": "abstract-expressionism",
    "category": "postwar",
    "nameZh": "抽象表现主义",
    "nameEn": "Abstract Expressionism",
    "years": "约 1943–1960 年代",
    "origin": "美国纽约",
    "definition": "抽象表现主义是 1940 年代末兴起于纽约的美国画派，以巨幅即兴的抽象画面直接表达情感。",
    "heroTone": "dark"
  },
  {
    "id": "pop-art",
    "category": "postwar",
    "nameZh": "波普艺术",
    "nameEn": "Pop Art",
    "years": "约 1950 年代中期–1970 年代初",
    "origin": "英国伦敦、美国纽约",
    "definition": "波普艺术把广告、漫画、包装与名人形象搬进美术馆，模糊高雅与通俗的界限。",
    "heroTone": "dark"
  },
  {
    "id": "minimalism",
    "category": "postwar",
    "nameZh": "极简主义",
    "nameEn": "Minimalism",
    "years": "约 1960 年代初–1970 年代",
    "origin": "美国纽约",
    "definition": "极简主义是 1960 年代纽约的艺术：工业材料与几何形呈现物本身，不象征、不叙事。",
    "heroTone": "light"
  },
  {
    "id": "op-art",
    "category": "postwar",
    "nameZh": "欧普艺术",
    "nameEn": "Op Art",
    "years": "约 1955/1960 年代—1970 年代",
    "origin": "巴黎、伦敦、布宜诺斯艾利斯，1965 年于纽约汇合",
    "definition": "欧普艺术是以精确几何图案与色彩并置制造视觉幻觉的艺术，静止画面中呈现运动、振动与深度。",
    "heroTone": "light"
  },
  {
    "id": "photorealism",
    "category": "postwar",
    "nameZh": "照片写实主义",
    "nameEn": "Photorealism",
    "years": "约 1960 年代末—1970 年代",
    "origin": "美国（纽约、加利福尼亚）",
    "definition": "照片写实主义是以照片为对象、用绘画复制照片的流派，巨幅呈现反光表面与城市街景。",
    "heroTone": "light"
  },
  {
    "id": "swiss-style",
    "category": "postwar",
    "nameZh": "瑞士风格",
    "nameEn": "Swiss Style",
    "years": "约 1950–1970 年代",
    "origin": "瑞士苏黎世与巴塞尔",
    "definition": "瑞士风格是一套以数学网格、无衬线字体与客观摄影实现清晰传达的设计方法（约 1950–1970 年代，瑞士苏黎世与巴塞尔），它的信条是：清晰即诚实。",
    "heroTone": "light"
  },
  {
    "id": "brutalism",
    "category": "postwar",
    "nameZh": "网页粗野主义",
    "nameEn": "Brutalism",
    "years": "建筑约 1950 年代—1970 年代；网页约 2014 年至今",
    "origin": "建筑源于英国与勒·柯布西耶的法国实践；网页版源于 brutalistwebsites.com",
    "definition": "网页粗野主义暴露结构、拒绝装饰，以粗边框与默认字体诚实呈现内容。",
    "heroTone": "light"
  },
  {
    "id": "postmodernism",
    "category": "postwar",
    "nameZh": "后现代主义",
    "nameEn": "Postmodernism",
    "years": "约 1960 年代中期—1990 年代初",
    "origin": "美国与欧洲",
    "definition": "后现代主义是反抗现代主义教条的运动，主张复杂、矛盾、历史引用与幽默，\"少即是乏味\"。",
    "heroTone": "light"
  },
  {
    "id": "memphis",
    "category": "postwar",
    "nameZh": "孟菲斯",
    "nameEn": "Memphis",
    "years": "1981–1987/1988",
    "origin": "意大利米兰",
    "definition": "孟菲斯是 1981 年诞生于米兰的设计团体，用玩具般的色彩与形状狂欢向功能主义宣战。",
    "heroTone": "light"
  },
  {
    "id": "punk-diy",
    "category": "postwar",
    "nameZh": "朋克/DIY图形",
    "nameEn": "Punk / DIY Graphics",
    "years": "约 1975–1979 年",
    "origin": "英国伦敦",
    "definition": "朋克图形用剪贴与\"赎金信\"排版反抗体制：丑即武器，粗糙即诚实。",
    "heroTone": "dark"
  },
  {
    "id": "grunge",
    "category": "postwar",
    "nameZh": "垃圾摇滚设计",
    "nameEn": "Grunge Design",
    "years": "约 1989–1990 年代中",
    "origin": "美国（洛杉矶、西雅图）",
    "definition": "垃圾摇滚设计把朋克的混乱带进 1990 年代杂志：做旧字体、叠印、破碎网格，可读性让位于氛围与态度。",
    "heroTone": "dark"
  },
  {
    "id": "skeuomorphism",
    "category": "digital",
    "nameZh": "拟物化",
    "nameEn": "Skeuomorphism",
    "years": "约 1980 年代起源，高峰约 2007–2013 年",
    "origin": "美国（苹果 Aqua 界面、早期 iOS）",
    "definition": "拟物化让界面模仿真实物体——皮革、金属、纸张——用熟悉感教会用户怎么操作。",
    "heroTone": "light"
  },
  {
    "id": "flat-design",
    "category": "digital",
    "nameZh": "扁平化设计",
    "nameEn": "Flat Design",
    "years": "约 2010 年至今",
    "origin": "美国（微软、苹果）",
    "definition": "扁平化设计是以纯色块、简洁几何与干净字体，彻底去掉阴影、渐变与纹理的二维界面风格。",
    "heroTone": "light"
  },
  {
    "id": "neumorphism",
    "category": "digital",
    "nameZh": "新拟态",
    "nameEn": "Neumorphism",
    "years": "约 2019–2021 年",
    "origin": "线上设计社区（Dribbble）",
    "definition": "新拟态是\"软 UI\"：元素与背景同色，只靠一对明暗阴影挤出柔软的浮雕感。",
    "heroTone": "light"
  },
  {
    "id": "material-design",
    "category": "digital",
    "nameZh": "质感设计",
    "nameEn": "Material Design",
    "years": "2014 年—（Material 3 / Material You 2021 年—）",
    "origin": "谷歌",
    "definition": "界面是一叠有高度的\"纸片\"——海拔阴影定层级，涟漪动效回应触摸。",
    "heroTone": "light"
  },
  {
    "id": "glassmorphism",
    "category": "digital",
    "nameZh": "玻璃拟态",
    "nameEn": "Glassmorphism",
    "years": "约 2020 年—（Liquid Glass 2025 年）",
    "origin": "苹果与设计社区",
    "definition": "玻璃拟态是磨砂玻璃质感的界面风格：半透明面板悬浮在鲜艳背景上，背景模糊、细亮边框，轻盈、通透、有深度。",
    "heroTone": "dark"
  },
  {
    "id": "claymorphism",
    "category": "digital",
    "nameZh": "黏土拟态",
    "nameEn": "Claymorphism",
    "years": "约 2021 年—",
    "origin": "设计社区",
    "definition": "黏土拟态把界面元素吹胀成圆润的 3D 黏土——深外阴影 + 内阴影，色彩柔和饱满，是新拟态的\"友好继任者\"。",
    "heroTone": "light"
  },
  {
    "id": "y2k",
    "category": "digital",
    "nameZh": "Y2K 美学",
    "nameEn": "Y2K Aesthetic",
    "years": "约 1997–2004（2020 年代复兴）",
    "origin": "千禧年消费文化",
    "definition": "Y2K 美学是千禧年科技乐观主义的视觉化身：液态铬、半透明糖果塑料、全息渐变与星星闪光。",
    "heroTone": "dark"
  },
  {
    "id": "frutiger-aero",
    "category": "digital",
    "nameZh": "Frutiger Aero",
    "nameEn": "Frutiger Aero",
    "years": "约 2004–2013，2023 年复兴",
    "origin": "千禧年消费文化",
    "definition": "Frutiger Aero 是科技与自然和解的乐观主义——水滴、气泡、蓝天绿草与玻璃光泽。",
    "heroTone": "light"
  },
  {
    "id": "ukiyo-e",
    "category": "east",
    "nameZh": "浮世绘",
    "nameEn": "Ukiyo-e",
    "years": "江户时代 1603–1868",
    "origin": "日本江户（今东京）",
    "definition": "浮世绘是江户时代日本的木版画，以平涂色块与大胆构图描绘刹那繁华的都市生活。",
    "heroTone": "light"
  },
  {
    "id": "wabi-sabi",
    "category": "east",
    "nameZh": "侘寂",
    "nameEn": "Wabi-sabi",
    "years": "16 世纪成型，至今仍为活的审美传统",
    "origin": "日本京都（茶道）",
    "definition": "侘寂是日本茶道与禅宗的美学：在不完美、无常与质朴中见美，欣赏时间留下的痕迹。",
    "heroTone": "light"
  },
  {
    "id": "mingei",
    "category": "east",
    "nameZh": "民艺",
    "nameEn": "Mingei",
    "years": "1926 年正式启动，至今仍有民艺馆与民艺协会延续",
    "origin": "日本（京都、东京）",
    "definition": "民艺是 1920 年代日本的民间工艺运动，主张无名工匠日常器物的\"用之美\"。",
    "heroTone": "light"
  },
  {
    "id": "chinese-landscape",
    "category": "east",
    "nameZh": "中国水墨山水与宋式美学",
    "nameEn": "Chinese Ink Landscape & Song Aesthetics",
    "years": "晚唐成科，宋代（960–1279 年）为高峰，元明清延续至今",
    "origin": "中国（北宋开封、南宋杭州）",
    "definition": "中国水墨山水以水墨写山川心境，宋式美学以含蓄克制为尚，留白即云雾。",
    "heroTone": "light"
  }
];
