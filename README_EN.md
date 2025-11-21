# MDtoXMind

English | [中文](README.md)

MDtoXMind is a desktop application built with Electron and React, designed to quickly convert Markdown files into XMind ZEN compatible mind maps.

Designed for macOS and compatible with Windows, it offers a clean graphical interface with drag-and-drop import, real-time preview, and automatic conversion of images and notes.

![App Screenshot](https://via.placeholder.com/800x500?text=MDtoXMind+Screenshot)

## ✨ Key Features

- **Markdown Parsing**: Converts headings (H1-H6) to topics and lists to subtopics.
- **XMind ZEN Compatible**: Generates `.xmind` files fully compatible with the latest XMind software.
- **Image Support**:
  - ✅ Remote images (automatically downloaded and embedded).
  - ✅ Local images (automatically read and embedded).
- **Notes Support**: Paragraphs below headings are automatically converted to topic notes.
- **Privacy First**: All data processing is done locally; no data is uploaded to any server.
- **Maintenance Free**: Provided as a standalone package, no development environment setup required.

## 🚀 Download & Install

Please visit the [Releases](../../releases) page to download the latest installer.

- **macOS**: Download the `.dmg` file, double-click to open, and drag the app to your Applications folder.
- **Windows**: Download the `.exe` file to install (requires self-build or waiting for release).

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
