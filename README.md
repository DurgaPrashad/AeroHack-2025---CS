# 🧩 Rubik's Cube 3D Visualizer

An interactive, web-based 3D Rubik's Cube application built with React and Three.js that provides visual explanations, AI-powered solving assistance, and supports multiple cube sizes (2×2, 3×3, 4×4).

![Rubik's Cube Visualizer](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=3D+Rubik%27s+Cube+Visualizer)

## 🧩 Problem Statement

Learning to solve a Rubik's Cube can be challenging and intimidating for beginners. Traditional resources often lack:
- **Interactive visualization** of move sequences
- **Step-by-step explanations** with visual feedback
- **Multiple cube sizes** in one platform
- **AI-powered assistance** for solving guidance
- **Modern, accessible interface** for all skill levels

## 💡 Solution Overview

This application addresses these challenges by providing:

✅ **Interactive 3D Visualization** - Real-time cube manipulation with mouse/touch controls  
✅ **Multiple Cube Sizes** - Support for 2×2, 3×3, and 4×4 cubes  
✅ **Move Notation System** - Standard Rubik's cube notation (R, U, F, etc.)  
✅ **AI-Powered Analysis** - Gemini AI integration for move sequence analysis  
✅ **Beginner Mode** - Step-by-step explanations with visual cues  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Self-Contained** - No external API dependencies for core functionality  

## ⚙️ How the Project Works

### 🏗️ Application Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Main navigation with responsive menu
│   ├── RubiksCube.tsx          # 3D cube rendering with Three.js
│   ├── CubeControls.tsx        # Input controls and cube configuration
│   ├── CubeStats.tsx           # Timer and performance tracking
│   ├── MoveExplanator.tsx      # AI-powered move analysis
│   └── ui/                     # Reusable UI components
├── pages/
│   ├── Index.tsx               # Main application page
│   └── NotFound.tsx           # 404 error page
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
└── index.css                  # Design system & themes
```

### 🎯 Core Features

#### 3D Cube Rendering
- **Three.js Integration**: Realistic 3D cube with proper lighting and shadows
- **Mouse/Touch Controls**: Orbit controls for rotation and zoom
- **Multiple Sizes**: Dynamic cube generation for 2×2, 3×3, and 4×4
- **Standard Colors**: Authentic Rubik's cube color scheme

#### Move System
- **Notation Support**: Standard cube notation (R, L, U, D, F, B with ', 2 modifiers)
- **Animation**: Smooth layer rotations with realistic physics
- **Step-by-Step Mode**: Navigate through move sequences one step at a time
- **Visual Feedback**: Face highlighting and color coding

#### AI Integration
```javascript
const apiKey = "api";
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }]
  })
});
```

#### User Flows

1. **Learning Path**:
   - Select cube size (2×2, 3×3, 4×4)
   - Enable beginner mode for detailed explanations
   - Input move sequences or use example algorithms
   - Step through moves with visual explanations

2. **Practice Mode**:
   - Use scramble function to randomize cube
   - Time your solves with built-in timer
   - Track move count and performance metrics
   - Get AI analysis of your solving patterns

3. **Advanced Features**:
   - Auto-rotation for presentation mode
   - Keyboard shortcuts for common moves
   - Save and share move sequences
   - Performance analytics and improvement tips

## 💻 Installation & Local Setup

### Prerequisites
- Node.js 16+ and npm
- Modern browser with WebGL support

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/rubiks-cube-visualizer.git
cd rubiks-cube-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

Create a `.env.local` file for local development:
```bash
# Optional: Add your own Gemini API key
VITE_GEMINI_API_KEY=your_api_key_here
```

## 🎨 Design & UI Notes

### Design System
- **Dark Theme**: Modern dark interface with vibrant cube colors
- **Color Palette**: 
  - Primary: `hsl(220, 100%, 60%)` (Blue)
  - Accent: `hsl(45, 100%, 55%)` (Yellow)
  - Cube Colors: Authentic red, orange, yellow, green, blue, white
- **Typography**: Clean, modern font stack optimized for readability
- **Animations**: Smooth transitions and cube rotations using CSS and Three.js

### Responsive Design
- **Mobile-First**: Optimized for touch devices
- **Breakpoints**: 
  - Mobile: `< 768px`
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px`
- **Accessibility**: WCAG 2.1 compliant with proper contrast ratios

### UI Components
- **Glass Morphism**: Translucent cards with backdrop blur
- **Interactive Elements**: Hover states and smooth transitions
- **Color-Coded Feedback**: Visual cues for different cube faces
- **Progress Indicators**: Step tracking and completion status

## 📈 Why This Project Is Useful

### Educational Value
- **Visual Learning**: Complex 3D movements explained step-by-step
- **Multiple Skill Levels**: From beginner tutorials to advanced algorithms
- **Pattern Recognition**: AI helps identify common solving patterns

### Practical Applications
- **Speedcubing Training**: Timer and performance tracking
- **Algorithm Practice**: Test and perfect solving sequences
- **Teaching Tool**: Ideal for educators and cube clubs

### Technical Innovation
- **Modern Web Technologies**: Showcases advanced React and Three.js integration
- **AI Integration**: Demonstrates practical use of generative AI
- **Progressive Enhancement**: Works offline after initial load

### Community Impact
- **Open Source**: Free and accessible to everyone
- **Learning Resource**: Reduces barrier to entry for cube solving
- **Skill Development**: Helps users progress from beginner to advanced

## 🔮 Next Steps

### Short Term (v1.1)
- [ ] **Keyboard Shortcuts** - Add hotkeys for common moves (R, U, F, etc.)
- [ ] **Save Sequences** - Local storage for favorite algorithms
- [ ] **Sound Effects** - Audio feedback for moves and completions
- [ ] **Tutorial Mode** - Guided step-by-step solving lessons

### Medium Term (v1.2)
- [ ] **Algorithm Library** - Pre-built collection of popular algorithms
- [ ] **Competition Timer** - WCA-compliant timing system
- [ ] **Share Features** - Generate links to share scrambles and solutions
- [ ] **Custom Themes** - User-selectable color schemes and themes

### Long Term (v2.0)
- [ ] **Backend Integration** - User accounts and progress tracking
- [ ] **Multiplayer Mode** - Real-time cube battles and competitions
- [ ] **VR Support** - Virtual reality cube manipulation
- [ ] **Advanced AI** - Computer vision for physical cube recognition

### Performance & Quality
- [ ] **Performance Optimization** - Reduce bundle size and improve load times
- [ ] **Test Coverage** - Comprehensive unit and integration tests
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **Accessibility Audit** - Full WCAG 2.1 AA compliance

### Community Features
- [ ] **User Profiles** - Personal statistics and achievements
- [ ] **Social Sharing** - Share solves on social media
- [ ] **Community Challenges** - Weekly solving challenges
- [ ] **Leaderboards** - Global and local rankings

## 🛠️ Technical Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React 18 + TypeScript | Component architecture & type safety |
| **3D Rendering** | Three.js + React Three Fiber | 3D cube visualization |
| **Styling** | Tailwind CSS + CSS Variables | Design system & responsive layout |
| **UI Components** | shadcn/ui + Radix UI | Accessible component library |
| **AI Integration** | Google Gemini API | Move analysis & solving assistance |
| **State Management** | React Hooks | Local state management |
| **Build Tool** | Vite | Fast development & optimized builds |
| **Deployment** | Vercel/Netlify | Static site hosting |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines
1. **Code Style**: ESLint + Prettier configuration
2. **Commits**: Conventional commit messages
3. **Testing**: Add tests for new features
4. **Documentation**: Update README for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For excellent 3D rendering capabilities
- **React Three Fiber** - For seamless React + Three.js integration
- **Google Gemini** - For AI-powered move analysis
- **Speedcubing Community** - For algorithms and solving methods
- **Rubik's Brand** - For the iconic puzzle that inspired this project

---

<div align="center">

**Made with ❤️ for the cubing community**

[Live Demo](https://your-demo-url.com) • [Report Bug](https://github.com/your-username/rubiks-cube-visualizer/issues) • [Request Feature](https://github.com/your-username/rubiks-cube-visualizer/issues)

</div>#
