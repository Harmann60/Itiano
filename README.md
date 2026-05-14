<div align="center">
  <h1>🎹 Itiano - Virtual Piano Tutor</h1>
  <p>Learn to play piano songs by typing on your computer keyboard!</p>
  
  [![Three.js](https://img.shields.io/badge/Three.js-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
  [![Tone.js](https://img.shields.io/badge/Tone.js-black?logo=tone&logoColor=white)](https://tonejs.github.io/)
</div>

<br />

## 🌟 Introduction

**Itiano** is an interactive, web-based virtual piano application designed to function as a typing tutor for learning songs. By combining the gamified mechanics of a typing tutor (like Keybr or 10fastfingers) with a modern 3D piano interface, Itiano makes learning melodies accessible, engaging, and fun right from your browser—no physical piano required!

## ✨ Features

- **🎮 Interactive 3D Piano**: A beautiful, fully interactive 3D piano built with `@react-three/fiber` that highlights keys as you play.
- **🎵 Real-time Audio**: High-quality audio synthesis powered by `Tone.js` for zero-latency, realistic piano sounds.
- **🎹 Typing Tutor Mechanics**: Guides you through song sequences note-by-note. 
- **✅ Instant Feedback**: Correct keystrokes advance the song, while incorrect ones provide visual error feedback.
- **🎧 Multi-Input Support**: Play using your computer keyboard or by clicking the 3D keys with your mouse.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Audio Engine**: [Tone.js](https://tonejs.github.io/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harmann60/Itiano.git
   cd Itiano
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173/`

## ⌨️ Controls

Use your computer keyboard to play the piano!

- **White Keys**: Home Row (`A, S, D, F, G, H, J, K, L, ;`)
- **Black Keys**: Top Row (`W, E, T, Y, U, O, P`)

*Alternatively, you can use your mouse to click on the 3D keys directly!*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Harmann60/Itiano/issues) if you want to contribute.

<div align="center">
  <p>Made with ❤️ and code.</p>
</div>
