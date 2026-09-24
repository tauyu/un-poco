# Un Poco · 西班牙语沉浸式分级精读与文化漫游 🇪🇸

<p align="center">
  <img src="./public/icon-192.png" alt="Un Poco Logo" width="96" height="96" style="border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <b>Poco a poco, se va lejos. 一步一步，行稳致远。</b><br>
  面向外语自学者的零后端、离线优先（Offline-First）、地中海美学风格分级阅读与听说训练 Progressive Web App (PWA)。
</p>

<p align="center">
  <a href="https://un-poco.pages.dev/"><img src="https://img.shields.io/badge/Live_Demo-un--poco.pages.dev-0ea5e9?style=flat-square&logo=cloudflarepages&logoColor=white" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Version-1.0.0-emerald?style=flat-square" alt="Version 1.0.0" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Platform-iOS_%7C_Android_%7C_Web-orange?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/Zero_Cost-100%25_Serverless-purple?style=flat-square" alt="Zero Server" />
</p>

---

## 🌟 核心特性 (Key Features)

### 1. 🗺️ 文化叙事漫游与路线大地图 (Narrative Journey)
* **4 大精选西语文化路线**：
  * **马德里市井生活 (A1-A2)**：从太阳门广场到清晨市集的美食与日常对话；
  * **高迪与加泰罗尼亚建筑梦 (B1)**：漫步圣家堂与巴特罗之家的艺术狂想；
  * **安达卢西亚的阳光与诗 (B1-B2)**：塞维利亚弗拉门戈与阿尔罕布拉宫的千年低语；
  * **北方朝圣之路 (B2-C1)**：徒步圣地亚哥·德孔波斯特拉的历史探索。
* **沉浸式视觉交互**：手绘风格路线全景地图、关卡节点式探索进度与精美插画卡片。

### 2. 🎧 三维一体听说伴读系统 (3-Tier Audio Modes)
根据认知语言学与刻意练习理论，提供三种无缝切换的听说训练模式：
* **磨耳朵 (Blind Listening)**：原文智能模糊遮罩，先听音频激活大脑听觉语音回路，再点击逐行偷看原文，彻底攻克“看得懂但听不懂”的痛点；
* **原声伴读 (Read-Along)**：逐句声文同步高亮，支持 `0.75x`、`1.0x`、`1.25x` 多档微调自适应语速，配备独立双语翻译开关；
* **零 Token 影子跟读 (Zero-Cost Shadowing)**：利用浏览器原生 Web Speech API 进行实时语音转写，通过 **Levenshtein 编辑距离算法** 计算发音准确度得分，获得即时口语纠音反馈，**完全不消耗任何付费云端 AI Token**。

### 3. 🔍 智能词态还原与上下文优先词卡 (Context-First Lexical Engine)
* **动词变位智能解析**：正文内所有西语单词均可点触，自动识别曲折变位形式（如 `hablaba`、`diciendo`、`fuimos`）并一键反查原形动词与时态人称；
* **重构 3 级视觉对齐词卡**：
  * **状态栏**：原形/变位微标签与轻巧关闭按钮；
  * **主词区**：30px 西语加粗衬线字体，词性标签严格居中对齐；
  * **发音工具条**：音标居左，右侧整合成一体化发音语速胶囊；
* **严格学习场景优先**：词典释义 ➔ **当前上下文 (故事原句)** ➔ **典型例句 (可发音)** ➔ **收藏生词本** ➔ 底部辅助拓展（SpanishDict / DeepL）；
* **自定义释义支持**：遇到未收录生僻词可就地手动添加中文解释，保存即自动归档入库，附带「自填」专属徽章。

### 4. 📚 闭环生词与回顾管理 (Interactive Drill-Down Review)
* **已学单词总库抽屉**：
  * 支持 `全部` / `学习中` / `已掌握` 三态即时筛选；
  * 拼写与释义实时模糊检索；
  * **「重新拎出来学」**：已掌握但遗忘的单词，一键重置回“学习中”复习轮转池；
  * **就地编辑释义**：生词卡支持直接编辑修改笔记。
* **已学课文回顾抽屉**：沉淀历史阅读课文，支持一键无缝直达跳转回精读页面温故知新，或一键重置课文进度；
* **句子摘抄本**：收集地道西语修辞与名言，一键复制与复习。

### 5. 📱 移动优先与离线 PWA (Progressive Web App)
* **iOS 严苛规范适配**：配置符合苹果规范的非透明高分辨率 `apple-touch-icon.png`（解决添加到主屏幕图标变黑或与页面 Logo 不一致的问题）；
* **全屏 App 沉浸体验**：在 Safari / Chrome 中选择「添加到主屏幕」即可移除浏览器地址栏，享受原生 App 般的流畅滑动体验；
* **离线无网可用**：内置 Service Worker（Cache-First）缓存机制，在飞机、高铁或弱网环境下依然能随时打开阅读。

### 6. 🛡️ 数据自主权与零后端架构 (Zero-Backend Sovereignty)
* **100% 纯客户端运行**：无需注册账号、无需搭建数据库服务器，用户隐私与学习记录完全存放在手机本地（LocalStorage + IndexedDB）；
* **完整备份与恢复**：支持一键导出包含单词库、句子库与阅读进度的 `.json` 备份文件，换手机也能轻松恢复；
* **Anki 生词卡导出**：支持一键导出标准 `.txt` (TSV) 格式，可直接批量导入 Anki 开展艾宾浩斯遗忘曲线复习。

---

## 🛠️ 技术栈 (Tech Stack)

* **核心框架**：[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **构建工具**：[Vite](https://vite.dev/)
* **样式系统**：[Tailwind CSS](https://tailwindcss.com/)（安达卢西亚暖阳与巴特罗青碧地中海定制配色）
* **图标库**：[Lucide React](https://lucide.dev/)
* **语音与评测**：Browser Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
* **部署平台**：[Cloudflare Pages](https://pages.cloudflare.com/) 边缘网络

---

## 🚀 本地开发与构建 (Getting Started)

```bash
# 1. 克隆代码仓库
git clone https://github.com/tauyu/un-poco.git
cd un-poco

# 2. 安装依赖
npm install

# 3. 启动本地开发热更新服务器
npm run dev

# 4. 构建生产环境静态资源
npm run build
```

---

## 🧩 多语种扩展技能 (Skill Extension)

Un Poco 的整体软件架构、教学设计与交互模式已被抽象归纳为标准的开发技能：
* 技能路径：[`.agents/skills/language-learning-pwa`](.agents/skills/language-learning-pwa/SKILL.md)
* 可直接作为模版蓝图，用于在几天内快速复刻构建**法语、德语、意大利语、日语、俄语**等其他小语种的分级精读应用。

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 开源许可证。欢迎自由学习、拓展或二次开发！
