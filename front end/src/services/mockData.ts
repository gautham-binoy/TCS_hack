import {
  CampusOverview,
  Building,
  Sensor,
  WasteBin,
  WaterStation,
  SolarArea,
  CampusRoad,
  CampusGreenArea,
  Alert,
  Recommendation,
  OverallMetrics,
  AIQueryResponse,
  SimulationResponse,
  SimulationRequest,
} from '../types';

// Campus center and boundary coordinates
export const CAMPUS_CENTER: [number, number] = [10.053735, 76.619261];

export const mockCampusOverview: CampusOverview = {
  id: 'campus-vit-main',
  name: 'Verdant EcoCampus Twin',
  location: 'Campus Grounds',
  centerCoordinates: CAMPUS_CENTER,
  zoomLevel: 18,
  bounds: [
    [10.052039, 76.616795],
    [10.056123, 76.623690],
  ],
  totalBuildings: 9,
  totalSensors: 42,
  totalWasteBins: 8,
  totalWaterStations: 8,
  solarCapacityKw: 750,
  sustainabilityScore: 86,
  carbonNeutralTargetYear: 2030,
  currentWeather: {
    tempC: 21.4,
    solarRadiationWm2: 840,
    airQualityIndex: 28, // Good
    condition: 'Optimal Solar Generation',
  },
};

export const mockBuildings: Building[] = [
  {
    id: 'bldg-eng',
    name: 'Science & Engineering Hall',
    code: 'SEH-01',
    category: 'research',
    coordinates: [37.4305, -122.1712],
    polygonCoordinates: [
      [37.4312, -122.1722],
      [37.4312, -122.1702],
      [37.4298, -122.1702],
      [37.4298, -122.1722],
    ],
    sustainabilityScore: 84,
    floorAreaSqMeters: 14200,
    yearBuilt: 2018,
    leedCertification: 'Gold',
    metrics: {
      energyKwhPerDay: 4850,
      energyPeakKw: 420,
      wasteKgPerDay: 280,
      wasteDiversionPct: 78,
      waterLitersPerDay: 18400,
      waterRecycledPct: 45,
      carbonKgCo2ePerDay: 1220,
      carbonIntensityRating: 'B',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 4720, waterLiters: 18100, carbonKg: 1190, wasteKg: 270 },
      { time: 'Tue', energyKwh: 4890, waterLiters: 18900, carbonKg: 1240, wasteKg: 290 },
      { time: 'Wed', energyKwh: 5120, waterLiters: 19400, carbonKg: 1310, wasteKg: 310 },
      { time: 'Thu', energyKwh: 4980, waterLiters: 18600, carbonKg: 1260, wasteKg: 285 },
      { time: 'Fri', energyKwh: 4750, waterLiters: 17800, carbonKg: 1200, wasteKg: 275 },
      { time: 'Sat', energyKwh: 2900, waterLiters: 9200, carbonKg: 720, wasteKg: 130 },
      { time: 'Sun', energyKwh: 2450, waterLiters: 8400, carbonKg: 610, wasteKg: 110 },
    ],
    alerts: [
      {
        id: 'alert-eng-1',
        severity: 'warning',
        title: 'HVAC Chiller Surge Detected',
        description: 'Cleanroom laboratory AC units on 3rd floor registered a 14% power surge between 13:00 and 15:00.',
        category: 'energy',
        buildingId: 'bldg-eng',
        buildingName: 'Science & Engineering Hall',
        timestamp: '2 hours ago',
        status: 'active',
      },
    ],
    recommendations: [
      {
        id: 'rec-eng-1',
        title: 'Opt-in Fume Hood Exhaust Scheduling',
        description: 'Adjust automated variable air volume (VAV) on research fume hoods outside peak lab hours.',
        impact: 'high',
        estimatedSavings: '12% Energy (~$1,400/mo)',
        category: 'energy',
        buildingId: 'bldg-eng',
        actionableStep: 'Schedule automated night-setback policy via BMS controller.',
      },
      {
        id: 'rec-eng-2',
        title: 'Greywater Loop Recalibration',
        description: 'Cleanroom cooling tower bleed line can be routed to irrigation bioswale 2.',
        impact: 'medium',
        estimatedSavings: '2,200 L/day Water',
        category: 'water',
        buildingId: 'bldg-eng',
      },
    ],
  },
  {
    id: 'bldg-sust',
    name: 'Sustainable Tech & Innovation Center',
    code: 'STIC-02',
    category: 'academic',
    coordinates: [37.4290, -122.1670],
    polygonCoordinates: [
      [37.4297, -122.1679],
      [37.4297, -122.1661],
      [37.4283, -122.1661],
      [37.4283, -122.1679],
    ],
    sustainabilityScore: 96,
    floorAreaSqMeters: 8900,
    yearBuilt: 2023,
    leedCertification: 'Platinum',
    metrics: {
      energyKwhPerDay: 1420,
      energyPeakKw: 110,
      wasteKgPerDay: 95,
      wasteDiversionPct: 92,
      waterLitersPerDay: 5200,
      waterRecycledPct: 82,
      carbonKgCo2ePerDay: 180,
      carbonIntensityRating: 'A',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 1450, waterLiters: 5100, carbonKg: 190, wasteKg: 95 },
      { time: 'Tue', energyKwh: 1420, waterLiters: 5300, carbonKg: 180, wasteKg: 100 },
      { time: 'Wed', energyKwh: 1480, waterLiters: 5400, carbonKg: 195, wasteKg: 98 },
      { time: 'Thu', energyKwh: 1390, waterLiters: 5150, carbonKg: 175, wasteKg: 92 },
      { time: 'Fri', energyKwh: 1350, waterLiters: 4900, carbonKg: 165, wasteKg: 90 },
      { time: 'Sat', energyKwh: 780, waterLiters: 2200, carbonKg: 90, wasteKg: 35 },
      { time: 'Sun', energyKwh: 690, waterLiters: 1900, carbonKg: 80, wasteKg: 30 },
    ],
    alerts: [],
    recommendations: [
      {
        id: 'rec-sust-1',
        title: 'Maintain Active Photovoltaic Glazing',
        description: 'Bi-annual panel dust cleaning scheduled next Tuesday to maintain 98.4% photon harvest.',
        impact: 'low',
        estimatedSavings: '4% Solar Yield',
        category: 'energy',
        buildingId: 'bldg-sust',
      },
    ],
  },
  {
    id: 'bldg-union',
    name: 'Student Union & Dining Commons',
    code: 'SUDC-03',
    category: 'student_life',
    coordinates: [37.4272, -122.1718],
    polygonCoordinates: [
      [37.4279, -122.1728],
      [37.4279, -122.1708],
      [37.4265, -122.1708],
      [37.4265, -122.1728],
    ],
    sustainabilityScore: 78,
    floorAreaSqMeters: 11200,
    yearBuilt: 2012,
    leedCertification: 'Silver',
    metrics: {
      energyKwhPerDay: 5400,
      energyPeakKw: 480,
      wasteKgPerDay: 840,
      wasteDiversionPct: 74,
      waterLitersPerDay: 32000,
      waterRecycledPct: 35,
      carbonKgCo2ePerDay: 1740,
      carbonIntensityRating: 'C',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 5350, waterLiters: 31000, carbonKg: 1710, wasteKg: 820 },
      { time: 'Tue', energyKwh: 5420, waterLiters: 32500, carbonKg: 1750, wasteKg: 860 },
      { time: 'Wed', energyKwh: 5580, waterLiters: 33400, carbonKg: 1810, wasteKg: 890 },
      { time: 'Thu', energyKwh: 5480, waterLiters: 32800, carbonKg: 1760, wasteKg: 870 },
      { time: 'Fri', energyKwh: 5620, waterLiters: 34000, carbonKg: 1830, wasteKg: 910 },
      { time: 'Sat', energyKwh: 3800, waterLiters: 21000, carbonKg: 1200, wasteKg: 520 },
      { time: 'Sun', energyKwh: 3500, waterLiters: 19500, carbonKg: 1100, wasteKg: 490 },
    ],
    alerts: [
      {
        id: 'alert-union-1',
        severity: 'warning',
        title: 'High Food Organic Waste Contamination',
        description: 'Trash stream sensor bin B-04 detected 24% organic matter in general landfill bin.',
        category: 'waste',
        buildingId: 'bldg-union',
        buildingName: 'Student Union & Dining Commons',
        timestamp: '4 hours ago',
        status: 'active',
      },
    ],
    recommendations: [
      {
        id: 'rec-union-1',
        title: 'Smart Waste Weigh Scale Pilot',
        description: 'Install optical sorting nudges and plate-waste scale feedback to decrease food waste.',
        impact: 'high',
        estimatedSavings: '180 kg/day Waste Diversion',
        category: 'waste',
        buildingId: 'bldg-union',
      },
      {
        id: 'rec-union-2',
        title: 'Commercial Dishwasher Heat Recovery',
        description: 'Capture greywater thermal exhaust to preheat rinse water cycles.',
        impact: 'medium',
        estimatedSavings: '15% Gas/Electric Heating',
        category: 'energy',
        buildingId: 'bldg-union',
      },
    ],
  },
  {
    id: 'bldg-lib',
    name: 'Central Green Library',
    code: 'CGL-04',
    category: 'academic',
    coordinates: [37.4275, -122.1678],
    polygonCoordinates: [
      [37.4282, -122.1687],
      [37.4282, -122.1669],
      [37.4268, -122.1669],
      [37.4268, -122.1687],
    ],
    sustainabilityScore: 92,
    floorAreaSqMeters: 16500,
    yearBuilt: 2020,
    leedCertification: 'Platinum',
    metrics: {
      energyKwhPerDay: 2600,
      energyPeakKw: 210,
      wasteKgPerDay: 140,
      wasteDiversionPct: 88,
      waterLitersPerDay: 9400,
      waterRecycledPct: 65,
      carbonKgCo2ePerDay: 580,
      carbonIntensityRating: 'A',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 2620, waterLiters: 9500, carbonKg: 590, wasteKg: 142 },
      { time: 'Tue', energyKwh: 2680, waterLiters: 9700, carbonKg: 610, wasteKg: 145 },
      { time: 'Wed', energyKwh: 2750, waterLiters: 9900, carbonKg: 630, wasteKg: 150 },
      { time: 'Thu', energyKwh: 2640, waterLiters: 9400, carbonKg: 585, wasteKg: 138 },
      { time: 'Fri', energyKwh: 2510, waterLiters: 8900, carbonKg: 550, wasteKg: 130 },
      { time: 'Sat', energyKwh: 1820, waterLiters: 6400, carbonKg: 400, wasteKg: 95 },
      { time: 'Sun', energyKwh: 1980, waterLiters: 6900, carbonKg: 430, wasteKg: 105 },
    ],
    alerts: [],
    recommendations: [
      {
        id: 'rec-lib-1',
        title: 'Daylight Harvesting Blind Automation',
        description: 'Sync motorized exterior louvers with sun azimuth to cut ambient artificial lighting.',
        impact: 'medium',
        estimatedSavings: '8% Lighting kWh',
        category: 'energy',
        buildingId: 'bldg-lib',
      },
    ],
  },
  {
    id: 'bldg-res-n',
    name: 'North Eco-Residence Village',
    code: 'ERV-05',
    category: 'residential',
    coordinates: [37.4320, -122.1675],
    polygonCoordinates: [
      [37.4327, -122.1685],
      [37.4327, -122.1665],
      [37.4313, -122.1665],
      [37.4313, -122.1685],
    ],
    sustainabilityScore: 88,
    floorAreaSqMeters: 18000,
    yearBuilt: 2021,
    leedCertification: 'Platinum',
    metrics: {
      energyKwhPerDay: 3900,
      energyPeakKw: 310,
      wasteKgPerDay: 460,
      wasteDiversionPct: 82,
      waterLitersPerDay: 36000,
      waterRecycledPct: 60,
      carbonKgCo2ePerDay: 980,
      carbonIntensityRating: 'B',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 3880, waterLiters: 35800, carbonKg: 970, wasteKg: 450 },
      { time: 'Tue', energyKwh: 3920, waterLiters: 36200, carbonKg: 990, wasteKg: 465 },
      { time: 'Wed', energyKwh: 3950, waterLiters: 36500, carbonKg: 1010, wasteKg: 470 },
      { time: 'Thu', energyKwh: 3910, waterLiters: 36000, carbonKg: 980, wasteKg: 455 },
      { time: 'Fri', energyKwh: 4050, waterLiters: 37400, carbonKg: 1040, wasteKg: 490 },
      { time: 'Sat', energyKwh: 4200, waterLiters: 38900, carbonKg: 1090, wasteKg: 510 },
      { time: 'Sun', energyKwh: 4120, waterLiters: 38200, carbonKg: 1060, wasteKg: 495 },
    ],
    alerts: [],
    recommendations: [
      {
        id: 'rec-res-1',
        title: 'Dorm Energy Competition Engagement',
        description: 'Gamify hall energy usage with live floor dashboards to incentivize phantom power reductions.',
        impact: 'medium',
        estimatedSavings: '5-9% Dorm Electricity',
        category: 'energy',
        buildingId: 'bldg-res-n',
      },
    ],
  },
  {
    id: 'bldg-res-s',
    name: 'South Heritage Hall',
    code: 'SHH-06',
    category: 'residential',
    coordinates: [37.4245, -122.1700],
    polygonCoordinates: [
      [37.4252, -122.1710],
      [37.4252, -122.1690],
      [37.4238, -122.1690],
      [37.4238, -122.1710],
    ],
    sustainabilityScore: 71,
    floorAreaSqMeters: 12500,
    yearBuilt: 1994,
    leedCertification: 'Certified',
    metrics: {
      energyKwhPerDay: 4600,
      energyPeakKw: 390,
      wasteKgPerDay: 390,
      wasteDiversionPct: 62,
      waterLitersPerDay: 29000,
      waterRecycledPct: 15,
      carbonKgCo2ePerDay: 1520,
      carbonIntensityRating: 'C',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 4550, waterLiters: 28800, carbonKg: 1500, wasteKg: 385 },
      { time: 'Tue', energyKwh: 4610, waterLiters: 29200, carbonKg: 1530, wasteKg: 392 },
      { time: 'Wed', energyKwh: 4680, waterLiters: 29600, carbonKg: 1560, wasteKg: 400 },
      { time: 'Thu', energyKwh: 4620, waterLiters: 29100, carbonKg: 1520, wasteKg: 388 },
      { time: 'Fri', energyKwh: 4700, waterLiters: 29800, carbonKg: 1570, wasteKg: 405 },
      { time: 'Sat', energyKwh: 4850, waterLiters: 31200, carbonKg: 1640, wasteKg: 425 },
      { time: 'Sun', energyKwh: 4790, waterLiters: 30800, carbonKg: 1610, wasteKg: 415 },
    ],
    alerts: [
      {
        id: 'alert-res-s-1',
        severity: 'critical',
        title: 'Continuous Restroom Water Leak',
        description: 'Main wing riser water meter shows unbroken baseline flow of 14.2 L/min overnight.',
        category: 'water',
        buildingId: 'bldg-res-s',
        buildingName: 'South Heritage Hall',
        timestamp: '1 hour ago',
        status: 'active',
      },
    ],
    recommendations: [
      {
        id: 'rec-res-s-1',
        title: 'LED Retrofit & Smart Thermostats',
        description: 'Replace legacy fluorescent fixtures with 12W LED tubes and smart room setback sensors.',
        impact: 'high',
        estimatedSavings: '22% Electricity (~$2,100/mo)',
        category: 'energy',
        buildingId: 'bldg-res-s',
      },
      {
        id: 'rec-res-s-2',
        title: 'Low-Flow Aerator Installations',
        description: 'Upgrade faucets and showerheads to 1.5 GPM EPA WaterSense fixtures.',
        impact: 'high',
        estimatedSavings: '7,500 L/day Water',
        category: 'water',
        buildingId: 'bldg-res-s',
      },
    ],
  },
  {
    id: 'bldg-sport',
    name: 'Sports & Aquatics Complex',
    code: 'SAC-07',
    category: 'athletics',
    coordinates: [37.4260, -122.1645],
    polygonCoordinates: [
      [37.4268, -122.1656],
      [37.4268, -122.1634],
      [37.4252, -122.1634],
      [37.4252, -122.1656],
    ],
    sustainabilityScore: 68,
    floorAreaSqMeters: 15800,
    yearBuilt: 2008,
    leedCertification: 'Silver',
    metrics: {
      energyKwhPerDay: 6100,
      energyPeakKw: 560,
      wasteKgPerDay: 320,
      wasteDiversionPct: 68,
      waterLitersPerDay: 48000,
      waterRecycledPct: 20,
      carbonKgCo2ePerDay: 2080,
      carbonIntensityRating: 'D',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 6050, waterLiters: 47200, carbonKg: 2050, wasteKg: 310 },
      { time: 'Tue', energyKwh: 6120, waterLiters: 48500, carbonKg: 2090, wasteKg: 325 },
      { time: 'Wed', energyKwh: 6200, waterLiters: 49100, carbonKg: 2130, wasteKg: 330 },
      { time: 'Thu', energyKwh: 6140, waterLiters: 48600, carbonKg: 2100, wasteKg: 320 },
      { time: 'Fri', energyKwh: 6250, waterLiters: 49800, carbonKg: 2150, wasteKg: 340 },
      { time: 'Sat', energyKwh: 5800, waterLiters: 44000, carbonKg: 1950, wasteKg: 290 },
      { time: 'Sun', energyKwh: 5400, waterLiters: 41000, carbonKg: 1800, wasteKg: 270 },
    ],
    alerts: [
      {
        id: 'alert-sport-1',
        severity: 'warning',
        title: 'Olympic Pool Heating Surge',
        description: 'Pool thermal cover was not engaged overnight, causing a 35% natural gas heating spike.',
        category: 'energy',
        buildingId: 'bldg-sport',
        buildingName: 'Sports & Aquatics Complex',
        timestamp: '5 hours ago',
        status: 'active',
      },
    ],
    recommendations: [
      {
        id: 'rec-sport-1',
        title: 'Solar Thermal Preheating Array',
        description: 'Install roof-mounted evacuated tube solar collectors dedicated to pool circulation.',
        impact: 'high',
        estimatedSavings: '34% Heating Energy',
        category: 'energy',
        buildingId: 'bldg-sport',
      },
      {
        id: 'rec-sport-2',
        title: 'Automated Pool Thermal Blanketing',
        description: 'Motorized roller deployment scheduled at closing reduces evaporation heat loss by 70%.',
        impact: 'high',
        estimatedSavings: '$1,850/mo Energy & 4,000 L Water',
        category: 'energy',
        buildingId: 'bldg-sport',
      },
    ],
  },
  {
    id: 'bldg-admin',
    name: 'University Administration Pavilion',
    code: 'UAP-08',
    category: 'administration',
    coordinates: [37.4298, -122.1640],
    polygonCoordinates: [
      [37.4305, -122.1648],
      [37.4305, -122.1632],
      [37.4291, -122.1632],
      [37.4291, -122.1648],
    ],
    sustainabilityScore: 89,
    floorAreaSqMeters: 7200,
    yearBuilt: 2016,
    leedCertification: 'Gold',
    metrics: {
      energyKwhPerDay: 1850,
      energyPeakKw: 160,
      wasteKgPerDay: 110,
      wasteDiversionPct: 86,
      waterLitersPerDay: 6200,
      waterRecycledPct: 50,
      carbonKgCo2ePerDay: 460,
      carbonIntensityRating: 'A',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 1980, waterLiters: 6400, carbonKg: 500, wasteKg: 120 },
      { time: 'Tue', energyKwh: 2020, waterLiters: 6500, carbonKg: 510, wasteKg: 125 },
      { time: 'Wed', energyKwh: 2010, waterLiters: 6450, carbonKg: 505, wasteKg: 122 },
      { time: 'Thu', energyKwh: 1970, waterLiters: 6300, carbonKg: 495, wasteKg: 118 },
      { time: 'Fri', energyKwh: 1750, waterLiters: 5800, carbonKg: 430, wasteKg: 105 },
      { time: 'Sat', energyKwh: 620, waterLiters: 1800, carbonKg: 140, wasteKg: 30 },
      { time: 'Sun', energyKwh: 580, waterLiters: 1600, carbonKg: 130, wasteKg: 25 },
    ],
    alerts: [],
    recommendations: [
      {
        id: 'rec-admin-1',
        title: 'Zero-Waste Digital Workflow Policy',
        description: 'Transition executive print contracts to cloud-based signoff, aiming for 95% paper reduction.',
        impact: 'low',
        estimatedSavings: '45 kg/month Paper',
        category: 'waste',
        buildingId: 'bldg-admin',
      },
    ],
  },
  {
    id: 'bldg-microgrid',
    name: 'Central Energy & Microgrid Plant',
    code: 'CEMP-09',
    category: 'infrastructure',
    coordinates: [37.4325, -122.1725],
    polygonCoordinates: [
      [37.4332, -122.1735],
      [37.4332, -122.1715],
      [37.4318, -122.1715],
      [37.4318, -122.1735],
    ],
    sustainabilityScore: 94,
    floorAreaSqMeters: 5500,
    yearBuilt: 2022,
    leedCertification: 'Platinum',
    metrics: {
      energyKwhPerDay: 850,
      energyPeakKw: 95,
      wasteKgPerDay: 40,
      wasteDiversionPct: 95,
      waterLitersPerDay: 3500,
      waterRecycledPct: 90,
      carbonKgCo2ePerDay: 110,
      carbonIntensityRating: 'A',
    },
    historicalTrends: [
      { time: 'Mon', energyKwh: 860, waterLiters: 3500, carbonKg: 115, wasteKg: 40 },
      { time: 'Tue', energyKwh: 850, waterLiters: 3600, carbonKg: 112, wasteKg: 42 },
      { time: 'Wed', energyKwh: 870, waterLiters: 3550, carbonKg: 116, wasteKg: 39 },
      { time: 'Thu', energyKwh: 840, waterLiters: 3450, carbonKg: 108, wasteKg: 41 },
      { time: 'Fri', energyKwh: 830, waterLiters: 3400, carbonKg: 105, wasteKg: 38 },
      { time: 'Sat', energyKwh: 790, waterLiters: 3200, carbonKg: 98, wasteKg: 30 },
      { time: 'Sun', energyKwh: 780, waterLiters: 3100, carbonKg: 95, wasteKg: 28 },
    ],
    alerts: [],
    recommendations: [
      {
        id: 'rec-micro-1',
        title: 'Grid Peak Shaving Battery Discharge',
        description: 'Auto-discharge 1.2 MWh battery reserve between 16:00 and 19:00 to reduce grid tariff surge.',
        impact: 'high',
        estimatedSavings: '$3,800/mo Peak Demand Charges',
        category: 'energy',
        buildingId: 'bldg-microgrid',
      },
    ],
  },
];

export const mockSensors: Sensor[] = [
  { id: 'sens-01', code: 'AQ-ENG-01', name: 'Outdoor Air Quality Node 1', type: 'air_quality', location: 'Science Hall Courtyard', coordinates: [37.4315, -122.1708], buildingId: 'bldg-eng', value: 24, unit: 'AQI', status: 'online', lastUpdated: '1 min ago' },
  { id: 'sens-02', code: 'EM-ENG-MAIN', name: 'Main Feeder Smart Meter', type: 'energy', location: 'Science Hall Substation', coordinates: [37.4300, -122.1720], buildingId: 'bldg-eng', value: 412, unit: 'kW', status: 'warning', lastUpdated: 'Just now' },
  { id: 'sens-03', code: 'WF-ENG-01', name: 'Cooling Tower Flow Sensor', type: 'water_flow', location: 'Science Hall Utility Room', coordinates: [37.4308, -122.1725], buildingId: 'bldg-eng', value: 34.5, unit: 'L/min', status: 'online', lastUpdated: '3 mins ago' },
  { id: 'sens-04', code: 'SOL-PARK-01', name: 'Solar Inverter Cluster A', type: 'solar', location: 'North Parking Canopy', coordinates: [37.4335, -122.1695], value: 485, unit: 'kW', status: 'online', lastUpdated: 'Just now' },
  { id: 'sens-05', code: 'AQ-UNION-01', name: 'Dining Hall Indoor CO2', type: 'air_quality', location: 'Student Union Atrium', coordinates: [37.4276, -122.1714], buildingId: 'bldg-union', value: 640, unit: 'ppm', status: 'online', lastUpdated: '2 mins ago' },
  { id: 'sens-06', code: 'EM-UNION-01', name: 'Kitchen Power Monitor', type: 'energy', location: 'Dining Commons Kitchen', coordinates: [37.4268, -122.1712], buildingId: 'bldg-union', value: 168, unit: 'kW', status: 'online', lastUpdated: 'Just now' },
  { id: 'sens-07', code: 'WF-RES-LEAK', name: 'Domestic Water Main Riser', type: 'water_flow', location: 'South Heritage Hall B1', coordinates: [37.4242, -122.1698], buildingId: 'bldg-res-s', value: 14.2, unit: 'L/min', status: 'warning', lastUpdated: 'Just now' },
  { id: 'sens-08', code: 'AQ-LIB-01', name: 'Acoustic & IAQ Sensor', type: 'air_quality', location: 'Library Reading Room', coordinates: [37.4277, -122.1673], buildingId: 'bldg-lib', value: 18, unit: 'AQI', status: 'online', lastUpdated: '4 mins ago' },
  { id: 'sens-09', code: 'OCC-LIB-02', name: 'Occupancy Optical Sensor', type: 'occupancy', location: 'Library 2nd Floor Mezzanine', coordinates: [37.4272, -122.1682], buildingId: 'bldg-lib', value: 142, unit: 'people', status: 'online', lastUpdated: '1 min ago' },
  { id: 'sens-10', code: 'EM-SPORT-01', name: 'Pool Heat Pump Draw', type: 'energy', location: 'Aquatics Mechanical Room', coordinates: [37.4258, -122.1648], buildingId: 'bldg-sport', value: 245, unit: 'kW', status: 'warning', lastUpdated: 'Just now' },
  { id: 'sens-11', code: 'WF-SPORT-POOL', name: 'Make-up Water Flow', type: 'water_flow', location: 'Aquatics Center Inflow', coordinates: [37.4264, -122.1638], buildingId: 'bldg-sport', value: 22.8, unit: 'L/min', status: 'online', lastUpdated: '2 mins ago' },
  { id: 'sens-12', code: 'SOL-ROOF-STIC', name: 'Rooftop PV Pyranometer', type: 'solar', location: 'STIC Roof Observatory', coordinates: [37.4292, -122.1668], buildingId: 'bldg-sust', value: 890, unit: 'W/m²', status: 'online', lastUpdated: 'Just now' },
  { id: 'sens-13', code: 'TMP-SOIL-BIO', name: 'Bioswale Soil Moisture', type: 'water_flow', location: 'Central Bioswale Park', coordinates: [37.4288, -122.1702], value: 68, unit: '% moisture', status: 'online', lastUpdated: '5 mins ago' },
  { id: 'sens-14', code: 'EM-MICRO-BATT', name: 'BESS State of Charge', type: 'energy', location: 'Microgrid Battery Bay', coordinates: [37.4328, -122.1728], buildingId: 'bldg-microgrid', value: 86, unit: '% SoC', status: 'online', lastUpdated: 'Just now' },
];

export const mockWasteBins: WasteBin[] = [
  {
    "id": "bin-01",
    "code": "WB-LIB-01",
    "name": "Main Library Entrance",
    "type": "Paper & Recyclables",
    "icon": "\u267b\ufe0f",
    "category": "recycle",
    "fillLevel": 42,
    "coordinates": [
      10.053612802294898,
      76.61989161810067
    ],
    "location": "Main Library Entrance",
    "notes": "Accepts notebooks, clean cardboard, plastic bottles.",
    "status": "normal",
    "lastCollected": "2 hours ago"
  },
  {
    "id": "bin-02",
    "code": "WB-CAF-01",
    "name": "Cafeteria Block A",
    "type": "Food & Organic Waste",
    "icon": "\ud83c\udf4f",
    "category": "compost",
    "fillLevel": 78,
    "coordinates": [
      10.053131585449165,
      76.61911664648933
    ],
    "location": "Cafeteria Block A",
    "notes": "Compostable items only. No plastics or wraps.",
    "status": "near_full",
    "lastCollected": "45 mins ago"
  },
  {
    "id": "bin-03",
    "code": "WB-CS-01",
    "name": "Computer Science Lab Corridor",
    "type": "E-Waste Collection",
    "icon": "\ud83d\udd0b",
    "category": "ewaste",
    "fillLevel": 35,
    "coordinates": [
      10.052162275056173,
      76.6188653043451
    ],
    "location": "Computer Science Lab Corridor",
    "notes": "Small electronics, batteries, and cables.",
    "status": "normal",
    "lastCollected": "Yesterday"
  },
  {
    "id": "bin-04",
    "code": "WB-LAWN-01",
    "name": "Academic Lawn East",
    "type": "Paper & Recyclables",
    "icon": "\ud83d\uddd1\ufe0f",
    "category": "recycle",
    "fillLevel": 64,
    "coordinates": [
      10.052066031312407,
      76.61987067292199
    ],
    "location": "Academic Lawn East",
    "notes": "Accepts notebooks, clean cardboard, plastic bottles.",
    "status": "normal",
    "lastCollected": "3 hours ago"
  },
  {
    "id": "bin-05",
    "code": "WB-COURT-01",
    "name": "Central Courtyard",
    "type": "Paper & Recyclables",
    "icon": "\ud83d\uddd1\ufe0f",
    "category": "recycle",
    "fillLevel": 88,
    "coordinates": [
      10.053193456226616,
      76.61942384244338
    ],
    "location": "Central Courtyard",
    "notes": "Accepts notebooks, clean cardboard, plastic bottles.",
    "status": "full",
    "lastCollected": "5 hours ago"
  },
  {
    "id": "bin-06",
    "code": "WB-MECH-01",
    "name": "Mechanical Workshop Quad",
    "type": "Paper & Recyclables",
    "icon": "\ud83d\uddd1\ufe0f",
    "category": "recycle",
    "fillLevel": 51,
    "coordinates": [
      10.052712238756488,
      76.61872566982055
    ],
    "location": "Mechanical Workshop Quad",
    "notes": "Accepts notebooks, clean cardboard, plastic bottles.",
    "status": "normal",
    "lastCollected": "4 hours ago"
  },
  {
    "id": "bin-07",
    "code": "WB-PARK-01",
    "name": "North Parking Pathway",
    "type": "Paper & Recyclables",
    "icon": "\ud83d\uddd1\ufe0f",
    "category": "recycle",
    "fillLevel": 29,
    "coordinates": [
      10.053509684459698,
      76.61985670946953
    ],
    "location": "North Parking Pathway",
    "notes": "Accepts notebooks, clean cardboard, plastic bottles.",
    "status": "normal",
    "lastCollected": "1 hour ago"
  },
  {
    "id": "bin-08",
    "code": "WB-ADM-01",
    "name": "Admin Block Approach",
    "type": "Paper & Recyclables",
    "icon": "\ud83d\uddd1\ufe0f",
    "category": "recycle",
    "fillLevel": 72,
    "coordinates": [
      10.054204010581545,
      76.61917250029914
    ],
    "location": "Admin Block Approach",
    "notes": "Accepts notebooks, clean cardboard, plastic bottles.",
    "status": "near_full",
    "lastCollected": "3 hours ago"
  }
];

export const mockWaterStations: WaterStation[] = [
  { id: 'ws-01', name: 'Science Hall Level 1 Station', coordinates: [37.4303, -122.1716], location: 'Science & Engineering Hall L1', buildingId: 'bldg-eng', bottlesSaved: 48290, filterStatus: 'optimal', litersDispensed: 24145, status: 'online' },
  { id: 'ws-02', name: 'STIC Zero-Waste Fountain', coordinates: [37.4287, -122.1666], location: 'Sustainable Tech Center Atrium', buildingId: 'bldg-sust', bottlesSaved: 62410, filterStatus: 'optimal', litersDispensed: 31205, status: 'online' },
  { id: 'ws-03', name: 'Dining Commons Refill Bar', coordinates: [37.4274, -122.1716], location: 'Student Union Main Hub', buildingId: 'bldg-union', bottlesSaved: 94800, filterStatus: 'good', litersDispensed: 47400, status: 'online' },
  { id: 'ws-04', name: 'Library Quiet Garden Hydration', coordinates: [37.4278, -122.1675], location: 'Green Library Ground Floor', buildingId: 'bldg-lib', bottlesSaved: 73520, filterStatus: 'optimal', litersDispensed: 36760, status: 'online' },
  { id: 'ws-05', name: 'North Residence Community Bar', coordinates: [37.4322, -122.1678], location: 'North Residence Commons', buildingId: 'bldg-res-n', bottlesSaved: 51200, filterStatus: 'optimal', litersDispensed: 25600, status: 'online' },
  { id: 'ws-06', name: 'South Residence Hydration Point', coordinates: [37.4246, -122.1703], location: 'South Heritage Hall Lobby', buildingId: 'bldg-res-s', bottlesSaved: 38900, filterStatus: 'replace_soon', litersDispensed: 19450, status: 'online' },
  { id: 'ws-07', name: 'Aquatics Hydration Hub', coordinates: [37.4262, -122.1642], location: 'Sports & Aquatics Concourse', buildingId: 'bldg-sport', bottlesSaved: 88400, filterStatus: 'good', litersDispensed: 44200, status: 'online' },
];

export const mockSolarAreas: SolarArea[] = [
  {
    id: 'solar-north-park',
    name: 'North Commuter Canopy Solar Array',
    coordinates: [
      [37.4342, -122.1705],
      [37.4342, -122.1685],
      [37.4330, -122.1685],
      [37.4330, -122.1705],
    ],
    center: [37.4336, -122.1695],
    capacityKw: 450,
    currentOutputKw: 385,
    dailyProductionKwh: 2780,
    panelCount: 1120,
    efficiency: 21.8,
  },
  {
    id: 'solar-agrivoltaic',
    name: 'East Arboretum Agrivoltaic Meadow',
    coordinates: [
      [37.4305, -122.1625],
      [37.4305, -122.1610],
      [37.4285, -122.1610],
      [37.4285, -122.1625],
    ],
    center: [37.4295, -122.1617],
    capacityKw: 300,
    currentOutputKw: 255,
    dailyProductionKwh: 1890,
    panelCount: 780,
    efficiency: 22.4,
  },
];

export const mockRoads: CampusRoad[] = [
  {
    id: 'road-spine',
    name: 'Eco-Boulevard Primary Axis',
    type: 'road',
    coordinates: [
      [37.4345, -122.1695],
      [37.4310, -122.1695],
      [37.4285, -122.1695],
      [37.4235, -122.1695],
    ],
  },
  {
    id: 'road-cross',
    name: 'Innovation Promenade',
    type: 'pedestrian',
    coordinates: [
      [37.4285, -122.1740],
      [37.4285, -122.1695],
      [37.4285, -122.1630],
    ],
  },
  {
    id: 'road-north-loop',
    name: 'Science Ring Walkway',
    type: 'pedestrian',
    coordinates: [
      [37.4310, -122.1730],
      [37.4310, -122.1660],
      [37.4330, -122.1660],
    ],
  },
  {
    id: 'bike-perimeter',
    name: 'Greenway Commuter Bike Trail',
    type: 'bike_path',
    coordinates: [
      [37.4340, -122.1745],
      [37.4270, -122.1745],
      [37.4230, -122.1720],
      [37.4230, -122.1630],
      [37.4280, -122.1605],
      [37.4340, -122.1605],
    ],
  },
];

export const mockGreenAreas: CampusGreenArea[] = [
  {
    id: 'green-central',
    name: 'Campus Central Bioswale & Meadow',
    type: 'bioswale',
    coordinates: [
      [37.4295, -122.1710],
      [37.4295, -122.1685],
      [37.4280, -122.1685],
      [37.4280, -122.1710],
    ],
    areaSqM: 14500,
  },
  {
    id: 'green-arboretum',
    name: 'Verdant Botanical Arboretum',
    type: 'arboretum',
    coordinates: [
      [37.4320, -122.1650],
      [37.4320, -122.1620],
      [37.4275, -122.1620],
      [37.4275, -122.1650],
    ],
    areaSqM: 22000,
  },
  {
    id: 'green-south-park',
    name: 'Heritage Oak Grove & Rain Garden',
    type: 'park',
    coordinates: [
      [37.4255, -122.1735],
      [37.4255, -122.1715],
      [37.4235, -122.1715],
      [37.4235, -122.1735],
    ],
    areaSqM: 8800,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    title: 'Continuous Restroom Water Leak',
    description: 'Main wing riser water meter shows unbroken baseline flow of 14.2 L/min overnight.',
    category: 'water',
    buildingId: 'bldg-res-s',
    buildingName: 'South Heritage Hall',
    timestamp: '1 hour ago',
    status: 'active',
  },
  {
    id: 'alert-2',
    severity: 'warning',
    title: 'HVAC Chiller Surge Detected',
    description: 'Cleanroom laboratory AC units on 3rd floor registered a 14% power surge between 13:00 and 15:00.',
    category: 'energy',
    buildingId: 'bldg-eng',
    buildingName: 'Science & Engineering Hall',
    timestamp: '2 hours ago',
    status: 'active',
  },
  {
    id: 'alert-3',
    severity: 'warning',
    title: 'High Food Organic Waste Contamination',
    description: 'Trash stream sensor bin B-04 detected 24% organic matter in general landfill bin.',
    category: 'waste',
    buildingId: 'bldg-union',
    buildingName: 'Student Union & Dining Commons',
    timestamp: '4 hours ago',
    status: 'active',
  },
  {
    id: 'alert-4',
    severity: 'warning',
    title: 'Olympic Pool Heating Surge',
    description: 'Pool thermal cover was not engaged overnight, causing a 35% natural gas heating spike.',
    category: 'energy',
    buildingId: 'bldg-sport',
    buildingName: 'Sports & Aquatics Complex',
    timestamp: '5 hours ago',
    status: 'active',
  },
  {
    id: 'alert-5',
    severity: 'info',
    title: 'Optimal Solar Generation Period',
    description: 'Solar microgrid exceeding 640 kW generation. Battery energy storage system charging at 94% efficiency.',
    category: 'energy',
    buildingId: 'bldg-microgrid',
    buildingName: 'Central Energy & Microgrid Plant',
    timestamp: 'Just now',
    status: 'active',
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Shift HVAC Pre-Cooling in Research Centers',
    description: 'Pre-cool Science & Engineering Hall by 1.5°C during high-solar generation hours (11:00-14:00) to flatten grid peak draw.',
    impact: 'high',
    estimatedSavings: '$4,200/mo & 8.4 Tons CO2e',
    category: 'energy',
    buildingId: 'bldg-eng',
    actionableStep: 'Enable automated precooling rule in EcoTwin BMS connector.',
  },
  {
    id: 'rec-2',
    title: 'Repair South Hall Plumbing Riser Leak',
    description: 'Dispatch immediate plumbing inspection to South Heritage Hall B1 to fix the 14.2 L/min continuous leak.',
    impact: 'high',
    estimatedSavings: '20,400 L/day Water ($860/mo)',
    category: 'water',
    buildingId: 'bldg-res-s',
    actionableStep: 'Issue emergency facilities work order #WO-8921.',
  },
  {
    id: 'rec-3',
    title: 'Install AI Optical Sorting Cameras at Dining Terraces',
    description: 'Add real-time optical sorting prompts at Student Union bins to reduce compost contamination from 24% down to under 5%.',
    impact: 'medium',
    estimatedSavings: '2.5 Tonnes Waste/Month Diverted',
    category: 'waste',
    buildingId: 'bldg-union',
    actionableStep: 'Deploy EcoTwin Vision pilot on bins WB-04 to WB-06.',
  },
  {
    id: 'rec-4',
    title: 'Deploy Automated Night Pool Thermal Covers',
    description: 'Schedule automated motorized thermal blanket on the Olympic pool at 21:00 nightly.',
    impact: 'high',
    estimatedSavings: '$1,850/mo Energy & 4,000 L Water',
    category: 'energy',
    buildingId: 'bldg-sport',
    actionableStep: 'Integrate pool cover relay switch to facility close timer.',
  },
  {
    id: 'rec-5',
    title: 'Campus-wide LED Lighting Retrofit Phase 2',
    description: 'Replace remaining fluorescent fixtures in South Heritage Hall and Athletics corridors with smart sensor LEDs.',
    impact: 'medium',
    estimatedSavings: '18% Lighting Energy (~$2,600/mo)',
    category: 'energy',
    buildingId: 'bldg-res-s',
    actionableStep: 'Approve procurement proposal for 850 LED tubes.',
  },
];

export const mockOverallMetrics: OverallMetrics = {
  sustainabilityScore: 86,
  sustainabilityScoreChange: 3.4,
  energy: {
    currentKw: 2380,
    dailyKwh: 27970,
    monthlyMwh: 839,
    renewableSharePct: 44.2,
    changePct: -5.8,
  },
  waste: {
    dailyKg: 2535,
    monthlyTonnes: 76.1,
    diversionRatePct: 79.4,
    changePct: 4.1,
  },
  water: {
    dailyLiters: 184700,
    monthlyKl: 5541,
    rainwaterHarvestedPct: 38.6,
    changePct: -2.3,
  },
  carbon: {
    dailyKgCo2e: 8270,
    monthlyTonnesCo2e: 248.1,
    targetReductionProgressPct: 68.5,
    changePct: -7.2,
  },
  sensors: {
    total: 42,
    active: 39,
    warning: 3,
    offline: 0,
  },
  alerts: {
    totalActive: 4,
    critical: 1,
    warning: 3,
    info: 1,
  },
  historicalTrends: {
    hourlyEnergy: [
      { time: '00:00', consumptionKw: 1100, solarGenerationKw: 0 },
      { time: '03:00', consumptionKw: 980, solarGenerationKw: 0 },
      { time: '06:00', consumptionKw: 1250, solarGenerationKw: 45 },
      { time: '09:00', consumptionKw: 2400, solarGenerationKw: 380 },
      { time: '12:00', consumptionKw: 2950, solarGenerationKw: 680 },
      { time: '15:00', consumptionKw: 2750, solarGenerationKw: 590 },
      { time: '18:00', consumptionKw: 2100, solarGenerationKw: 120 },
      { time: '21:00', consumptionKw: 1540, solarGenerationKw: 0 },
    ],
    monthlyEmissions: [
      { month: 'Apr', actualCo2Tonnes: 295, targetCo2Tonnes: 280 },
      { month: 'May', actualCo2Tonnes: 282, targetCo2Tonnes: 275 },
      { month: 'Jun', actualCo2Tonnes: 268, targetCo2Tonnes: 270 },
      { month: 'Jul', actualCo2Tonnes: 254, targetCo2Tonnes: 265 },
      { month: 'Aug', actualCo2Tonnes: 260, targetCo2Tonnes: 260 },
      { month: 'Sep', actualCo2Tonnes: 248, targetCo2Tonnes: 255 },
    ],
    wasteBreakdown: [
      { name: 'Compost (Organics)', value: 42, color: '#16a34a' },
      { name: 'Recycled Materials', value: 37, color: '#0284c7' },
      { name: 'Landfill Waste', value: 21, color: '#94a3b8' },
      { name: 'E-Waste', value: 3, color: '#f59e0b' },
    ],
    waterByZone: [
      { zone: 'Athletics & Pool', usageKl: 1440 },
      { zone: 'Residential Halls', usageKl: 1950 },
      { zone: 'Academic & Labs', usageKl: 1280 },
      { zone: 'Dining Commons', usageKl: 960 },
      { zone: 'Landscape Irrigation', usageKl: 410 },
    ],
  },
};

// AI Mock Queries handler
export function getMockAIResponse(query: string, buildingId?: string): AIQueryResponse {
  const q = query.toLowerCase();
  const selectedBuilding = buildingId ? mockBuildings.find(b => b.id === buildingId) : null;

  // Specific building context
  if (selectedBuilding) {
    return {
      answer: `Analysis for **${selectedBuilding.name}** (${selectedBuilding.code}): Current sustainability rating is ${selectedBuilding.sustainabilityScore}/100 with LEED ${selectedBuilding.leedCertification || 'Certified'} status. Daily energy consumption is ${selectedBuilding.metrics.energyKwhPerDay.toLocaleString()} kWh with a peak of ${selectedBuilding.metrics.energyPeakKw} kW. Waste diversion is at ${selectedBuilding.metrics.wasteDiversionPct}%, generating ${selectedBuilding.metrics.wasteKgPerDay} kg/day. Current carbon intensity rating is '${selectedBuilding.metrics.carbonIntensityRating}'.`,
      locations: [
        {
          id: selectedBuilding.id,
          name: selectedBuilding.name,
          coordinates: selectedBuilding.coordinates,
          type: 'building',
          highlightMetric: `${selectedBuilding.sustainabilityScore} Sustainability Score`,
        },
      ],
      metrics: [
        { label: 'Energy Load', value: `${selectedBuilding.metrics.energyKwhPerDay} kWh/d`, change: '-3.2%', status: 'positive' },
        { label: 'Peak Power', value: `${selectedBuilding.metrics.energyPeakKw} kW`, change: '+1.4%', status: 'warning' },
        { label: 'Waste Diversion', value: `${selectedBuilding.metrics.wasteDiversionPct}%`, change: '+4.0%', status: 'positive' },
        { label: 'Carbon Emitted', value: `${selectedBuilding.metrics.carbonKgCo2ePerDay} kg/d`, change: '-5.1%', status: 'positive' },
      ],
      recommendations: selectedBuilding.recommendations.map(r => `${r.title} — ${r.description} (Potential savings: ${r.estimatedSavings})`),
      alerts: selectedBuilding.alerts.map(a => `[${a.severity.toUpperCase()}] ${a.title}: ${a.description}`),
    };
  }

  // Question 1: Which building consumes the most energy?
  if (q.includes('most energy') || q.includes('highest energy') || q.includes('consumes the most')) {
    const highestEnergy = [...mockBuildings].sort((a, b) => b.metrics.energyKwhPerDay - a.metrics.energyKwhPerDay)[0];
    const secondHighest = [...mockBuildings].sort((a, b) => b.metrics.energyKwhPerDay - a.metrics.energyKwhPerDay)[1];
    return {
      answer: `**${highestEnergy.name}** is currently the largest energy consumer on campus at **${highestEnergy.metrics.energyKwhPerDay.toLocaleString()} kWh/day** (peak load ${highestEnergy.metrics.energyPeakKw} kW), primarily driven by the heated Olympic swimming pool and ventilation pumps. **${secondHighest.name}** follows closely at ${secondHighest.metrics.energyKwhPerDay.toLocaleString()} kWh/day due to high-temperature commercial dishwashing and continuous refrigeration.`,
      locations: [
        { id: highestEnergy.id, name: highestEnergy.name, coordinates: highestEnergy.coordinates, type: 'building', highlightMetric: `${highestEnergy.metrics.energyKwhPerDay} kWh/day` },
        { id: secondHighest.id, name: secondHighest.name, coordinates: secondHighest.coordinates, type: 'building', highlightMetric: `${secondHighest.metrics.energyKwhPerDay} kWh/day` },
      ],
      metrics: [
        { label: 'Peak Consumer', value: highestEnergy.name, status: 'warning' },
        { label: 'Daily Consumption', value: `${highestEnergy.metrics.energyKwhPerDay} kWh`, change: '+6.2% vs avg', status: 'negative' },
        { label: 'Athletics % Campus Load', value: '21.8%', status: 'neutral' },
        { label: 'Solar Offset', value: '18.4%', change: '+3.1%', status: 'positive' },
      ],
      recommendations: [
        'Deploy automated night pool thermal blanket on Olympic Pool (reduces heat loss by ~70%).',
        'Install solar thermal evacuated tube preheating array on the Aquatics roof.',
        'Implement commercial dishwasher heat recovery in Student Union Dining Commons.',
      ],
      alerts: [
        'WARNING: Olympic Pool Heating Surge registered 35% above expected baseline overnight.',
      ],
    };
  }

  // Question 2: Why is energy consumption high?
  if (q.includes('why') && (q.includes('energy') || q.includes('consumption high') || q.includes('surge'))) {
    return {
      answer: `Campus energy load is currently **6.4% above seasonal baseline**. The telemetry indicates three distinct drivers: \n\n1. **Uncovered Heated Aquatics Pool**: The thermal blanket at the Sports Complex was omitted last night, forcing boiler systems to run at continuous maximum duty.\n2. **Cleanroom Chiller Surge**: Science & Engineering Hall lab VAV dampers spiked by 14% during 13:00-15:00.\n3. **Legacy Resistance HVAC in South Heritage Hall**: The 1994 residential block lacks modern setback scheduling and smart thermostats.`,
      locations: [
        { id: 'bldg-sport', name: 'Sports & Aquatics Complex', coordinates: [37.4260, -122.1645], type: 'building', highlightMetric: '+35% Heating spike' },
        { id: 'bldg-eng', name: 'Science & Engineering Hall', coordinates: [37.4305, -122.1712], type: 'building', highlightMetric: '+14% Chiller surge' },
        { id: 'bldg-res-s', name: 'South Heritage Hall', coordinates: [37.4245, -122.1700], type: 'building', highlightMetric: 'Legacy HVAC inefficiency' },
      ],
      metrics: [
        { label: 'Unscheduled Surge', value: '+380 kW', status: 'negative' },
        { label: 'Weather Solar Factor', value: '840 W/m²', change: 'High', status: 'positive' },
        { label: 'Microgrid Battery Buffer', value: '86% SoC', status: 'positive' },
      ],
      recommendations: [
        'Activate automated chiller peak-load shaving rule in BMS.',
        'Enforce night protocol for aquatics facility thermal blankets.',
        'Prioritize South Heritage Hall for the LED and smart thermostat upgrade package.',
      ],
      alerts: [
        'WARNING: HVAC Chiller Surge in Science & Engineering Hall.',
        'WARNING: Olympic Pool Heating Surge in Sports & Aquatics Complex.',
      ],
    };
  }

  // Question 3: What areas need attention?
  if (q.includes('areas need attention') || q.includes('attention') || q.includes('problem') || q.includes('issue')) {
    return {
      answer: `Currently **3 high-priority campus areas** require immediate attention:\n\n1. **South Heritage Hall (Urgent)**: Active undetected water leak in basement riser line measuring **14.2 L/min continuous loss** ($860/month waste).\n2. **Student Union Dining Terrace**: High compost contamination rate (24% organics thrown in landfill stream).\n3. **Sports Complex Pool**: Heating surge and missing thermal cover schedule.`,
      locations: [
        { id: 'bldg-res-s', name: 'South Heritage Hall', coordinates: [37.4245, -122.1700], type: 'building', highlightMetric: 'CRITICAL: 14.2 L/min leak' },
        { id: 'bldg-union', name: 'Student Union & Dining', coordinates: [37.4272, -122.1718], type: 'building', highlightMetric: '24% Compost contamination' },
        { id: 'bldg-sport', name: 'Sports & Aquatics Complex', coordinates: [37.4260, -122.1645], type: 'building', highlightMetric: 'Pool heating surge' },
      ],
      metrics: [
        { label: 'Active Critical Alerts', value: '1 Critical', status: 'negative' },
        { label: 'Warning Alerts', value: '3 Active', status: 'warning' },
        { label: 'Water Loss Rate', value: '852 L/hr', change: 'Continuous', status: 'negative' },
        { label: 'Compost Loss', value: '200 kg/day', status: 'warning' },
      ],
      recommendations: [
        'Dispatch plumber to South Heritage Hall B1 to isolate riser valve.',
        'Deploy student eco-reps or optical sorting signs at Dining Commons Terrace bins.',
        'Re-engage automated pool cover deploy timer.',
      ],
      alerts: [
        'CRITICAL: Continuous Restroom Water Leak in South Heritage Hall.',
        'WARNING: High Food Organic Waste Contamination in Dining Commons.',
      ],
    };
  }

  // Question 4: Where are the waste bins?
  if (q.includes('where are the waste bins') || q.includes('waste bin') || q.includes('recycling') || q.includes('trash') || q.includes('compost')) {
    return {
      answer: `Campus EcoTwin monitors **12 smart IoT waste stations** across campus across 4 categories (Compost, Recyclable, Landfill, and E-Waste). The highest-density sorting zones are situated at the **Student Union Dining Terrace** (3-stream station), the **Science Hall South Plaza**, and the **Green Library Courtyard** (which features an E-Waste specialized drop-off). Two bins currently require collection (WB-UNION-PLAZA-2 at 94% full and WB-UNION-PLAZA-1 at 88% full).`,
      locations: [
        { id: 'bin-05', name: 'Student Union Recycling Station (Full: 94%)', coordinates: [37.4278, -122.1711], type: 'waste_bin', highlightMetric: '94% Full' },
        { id: 'bin-04', name: 'Student Union Compost Station (88%)', coordinates: [37.4278, -122.1712], type: 'waste_bin', highlightMetric: '88% Full' },
        { id: 'bin-08', name: 'Library Courtyard E-Waste Hub', coordinates: [37.4271, -122.1673], type: 'waste_bin', highlightMetric: 'E-Waste Station' },
        { id: 'bin-01', name: 'Science Hall Recyclables', coordinates: [37.4302, -122.1706], type: 'waste_bin', highlightMetric: '42% Full' },
      ],
      metrics: [
        { label: 'Total Monitored Bins', value: '16 Bins', status: 'neutral' },
        { label: 'Campus Diversion Rate', value: '79.4%', change: '+4.1%', status: 'positive' },
        { label: 'Bins Requiring Emptying', value: '2 Bins', change: '>85% full', status: 'warning' },
      ],
      recommendations: [
        'Trigger proactive collection dispatch for Student Union bins #04 and #05.',
        'Add dedicated E-waste drop-off bin in North Eco-Residence Village.',
      ],
      alerts: [
        'WARNING: WB-UNION-PLAZA-2 reached 94% volume capacity.',
      ],
    };
  }

  // Question 5: How can we reduce energy consumption?
  if (q.includes('how can we reduce') || q.includes('reduce energy') || q.includes('save energy') || q.includes('conservation')) {
    return {
      answer: `Based on EcoTwin building energy profiling, the campus can achieve an estimated **14.8% reduction in total energy consumption** (~124 MWh/month, saving ~$15,500/mo) through three high-leverage interventions:\n\n1. **LED Retrofit in Heritage Buildings**: Transitioning remaining T8 fixtures to 12W LED sensor tubes yields an instant ~18-22% drop in lighting load.\n2. **Peak-Shaving & Pre-Cooling**: Utilizing solar peak hours (11:00-14:00) to sub-cool research spaces avoids expensive tier-3 utility tariffs.\n3. **Smart Lab Fume Hood Setbacks**: Enabling automated sash-position setbacks saves up to 12% HVAC load in Science Hall.`,
      locations: [
        { id: 'bldg-res-s', name: 'South Heritage Hall (LED Target)', coordinates: [37.4245, -122.1700], type: 'building', highlightMetric: 'Potential -22% electricity' },
        { id: 'bldg-eng', name: 'Science & Engineering Hall (Fume Hoods)', coordinates: [37.4305, -122.1712], type: 'building', highlightMetric: 'Potential -12% energy' },
        { id: 'bldg-sport', name: 'Sports & Aquatics (Solar Preheating)', coordinates: [37.4260, -122.1645], type: 'building', highlightMetric: 'Potential -34% heating' },
      ],
      metrics: [
        { label: 'Projected Reduction', value: '14.8%', status: 'positive' },
        { label: 'Monthly Cost Savings', value: '$15,500', status: 'positive' },
        { label: 'Carbon Avoided', value: '38.4 Tonnes/mo', status: 'positive' },
        { label: 'Payback Period', value: '1.4 Years', status: 'neutral' },
      ],
      recommendations: [
        'Test the "Reduce electricity by 10%" and "Replace lights with LEDs" scenarios in the What-If Simulator.',
        'Approve LED retrofit procurement proposal for South Heritage Hall.',
        'Configure BMS automated night setback on research laboratories.',
      ],
      alerts: [],
    };
  }

  // Default query response
  return {
    answer: `Campus Intelligence analyzed your inquiry regarding "${query}". The digital twin reports a campus-wide sustainability score of **86/100**, running on **44.2% renewable energy** with **79.4% waste diversion**. All 9 core facilities are actively transmitting telemetry across 42 IoT nodes.`,
    locations: [
      { id: 'bldg-sust', name: 'Sustainable Tech Center', coordinates: [37.4290, -122.1670], type: 'building', highlightMetric: '96 Sustainability Score' },
      { id: 'bldg-eng', name: 'Science & Engineering Hall', coordinates: [37.4305, -122.1712], type: 'building', highlightMetric: 'Research & Lab Core' },
    ],
    metrics: [
      { label: 'Sustainability Score', value: '86 / 100', change: '+3.4%', status: 'positive' },
      { label: 'Renewable Generation', value: '640 kW', change: 'High Solar', status: 'positive' },
      { label: 'Active Alerts', value: '4 Active', status: 'warning' },
    ],
    recommendations: [
      'Check the What-If Simulator to forecast policy interventions.',
      'Investigate critical water leak in South Heritage Hall.',
    ],
    alerts: [
      'CRITICAL: South Heritage Hall baseline water leak requires servicing.',
    ],
  };
}

// Simulation calculation logic
export function calculateMockSimulation(req: SimulationRequest): SimulationResponse {
  // Baseline campus values per year
  const baselineEnergyKwh = 10200000; // ~10.2 GWh/yr
  const baselineWasteKg = 925000; // ~925 tons/yr
  const baselineWaterLiters = 67400000; // ~67.4M liters/yr
  const baselineCarbonTonnes = 3010; // ~3,010 Tonnes CO2e/yr
  const baselineCostDollars = 1632000; // ~$1.63M / yr utilities

  let electricityPct = req.electricityReductionPct || 0;
  let wastePct = req.wasteReductionPct || 0;
  let ledPct = req.ledReplacementPct || 0;
  let solarKw = req.solarAdditionKw || 0;
  let scenarioTitle = 'Custom What-If Scenario';

  // Preset scenario handlers
  if (req.scenarioId === 'scenario-elec-10') {
    scenarioTitle = 'Reduce Electricity by 10%';
    electricityPct = 10;
  } else if (req.scenarioId === 'scenario-waste-20') {
    scenarioTitle = 'Reduce Plastic & Solid Waste by 20%';
    wastePct = 20;
  } else if (req.scenarioId === 'scenario-led') {
    scenarioTitle = 'Replace Conventional Lights with LEDs';
    ledPct = 65;
    electricityPct = 8.5;
  } else if (req.scenarioId === 'scenario-solar-park') {
    scenarioTitle = 'North Parking Solar Canopy Expansion';
    solarKw = 250;
    electricityPct = 6.2;
  }

  // Calculate compound reductions
  const effectiveEnergyPct = Math.min(35, electricityPct + (ledPct * 0.12) + (solarKw ? 6.2 : 0));
  const effectiveWastePct = Math.min(50, wastePct);
  const effectiveWaterPct = req.buildingId ? 8.5 : 4.2;

  const energyReducedKwh = Math.round(baselineEnergyKwh * (effectiveEnergyPct / 100));
  const wasteReducedKg = Math.round(baselineWasteKg * (effectiveWastePct / 100));
  const waterReducedLiters = Math.round(baselineWaterLiters * (effectiveWaterPct / 100));

  // Carbon factor: ~0.385 kg CO2e per kWh, waste factor: 0.82 kg CO2e per kg landfill
  const carbonReducedTonnes = Math.round(((energyReducedKwh * 0.385) + (wasteReducedKg * 0.82)) / 1000);
  const carbonPctReduction = Number(((carbonReducedTonnes / baselineCarbonTonnes) * 100).toFixed(1));

  // Cost: ~$0.16 per kWh electricity, $0.12 per kg waste tipping
  const costSavingsDollars = Math.round((energyReducedKwh * 0.16) + (wasteReducedKg * 0.12));
  const costSavingsPct = Number(((costSavingsDollars / baselineCostDollars) * 100).toFixed(1));

  // Equivalencies
  const treesPlantedEquivalent = Math.round(carbonReducedTonnes * 16.5);
  const passengerCarKmOffset = Math.round(carbonReducedTonnes * 4150);
  const homesPoweredEquivalent = Math.round(energyReducedKwh / 10500);

  // 12-month projection trajectory
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const timeline = months.map((m, idx) => {
    const rampFactor = Math.min(1, (idx + 2) / 6); // Ramps up over first few months
    const monthBaselineEnergy = Math.round(baselineEnergyKwh / 12);
    const monthProjectedEnergy = Math.round(monthBaselineEnergy - ((energyReducedKwh / 12) * rampFactor));
    const monthBaselineCarbon = Math.round(baselineCarbonTonnes / 12);
    const monthProjectedCarbon = Math.round(monthBaselineCarbon - ((carbonReducedTonnes / 12) * rampFactor));
    return {
      month: m,
      baselineEnergyMwh: Math.round(monthBaselineEnergy / 1000),
      projectedEnergyMwh: Math.round(monthProjectedEnergy / 1000),
      baselineCarbonTonnes: monthBaselineCarbon,
      projectedCarbonTonnes: monthProjectedCarbon,
    };
  });

  return {
    scenarioTitle,
    scopeLabel: req.buildingId ? `Building Scope: ${mockBuildings.find(b => b.id === req.buildingId)?.name || 'Selected Building'}` : 'Campus-Wide Scope',
    currentValue: {
      energyKwhYear: baselineEnergyKwh,
      wasteKgYear: baselineWasteKg,
      waterLitersYear: baselineWaterLiters,
      carbonTonnesCo2eYear: baselineCarbonTonnes,
      operatingCostDollarsYear: baselineCostDollars,
    },
    projectedValue: {
      energyKwhYear: baselineEnergyKwh - energyReducedKwh,
      wasteKgYear: baselineWasteKg - wasteReducedKg,
      waterLitersYear: baselineWaterLiters - waterReducedLiters,
      carbonTonnesCo2eYear: baselineCarbonTonnes - carbonReducedTonnes,
      operatingCostDollarsYear: baselineCostDollars - costSavingsDollars,
    },
    estimatedReduction: {
      energyKwh: energyReducedKwh,
      energyPct: Number(effectiveEnergyPct.toFixed(1)),
      wasteKg: wasteReducedKg,
      wastePct: Number(effectiveWastePct.toFixed(1)),
      waterLiters: waterReducedLiters,
      waterPct: Number(effectiveWaterPct.toFixed(1)),
      costSavingsDollars,
      costSavingsPct,
    },
    estimatedCarbonImpact: {
      carbonTonnesAvoided: carbonReducedTonnes,
      carbonPctReduction,
      treesPlantedEquivalent,
      passengerCarKmOffset,
      homesPoweredEquivalent,
    },
    timeline,
    methodologyNote: 'Estimates based on Campus EcoTwin predictive energy & waste balance models (NREL solar factors & EPA WARM carbon coefficients).',
  };
}
