# 🏎️ F1 Podium Predictor & Championship Simulator

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/)
[![API](https://img.shields.io/badge/API-Ergast%20F1-green.svg)](https://ergast.com/mrd/)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

A sophisticated predictive analytics platform that forecasts Formula 1 race outcomes and championship probabilities using Monte Carlo simulation and real-time data integration.

![F1 Predictor Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=F1+Podium+Predictor+Demo)

## 🎯 Overview

Built with React and powered by **10,000-iteration Monte Carlo simulations**, this application predicts race podium finishes and championship winners by analyzing:
- Historical performance data
- Current season results
- Circuit-specific characteristics
- Driver skill ratings
- Team performance metrics

## ✨ Key Features

### 🔮 Advanced Predictive Analytics
- **Monte Carlo Simulation Engine**: Executes 10,000 iterations per prediction to calculate championship win probabilities with statistical accuracy
- **Dynamic Weighted Scoring**: Algorithm progressively shifts from 70% historical data to 100% current-season data as races complete
- **Circuit-Specific Modeling**: Adjusts predictions based on track type classifications (Power, Street, Technical, Hybrid)
- **Feature Engineering**: Incorporates driver skill ratings, team chemistry penalties, and early-season uncertainty factors

### 📊 Real-Time Data Integration
- **Live API Integration**: Autonomous synchronization with Ergast F1 API for real race results
- **CSV Import Functionality**: Manual data integration for testing, historical analysis, and custom scenarios
- **Data Normalization**: Intelligent driver/team name mapping across API inconsistencies
- **Error Handling**: Robust async/await patterns with fallback mechanisms

### 📈 Interactive Visualization Dashboard
- **Current Standings View**: Real-time driver and constructor championship tables
- **Next Race Predictions**: Podium probability bar charts with win/podium percentages
- **Championship Forecasts**: Win probability visualizations for both championships using pie charts
- **Export Functionality**: Generate detailed text reports for offline analysis

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, JavaScript (ES6+) |
| **Data Viz** | Recharts (Bar Charts, Pie Charts) |
| **API** | Ergast F1 RESTful API |
| **Styling** | Tailwind CSS, Custom Gradients |
| **Icons** | Lucide React |
| **State** | React Hooks (useState) |

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation
```bash
# Clone the repository
git clone https://github.com/gutiemi06-ui/f1-predictor.git

# Navigate to project directory
cd f1-predictor

# Install dependencies
npm install

# Start development server
npm start
```

The app will automatically open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## 📖 Usage Guide

### 1. Fetch Live Data
Click **"Fetch 2025 Data"** to automatically pull all completed race results from the current F1 season via API

### 2. Test Mode
Click **"Test with 2024"** to load historical data (first 8 races of 2024 season) for demonstration purposes

### 3. Manual Data Import
Upload CSV files with race results in the format:
```csv
Race,P1,P2,P3,P4,P5...
Australia,Max Verstappen,Lando Norris,Charles Leclerc...
```

### 4. Navigate Dashboards
Switch between four interactive panels:
- **Current Standings**: Live championship tables
- **Next Race**: Podium probability predictions
- **Driver Championship**: Win probability forecast
- **Constructor Championship**: Team championship odds

### 5. Export Reports
Generate comprehensive prediction reports including current standings, next race predictions, and championship probabilities

## 🧮 Algorithm Details

### Monte Carlo Simulation
```javascript
// Pseudocode
for (simulation = 1 to 10,000) {
  for (remaining_race in season) {
    results = simulate_race(circuit, drivers, teams)
    update_points(results)
  }
  record_championship_winner()
}
calculate_win_probabilities()
```

**Complexity**: O(n × m × d) where:
- n = 10,000 simulations
- m = remaining races in season
- d = 20 drivers

### Weighted Scoring System

| Season Phase | Historical Weight | Current Season Weight |
|--------------|-------------------|----------------------|
| Early (0-3 races) | 70% | 30% |
| Mid (4-12 races) | Progressive shift | Progressive shift |
| Late (13+ races) | 30% | 70% |

### Feature Engineering

**Driver Skill Ratings** (71-98 scale):
- Max Verstappen: 98
- Lewis Hamilton: 96
- Fernando Alonso: 94
- Charles Leclerc: 93
- Rookies: 71-74

**Adjustments**:
- Team chemistry penalty: -2 (new driver lineups)
- Circuit bonuses: +2/+3 (driver/team strengths)
- Early season uncertainty: -3 (first 3 races)

**Circuit-Specific Bonuses**:
- Power circuits (Monza, Belgium): Red Bull +3
- Street circuits (Monaco, Singapore): Verstappen/Leclerc +2
- Technical circuits (Hungary, Suzuka): Alonso/Hamilton +2

## 📊 2025 F1 Grid Data

### Constructor Ratings
| Team | Rating | Drivers | Changes |
|------|--------|---------|---------|
| Red Bull | 94 | Verstappen, Perez | - |
| McLaren | 93 | Norris, Piastri | - |
| Ferrari | 91 | Leclerc, **Hamilton** | ⭐ Major |
| Mercedes | 86 | Russell, **Antonelli** | ⭐ Rookie |
| Aston Martin | 80 | Alonso, Stroll | - |
| Alpine | 76 | Gasly, **Doohan** | ⭐ Rookie |
| Williams | 75 | Albon, **Sainz** | ⭐ From Ferrari |
| RB | 74 | Tsunoda, **Lawson** | Driver change |
| Kick Sauber | 71 | Hulkenberg, **Bortoleto** | ⭐ Rookie |
| Haas | 73 | **Ocon**, **Bearman** | ⭐ Complete refresh |

### 2025 Calendar (24 Races)
Australia • China • Japan • Bahrain • Saudi Arabia • Miami • Imola • Monaco • Spain • Canada • Austria • Silverstone • Hungary • Belgium • Netherlands • Monza • Azerbaijan • Singapore • USA • Mexico • Brazil • Las Vegas • Qatar • Abu Dhabi

## 📁 Project Structure
```
f1-predictor/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js              # Main component (all logic)
│   ├── App.css             # Styling
│   ├── index.js            # Entry point
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

## 🎓 Technical Highlights

### Algorithm Complexity
- **Time**: O(10,000 × remaining_races × 20) ≈ O(n·m·d)
- **Space**: O(drivers + teams) ≈ O(30)
- **Optimization**: Pre-computed mappings for O(1) lookups

### API Integration
- Asynchronous data fetching with `async/await`
- Comprehensive error handling and user feedback
- Driver name normalization across API inconsistencies
- Team name mapping with fallback logic

### State Management
- React Hooks (`useState`) for component state
- Efficient re-renders with data memoization
- Separation of concerns (fetch, simulate, visualize)

## 🔮 Future Enhancements

- [ ] **Weather Modeling**: Rain probability per circuit affecting predictions
- [ ] **Qualifying Simulation**: Grid position predictions with lap time modeling
- [ ] **Tire Strategy Analysis**: Compound selection and pit stop optimization
- [ ] **Driver Form Tracking**: Rolling 5-race performance window
- [ ] **Historical Accuracy**: Track prediction accuracy vs actual results
- [ ] **Machine Learning**: Train models on historical data for improved predictions
- [ ] **Real-time Updates**: WebSocket integration for live race updates
- [ ] **Mobile App**: React Native version with push notifications

## 📝 CSV Import Format
```csv
Race,P1,P2,P3,P4,P5,P6,P7,P8,P9,P10,P11,P12,P13,P14,P15,P16,P17,P18,P19,P20
Australia,Max Verstappen,Lando Norris,Charles Leclerc,Oscar Piastri,Lewis Hamilton,Carlos Sainz,George Russell,Fernando Alonso,Sergio Perez,Pierre Gasly,Yuki Tsunoda,Alex Albon,Esteban Ocon,Nico Hulkenberg,Lance Stroll,Liam Lawson,Kimi Antonelli,Jack Doohan,Oliver Bearman,Gabriel Bortoleto
China,Max Verstappen,Charles Leclerc,Lando Norris,Lewis Hamilton,Oscar Piastri,George Russell,Carlos Sainz,Fernando Alonso,Sergio Perez,Yuki Tsunoda,Pierre Gasly,Alex Albon,Nico Hulkenberg,Esteban Ocon,Lance Stroll,Liam Lawson,Kimi Antonelli,Jack Doohan,Oliver Bearman,Gabriel Bortoleto
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Emiliano Gutierrez**
- GitHub: [@gutiemi06-ui](https://github.com/gutiemi06-ui)
- LinkedIn: [Connect with me](https://linkedin.com/in/emiliano-gutierrez)
- Portfolio: [View my work](https://your-portfolio-url.com)

## 🙏 Acknowledgments

- **[Ergast F1 API](https://ergast.com/mrd/)** - Comprehensive Formula 1 data source
- **[Recharts](https://recharts.org/)** - Beautiful data visualization library
- **[Formula 1](https://www.formula1.com/)** - For inspiring this data science project
- **[Create React App](https://create-react-app.dev/)** - React application foundation

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/gutiemi06-ui/f1-predictor?style=social)
![GitHub forks](https://img.shields.io/github/forks/gutiemi06-ui/f1-predictor?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/gutiemi06-ui/f1-predictor?style=social)

---

⭐ **If you find this project helpful, please give it a star!**

🏁 Built with passion for Formula 1 and data science
