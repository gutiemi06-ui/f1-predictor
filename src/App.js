import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, TrendingUp, Calendar, Users, Upload, Download, Database, RefreshCw, Activity } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('race');
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const simulationCount = 10000;

  const teams2025 = {
    'Red Bull': { drivers: ['Max Verstappen', 'Sergio Perez'], carRating: 94, driverChanges: false },
    'McLaren': { drivers: ['Lando Norris', 'Oscar Piastri'], carRating: 93, driverChanges: false },
    'Ferrari': { drivers: ['Charles Leclerc', 'Lewis Hamilton'], carRating: 91, driverChanges: true },
    'Mercedes': { drivers: ['George Russell', 'Kimi Antonelli'], carRating: 86, driverChanges: true },
    'Aston Martin': { drivers: ['Fernando Alonso', 'Lance Stroll'], carRating: 80, driverChanges: false },
    'Alpine': { drivers: ['Pierre Gasly', 'Jack Doohan'], carRating: 76, driverChanges: true },
    'Williams': { drivers: ['Alex Albon', 'Carlos Sainz'], carRating: 75, driverChanges: true },
    'RB': { drivers: ['Yuki Tsunoda', 'Liam Lawson'], carRating: 74, driverChanges: true },
    'Kick Sauber': { drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto'], carRating: 71, driverChanges: true },
    'Haas': { drivers: ['Esteban Ocon', 'Oliver Bearman'], carRating: 73, driverChanges: true }
  };

  const circuits2025 = [
    { name: 'Australia', date: '2025-03-16', type: 'Street', difficulty: 7 },
    { name: 'China', date: '2025-03-23', type: 'Hybrid', difficulty: 6 },
    { name: 'Japan', date: '2025-04-06', type: 'Technical', difficulty: 8 },
    { name: 'Bahrain', date: '2025-04-13', type: 'Power', difficulty: 5 },
    { name: 'Saudi Arabia', date: '2025-04-27', type: 'Street', difficulty: 9 },
    { name: 'Miami', date: '2025-05-04', type: 'Street', difficulty: 6 },
    { name: 'Imola', date: '2025-05-18', type: 'Technical', difficulty: 7 },
    { name: 'Monaco', date: '2025-05-25', type: 'Street', difficulty: 10 },
    { name: 'Spain', date: '2025-06-01', type: 'Balanced', difficulty: 6 },
    { name: 'Canada', date: '2025-06-15', type: 'Street', difficulty: 7 },
    { name: 'Austria', date: '2025-06-29', type: 'Power', difficulty: 5 },
    { name: 'Silverstone', date: '2025-07-06', type: 'Power', difficulty: 7 },
    { name: 'Hungary', date: '2025-07-20', type: 'Technical', difficulty: 8 },
    { name: 'Belgium', date: '2025-07-27', type: 'Power', difficulty: 6 },
    { name: 'Netherlands', date: '2025-08-31', type: 'Technical', difficulty: 7 },
    { name: 'Monza', date: '2025-09-07', type: 'Power', difficulty: 5 },
    { name: 'Azerbaijan', date: '2025-09-21', type: 'Street', difficulty: 8 },
    { name: 'Singapore', date: '2025-10-05', type: 'Street', difficulty: 9 },
    { name: 'USA', date: '2025-10-19', type: 'Hybrid', difficulty: 7 },
    { name: 'Mexico', date: '2025-10-26', type: 'Hybrid', difficulty: 6 },
    { name: 'Brazil', date: '2025-11-09', type: 'Hybrid', difficulty: 7 },
    { name: 'Las Vegas', date: '2025-11-22', type: 'Street', difficulty: 6 },
    { name: 'Qatar', date: '2025-11-30', type: 'Power', difficulty: 6 },
    { name: 'Abu Dhabi', date: '2025-12-07', type: 'Hybrid', difficulty: 6 }
  ];

  const driverSkills = {
    'Max Verstappen': 98, 'Lewis Hamilton': 96, 'Fernando Alonso': 94, 'Charles Leclerc': 93,
    'Lando Norris': 92, 'George Russell': 90, 'Carlos Sainz': 89, 'Sergio Perez': 87,
    'Oscar Piastri': 88, 'Pierre Gasly': 85, 'Yuki Tsunoda': 83, 'Alex Albon': 84,
    'Esteban Ocon': 83, 'Nico Hulkenberg': 82, 'Lance Stroll': 78, 'Liam Lawson': 76,
    'Kimi Antonelli': 74, 'Jack Doohan': 73, 'Oliver Bearman': 72, 'Gabriel Bortoleto': 71
  };

  const driverNameMapping = {
    'Verstappen': 'Max Verstappen', 'Perez': 'Sergio Perez', 'Norris': 'Lando Norris',
    'Piastri': 'Oscar Piastri', 'Leclerc': 'Charles Leclerc', 'Hamilton': 'Lewis Hamilton',
    'Russell': 'George Russell', 'Antonelli': 'Kimi Antonelli', 'Alonso': 'Fernando Alonso',
    'Stroll': 'Lance Stroll', 'Gasly': 'Pierre Gasly', 'Doohan': 'Jack Doohan',
    'Albon': 'Alex Albon', 'Sainz': 'Carlos Sainz', 'Tsunoda': 'Yuki Tsunoda',
    'Lawson': 'Liam Lawson', 'Hulkenberg': 'Nico Hulkenberg', 'Bortoleto': 'Gabriel Bortoleto',
    'Ocon': 'Esteban Ocon', 'Bearman': 'Oliver Bearman'
  };

  const findTeamName = (apiTeamName) => {
    if (apiTeamName.includes('Red Bull')) return 'Red Bull';
    if (apiTeamName.includes('McLaren')) return 'McLaren';
    if (apiTeamName.includes('Ferrari')) return 'Ferrari';
    if (apiTeamName.includes('Mercedes')) return 'Mercedes';
    if (apiTeamName.includes('Aston Martin')) return 'Aston Martin';
    if (apiTeamName.includes('Alpine')) return 'Alpine';
    if (apiTeamName.includes('Williams')) return 'Williams';
    if (apiTeamName.includes('Racing Bulls') || apiTeamName.includes('RB')) return 'RB';
    if (apiTeamName.includes('Sauber')) return 'Kick Sauber';
    if (apiTeamName.includes('Haas')) return 'Haas';
    return 'Unknown';
  };

  const calculateDriverRating = (team, driver, racesCompleted) => {
    const teamData = teams2025[team];
    let baseRating = teamData.carRating;
    const driverSkill = driverSkills[driver] || 75;
    let rating = baseRating * 0.6 + driverSkill * 0.4;
    let adjustment = 0;
    if (teamData.driverChanges) adjustment -= 2;
    if (racesCompleted < 3) adjustment -= 3;
    return rating + adjustment + (Math.random() * 5 - 2.5);
  };

  const simulateRace = (raceIndex) => {
    const circuit = circuits2025[raceIndex] || circuits2025[0];
    const grid = [];
    Object.entries(teams2025).forEach(([team, data]) => {
      data.drivers.forEach(driver => {
        let rating = calculateDriverRating(team, driver, raceIndex);
        if (circuit.type === 'Street' && ['Max Verstappen', 'Charles Leclerc'].includes(driver)) rating += 2;
        if (circuit.type === 'Power' && team === 'Red Bull') rating += 3;
        if (circuit.type === 'Technical' && ['Fernando Alonso', 'Lewis Hamilton'].includes(driver)) rating += 2;
        grid.push({ driver, team, rating });
      });
    });
    return grid.sort((a, b) => b.rating - a.rating);
  };

  const runSimulation = (racesCompleted) => {
    const simulations = simulationCount;
    const remainingRaces = circuits2025.length - racesCompleted;
    const driverPoints = {};
    const constructorPoints = {};
    
    Object.entries(teams2025).forEach(([team, data]) => {
      constructorPoints[team] = 0;
      data.drivers.forEach(driver => { driverPoints[driver] = 0; });
    });
    
    raceResults.forEach(result => {
      const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
      result.forEach((entry, idx) => {
        if (idx < 10) {
          driverPoints[entry.driver] = (driverPoints[entry.driver] || 0) + pointsSystem[idx];
          constructorPoints[entry.team] = (constructorPoints[entry.team] || 0) + pointsSystem[idx];
        }
      });
    });
    
    const driverWins = {};
    const constructorWins = {};
    Object.keys(driverPoints).forEach(d => { driverWins[d] = 0; });
    Object.keys(constructorPoints).forEach(t => { constructorWins[t] = 0; });
    
    for (let sim = 0; sim < simulations; sim++) {
      const simDriverPoints = { ...driverPoints };
      const simConstructorPoints = { ...constructorPoints };
      for (let race = 0; race < remainingRaces; race++) {
        const raceResult = simulateRace(racesCompleted + race);
        const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
        raceResult.forEach((entry, idx) => {
          if (idx < 10) {
            simDriverPoints[entry.driver] += pointsSystem[idx];
            simConstructorPoints[entry.team] += pointsSystem[idx];
          }
        });
      }
      const driverWinner = Object.entries(simDriverPoints).reduce((a, b) => b[1] > a[1] ? b : a)[0];
      const constructorWinner = Object.entries(simConstructorPoints).reduce((a, b) => b[1] > a[1] ? b : a)[0];
      driverWins[driverWinner]++;
      constructorWins[constructorWinner]++;
    }
    
    const driverChances = Object.entries(driverWins).map(([driver, wins]) => ({
      driver,
      chance: ((wins / simulations) * 100).toFixed(2),
      team: Object.entries(teams2025).find(([t, d]) => d.drivers.includes(driver))[0]
    })).sort((a, b) => parseFloat(b.chance) - parseFloat(a.chance));
    
    const constructorChances = Object.entries(constructorWins).map(([team, wins]) => ({
      team,
      chance: ((wins / simulations) * 100).toFixed(2)
    })).sort((a, b) => parseFloat(b.chance) - parseFloat(a.chance));
    
    return { driverChances, constructorChances };
  };

  const predictNextRace = () => {
    const nextRaceIndex = raceResults.length;
    if (nextRaceIndex >= circuits2025.length) return null;
    const predictions = [];
    for (let i = 0; i < 1000; i++) {
      predictions.push(simulateRace(nextRaceIndex));
    }
    const podiumCount = {};
    predictions.forEach(race => {
      race.slice(0, 3).forEach((entry, pos) => {
        const key = entry.driver + '-' + pos;
        podiumCount[key] = (podiumCount[key] || 0) + 1;
      });
    });
    const podiumChances = {};
    Object.entries(podiumCount).forEach(([key, count]) => {
      const parts = key.split('-');
      const driver = parts[0];
      const pos = parts[1];
      if (!podiumChances[driver]) {
        podiumChances[driver] = { p1: 0, p2: 0, p3: 0, total: 0 };
      }
      const posKey = 'p' + (parseInt(pos) + 1);
      podiumChances[driver][posKey] = ((count / 1000) * 100).toFixed(1);
      podiumChances[driver].total += count;
    });
    return Object.entries(podiumChances)
      .map(([driver, chances]) => ({
        driver,
        team: Object.entries(teams2025).find(([t, d]) => d.drivers.includes(driver))[0],
        win: chances.p1,
        podium: (((chances.total) / 1000) * 100).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.win) - parseFloat(a.win))
      .slice(0, 10);
  };

  const getCurrentStandings = () => {
    const driverPoints = {};
    const constructorPoints = {};
    Object.entries(teams2025).forEach(([team, data]) => {
      constructorPoints[team] = 0;
      data.drivers.forEach(driver => { driverPoints[driver] = 0; });
    });
    raceResults.forEach(result => {
      const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
      result.forEach((entry, idx) => {
        if (idx < 10) {
          driverPoints[entry.driver] = (driverPoints[entry.driver] || 0) + pointsSystem[idx];
          constructorPoints[entry.team] = (constructorPoints[entry.team] || 0) + pointsSystem[idx];
        }
      });
    });
    const driverStandings = Object.entries(driverPoints)
      .map(([driver, points]) => ({
        driver,
        points,
        team: Object.entries(teams2025).find(([t, d]) => d.drivers.includes(driver))[0]
      }))
      .sort((a, b) => b.points - a.points);
    const constructorStandings = Object.entries(constructorPoints)
      .map(([team, points]) => ({ team, points }))
      .sort((a, b) => b.points - a.points);
    return { driverStandings, constructorStandings };
  };

  const handleCSVImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const newResults = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const raceData = [];
        for (let j = 0; j < 20 && j < values.length; j++) {
          const driverName = values[j];
          if (driverName) {
            const team = Object.entries(teams2025).find(([t, d]) => d.drivers.includes(driverName));
            if (team) {
              raceData.push({ driver: driverName, team: team[0] });
            }
          }
        }
        if (raceData.length > 0) {
          newResults.push(raceData);
        }
      }
      setRaceResults(newResults);
      alert('Successfully imported ' + newResults.length + ' races!');
    } catch (error) {
      alert('Error importing CSV: ' + error.message);
    }
  };

  const generateReport = () => {
    const nextRaceIndex = raceResults.length;
    const circuit = circuits2025[nextRaceIndex] || circuits2025[0];
    const prediction = predictNextRace();
    const championship = runSimulation(raceResults.length);
    const standings = getCurrentStandings();
    let report = 'F1 SEASON REPORT\n';
    report += 'Generated: ' + new Date().toLocaleString() + '\n\n';
    report += 'CURRENT STANDINGS:\n';
    standings.driverStandings.slice(0, 5).forEach((d, i) => {
      report += (i + 1) + '. ' + d.driver + ' - ' + d.points + ' points\n';
    });
    report += '\nNEXT RACE: ' + circuit.name + '\n';
    if (prediction) {
      report += '\nTOP 5 PREDICTIONS:\n';
      prediction.slice(0, 5).forEach((p, i) => {
        report += (i + 1) + '. ' + p.driver + ' - Win: ' + p.win + '%\n';
      });
    }
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'F1_Report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const fetchLiveResults = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ergast.com/api/f1/2025/results.json');
      const data = await response.json();
      if (data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races) {
        const races = data.MRData.RaceTable.Races;
        if (races.length === 0) {
          alert('No races found for 2025.');
          setLoading(false);
          return;
        }
        const formattedResults = [];
        races.forEach(race => {
          if (race.Results && race.Results.length > 0) {
            const raceResult = race.Results
              .sort((a, b) => parseInt(a.position) - parseInt(b.position))
              .map(result => {
                const apiLastName = result.Driver.familyName;
                const apiTeamName = result.Constructor.name;
                const matchedDriver = driverNameMapping[apiLastName];
                const matchedTeam = findTeamName(apiTeamName);
                return {
                  driver: matchedDriver || (result.Driver.givenName + ' ' + result.Driver.familyName),
                  team: matchedTeam
                };
              });
            formattedResults.push(raceResult);
          }
        });
        setRaceResults(formattedResults);
        setLastUpdated(new Date().toLocaleString());
        alert('Successfully loaded ' + formattedResults.length + ' race(s)!');
      } else {
        alert('No race data available.');
      }
    } catch (error) {
      alert('Could not fetch data. Try test data or CSV import.');
    }
    setLoading(false);
  };

  const fetchTestData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ergast.com/api/f1/2024/results.json');
      const data = await response.json();
      if (data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races) {
        const races = data.MRData.RaceTable.Races.slice(0, 8);
        const formattedResults = [];
        races.forEach(race => {
          if (race.Results && race.Results.length > 0) {
            const raceResult = race.Results
              .sort((a, b) => parseInt(a.position) - parseInt(b.position))
              .map(result => {
                const apiLastName = result.Driver.familyName;
                const apiTeamName = result.Constructor.name;
                const matchedDriver = driverNameMapping[apiLastName];
                const matchedTeam = findTeamName(apiTeamName);
                return {
                  driver: matchedDriver || (result.Driver.givenName + ' ' + result.Driver.familyName),
                  team: matchedTeam
                };
              });
            formattedResults.push(raceResult);
          }
        });
        setRaceResults(formattedResults);
        setLastUpdated(new Date().toLocaleString());
        alert('TEST: Loaded 8 races from 2024!');
      }
    } catch (error) {
      alert('Error fetching test data.');
    }
    setLoading(false);
  };

  const nextRacePrediction = predictNextRace();
  const championshipPrediction = runSimulation(raceResults.length);
  const currentStandings = getCurrentStandings();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">F1 Podium Predictor</h1>
          <p className="text-gray-400">Championship Simulator</p>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Races: {raceResults.length}/{circuits2025.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded p-4 mb-6 flex flex-wrap gap-3">
          <button onClick={fetchLiveResults} disabled={loading} className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded">
            <Database className="w-4 h-4" />
            {loading ? 'Loading...' : 'Fetch 2025 Data'}
          </button>
          <button onClick={fetchTestData} disabled={loading} className="flex items-center gap-2 bg-orange-600 px-4 py-2 rounded">
            <Activity className="w-4 h-4" />
            Test with 2024
          </button>
          <label className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded cursor-pointer">
            <Upload className="w-4 h-4" />
            Import CSV
            <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
          </label>
          <button onClick={generateReport} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button onClick={() => setRaceResults([])} className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded ml-auto">
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('standings')} className={'px-6 py-3 rounded font-semibold ' + (activeTab === 'standings' ? 'bg-red-600' : 'bg-gray-700')}>
            Standings
          </button>
          <button onClick={() => setActiveTab('race')} className={'px-6 py-3 rounded font-semibold ' + (activeTab === 'race' ? 'bg-red-600' : 'bg-gray-700')}>
            Next Race
          </button>
          <button onClick={() => setActiveTab('driver')} className={'px-6 py-3 rounded font-semibold ' + (activeTab === 'driver' ? 'bg-red-600' : 'bg-gray-700')}>
            Driver Champ
          </button>
          <button onClick={() => setActiveTab('constructor')} className={'px-6 py-3 rounded font-semibold ' + (activeTab === 'constructor' ? 'bg-red-600' : 'bg-gray-700')}>
            Constructor Champ
          </button>
        </div>

        {activeTab === 'standings' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded p-6">
              <h2 className="text-2xl font-bold mb-4">Driver Standings</h2>
              <div className="space-y-2">
                {currentStandings.driverStandings.slice(0, 10).map((driver, idx) => (
                  <div key={driver.driver} className="flex justify-between bg-gray-700 p-3 rounded">
                    <div><span className="font-bold">#{idx + 1}</span> {driver.driver}</div>
                    <div className="font-bold">{driver.points}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded p-6">
              <h2 className="text-2xl font-bold mb-4">Constructor Standings</h2>
              <div className="space-y-2">
                {currentStandings.constructorStandings.map((team, idx) => (
                  <div key={team.team} className="flex justify-between bg-gray-700 p-3 rounded">
                    <div><span className="font-bold">#{idx + 1}</span> {team.team}</div>
                    <div className="font-bold">{team.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'race' && nextRacePrediction && (
          <div className="bg-gray-800 rounded p-6">
            <h2 className="text-2xl font-bold mb-4">{circuits2025[raceResults.length]?.name} - Predictions</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={nextRacePrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="driver" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="win" fill="#EF4444" name="Win %" />
                <Bar dataKey="podium" fill="#3B82F6" name="Podium %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'driver' && (
          <div className="bg-gray-800 rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Driver Championship Prediction</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={championshipPrediction.driverChances.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="driver" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="chance" fill="#10B981" name="Win %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'constructor' && (
          <div className="bg-gray-800 rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Constructor Championship Prediction</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={championshipPrediction.constructorChances.slice(0, 8)} dataKey="chance" nameKey="team" cx="50%" cy="50%" outerRadius={120} label>
                  {championshipPrediction.constructorChances.slice(0, 8).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

