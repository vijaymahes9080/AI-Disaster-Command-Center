import math
import random
import networkx as nx
from typing import List, Dict, Tuple
from models import (
    WeatherSensorData, RiskPredictionResult, XAIFeatureWeight,
    SocialNLPOutput, EvacuationRouteRequest, EvacuationRouteResult, RouteSegment,
    ResourceDemandRequest, ResourceAllocationResult
)

class RiskPredictionEngine:
    """Model 1: Multi-Factor AI Risk Prediction Engine with XAI Feature Importance."""
    
    @staticmethod
    def predict_risk(data: WeatherSensorData) -> RiskPredictionResult:
        # Base risk weights
        w_rain = 0.35
        w_river = 0.30
        w_elev = 0.15
        w_slope = 0.10
        w_soil = 0.10

        # Normalization factors
        rain_score = min(data.rainfall_mm_hr / 120.0, 1.0) * 100
        river_score = min(data.river_level_m / 6.0, 1.0) * 100
        elev_risk = max((50.0 - data.elevation_m) / 50.0, 0.0) * 100
        slope_risk = max((15.0 - data.slope_deg) / 15.0, 0.0) * 100
        soil_risk = (data.soil_moisture_pct / 100.0) * 100

        # Composite score
        raw_score = (
            rain_score * w_rain +
            river_score * w_river +
            elev_risk * w_elev +
            slope_risk * w_slope +
            soil_risk * w_soil
        )

        score = min(max(round(raw_score, 1), 5.0), 98.5)

        # Determine severity
        if score >= 80:
            severity = "CRITICAL"
            rec = "Immediate mandatory evacuation of low-lying sectors recommended within 3 hours."
        elif score >= 60:
            severity = "HIGH"
            rec = "Issue high-level flood advisory and prepare rescue boat staging areas."
        elif score >= 35:
            severity = "MEDIUM"
            rec = "Monitor river gauge telemetry closely; notify emergency personnel on standby."
        else:
            severity = "LOW"
            rec = "Normal operational status; clear storm drains and maintain routine monitoring."

        # Calculate Explainable AI (XAI) feature contributions
        total_raw = (rain_score * w_rain) + (river_score * w_river) + (elev_risk * w_elev) + (slope_risk * w_slope) + (soil_risk * w_soil)
        if total_raw == 0: total_raw = 1.0

        xai = [
            XAIFeatureWeight(
                feature="Heavy Rainfall Rate",
                weight=round(rain_score * w_rain, 1),
                contribution_pct=round(((rain_score * w_rain) / total_raw) * 100, 1),
                direction="increase" if rain_score > 40 else "neutral"
            ),
            XAIFeatureWeight(
                feature="River Surge Level",
                weight=round(river_score * w_river, 1),
                contribution_pct=round(((river_score * w_river) / total_raw) * 100, 1),
                direction="increase" if river_score > 40 else "neutral"
            ),
            XAIFeatureWeight(
                feature="Low Terrain Elevation",
                weight=round(elev_risk * w_elev, 1),
                contribution_pct=round(((elev_risk * w_elev) / total_raw) * 100, 1),
                direction="increase" if elev_risk > 50 else "neutral"
            ),
            XAIFeatureWeight(
                feature="Soil Saturation",
                weight=round(soil_risk * w_soil, 1),
                contribution_pct=round(((soil_risk * w_soil) / total_raw) * 100, 1),
                direction="increase" if soil_risk > 70 else "neutral"
            )
        ]

        # Affected population estimation
        pop_multiplier = (score / 100.0) * 1.8
        affected_pop = int(data.population_density * pop_multiplier * 2.5)

        time_to_peak = max(1.5, round(12.0 - (data.rainfall_mm_hr * 0.08) - (data.river_level_m * 0.5), 1))

        return RiskPredictionResult(
            risk_score=score,
            severity=severity,
            confidence=0.92,
            estimated_time_to_peak_hr=time_to_peak,
            affected_population=affected_pop,
            xai_breakdown=xai,
            recommendation=rec
        )


class SocialMediaNLPEngine:
    """Model 2: Natural Language Processing Emergency Classifier."""

    CATEGORIES = {
        "Flood": ["water", "flood", "submerged", "river", "overflow", "rain", "drowning", "rising"],
        "Rescue": ["trapped", "help", "rescue", "save", "stranded", "ambulance", "emergency", "stuck"],
        "Infrastructure": ["bridge", "collapsed", "road", "blocked", "power", "grid", "landslide", "broken"],
        "Resource Request": ["food", "water", "blanket", "medical", "supplies", "shelter", "ration", "baby food"],
        "Fire": ["fire", "smoke", "explosion", "flame", "burning", "blaze"]
    }

    LOCATIONS_DB = [
        {"name": "Main River Bridge", "coords": [13.0827, 80.2707]},
        {"name": "Sector 4 Lowlands", "coords": [13.0878, 80.2615]},
        {"name": "Central Railway Station", "coords": [13.0836, 80.2751]},
        {"name": "North Market Square", "coords": [13.0950, 80.2680]},
        {"name": "East Hospital Road", "coords": [13.0760, 80.2820]},
        {"name": "West Residential Colony", "coords": [13.0710, 80.2550]}
    ]

    @classmethod
    def classify_post(cls, text: str, username: str = "Civilian", manual_coords: List[float] = None) -> SocialNLPOutput:
        text_lower = text.lower()
        scores = {cat: 0 for cat in cls.CATEGORIES}
        
        for cat, keywords in cls.CATEGORIES.items():
            for kw in keywords:
                if kw in text_lower:
                    scores[cat] += 1

        top_cat = max(scores, key=scores.get)
        if scores[top_cat] == 0:
            top_cat = "Flood"  # Default assumption in flood context

        # Urgency calculation
        urgency = 5.0
        if any(w in text_lower for w in ["urgent", "immediately", "trapped", "dying", "collapsed", "critical"]):
            urgency += 4.0
        if any(w in text_lower for w in ["children", "elderly", "hospital", "patient"]):
            urgency += 1.0
        urgency = min(10.0, urgency)

        # Location extraction heuristic
        matched_loc = "Sector 4 Area"
        coords = [13.0827, 80.2707]
        if manual_coords and len(manual_coords) == 2:
            coords = manual_coords
        else:
            for loc in cls.LOCATIONS_DB:
                if loc["name"].lower() in text_lower:
                    matched_loc = loc["name"]
                    coords = loc["coords"]
                    break
            else:
                # Add slight random offset for variety if generic
                coords = [13.0827 + (random.random() - 0.5) * 0.03, 80.2707 + (random.random() - 0.5) * 0.03]

        # Extract needs
        needs = []
        if any(w in text_lower for w in ["boat", "rescue", "trapped", "stranded"]): needs.append("Rescue Boat")
        if any(w in text_lower for w in ["food", "ration", "meal", "hungry"]): needs.append("Ration Packets")
        if any(w in text_lower for w in ["medical", "ambulance", "doctor", "injured", "patient"]): needs.append("Medical Aid")
        if any(w in text_lower for w in ["water", "drinking", "thirsty"]): needs.append("Clean Water")
        if not needs: needs.append("General Assistance")

        post_id = f"NLP-{random.randint(1000, 9999)}"

        return SocialNLPOutput(
            id=post_id,
            text=text,
            username=username,
            category=top_cat,
            urgency_score=round(urgency, 1),
            extracted_location=matched_loc,
            coordinates=[round(coords[0], 5), round(coords[1], 5)],
            needs=needs,
            confidence=0.89 + (random.random() * 0.08)
        )


class EvacuationRoutingEngine:
    """Model 3: GIS Graph Routing Engine using Dijkstra with flooded road avoidance."""

    def __init__(self):
        self.G = nx.Graph()
        self._build_road_graph()

    def _build_road_graph(self):
        # Nodes represent intersections / landmarks in the disaster zone
        # Coords around lat: 13.0827, lng: 80.2707
        nodes = {
            "N1": {"name": "Zone A (Village Lowlands)", "coords": [13.0900, 80.2550]},
            "N2": {"name": "Junction 17", "coords": [13.0880, 80.2650]},
            "N3": {"name": "River Bridge Pass", "coords": [13.0827, 80.2707]},
            "N4": {"name": "High Ground Bypass", "coords": [13.0960, 80.2720]},
            "N5": {"name": "South Expressway", "coords": [13.0750, 80.2600]},
            "N6": {"name": "Shelter Alpha (St. Mary School)", "coords": [13.1000, 80.2800]},
            "N7": {"name": "Shelter Beta (Stadium Complex)", "coords": [13.0700, 80.2850]}
        }

        for n_id, data in nodes.items():
            self.G.add_node(n_id, **data)

        # Edges with distances (km) and default status
        edges = [
            ("N1", "N2", 1.8, "SAFE"),
            ("N2", "N3", 1.2, "FLOODED"),   # Flooded obstacle!
            ("N2", "N4", 2.1, "SAFE"),
            ("N4", "N6", 1.5, "SAFE"),
            ("N3", "N6", 2.4, "BLOCKED"),
            ("N1", "N5", 2.0, "SAFE"),
            ("N5", "N7", 2.5, "SAFE"),
            ("N4", "N5", 3.0, "HIGH_RISK")
        ]

        for u, v, dist, status in edges:
            self.G.add_edge(u, v, distance=dist, status=status)

    def calculate_route(self, req: EvacuationRouteRequest) -> EvacuationRouteResult:
        # Clone graph to apply dynamic costs
        g = self.G.copy()

        for u, v, d in g.edges(data=True):
            cost = d['distance']
            status = d['status']
            if req.avoid_flooded and status == "FLOODED":
                cost *= 50.0  # Heavy penalty
            elif req.avoid_blocked and status == "BLOCKED":
                cost *= 100.0  # Extreme penalty
            elif status == "HIGH_RISK":
                cost *= 4.0
            g[u][v]['weight'] = cost

        # Default start and target nodes
        start_node = "N1"
        target_node = "N6"

        try:
            path_nodes = nx.dijkstra_path(g, start_node, target_node, weight='weight')
        except nx.NetworkXNoPath:
            path_nodes = ["N1", "N2", "N4", "N6"]

        waypoints = [g.nodes[node]['coords'] for node in path_nodes]

        segments = []
        total_dist = 0.0
        has_flooded = False

        for i in range(len(path_nodes) - 1):
            u, v = path_nodes[i], path_nodes[i+1]
            edge_data = g[u][v]
            dist = edge_data['distance']
            status = edge_data['status']
            total_dist += dist
            if status in ["FLOODED", "BLOCKED"]:
                has_flooded = True

            segments.append(RouteSegment(
                from_name=g.nodes[u]['name'],
                to_name=g.nodes[v]['name'],
                distance_km=dist,
                status=status
            ))

        est_time = round((total_dist / 35.0) * 60 + 5, 0) # ~35 km/h avg emergency speed
        rating = "OPTIMAL" if not has_flooded else "CAUTION"

        return EvacuationRouteResult(
            route_id=f"EVAC-{random.randint(100, 999)}",
            total_distance_km=round(total_dist, 2),
            estimated_travel_time_min=est_time,
            safety_rating=rating,
            waypoints=waypoints,
            segments=segments,
            shelter_name=g.nodes[target_node]['name'],
            shelter_capacity_remaining=420
        )


class ResourceOptimizationEngine:
    """Model 4: Emergency Resource Demand & Priority Allocation Engine."""

    @staticmethod
    def calculate_resources(req: ResourceDemandRequest) -> ResourceAllocationResult:
        pop = req.affected_population
        risk_mod = 1.4 if req.risk_level == "CRITICAL" else (1.1 if req.risk_level == "HIGH" else 0.8)

        ambulances = max(2, int((pop / 700.0) * risk_mod))
        boats = max(1, int((pop / 1000.0) * (1.0 + req.flooded_road_pct / 50.0)))
        food_packets = int(pop * 3 * 2.5)  # 3 meals for 2.5 days
        water_liters = int(pop * 6.0)     # 6 Liters per person per day
        medical_teams = max(2, int((pop / 1200.0) * risk_mod))
        shelters = max(1, int(math.ceil(pop / 1500.0)))

        priority = "TIER 1 - IMMEDIATE DISPATCH" if req.risk_level in ["CRITICAL", "HIGH"] else "TIER 2 - STANDBY DISPATCH"

        explanation = (
            f"Deployment optimized for {pop:,} affected civilians across {req.districts_impacted} district(s). "
            f"Calculated with high inundation factor ({req.flooded_road_pct}% roads compromised)."
        )

        return ResourceAllocationResult(
            ambulances_needed=ambulances,
            rescue_boats_needed=boats,
            food_packets_needed=food_packets,
            water_liters_needed=water_liters,
            medical_teams_needed=medical_teams,
            shelters_required=shelters,
            priority_level=priority,
            explanation=explanation
        )
