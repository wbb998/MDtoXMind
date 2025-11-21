# MDtoXMind

English | [中文](README.md)

MDtoXMind is a desktop application built with Electron and React, designed to quickly convert Markdown files into XMind ZEN compatible mind maps.

Designed for macOS and compatible with Windows, it offers a clean graphical interface with drag-and-drop import, real-time preview, and automatic conversion of images and notes.

![App Screenshot](assets/screenshot.png)

## ✨ Key Features

- **Markdown Parsing**: Converts headings (H1-H6) to topics and lists to subtopics.
- **XMind ZEN Compatible**: Generates `.xmind` files fully compatible with the latest XMind software.
- **Image Support**:
  - ✅ Remote images (automatically downloaded and embedded).
  - ✅ Local images (automatically read and embedded).
- **Notes Support**: Paragraphs below headings are automatically converted to topic notes.
- **Privacy First**: All data processing is done locally; no data is uploaded to any server.
- **Maintenance Free**: Provided as a standalone package, no development environment setup required.

## � Get & Install (Beginner's Guide)

Due to GitHub's file size limit (>100MB), we may not be able to host the latest binary releases directly. We **strongly recommend** building the app yourself following these simple steps. It only takes 5 minutes!

### 🛠️ Easy Build Steps

1.  **Prepare Environment**:
    *   Visit [Node.js Official Website](https://nodejs.org/) and install the "LTS" version.
2.  **Download Code**:
    *   Click the green **Code** button at the top right of this page and select **Download ZIP**.
    *   Unzip the downloaded file.
3.  **Build It**:
    *   **For Mac**:
        1.  Open the **Terminal** app.
        2.  Type `cd ` (with a space), then drag the unzipped folder into the terminal window, and press Enter.
        3.  Type `npm install` and press Enter. Wait for it to finish.
        4.  Type `npm run dist` and press Enter.
    *   **For Windows**:
        1.  Open the unzipped folder.
        2.  Type `cmd` in the address bar and press Enter.
        3.  Type `npm install` and press Enter.
        4.  Type `npm run dist` and press Enter.
4.  **Get the App**:
    *   Once finished, open the `release` folder in the project directory.
    *   **Mac**: Double-click `MDtoXMind-x.x.x.dmg` to install.
    *   **Windows**: Double-click `MDtoXMind-x.x.x.exe` to install.

## 📖 User Guide

1. **Launch**: Open MDtoXMind.
2. **Import**:
   - Type or paste Markdown text directly into the left editor.
   - Or drag and drop a `.md` file into the application window.
3. **Preview**: The right pane will show the mind map structure in real-time.
4. **Export**: Click the "Export XMind" button in the top right corner to save the `.xmind` file.
5. **Open**: Use XMind software to open the generated file for further editing.

## 🛠️ Local Development

If you want to contribute or build it yourself, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm

### Install Dependencies
```bash
git clone https://github.com/yourusername/MDtoXMind.git
cd MDtoXMind
npm install
```

### Start Development Server
```bash
npm run dev
```
This command starts both the Vite development server and the Electron app window.

### Build Installer

**Build for macOS (.dmg)**:
```bash
npm run dist
```
The artifacts will be in the `release/` directory.

**Build for Windows (.exe)**:
Run on a Windows machine or configure CI/CD:
```bash
npm run dist
```

## 🏗️ Tech Stack

- **Core**: [Electron](https://www.electronjs.org/)
- **UI**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Parser**: [Remark](https://github.com/remarkjs/remark)
- **Generator**: [JSZip](https://stuk.github.io/jszip/)

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
