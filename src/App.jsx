import React, { useState, useEffect } from 'react';
import CommandHeader from './components/CommandHeader';
import GisTacticalMap from './components/GisTacticalMap';
import SatelliteIntelligence from './components/SatelliteIntelligence';
import WeatherRiskEngine from './components/WeatherRiskEngine';
import SocialNlpFeed from './components/SocialNlpFeed';
import EvacuationPlanner from './components/EvacuationPlanner';
import ResourceOptimizer from './components/ResourceOptimizer';
import DigitalTwinSimulator from './components/DigitalTwinSimulator';

// 28 Innovation Modules Imports
import VoiceCommandCenter from './components/innovations/VoiceCommandCenter';
import DroneScanner from './components/innovations/DroneScanner';
import MultilingualBroadcast from './components/innovations/MultilingualBroadcast';
import MeshNetworkSim from './components/innovations/MeshNetworkSim';
import MissingPersonsMatcher from './components/innovations/MissingPersonsMatcher';
import ShelterCapacityPredictor from './components/innovations/ShelterCapacityPredictor';
import DamageCostEstimator from './components/innovations/DamageCostEstimator';
import IotSensorStream from './components/innovations/IotSensorStream';
import XaiTreeVisualizer from './components/innovations/XaiTreeVisualizer';
import DisasterTimeLapse from './components/innovations/DisasterTimeLapse';
import RescueForceMatrix from './components/innovations/RescueForceMatrix';
import SarRadarFilter from './components/innovations/SarRadarFilter';
import HazardTrustRating from './components/innovations/HazardTrustRating';
import FireSpreadSimulator from './components/innovations/FireSpreadSimulator';
import MedicalInventoryTracker from './components/innovations/MedicalInventoryTracker';
import EvacVehicleMatcher from './components/innovations/EvacVehicleMatcher';
import ReliefCampAllocator from './components/innovations/ReliefCampAllocator';
import LandslidePredictor from './components/innovations/LandslidePredictor';
import SitrepReportGenerator from './components/innovations/SitrepReportGenerator';
import PowerGridBlackout from './components/innovations/PowerGridBlackout';
import ChemicalPlumeSimulator from './components/innovations/ChemicalPlumeSimulator';
import HelipadFinder from './components/innovations/HelipadFinder';
import VolunteerDispatch from './components/innovations/VolunteerDispatch';
import HistoricalAnalytics from './components/innovations/HistoricalAnalytics';
import TacticalThemeCustomizer from './components/innovations/TacticalThemeCustomizer';
import SmsWhatsappGateway from './components/innovations/SmsWhatsappGateway';
import MitigationPolicyAdvisor from './components/innovations/MitigationPolicyAdvisor';
import SystemTelemetryMonitor from './components/innovations/SystemTelemetryMonitor';

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
  const [activeTab, setActiveTab] = useState('ALL');

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
        
        {/* LEFT COLUMN: Tactical Map, Twin Simulator & AI Innovations (7 Cols) */}
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

          {/* Digital Twin Simulation Panel */}
          <DigitalTwinSimulator 
            onRunSimulation={handleRunSimulation}
            onResetSimulation={fetchInitialData}
          />

          {/* Innovation Modules Group 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <VoiceCommandCenter />
            <DroneScanner />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MultilingualBroadcast />
            <MeshNetworkSim />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MissingPersonsMatcher />
            <ShelterCapacityPredictor />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DamageCostEstimator />
            <IotSensorStream />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <XaiTreeVisualizer />
            <DisasterTimeLapse />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <RescueForceMatrix />
            <SarRadarFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <HazardTrustRating />
            <FireSpreadSimulator />
          </div>

          {/* Satellite Change Detection Intelligence */}
          <SatelliteIntelligence stats={satelliteStats} />

        </div>

        {/* RIGHT COLUMN: AI Intelligence Engines & Innovations (5 Cols) */}
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

          {/* Innovation Modules Group 2 */}
          <MedicalInventoryTracker />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <EvacVehicleMatcher />
            <ReliefCampAllocator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <LandslidePredictor />
            <SitrepReportGenerator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <PowerGridBlackout />
            <ChemicalPlumeSimulator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <HelipadFinder />
            <VolunteerDispatch />
          </div>

          <HistoricalAnalytics />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TacticalThemeCustomizer />
            <SmsWhatsappGateway />
          </div>

          <MitigationPolicyAdvisor />
          <SystemTelemetryMonitor />

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
          AI DISASTER COMMAND CENTER &copy; 2026 • 28 INNOVATION MODULES ACTIVE
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
