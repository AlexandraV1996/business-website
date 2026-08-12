# Vanguard Strategy & Business Consulting Platform

A modern, high-end enterprise business and consultation web platform built with **standalone Vanilla HTML5, CSS3, and JavaScript**. Zero build steps, bundlers, or Node.js dependencies required.

---

## 🌟 Key Features

1. **Executive Luxury Design System**:
   - Obsidian dark glassmorphism theme (`#070a12`, `#0f1523`).
   - Radiant metallic gold accents (`#f59e0b`), emerald metrics badges (`#10b981`), and Google Fonts (*Outfit* & *Inter*).
   - Responsive layout designed for Desktop, Tablet, and Mobile screens.

2. **Interactive Business Advisory Tools**:
   - **Growth & ROI Calculator**: Real-time sliders adjusting annual revenue, growth rate, workforce size, and industry sector to project ARR increases, annual savings, efficiency boosts, and custom retainer recommendations.
   - **Business Readiness Audit Quiz**: 4-step interactive diagnostic quiz with real-time score gauge counter evaluating strategy, automation, margin resilience, and leadership alignment.
   - **Consultation Booking System**: Interactive booking modal with date & time selection, service detail modals, and toast notification alerts.

3. **Integrated "Market Growth Runner" Arcade Game**:
   - Canvas-based endless runner game embedded directly in `#game-section`.
   - **Controls**: `Space`, `Up Arrow`, `W`, or On-Screen Mobile Touch Jump button (supports Double Jump).
   - **Hazards**: Market Recession 📉, Regulatory Red Tape 🚧, Customer Churn 🔥, Inflation Spikes ⚡.
   - **Boosts & Collectibles**: Seed Capital ($), Top Talent (★), Strategic Partnerships (◆), and Innovation Shields (🛡).
   - **Audio & High Scores**: Web Audio API synthesized sound effects with mute toggle, pause button, persistent high score via `localStorage`, and executive consulting advice on collision.

---

## 🚀 How to Run the Website

### Option 1: Direct Browser Opening (No Server Needed)
Simply open the `index.html` file in any modern web browser (Chrome, Safari, Firefox, Edge):
- **Mac**: Double-click `index.html` or run `open index.html` in terminal.
- **Windows**: Double-click `index.html` in File Explorer.

### Option 2: Local HTTP Server (Recommended)
You can serve the directory using Python or any static file server:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using npx serve
npx serve .
```

Then open `http://localhost:8080/` in your browser.

---

## 📁 File Structure

```
bussiness_website/
├── index.html         # Main standalone HTML layout
├── README.md          # Usage instructions & documentation
├── css/
│   └── style.css      # Dark glassmorphism design system & responsive CSS
└── js/
    ├── main.js        # Main bootstrap & navbar scroll handlers
    ├── calculator.js  # Interactive ROI Calculator logic
    ├── audit.js       # Business Readiness Quiz logic
    ├── booking.js     # Booking modal & toast notifications
    └── game.js        # Canvas Market Growth Runner game engine
```

---

## 🎮 Arcade Game Controls

| Action | Keyboard | Touch / Mobile |
| :--- | :--- | :--- |
| **Jump / Double Jump** | `Space`, `ArrowUp`, `W` | Tap Canvas or press **JUMP** Button |
| **Pause / Resume** | Click Pause Icon ⏸ | Click Pause Icon ⏸ |
| **Mute / Unmute Sound** | Click Volume Icon 🔊 | Click Volume Icon 🔊 |

---

## 📄 License
© 2026 Vanguard Strategy & Business Consulting LLC. All rights reserved.
