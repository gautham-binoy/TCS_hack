from typing import Dict, Any
from app.repositories.base import BuildingRepository

building_repo = BuildingRepository()

class SimulationService:
    def run_simulation(self, request: Dict[str, Any]) -> Dict[str, Any]:
        scenario = request.get("scenario")
        value = request.get("value", 0)
        building_id = request.get("buildingId")
        
        buildings = [building_repo.get_by_id(building_id)] if building_id else building_repo.get_all()
        buildings = [b for b in buildings if b] # filter out Nones
        
        if not buildings:
            raise ValueError("No buildings found for simulation.")
            
        current_energy = sum(b["energy"]["current_usage"] for b in buildings)
        current_waste = sum(b["waste"]["current_level"] for b in buildings) / len(buildings)
        current_carbon = sum(b["carbon"]["estimated_emissions"] for b in buildings)
        
        current = {
            "energy": current_energy,
            "waste": current_waste,
            "carbon": current_carbon
        }
        
        projected = current.copy()
        impact = {}
        assumptions = []
        
        if scenario == "reduce_energy":
            reduction = current_energy * (value / 100)
            projected["energy"] -= reduction
            carbon_reduction = reduction * 0.5 # rough estimate factor
            projected["carbon"] -= carbon_reduction
            impact = {
                "energy_saved": round(reduction, 2),
                "carbon_saved": round(carbon_reduction, 2)
            }
            assumptions = [f"Assumes a flat {value}% reduction in energy consumption across selected areas."]
            
        elif scenario == "reduce_waste":
            reduction = current_waste * (value / 100)
            projected["waste"] -= reduction
            impact = {
                "waste_reduction_percent": round(reduction, 2)
            }
            assumptions = [f"Assumes {value}% more effective waste recycling/reduction programs."]
            
        elif scenario == "led_replacement":
            # Assume 15% energy reduction for replacing lighting with LEDs
            reduction = current_energy * 0.15
            projected["energy"] -= reduction
            carbon_reduction = reduction * 0.5
            projected["carbon"] -= carbon_reduction
            impact = {
                "energy_saved": round(reduction, 2),
                "carbon_saved": round(carbon_reduction, 2)
            }
            assumptions = ["Assumes lighting is 30% of energy usage, and LEDs are 50% more efficient."]
            
        else:
            raise ValueError(f"Unknown simulation scenario: {scenario}")
            
        return {
            "current": current,
            "projected": projected,
            "impact": impact,
            "assumptions": assumptions
        }
