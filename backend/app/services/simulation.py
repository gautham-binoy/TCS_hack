from typing import Dict, Any
import math
from app.db import db

class SimulationService:
    def run_simulation(self, request: Dict[str, Any]) -> Dict[str, Any]:
        baseline_energy_kwh = 10200000
        baseline_waste_kg = 925000
        baseline_water_liters = 67400000
        baseline_carbon_tonnes = 3010
        baseline_cost_dollars = 1632000
        
        electricity_pct = float(request.get("electricityReductionPct") or 0)
        waste_pct = float(request.get("wasteReductionPct") or 0)
        led_pct = float(request.get("ledReplacementPct") or 0)
        solar_kw = float(request.get("solarAdditionKw") or 0)
        scenario_id = request.get("scenarioId")
        building_id = request.get("buildingId")
        
        scenario_title = 'Custom What-If Scenario'
        
        if scenario_id == 'scenario-elec-10':
            scenario_title = 'Reduce Electricity by 10%'
            electricity_pct = 10.0
        elif scenario_id == 'scenario-waste-20':
            scenario_title = 'Reduce Plastic & Solid Waste by 20%'
            waste_pct = 20.0
        elif scenario_id == 'scenario-led':
            scenario_title = 'Replace Conventional Lights with LEDs'
            led_pct = 65.0
            electricity_pct = 8.5
        elif scenario_id == 'scenario-solar-park':
            scenario_title = 'North Parking Solar Canopy Expansion'
            solar_kw = 250.0
            electricity_pct = 6.2
            
        effective_energy_pct = min(35.0, electricity_pct + (led_pct * 0.12) + (6.2 if solar_kw else 0))
        effective_waste_pct = min(50.0, waste_pct)
        effective_water_pct = 8.5 if building_id else 4.2
        
        energy_reduced_kwh = round(baseline_energy_kwh * (effective_energy_pct / 100))
        waste_reduced_kg = round(baseline_waste_kg * (effective_waste_pct / 100))
        water_reduced_liters = round(baseline_water_liters * (effective_water_pct / 100))
        
        carbon_reduced_tonnes = round(((energy_reduced_kwh * 0.385) + (waste_reduced_kg * 0.82)) / 1000)
        carbon_pct_reduction = float(f"{((carbon_reduced_tonnes / baseline_carbon_tonnes) * 100):.1f}")
        
        cost_savings_dollars = round((energy_reduced_kwh * 0.16) + (waste_reduced_kg * 0.12))
        cost_savings_pct = float(f"{((cost_savings_dollars / baseline_cost_dollars) * 100):.1f}")
        
        trees_planted = round(carbon_reduced_tonnes * 16.5)
        passenger_car_km = round(carbon_reduced_tonnes * 4150)
        homes_powered = round(energy_reduced_kwh / 10500)
        
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        timeline = []
        for idx, m in enumerate(months):
            ramp_factor = min(1.0, (idx + 2) / 6.0)
            month_baseline_energy = round(baseline_energy_kwh / 12)
            month_projected_energy = round(month_baseline_energy - ((energy_reduced_kwh / 12) * ramp_factor))
            month_baseline_carbon = round(baseline_carbon_tonnes / 12)
            month_projected_carbon = round(month_baseline_carbon - ((carbon_reduced_tonnes / 12) * ramp_factor))
            timeline.append({
                "month": m,
                "baselineEnergyMwh": round(month_baseline_energy / 1000),
                "projectedEnergyMwh": round(month_projected_energy / 1000),
                "baselineCarbonTonnes": month_baseline_carbon,
                "projectedCarbonTonnes": month_projected_carbon,
            })
            
        b_name = next((b["name"] for b in db.buildings if b["id"] == building_id), 'Selected Building') if building_id else 'Campus-Wide Scope'
        scope_label = f"Building Scope: {b_name}" if building_id else 'Campus-Wide Scope'
        
        return {
            "scenarioTitle": scenario_title,
            "scopeLabel": scope_label,
            "currentValue": {
                "energyKwhYear": baseline_energy_kwh,
                "wasteKgYear": baseline_waste_kg,
                "waterLitersYear": baseline_water_liters,
                "carbonTonnesCo2eYear": baseline_carbon_tonnes,
                "operatingCostDollarsYear": baseline_cost_dollars,
            },
            "projectedValue": {
                "energyKwhYear": baseline_energy_kwh - energy_reduced_kwh,
                "wasteKgYear": baseline_waste_kg - waste_reduced_kg,
                "waterLitersYear": baseline_water_liters - water_reduced_liters,
                "carbonTonnesCo2eYear": baseline_carbon_tonnes - carbon_reduced_tonnes,
                "operatingCostDollarsYear": baseline_cost_dollars - cost_savings_dollars,
            },
            "estimatedReduction": {
                "energyKwh": energy_reduced_kwh,
                "energyPct": float(f"{effective_energy_pct:.1f}"),
                "wasteKg": waste_reduced_kg,
                "wastePct": float(f"{effective_waste_pct:.1f}"),
                "waterLiters": water_reduced_liters,
                "waterPct": float(f"{effective_water_pct:.1f}"),
                "costSavingsDollars": cost_savings_dollars,
                "costSavingsPct": cost_savings_pct,
            },
            "estimatedCarbonImpact": {
                "carbonTonnesAvoided": carbon_reduced_tonnes,
                "carbonPctReduction": carbon_pct_reduction,
                "treesPlantedEquivalent": trees_planted,
                "passengerCarKmOffset": passenger_car_km,
                "homesPoweredEquivalent": homes_powered,
            },
            "timeline": timeline,
            "methodologyNote": "Estimates based on Campus EcoTwin predictive energy & waste balance models (NREL solar factors & EPA WARM carbon coefficients)."
        }
