# MDtoXMind 项目结构说明

这是一个基于 **Electron + React + Vite** 的桌面应用程序项目。它的主要功能是将 Markdown 文件转换为 XMind 思维导图。

为了帮助你理解，本文档将项目结构分为几个主要部分来解释。

## 1. 核心代码目录 (你需要重点关注的地方)

### `src/` (前端与业务逻辑)
这是应用程序的"面子"和"大脑"。主要使用 React 编写。

- **`App.tsx`**: 应用程序的主界面组件。在这里可以找到左右分栏的布局代码（左边输入 Markdown，右边预览）。
- **`main.tsx`**: React 的入口文件，负责把 App 组件挂载到页面上。
- **`lib/`**: **这是项目的核心算法所在**。
    - `markdownParser.ts`: 负责读懂 Markdown 文本，把它解析成程序能理解的结构（树状结构）。
    - `xmindGenerator.ts`: 负责把解析好的结构打包成 `.xmind` 文件。
    - `types.ts`: 定义了数据结构（比如什么是"Topic"，什么是"MindMap"）。

### `electron/` (桌面应用外壳)
这是应用程序的"骨架"，负责和操作系统交互。

- **`main.ts`**: Electron 的主进程。它负责创建窗口、处理系统菜单、监听应用生命周期（启动、关闭）。
- **`preload.ts`**: 预加载脚本。它是连接 `src` (网页界面) 和 `electron` (系统底层) 的桥梁，为了安全起见，网页不能直接操作文件系统，需要通过这个文件暴露安全的接口。

## 2. 构建与输出目录 (程序自动生成的)

- **`dist/`**: 存放 `src` 目录编译后的前端代码（HTML, CSS, JS）。
- **`dist-electron/`**: 存放 `electron` 目录编译后的主进程代码。
- **`release/`**: 存放最终打包好的安装包（如 `.dmg` 或 `.exe` 文件）。当你运行打包命令后，发给用户的安装文件就在这里。

## 3. 配置文件 (项目的说明书)

- **`package.json`**: 项目的身份证。记录了项目叫什么、版本号、依赖了哪些第三方库（如 React, Electron, TailwindCSS），以及运行脚本（如 `npm run dev`）。
- **`vite.config.ts`**: 构建工具 Vite 的配置。告诉 Vite 如何编译 React 代码，以及如何处理 Electron 的相关配置。
- **`tailwind.config.js` & `postcss.config.js`**: 样式工具 TailwindCSS 的配置。控制界面的颜色、间距等设计规范。
- **`electron-builder.json5`**: 打包配置。告诉打包工具如何生成安装包（图标用哪个，App ID 是什么等）。
- **`tsconfig.json`**: TypeScript 的配置。告诉编译器如何检查代码错误。

## 4. 其他

- **`assets/`**: 存放静态资源，比如图片、图标等。
- **`index.html`**: 网页的入口文件。React 代码最终会注入到这个文件里的 `<div id="root"></div>` 中。

## 修改指南

如果你想修改：
*   **界面样式或布局**：请编辑 `src/App.tsx` 或 `src/index.css`。
*   **转换逻辑（比如解析规则）**：请编辑 `src/lib/` 下的文件。
*   **窗口大小、菜单栏**：请编辑 `electron/main.ts`。
