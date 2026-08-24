# 🐍 Snake Game

> A classic Snake game with advanced features, mobile touch controls, and responsive design built with HTML, CSS, and JavaScript.


---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎮 **Keyboard Controls** | Arrow keys or WASD to move |
| 📱 **Mobile Touch Controls** | D-Pad for mobile devices |
| 🔊 **Sound Effects** | Real-time audio feedback using Web Audio API |
| 🎨 **4 Color Themes** | Neon, Dark, Light, Retro |
| 📐 **Grid Size** | Adjustable (15×15, 20×20, 25×25) |
| 🏃 **Speed Control** | Slow, Normal, Fast, Insane |
| 🧱 **Wall Modes** | Off, Static, Moving walls |
| 👀 **Snake Eyes** | Toggle eye display |
| 📏 **Grid Display** | Toggle grid visibility |
| 🏆 **High Score** | Automatically saved in browser |
| 💾 **Settings** | All preferences saved in localStorage |
| 📱 **Responsive** | Works on all screen sizes (Desktop, Tablet, Mobile) |

---

## 🎮 How to Play

1. Use **Arrow Keys** or **WASD** to control the snake (Desktop)
2. Use **D-Pad** buttons on mobile devices
3. Eat the red food to grow and earn points
4. Avoid hitting walls or your own tail
5. The game gets faster every 5 points!
6. Try to beat your high score!

### 🎯 Controls

| Key / Button | Action |
|--------------|--------|
| `↑` / `W` / `⬆️` (D-Pad) | Move Up |
| `↓` / `S` / `⬇️` (D-Pad) | Move Down |
| `←` / `A` / `⬅️` (D-Pad) | Move Left |
| `→` / `D` / `➡️` (D-Pad) | Move Right |
| `Enter` / `R` | Restart Game |
| `M` | Toggle Sound |

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, responsive design
- **Vanilla JavaScript** - No external libraries
- **Canvas API** - Game rendering
- **Web Audio API** - Sound effects
- **localStorage** - Save high score and settings
- **D-Pad** - Mobile touch controls with CSS Media Queries

---

## 📁 Project Structure

```
snake-game/
│
├── index.html              # Main HTML file
├── README.md               # Documentation
├── LICENSE                 # License file (All Rights Reserved)
├── .gitignore              # Git ignore rules
│
├── css/
│   ├── style.css           # Base styles
│   ├── theme.css           # Color themes
│   ├── responsive.css      # Media queries & mobile D-Pad
│   └── settings.css        # Settings panel styles
│
├── js/
│   ├── main.js             # Entry point
│   ├── game.js             # Game logic
│   ├── snake.js            # Snake management
│   ├── food.js             # Food management
│   ├── canvas.js           # Rendering engine
│   ├── controller.js       # Keyboard & D-Pad controls
│   ├── score.js            # Score tracking
│   ├── config.js           # Configuration
│   ├── sound.js            # Sound system
│   └── settings.js         # Settings management
│
└── assets/
    └── sounds/             # Sound files (optional)
```

---

## 🚀 Installation & Usage

### Option 1: Play Online
Visit the live demo:  
🔗 [https://sahandsaeidi.github.io/snake-game](https://sahandsaeidi.github.io/snake-game)


## 🎨 Theme Preview

| Theme | Description |
|-------|-------------|
| 💜 **Neon** | Cyberpunk style with glowing neon colors |
| 🌙 **Dark** | Minimal dark design for night gaming |
| ☀️ **Light** | Clean and bright interface |
| 🕹️ **Retro** | Classic arcade feel with retro colors |

---

## 🔧 Configuration

You can customize the game by modifying `js/config.js`:

```javascript
const CONFIG = {
    GRID_SIZE: 20,           // 15, 20, 25
    INITIAL_SPEED: 150,      // Milliseconds
    MIN_SPEED: 80,           // Fastest speed
    SPEED_STEP: 10,          // Speed increase per level
    SCORE_FOR_SPEED: 5,      // Points needed for speed up
    COLORS: {
        // Customize colors here
    }
};
```

---

## 📱 Responsive Design

| Device | Screen Size | Features |
|--------|-------------|----------|
| **Desktop** | > 1024px | Full experience, keyboard controls |
| **Tablet** | 768px - 1024px | Optimized layout, D-Pad appears |
| **Mobile** | < 768px | D-Pad controls, responsive canvas |

The game automatically detects mobile devices and shows/hides the D-Pad accordingly.

---

## 🧪 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully supported |
| Firefox | 88+ | ✅ Fully supported |
| Edge | 90+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Opera | 76+ | ✅ Fully supported |
| Mobile Chrome | 90+ | ✅ Fully supported |
| Mobile Safari | 14+ | ✅ Fully supported |

---

## 🤝 Contributing

This is a proprietary project under **All Rights Reserved** license, but feedback and suggestions are welcome!

For any inquiries, please contact via GitHub.

---

## 📝 License

**All Rights Reserved** - This project is proprietary software.

Copyright © 2024-2025 Sahand Saeidi. All rights reserved.

You may NOT:
- Copy or reproduce this code
- Modify or create derivative works
- Use for commercial purposes
- Remove copyright notices

For permission requests, please contact through GitHub.

See the LICENSE file for full details.

---

## 👨‍💻 Author

**Sahand Saeidi**
- GitHub: [@sahandsaeidi](https://github.com/sahandsaeidi)

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!  
It helps a lot and motivates me to build more!

---

## 🎯 Roadmap

- [x] Basic Snake game
- [x] 4 Color themes
- [x] Sound effects
- [x] Settings panel
- [x] High score tracking
- [x] Mobile D-Pad controls
- [x] Responsive design
- [x] All Rights Reserved license
- [ ] Power-ups (speed boost, shield, etc.)
- [ ] Multiplayer mode
- [ ] Achievements system
- [ ] Daily challenges
- [ ] Online leaderboard

---

## 🙏 Acknowledgements

- Inspired by the classic Nokia Snake game
- Sound effects generated with Web Audio API
- Built with vanilla JavaScript, no external libraries

---

**Made with ❤️ by Sahand Saeidi**

---

*Version: 1.0.0*  
