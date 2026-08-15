import React, { useState, useEffect } from 'react';
import CommandHeader from './components/CommandHeader';
import GisTacticalMap from './components/GisTacticalMap';
import SatelliteIntelligence from './components/SatelliteIntelligence';
import WeatherRiskEngine from './components/WeatherRiskEngine';
import SocialNlpFeed from './components/SocialNlpFeed';
import EvacuationPlanner from './components/EvacuationPlanner';
import ResourceOptimizer from './components/ResourceOptimizer';
import DigitalTwinSimulator from './components/DigitalTwinSimulator';

export default function App() {
  const [initialData, setInitialData] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [weatherSensor, setWeatherSensor] = useState(null);
  const [riskPrediction, setRiskPrediction] = useState(null);
  const [evacuationRoute, setEvacuationRoute] = useState(null);
  const [resourceAllocation, setResourceAllocation] = useState(null);
  const [satelliteStats, setSatelliteStats] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [simMode, setSimMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch initial telemetry on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const res = await fetch('/api/initial-state');
      const data = await res.json();
      setInitialData(data);
      setIncidents(data.incidents || []);
      setWeatherSensor(data.weather_sensor);
      setRiskPrediction(data.risk_prediction);
      setEvacuationRoute(data.evacuation_route);
      setResourceAllocation(data.resource_allocation);
      setSatelliteStats(data.satellite_stats);
    } catch (err) {
      console.error("Failed to fetch initial command state", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding new custom social post via NLP classifier
  const handleAddSocialPost = async (text, username) => {
    try {
      const res = await fetch('/api/classify-social-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, username })
      });
      const newPost = await res.json();

      const newInc = {
        id: newPost.id,
        category: newPost.category,
        title: `${newPost.category} Alert: ${newPost.extracted_location}`,
        urgency: newPost.urgency_score,
        coordinates: newPost.coordinates,
        status: newPost.urgency_score >= 8.0 ? 'CRITICAL' : 'HIGH',
        text: newPost.text,
        needs: newPost.needs
      };

      setIncidents(prev => [newInc, ...prev]);
      setSelectedIncident(newInc);
    } catch (e) {
      console.error("Error classifying social post", e);
    }
  };

  // Recalculate Evacuation Route with custom avoidance settings
  const handleCalculateEvacRoute = async (avoidFlooded, avoidBlocked) => {
    try {
      const res = await fetch('/api/calculate-evacuation-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: [13.0900, 80.2550],
          destination: [13.1000, 80.2800],
          avoid_flooded: avoidFlooded,
          avoid_blocked: avoidBlocked
        })
      });
      const data = await res.json();
      setEvacuationRoute(data);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Simulation Stress Test Results
  const handleRunSimulation = (simData) => {
    if (simData.updated_risk) setRiskPrediction(simData.updated_risk);
    if (simData.simulated_sensor) setWeatherSensor(simData.simulated_sensor);
    if (simData.updated_resources) setResourceAllocation(simData.updated_resources);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen bg-[#090d16] flex flex-col items-center justify-center font-mono text-cyan-400 gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm tracking-widest uppercase animate-pulse">INITIALIZING AI DISASTER COMMAND CENTER...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Command Header */}
      <CommandHeader 
        riskData={riskPrediction}
        activeIncidentsCount={incidents.length}
        simMode={simMode}
        setSimMode={setSimMode}
        onReset={fetchInitialData}
      />

      {/* Main Grid Workspace */}
      <main className="flex-1 p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 overflow-y-auto max-w-[1920px] mx-auto w-full">
        
        {/* LEFT COLUMN: GIS Tactical Map & Digital Twin Simulator (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4">
          
          {/* Tactical GIS Map Canvas */}
          <div className="h-[480px] w-full">
            <GisTacticalMap
              incidents={incidents}
              evacuationRoute={evacuationRoute}
              selectedIncident={selectedIncident}
              onSelectIncident={setSelectedIncident}
            />
          </div>

          {/* Digital Twin Simulation Panel (When toggled or active) */}
          <DigitalTwinSimulator 
            onRunSimulation={handleRunSimulation}
            onResetSimulation={fetchInitialData}
          />

          {/* Satellite Change Detection Intelligence */}
          <SatelliteIntelligence stats={satelliteStats} />

        </div>

        {/* RIGHT COLUMN: AI Intelligence Engines & Operational Feeds (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3 md:gap-4">
          
          {/* Weather & ML Risk Prediction Engine */}
          <WeatherRiskEngine 
            sensorData={weatherSensor}
            riskData={riskPrediction}
          />

          {/* AI Evacuation Route Planner */}
          <EvacuationPlanner 
            routeData={evacuationRoute}
            onCalculateRoute={handleCalculateEvacRoute}
          />

          {/* Resource Allocation Matrix */}
          <ResourceOptimizer 
            resourceData={resourceAllocation}
          />

          {/* Social Media NLP Classifier Feed */}
          <SocialNlpFeed 
            incidents={incidents}
            onAddPost={handleAddSocialPost}
            onSelectIncident={setSelectedIncident}
          />

        </div>

      </main>

      {/* Footer Status Bar */}
      <footer className="bg-[#0e1424] border-t border-slate-800 px-4 py-1.5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <div>
          AI DISASTER COMMAND CENTER &copy; 2026 • MCA FINAL YEAR PROJECT
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400">STATUS: OPERATIONAL</span>
          <span>•</span>
          <span className="text-slate-400">LATENCY: 14ms</span>
        </div>
      </footer>

    </div>
  );
}
