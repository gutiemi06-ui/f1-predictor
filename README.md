# 🏎️ F1 Podium Predictor & Championship Simulator

A sophisticated predictive analytics platform that forecasts Formula 1 race outcomes and championship probabilities using Monte Carlo simulation and real-time data integration.

![F1 Predictor](https://img.shields.io/badge/React-18-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![API](https://img.shields.io/badge/API-Ergast%20F1-green)

## 🎯 Overview

Built with React and powered by 10,000-iteration Monte Carlo simulations, this application predicts race podium finishes and championship winners by analyzing historical data, current season performance, circuit characteristics, and driver skill ratings.

## ✨ Features

### 🔮 Predictive Analytics
- **Monte Carlo Simulation**: Runs 10,000 iterations per prediction to calculate championship win probabilities
- **Dynamic Weighted Scoring**: Algorithm shifts from 70% historical data to 100% current-season data as races progress
- **Circuit-Specific Modeling**: Adjusts predictions based on track type (Power, Street, Technical, Hybrid)

### 📊 Real-Time Data Integration
- **Live API Fetching**: Integrates with Ergast F1 API for automatic race result synchronization
- **CSV Import**: Manual data integration for testing and historical analysis
- **Export Reports**: Generate detailed prediction reports

### 📈 Interactive Dashboards
- Current Standings (Driver & Constructor)
- Next Race Predictions with Podium Probabilities
- Championship Forecast Visualizations
- Bar Charts and Pie Charts using Recharts

## 🛠️ Tech Stack

- **Frontend**: React, JavaScript (ES6+)
- **Data Visualization**: Recharts
- **API Integration**: Ergast F1 API (RESTful)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🚀 Installation
```bash
# Clone the repository
git clone https://github.com/gutiemi06/f1-predictor.git

# Navigate to project directory
cd f1-predictor

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 📖 Usage

1. **Fetch Live Data**: Click "Fetch 2025 Data" to load real race results
2. **Test Mode**: Click "Test with 2024" to demo with historical data
3. **Manual Import**: Upload CSV files with race results
4. **Navigate Tabs**: Switch between Standings, Next Race, and Championship views
5. **Export**: Generate prediction reports

## 🧮 Algorithm Details

### Monte Carlo Simulation
- Executes 10,000 simulations of all remaining races
- Calculates win probability for each driver/constructor
- Accounts for variance and randomness in race outcomes

### Weighted Scoring System
```
Early Season (0-3 races):  70% historical + 30% current
Mid Season (4-12 races):   Progressive shift
Late Season (13+ races):   30% historical + 70% current
```

### Feature Engineering
- Driver Skill Ratings (71-98 scale)
- Team Chemistry Penalty (-2 for new lineups)
- Circuit Type Adjustments (+2/+3 bonuses)
- Early Season Uncertainty (-3 modifier)

## 📊 2025 F1 Grid Data

### Top Teams
- **Red Bull** (94): Max Verstappen, Sergio Perez
- **McLaren** (93): Lando Norris, Oscar Piastri
- **Ferrari** (91): Charles Leclerc, Lewis Hamilton ⭐ *New*

### Driver Ratings
- Max Verstappen: 98
- Lewis Hamilton: 96
- Fernando Alonso: 94
- Charles Leclerc: 93
- Rookies: 71-74

## 📁 Project Structure
```
f1-predictor/
├── src/
│   ├── App.js          # Main component with all logic
│   ├── App.css
│   └── index.js
├── public/
├── package.json
└── README.md
```

## 🎓 Technical Highlights

- **Time Complexity**: O(n × m × r) where n=simulations, m=races, r=drivers
- **API Integration**: Async/await with error handling
- **State Management**: React Hooks (useState)
- **Data Normalization**: Driver/team name mapping for API consistency

## 🔮 Future Enhancements

- [ ] Weather condition modeling
- [ ] Qualifying simulation
- [ ] Tire strategy analysis
- [ ] Driver form tracking (last 5 races)
- [ ] Machine learning model training

## 📝 CSV Import Format
```csv
Race,P1,P2,P3,P4,P5...
Australia,Max Verstappen,Lando Norris,Charles Leclerc...
China,Max Verstappen,Charles Leclerc,Lando Norris...
```

## 🤝 Contributing

Contributions welcome! Feel free to submit a Pull Request.

## 📄 License

MIT License

## 👤 Author

**Emiliano Gutierrez**
- GitHub: [@gutiemi06](https://github.com/gutiemi06)
- LinkedIn: [Connect with me](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Ergast F1 API](https://ergast.com/mrd/) for comprehensive F1 data
- [Recharts](https://recharts.org/) for data visualization
- Formula 1 for inspiring this project

---

⭐ **If you find this project helpful, please give it a star!**
