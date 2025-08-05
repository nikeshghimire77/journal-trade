# 🚀 Trading Journal - Advanced Trading Analysis Platform

A professional trading journal application with mind-blowing animations, real-time charts, and comprehensive trade tracking features.

## ✨ Features

- **📊 Real-time Trading Charts** - Animated price action with volume indicators
- **⭐ Twinkling Stars** - Beautiful star animations on the landing page
- **🎨 Neonic Theme** - Modern glass morphism design with neon effects
- **📈 Trade Tracking** - Comprehensive trade logging and analysis
- **💾 Data Backup** - CSV import/export functionality
- **📱 Responsive Design** - Works perfectly on all devices
- **🔒 Local Storage** - Your data never leaves your device

## 🚀 Quick Start

### Option 1: Docker (Recommended)

**Prerequisites:**
- Docker

**Run the application:**
```bash
./run.sh
```

**Stop the application:**
```bash
./stop.sh
```

### Option 2: Local Development

**Prerequisites:**
- Node.js 18+
- npm

**Run in development mode:**
```bash
./dev.sh
```

**Or manually:**
```bash
npm install
npm run dev
```

## 📁 Project Structure

```
Journal/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── App.jsx        # Main app component
│   └── index.css      # Styles and animations
├── Dockerfile         # Docker configuration
├── run.sh            # Easy run script
├── stop.sh           # Easy stop script
└── dev.sh            # Development script
```

## 🎨 Features Overview

### Landing Page
- **Animated Trading Chart** - Real-time price action simulation
- **Twinkling Stars** - Beautiful star animations
- **Falling Stars** - Shooting star effects
- **Neonic Buttons** - Glowing action buttons

### Trading Journal
- **Trade Entry** - Comprehensive trade logging
- **Daily Summary** - Real-time statistics
- **Post-Trade Reflection** - Analysis tools
- **Data Export** - CSV and PDF export

### Data Management
- **CSV Import** - Restore your trading data
- **Local Storage** - Automatic data persistence
- **Backup & Restore** - Complete data management

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Docker Commands

- `docker build -t trading-journal .` - Build image
- `docker run -d --name trading-journal-app -p 3000:3000 trading-journal` - Run container
- `docker stop trading-journal-app` - Stop container
- `docker logs trading-journal-app` - View logs

## 🌟 Animations & Effects

- **Twinkling Stars** - 10 stars with staggered animations
- **Falling Stars** - 5 shooting stars with rotation
- **Trading Chart** - Animated price line and volume bars
- **Neon Borders** - Rotating gradient borders
- **Glass Morphism** - Modern backdrop blur effects

## 📊 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS3** - Advanced animations and effects
- **Docker** - Containerization

## 🎯 Getting Started

1. **Clone the repository**
2. **Choose your method:**
   - **Docker**: Run `./run.sh`
   - **Local**: Run `./dev.sh`
3. **Open your browser** to the provided URL
4. **Start trading!** 📈

## 🔧 Troubleshooting

### Docker Issues
```bash
# Check if Docker is running
docker --version

# View logs
docker logs trading-journal-app

# Rebuild if needed
docker build -t trading-journal . --no-cache
docker run -d --name trading-journal-app -p 3000:3000 trading-journal
```

### Local Development Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This project is open source and available under the MIT License.

---

**Made with ❤️ and lots of ⭐ stars!** 