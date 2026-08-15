import asyncio
import json
import random
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    WeatherSensorData, RiskPredictionResult, SocialPostInput,
    SocialNLPOutput, EvacuationRouteRequest, EvacuationRouteResult,
    ResourceDemandRequest, ResourceAllocationResult, DigitalTwinSimRequest
)
from ai_engines import (
    RiskPredictionEngine, SocialMediaNLPEngine,
    EvacuationRoutingEngine, ResourceOptimizationEngine
)

app = FastAPI(
    title="AI Disaster Command Center API Engine",
    description="Real-Time Disaster Intelligence, GIS Mapping, Risk Prediction & Resource Allocation API",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate GIS Routing Engine
routing_engine = EvacuationRoutingEngine()

# In-memory storage for active social feed and live alerts
LIVE_INCIDENTS = [
    {
        "id": "INC-101",
        "category": "Flood",
        "title": "Sector 4 Lowlands Submerged",
        "urgency": 9.2,
        "coordinates": [13.0878, 80.2615],
        "status": "CRITICAL",
        "text": "Water level reaching 4 feet near community hall. 15 residents stranded on rooftops.",
        "needs": ["Rescue Boat", "Medical Aid"]
    },
    {
        "id": "INC-102",
        "category": "Infrastructure",
        "title": "Main River Bridge Structural Damage",
        "urgency": 8.5,
        "coordinates": [13.0827, 80.2707],
        "status": "BLOCKED",
        "text": "East side pillar foundation eroded. Road closed by police barricades.",
        "needs": ["Barrier Patrol", "Traffic Reroute"]
    },
    {
        "id": "INC-103",
        "category": "Resource Request",
        "title": "Clean Water Shortage at St. Mary Shelter",
        "urgency": 6.8,
        "coordinates": [13.1000, 80.2800],
        "status": "HIGH",
        "text": "Drinking water supply depleted for 350 evacuees. Request urgent tanker delivery.",
        "needs": ["Water Liters", "Ration Packets"]
    }
]

GOVT_ALERTS = [
    {
        "id": "ALT-901",
        "agency": "National Disaster Response Force (NDRF)",
        "severity": "CRITICAL",
        "title": "Flash Flood Red Alert - Coastal District 4",
        "issued_at": "10 mins ago",
        "recommended_action": "Evacuate low-lying areas within 3 hours."
    },
    {
        "id": "ALT-902",
        "agency": "Meteorological Department",
        "severity": "HIGH",
        "title": "Cyclone Velocity Exceeding 85 km/h",
        "issued_at": "25 mins ago",
        "recommended_action": "Secure loose structures and remain indoors."
    }
]

@app.get("/api/health")
def health_check():
    return {"status": "ONLINE", "system": "AI Disaster Command Center", "version": "1.0.0"}

@app.get("/api/initial-state")
def get_initial_state():
    """Returns initial telemetry data for dashboard hydration."""
    sensor = WeatherSensorData(
        rainfall_mm_hr=85.4,
        river_level_m=4.2,
        elevation_m=12.0,
        slope_deg=3.5,
        soil_moisture_pct=88.5,
        population_density=4800
    )

    risk_result = RiskPredictionEngine.predict_risk(sensor)
    evac_result = routing_engine.calculate_route(EvacuationRouteRequest(
        origin=[13.0900, 80.2550],
        destination=[13.1000, 80.2800],
        avoid_flooded=True,
        avoid_blocked=True
    ))
    res_result = ResourceOptimizationEngine.calculate_resources(ResourceDemandRequest(
        affected_population=risk_result.affected_population,
        risk_level=risk_result.severity,
        flooded_road_pct=35.0,
        districts_impacted=4
    ))

    return {
        "weather_sensor": sensor,
        "risk_prediction": risk_result,
        "evacuation_route": evac_result,
        "resource_allocation": res_result,
        "incidents": LIVE_INCIDENTS,
        "govt_alerts": GOVT_ALERTS,
        "satellite_stats": {
            "pre_date": "2026-08-01",
            "post_date": "2026-08-14",
            "inundated_area_sq_km": 42.8,
            "structures_damaged": 128,
            "ai_confidence_pct": 94.5
        }
    }

@app.post("/api/predict-risk", response_model=RiskPredictionResult)
def predict_risk(sensor_data: WeatherSensorData):
    return RiskPredictionEngine.predict_risk(sensor_data)

@app.post("/api/classify-social-post", response_model=SocialNLPOutput)
def classify_social_post(post: SocialPostInput):
    res = SocialMediaNLPEngine.classify_post(post.text, post.username or "Civilian", post.manual_coords)
    # Automatically append to live incidents if high urgency
    if res.urgency_score >= 6.0:
        LIVE_INCIDENTS.insert(0, {
            "id": res.id,
            "category": res.category,
            "title": f"{res.category} Alert: {res.extracted_location}",
            "urgency": res.urgency_score,
            "coordinates": res.coordinates,
            "status": "CRITICAL" if res.urgency_score >= 8.5 else "HIGH",
            "text": res.text,
            "needs": res.needs
        })
    return res

@app.post("/api/calculate-evacuation-route", response_model=EvacuationRouteResult)
def calculate_route(req: EvacuationRouteRequest):
    return routing_engine.calculate_route(req)

@app.post("/api/optimize-resources", response_model=ResourceAllocationResult)
def optimize_resources(req: ResourceDemandRequest):
    return ResourceOptimizationEngine.calculate_resources(req)

@app.post("/api/simulate-digital-twin")
def simulate_digital_twin(sim_req: DigitalTwinSimRequest):
    base_rain = 85.4 * (1.0 + sim_req.rainfall_surge_pct / 100.0)
    base_river = 4.2 + (0.05 * sim_req.rainfall_surge_pct / 10.0)
    if sim_req.dam_breach:
        base_river += 2.5
        base_rain += 20.0

    sensor = WeatherSensorData(
        rainfall_mm_hr=round(base_rain, 1),
        river_level_m=round(base_river, 2),
        elevation_m=12.0,
        slope_deg=3.5,
        soil_moisture_pct=min(99.0, 88.5 + sim_req.rainfall_surge_pct * 0.1),
        population_density=4800
    )

    risk_res = RiskPredictionEngine.predict_risk(sensor)
    flooded_road_pct = min(85.0, 35.0 + sim_req.rainfall_surge_pct * 0.4 + (25.0 if sim_req.dam_breach else 0))

    res_res = ResourceOptimizationEngine.calculate_resources(ResourceDemandRequest(
        affected_population=risk_res.affected_population,
        risk_level=risk_res.severity,
        flooded_road_pct=flooded_road_pct,
        districts_impacted=5 if sim_req.dam_breach else 4
    ))

    return {
        "simulation_params": sim_req,
        "simulated_sensor": sensor,
        "updated_risk": risk_res,
        "flooded_road_pct": round(flooded_road_pct, 1),
        "updated_resources": res_res,
        "cascading_events": [
            f"T+{sim_req.time_horizon_hrs}h: River level surges to {round(base_river, 2)}m",
            f"T+{sim_req.time_horizon_hrs + 1}h: Inundation covers Sector 4 & 5 lowlands",
            "T+3h: Main River Bridge node marked UNPASSABLE" if sim_req.bridge_collapse or sim_req.dam_breach else "T+4h: Bridge traffic restricted to emergency vehicles",
            f"T+5h: Shelter Alpha reaches 92% capacity; redirecting to Shelter Beta"
        ]
    }

@app.websocket("/ws/simulation")
async def websocket_simulation(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Broadcast live sensor jitter & heartbeat every 5 seconds
            data = {
                "type": "HEARTBEAT",
                "river_delta": round((random.random() - 0.48) * 0.1, 3),
                "rainfall_delta": round((random.random() - 0.45) * 0.5, 2),
                "active_incidents_count": len(LIVE_INCIDENTS)
            }
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        pass
