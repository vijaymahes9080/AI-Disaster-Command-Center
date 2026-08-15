from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class WeatherSensorData(BaseModel):
    rainfall_mm_hr: float = Field(..., description="Rainfall intensity in mm/hr")
    river_level_m: float = Field(..., description="River level in meters above normal")
    elevation_m: float = Field(default=12.5, description="Ground elevation in meters")
    slope_deg: float = Field(default=4.2, description="Terrain slope angle in degrees")
    soil_moisture_pct: float = Field(default=85.0, description="Soil saturation percentage")
    population_density: int = Field(default=4500, description="People per sq km")

class XAIFeatureWeight(BaseModel):
    feature: str
    weight: float
    contribution_pct: float
    direction: str  # "increase" or "decrease"

class RiskPredictionResult(BaseModel):
    risk_score: float  # 0 to 100
    severity: str      # "CRITICAL", "HIGH", "MEDIUM", "LOW"
    confidence: float  # 0.0 to 1.0
    estimated_time_to_peak_hr: float
    affected_population: int
    xai_breakdown: List[XAIFeatureWeight]
    recommendation: str

class SocialPostInput(BaseModel):
    text: str
    username: Optional[str] = "Anonymous"
    timestamp: Optional[str] = None
    manual_coords: Optional[List[float]] = None

class SocialNLPOutput(BaseModel):
    id: str
    text: str
    username: str
    category: str      # "Flood", "Rescue", "Infrastructure", "Resource Request", "Fire"
    urgency_score: float # 0.0 to 10.0
    extracted_location: str
    coordinates: List[float] # [lat, lng]
    needs: List[str]
    confidence: float

class EvacuationRouteRequest(BaseModel):
    origin: List[float]       # [lat, lng]
    destination: List[float]  # [lat, lng]
    avoid_flooded: bool = True
    avoid_blocked: bool = True

class RouteSegment(BaseModel):
    from_name: str
    to_name: str
    distance_km: float
    status: str # "SAFE", "HIGH_RISK", "FLOODED", "BLOCKED"

class EvacuationRouteResult(BaseModel):
    route_id: str
    total_distance_km: float
    estimated_travel_time_min: float
    safety_rating: str # "OPTIMAL", "CAUTION", "HAZARDOUS"
    waypoints: List[List[float]]
    segments: List[RouteSegment]
    shelter_name: str
    shelter_capacity_remaining: int

class ResourceDemandRequest(BaseModel):
    affected_population: int
    risk_level: str
    flooded_road_pct: float
    districts_impacted: int

class ResourceAllocationResult(BaseModel):
    ambulances_needed: int
    rescue_boats_needed: int
    food_packets_needed: int
    water_liters_needed: int
    medical_teams_needed: int
    shelters_required: int
    priority_level: str
    explanation: str

class DigitalTwinSimRequest(BaseModel):
    rainfall_surge_pct: float = 0.0
    dam_breach: bool = False
    bridge_collapse: bool = False
    time_horizon_hrs: int = 6
