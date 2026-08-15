import sys
import os
import unittest

# Ensure backend directory is in path
sys.path.insert(0, os.path.dirname(__file__))

from models import (
    WeatherSensorData, SocialPostInput,
    EvacuationRouteRequest, ResourceDemandRequest
)
from ai_engines import (
    RiskPredictionEngine, SocialMediaNLPEngine,
    EvacuationRoutingEngine, ResourceOptimizationEngine
)

class TestAIEngines(unittest.TestCase):

    def test_risk_prediction_critical(self):
        sensor = WeatherSensorData(
            rainfall_mm_hr=95.0,
            river_level_m=5.0,
            elevation_m=8.0,
            slope_deg=2.0,
            soil_moisture_pct=95.0,
            population_density=5000
        )
        res = RiskPredictionEngine.predict_risk(sensor)
        self.assertGreaterEqual(res.risk_score, 80.0)
        self.assertEqual(res.severity, "CRITICAL")
        self.assertEqual(len(res.xai_breakdown), 4)

    def test_social_nlp_classification(self):
        post = SocialMediaNLPEngine.classify_post(
            "Water entered houses near Main River Bridge, 5 people trapped on roof",
            username="TestUser"
        )
        self.assertIn(post.category, ["Flood", "Rescue"])
        self.assertGreaterEqual(post.urgency_score, 8.0)
        self.assertEqual(len(post.coordinates), 2)
        self.assertIn("Rescue Boat", post.needs)

    def test_evacuation_routing(self):
        router = EvacuationRoutingEngine()
        req = EvacuationRouteRequest(
            origin=[13.0900, 80.2550],
            destination=[13.1000, 80.2800],
            avoid_flooded=True,
            avoid_blocked=True
        )
        res = router.calculate_route(req)
        self.assertGreater(res.total_distance_km, 0)
        self.assertGreater(len(res.waypoints), 1)

    def test_resource_optimization(self):
        req = ResourceDemandRequest(
            affected_population=8500,
            risk_level="CRITICAL",
            flooded_road_pct=40.0,
            districts_impacted=4
        )
        res = ResourceOptimizationEngine.calculate_resources(req)
        self.assertGreater(res.ambulances_needed, 5)
        self.assertGreater(res.food_packets_needed, 20000)
        self.assertGreater(res.water_liters_needed, 40000)

if __name__ == "__main__":
    unittest.main()
