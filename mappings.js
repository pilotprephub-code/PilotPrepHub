// ===========================
// SUBJECTS DISPLAY ORDER
// ===========================

const DISPLAY_ORDER = {

	regulation: [
		"indian_aviation",
		"foreign_aviation",
		"human_factors",
		"sample_papers",
		"additional_practice_questions"
	],

	meteorology: [
		"indian_aviation",
		"foreign_aviation"
	],

	general_navigation: [
		"indian_aviation",
		"foreign_aviation",
		"sample_papers"
	],

	instrument_navigation: [
		"indian_aviation",
		"foreign_aviation",
		"sample_papers"
	],

	radio_navigation: [
		"indian_aviation",
		"foreign_aviation",
		"sample_papers"
	],

	technical_general: [
		"principles_of_flight",
		"engines",
		"airframes_and_systems",
		"electrics_and_electronics",
		"additional_practice_questions",
		"supplementary_questions",
	]

};


// ===========================
// SUBJECTS
// ===========================


const SUBJECT_MAP = {
	regulation: "Air_Regulation",
	meteorology: "Meteorology",
	general_navigation: "Navigation",
	instrument_navigation: "Navigation",
	radio_navigation: "Navigation",
	technical_general: "Technical_General",
	technical_specific: "Technical_Specific"
};


// ===========================
// SUB SUBJECTS
// ===========================

const SUBSUBJECT_MAP = {

	regulation: {
		"RK_Bali": "indian_aviation",
		"Oxford": "foreign_aviation",
		"Red_Bird": "additional_practice_questions",
		"RK_Bali_Human_factors": "human_factors",
		"RK_Bali_SQP": "sample_papers"
	},

	meteorology: {
		"IC_Joshi": "indian_aviation",
		"Oxford": "foreign_aviation"
	},

	general_navigation: {
		"Navigation_General > RK_Bali": "indian_aviation",
		"Navigation_General > Oxford": "foreign_aviation",
		"SQP": "sample_papers"
	},

	instrument_navigation: {
		"Navigation_Instrument > RK_Bali": "indian_aviation",
		"Navigation_Instrument > Oxford": "foreign_aviation",
		"SQP": "sample_papers"
	},

	radio_navigation: {
		"Navigation_Radio > RK_Bali": "indian_aviation",
		"Navigation_Radio > Oxford": "foreign_aviation",
		"SQP": "sample_papers"
	},

	technical_general: {
		"Airframes_Systems": "airframes_and_systems",
		"Electrics_and_Electronics": "electrics_and_electronics",
		"Engines_PowerPlant": "engines",
		"Principles_of_Flight": "principles_of_flight",
		"Red_Bird": "additional_practice_questions",
		"Magic_Delta": "supplementary_questions"
	},

	technical_specific: {
		"General": "general"
	}

};


const SUBSUBJECT_REVERSE_MAP = {

	regulation: {
		indian_aviation: "RK_Bali",
		foreign_aviation: "Oxford",
		additional_practice_questions: "Red_Bird",
		human_factors: "RK_Bali_Human_factors",
		sample_papers: "RK_Bali_SQP"
	},

	meteorology: {
		indian_aviation: "IC_Joshi",
		foreign_aviation: "Oxford"
	},

	general_navigation: {
		indian_aviation: "Navigation_General > RK_Bali",
		foreign_aviation: "Navigation_General > Oxford",
		sample_papers: "SQP"
	},

	instrument_navigation: {
		indian_aviation: "Navigation_Instrument > RK_Bali",
		foreign_aviation: "Navigation_Instrument > Oxford",
		sample_papers: "SQP"
	},

	radio_navigation: {
		indian_aviation: "Navigation_Radio > RK_Bali",
		foreign_aviation: "Navigation_Radio > Oxford",
		sample_papers: "SQP"
	},

	technical_general: {
		airframes_and_systems: "Airframes_Systems",
		electrics_and_electronics: "Electrics_and_Electronics",
		engines: "Engines_PowerPlant",
		principles_of_flight: "Principles_of_Flight",
		additional_practice_questions: "Red_Bird",
		supplementary_questions: "Magic_Delta"
	},

	technical_specific: {
		general: "General"
	}

};


// ==============================
// SUBJECT WITHOUT SUB-SUBJECTS
// ==============================

const SUBJECT_WITHOUT_SUBSUBJECT = [
	"technical_specific"
];


// ==============================
// DIRECT TO QUIZ
// ==============================

const DIRECT_TO_QUIZ = {

	regulation: [
		"human_factors",
		"additional_practice_questions"
	],

	technical_general: [
		"additional_practice_questions"
	]

};


const DIRECT_QUIZ_CHAPTER = {

	regulation: {
		human_factors: "5_additional_practice_questions",
		additional_practice_questions: "1_red_bird"
	},

	technical_general: {
		additional_practice_questions: "1_red_bird"
	}

};

// ===========================
// CHAPTERS
// ===========================
const CHAPTER_MAP = {

	regulation: {

		indian_aviation: {
			"1_international_organisations_and_conventions": "international_organisations_and_conventions",
			"2_aircraft_nationality_and_registration_marks": "aircraft_nationality_and_registration_marks",
			"3_rules_of_the_air": "rules_of_the_air",
			"4_air_traffic_services": "air_traffic_services",
			"5_separation_methods_and_minima": "separation_methods_and_minima",
			"6_separation_in_the_vicinity_of_aerodromes": "separation_in_the_vicinity_of_aerodromes",
			"7_procedures_for_aerodrome_control_service": "procedures_for_aerodrome_control_service",
			"8_use_of_air_traffic_services_surveillance_system": "use_of_air_traffic_services_surveillance_system",
			"9_aeronautical_information_services": "aeronautical_information_services",
			"10_search_and_rescue": "search_and_rescue",
			"11_visual_aids_for_navigation": "visual_aids_for_navigation",
			"12_procedures_for_air_navigation_services": "procedures_for_air_navigation_services",
			"13_national_law": "national_law",
			"14_personnel_licensing": "personnel_licensing",
			"15_airworthiness_of_aircraft": "airworthiness_of_aircraft",
			"16_operational_procedures": "operational_procedures",
			"17_special_operational_procedures_and_hazards": "special_operational_procedures_and_hazards",
			"18_communications": "communications",
			"19_aircraft_accident_and_incident": "aircraft_accident_and_incident",
			"20_facilitation": "facilitation",
			"21_security": "security"
		},

		foreign_aviation: {
			"1_international_agreements_and_organizations": "international_agreements_and_organizations",
			"2_airworthiness_of_aircraft": "airworthiness_of_aircraft",
			"3_aircraft_nationality_and_registration_marks": "aircraft_nationality_and_registration_marks",
			"4_flight_crew_licensing": "flight_crew_licensing",
			"5_rules_of_the_air": "rules_of_the_air",
			"6_instrument_procedures": "instrument_procedures",
			"7_approach_procedures": "approach_procedures",
			"8_circling_approach": "circling_approach",
			"9_holding_procedures": "holding_procedures",
			"10_altimeter_setting_procedure": "altimeter_setting_procedure",
			"11_parallel_or_near_parallel_runway_operation": "parallel_or_near_parallel_runway_operation",
			"12_ssr_and_acas": "ssr_and_acas",
			"13_airspace": "airspace",
			"14_air_traffic_services": "air_traffic_services",
			"15_separation": "separation",
			"16_control_of_aircraft": "control_of_aircraft",
			"17_aeronautical_information_service": "aeronautical_information_service",
			"18_aerodromes_physical_characteristics": "aerodromes_physical_characteristics",
			"19_aerodromes_visual_aids_markings_and_signs": "aerodromes_visual_aids_markings_and_signs",
			"20_aerodrome_lighting": "aerodrome_lighting",
			"21_obstacle_marking_and_aerodrome_services": "obstacle_marking_and_aerodrome_services",
			"22_facilitation": "facilitation",
			"23_search_and_rescue": "search_and_rescue",
			"24_security": "security",
			"25_aircraft_accident_and_incident_investigation": "aircraft_accident_and_incident_investigation",
			"26_revision_questions": "additional_practice_questions"
		},

		human_factors: {
			"5_additional_practice_questions": "human_factors"
		},

		sample_papers: {
			"1_SQP": "sample_paper_1",
			"2_SQP": "sample_paper_2",
			"3_SQP": "sample_paper_3",
			"4_SQP": "sample_paper_4",
			"5_SQP": "sample_paper_5",
			"6_SQP": "sample_paper_6",
			"7_SQP": "sample_paper_7",
			"8_SQP": "sample_paper_8",
			"9_SQP": "sample_paper_9",
			"10_SQP": "sample_paper_10",
			"11_SQP": "sample_paper_11",
			"12_SQP": "sample_paper_12",
			"13_SQP": "sample_paper_13",
			"14_SQP": "sample_paper_14",
			"15_SQP": "sample_paper_15",
			"16_SQP": "sample_paper_16"
		},

		additional_practice_questions: {
			"1_red_bird": "additional_practice_questions"
		}
	},

	meteorology: {

		indian_aviation: {
			"1_Atmosphere": "atmosphere",
			"2_Pressure": "pressure",
			"3_Temperature": "temperature",
			"4_Density": "density",
			"5_Humidity": "humidity",
			"6_Winds": "winds",
			"7_Visibility_and_fog": "visibility_and_fog",
			"8_Vertical_Motion_and_Clouds": "vertical_motion_and_clouds",
			"9_Stability_and_Instability_of_Atmosphere": "stability_and_instability_of_atmosphere",
			"10_Optical_Phenomena": "optical_phenomenon",
			"11_Precipitation": "precipitation",
			"12_Ice_Accretion": "ice_accretion",
			"13_Thunderstorm": "thunderstorms",
			"14_Air_Masses_Fronts_and_Western_Disturbances": "air_masses_fronts_and_western_disturbances",
			"15_Jet_Streams": "jet_streams",
			"16_Clear_Air_Turbulence": "cat",
			"17_Mountain_Waves": "mountain_waves",
			"18_Tropical_Systems": "tropical_systems",
			"19_Climatology_of_India": "climatology_of_india",
			"20_General_Circulation": "general_circulation",
			"21_Met_services_for_aviation": "met_services_for_aviation"
		},

		foreign_aviation: {
			"1_Atmosphere": "the_atmosphere",
			"2_Pressure": "pressure",
			"3_Density": "density",
			"4_Pressure_system": "pressure_system",
			"5_Altimetry": "altimetry",
			"6_Temperature": "temperature",
			"7_Humidity": "humidity",
			"8_Adiabatics_and_Stability": "adiabatics_and_stability",
			"9_Winds": "winds",
			"10_Upper_Winds": "upper_winds",
			"11_Clouds": "clouds",
			"12_Thunderstorms": "thunderstorms",
			"13_Visibility": "visibility",
			"14_Icing": "icing",
			"15_Air_mass": "air_masses",
			"16_Other_Depressions": "other_depressions",
			"17_Global_climatology": "global_climatology"
		}
	},


	general_navigation: {

		indian_aviation: {
			"1_the_solar_system": "the_solar_system",
			"2_the_earth": "the_earth",
			"3_projections": "projections",
			"4_convergency": "convergency",
			"5_time": "time",
			"6_compass_and_directions": "compass_and_directions",
			"7_distances_on_earth_surface": "distances_on_earth_surface",
			"8_magnetism_and_compasses": "magnetism_and_compasses",
			"9_dead_reckoning_navigation": "dead_reckoning_navigation",
			"10_measurement_of_dr_elements_pressure": "measurement_of_dr_elements_pressure",
			"11_measurement_determination_of_temperature": "measurement_determination_of_temperature",
			"12_measurement_of_elements": "measurement_of_elements",
			"13_in_flight_navigation": "in_flight_navigation",
			"14_mass_and_balance": "mass_and_balance",
			"15_performance": "performance",
			"16_flight_planning_and_monitoring": "flight_planning_and_monitoring"
		},

		foreign_aviation: {
			"1_direction_latitude_and_longitude": "direction_latitude_and_longitude",
			"2_great_circles_rhumb_lines_&_directions_on_the_earth": "great_circles_rhumb_lines_and_directions_on_the_earth",
			"3_earth_magnetism": "earth_magnetism",
			"4_slide_rule_face": "slide_rule_face",
			"5_distance_speed_time_and_conversions": "distance_speed_time_and_conversions",
			"6_tas_and_altitude_corrections": "tas_and_altitude_corrections",
			"7_triangle_of_velocities": "triangle_of_velocities",
			"8_calculation_of_heading_and_wind_finding": "calculation_of_heading_and_wind_finding",
			"9_multi_drift_winds_and_wind_components": "multi_drift_winds_and_wind_components",
			"10_the_1_in_60_rule": "the_1_in_60_rule",
			"11_navigation_using_the_1_in_60_rule": "navigation_using_the_1_in_60_rule",
			"12_other_applications_of_the_1_in_60_rule": "other_applications_of_the_1_in_60_rule",
			"13_topographical_maps_and_map_reading": "topographical_maps_and_map_reading",
			"14_convergency_and_conversion_angle": "convergency_and_conversion_angle",
			"15_departure": "departure",
			"16_scale": "scale",
			"17_general_chart_properties": "general_chart_properties",
			"18_mercator_charts_properties": "mercator_charts_properties",
			"19_mercator_charts_scale": "mercator_charts_scale",
			"20_mid_latitude_scale": "mid_latitude_scale",
			"21_lamberts_conformal_chart_1": "lamberts_conformal_chart_1",
			"22_lamberts_conformal_chart_2": "lamberts_conformal_chart_2",
			"23_the_polar_stereographic_chart": "the_polar_stereographic_chart",
			"24_time_1": "time_1",
			"25_time_2": "time_2",
			"26_time_3": "time_3",
			"27_gridded_charts": "gridded_charts",
			"28_plotting": "plotting",
			"29_the_direct_indicating_compass": "the_direct_indicating_compass",
			"30_aircraft_magnetism": "aircraft_magnetism",
			"31_general_navigation_problems": "general_navigation_problems",
			"32_revision_questions": "additional_practice_questions"
		},

		sample_papers: {
			"1_SQP": "sample_paper_1",
			"2_SQP": "sample_paper_2",
			"3_SQP": "sample_paper_3",
			"4_SQP": "sample_paper_4",
			"5_SQP": "sample_paper_5",
			"6_SQP": "sample_paper_6",
			"7_SQP": "sample_paper_7",
			"8_SQP": "sample_paper_8"
		}

	},

	instrument_navigation: {

		indian_aviation: {
			"1_air_data_systems": "air_data_systems",
			"2_altimeter": "altimeter",
			"3_air_speed_indicator": "air_speed_indicator",
			"4_vertical_speed_indicator": "vertical_speed_indicator",
			"5_gyroscope": "gyroscope",
			"6_inertial_navigation": "inertial_navigation",
			"7_altitude_alert_systems": "altitude_alert_systems",
			"8_power_plant_and_system_monitoring_instruments": "power_plant_and_system_monitoring_instruments",
			"9_basics_of_electronic_displays": "basics_of_electronic_displays"
		},

		foreign_aviation: {
			"1_characteristics_and_general_definitions": "characteristics_and_general_definitions",
			"2_pitot_and_static_sources": "pitot_and_static_sources",
			"3_air_temperature_measurement": "air_temperature_measurement",
			"4_the_airspeed_indicator_asi": "the_airspeed_indicator",
			"5_the_pressure_altimeter": "the_pressure_altimeter",
			"6_the_vertical_speed_indicator": "the_vertical_speed_indicator",
			"7_the_machmeter": "the_machmeter",
			"8_air_data_computer": "air_data_computer",
			"9_terrestrial_magnetism": "terrestrial_magnetism",
			"10_the_direct_indicating_compass": "the_direct_indicating_compass",
			"11_gyroscopes": "gyroscopes",
			"12_directional_gyro_indicator_dgi": "directional_gyro_indicator",
			"13_the_artificial_horizon": "the_artificial_horizon",
			"14_the_turn_and_slip_indicator": "the_turn_and_slip_indicator",
			"15_the_turn_coordinator": "the_turn_coordinator",
			"16_aircraft_magnetism": "aircraft_magnetism",
			"17_remote_indicating_magnetic_compass": "remote_indicating_magnetic_compass",
			"18_inertial_navigation_systems": "inertial_navigation_systems",
			"19_inertial_reference_system": "inertial_reference_system",
			"20_radio_altimeter": "radio_altimeter",
			"21_flight_management_system": "flight_management_system",
			"22_electronic_flight_information_systems": "electronic_flight_information_systems",
			"23_basic_computers": "basic_computers",
			"24_future_air_navigation_systems_fans": "future_air_navigation_systems_fans",
			"25_flight_director_systems": "flight_director_systems",
			"26_autopilot": "autopilot",
			"27_autoland": "autoland",
			"28_autothrottle": "autothrottle",
			"29_yaw_dampers": "yaw_dampers",
			"30_control_laws": "control_laws",
			"31_afcs_revision_questions": "afcs_revision_questions",
			"32_flight_warning_systems": "flight_warning_systems",
			"33_aerodynamic_warnings": "aerodynamic_warnings",
			"34_ground_proximity_warning_system_gpws": "ground_proximity_warning_system",
			"35_airborne_collision_and_avoidance_system_acas": "airborne_collision_and_avoidance_system",
			"36_flight_data_recorder": "flight_data_recorder",
			"37_cockpit_voice_recorder": "cockpit_voice_recorder",
			"38_engine_instrumentation": "engine_instrumentation",
			"39_electronic_instrumentation": "electronic_instrumentation",
			"40_revision_automatic_flight": "revision_automatic_flight",
			"41_revision_engine_instruments": "revision_engine_instruments",
			"42_revision_warnings_and_recordings": "revision_warnings_and_recordings",
			"43_revision_1": "revision_1",
			"44_revision_2": "revision_2",
			"45_revision_3": "revision_3"
		},

		sample_papers: {
			"1_SQP": "sample_paper_1",
			"2_SQP": "sample_paper_2",
			"3_SQP": "sample_paper_3",
			"4_SQP": "sample_paper_4",
			"5_SQP": "sample_paper_5",
			"6_SQP": "sample_paper_6",
			"7_SQP": "sample_paper_7",
			"8_SQP": "sample_paper_8"
		}

	},

	radio_navigation: {

		indian_aviation: {
			"1_basic_radio_theory": "basic_radio_theory",
			"2_adf_ndb": "adf_ndb",
			"3_track_and_drift": "track_and_drift",
			"4_vor": "vor",
			"5_vor_rmi_adf": "vor_rmi_adf",
			"6_holding_radial_intercept_bearing_to_plot": "holding_radial_intercept_bearing_to_plot",
			"7_ils": "ils",
			"8_radar": "radar",
			"9_gnss": "gnss",
			"10_summary_of_navigation_aids_and_instruments": "summary_of_navigation_aids_and_instruments"
		},

		foreign_aviation: {
			"1_properties_of_radio_waves": "properties_of_radio_waves",
			"2_radio_propagation_theory": "radio_propagation_theory",
			"3_modulation": "modulation",
			"4_antennae": "antennae",
			"5_doppler_radar_systems": "doppler_radar_systems",
			"6_vhf_direction_finder_(vdf)": "vhf_direction_finder",
			"7_automatic_direction_finder": "automatic_direction_finder",
			"8_vhf_omni_directional_range": "vhf_omni_directional_range",
			"9_instrument_landing_system": "instrument_landing_system",
			"10_microwave_landing_system": "microwave_landing_system",
			"11_radar_principles": "radar_principles",
			"12_ground_radar": "ground_radar",
			"13_airborne_weather_radar": "airborne_weather_radar",
			"14_secondary_surveillance_radar": "secondary_surveillance_radar",
			"15_distance_measuring_equipment": "distance_measuring_equipment",
			"16_area_navigation_systems": "area_navigation_systems",
			"17_electronic_flight_information_system": "electronic_flight_information_system",
			"18_global_navigation_satellite_system": "global_navigation_satellite_system",
			"19_long_range_navigation_(extra)": "long_range_navigation",
			"20_tcas_(extra)": "tcas",
			"21_revision_questions": "additional_practice_questions"
		},

		sample_papers: {
			"1_SQP": "sample_paper_1",
			"2_SQP": "sample_paper_2",
			"3_SQP": "sample_paper_3",
			"4_SQP": "sample_paper_4",
			"5_SQP": "sample_paper_5",
			"6_SQP": "sample_paper_6",
			"7_SQP": "sample_paper_7",
			"8_SQP": "sample_paper_8"
		}

	},

	technical_general: {

		airframes_and_systems: {
			"1_fuselage_wings_and_stabilising_surfaces": "fuselage_wings_and_stabilising_surfaces",
			"2_basic_hydraulics": "basic_hydraulics",
			"3_landing_gear_wheels_break_tyres": "landing_gear_wheels_break_tyres",
			"4_flight_control_system_flight_control_powered_flying_controls": "flight_control_system_flight_control_powered_flying_controls",
			"5_pneumatic_pressurisation_systems": "pneumatic_pressurisation_systems",
			"6_ice_and_rain_protection": "ice_and_rain_protection",
			"7_oxygen": "oxygen",
			"8_emergency_equipment": "emergency_equipment",
			"9_fuel_systems": "fuel_systems",
			"10_smoke_detection_fire_detection_and_protection": "smoke_detection_fire_detection_and_protection"
		},

		electrics_and_electronics: {
			"1_basic_principles_dc": "basic_principles_dc",
			"2_electric_circuit_protection_and_capacitors": "electric_circuit_protection_and_capacitors",
			"3_electric_batteries": "electric_batteries",
			"4_electric_magnetism": "electric_magnetism",
			"5_generators_and_alternators": "generators_and_alternators",
			"6_dc_motors": "dc_motors",
			"7_electric_power_system": "electric_power_system",
			"8_electric_bonding_and_screening": "electric_bonding_and_screening",
			"9_electric_specimen": "electric_specimen",
			"10_introduction_to_alternate_current": "introduction_to_alternate_current",
			"11_alternators": "alternators",
			"12_practical_aircraft_systems": "practical_aircraft_systems",
			"13_transformers": "transformers",
			"14_ac_motors": "ac_motors",
			"15_basic_computers": "basic_computers",
			"16_logic_gates": "logic_gates",
			"17_radio_waves": "radio_waves",
			"18_radio_propagation": "radio_propagation",
			"19_electric_modulation": "electric_modulation",
			"20_electric_antenna": "electric_antenna",
			"21_electric_oscillators": "electric_oscillators"
		},

		engines: {
			"1_general": "general",
			"2_lubrication": "lubrication",
			"3_cooling": "cooling",
			"4_ignition": "ignition",
			"5_fuel": "fuel",
			"6_mixture": "mixture",
			"7_carburettor": "carburettor",
			"8_fuel_injection": "fuel_injection",
			"9_performance_and_power": "performance_and_power",
			"10_propellor": "propellor",
			"11_gas_turbine_introduction": "gas_turbine_introduction",
			"12_gas_turbine_inlet": "gas_turbine_inlet",
			"13_gas_turbine_compressor": "gas_turbine_compressor",
			"14_gas_turbine_combustion_chamber": "gas_turbine_combustion_chamber",
			"15_gas_turbine_assembly": "gas_turbine_assembly",
			"16_gas_turbine_exhaust_system": "gas_turbine_exhaust_system",
			"17_gas_turbine_lubrication": "gas_turbine_lubrication",
			"18_gas_turbine_thrust": "gas_turbine_thrust",
			"19_gas_turbine_performance_and_thrust_argumentation": "gas_turbine_performance_and_thrust_argumentation",
			"20_gas_turbine_reverse_thrust": "gas_turbine_reverse_thrust",
			"21_gear_box_and_accessory_drive": "gear_box_and_accessory_drive",
			"22_gas_turbine_ignition_system": "gas_turbine_ignition_system",
			"23_gas_turbine_auxiliary_power_unit_and_engine_starting": "gas_turbine_auxiliary_power_unit_and_engine_starting",
			"24_gas_turbine_fuel": "gas_turbine_fuel",
			"25_gas_turbine_fuel_system": "gas_turbine_fuel_system",
			"26_gas_turbine_bleed_air": "gas_turbine_bleed_air",
			"27_revision_questions": "additional_practice_questions"
		},

		principles_of_flight: {
			"1_overview": "overview",
			"2_atmosphere": "atmosphere",
			"3_basic_aerodynamic_theory": "basic_aerodynamic_theory",
			"4_sub_sonic_airflow": "sub_sonic_airflow",
			"5_lift": "lift",
			"6_drag": "drag",
			"7_stalling": "stalling",
			"8_high_lift_devices": "high_lift_devices",
			"9_airframe_contamination": "airframe_contamination",
			"10_stability_and_control": "stability_and_control",
			"11_controls": "controls",
			"12_flight_mechanics": "flight_mechanics",
			"13_high_speed_flight": "high_speed_flight",
			"14_limitations": "limitations",
			"15_windshear": "windshear",
			"16_propellers": "propellers",
			"17_revision_questions": "additional_practice_questions"
		},

		additional_practice_questions: {
			"1_red_bird": "additional_practice_questions"
		},

		supplementary_questions: {
			"1_magic_delta": "supplementary_paper_1",
			"2_magic_delta": "supplementary_paper_2",
			"3_magic_delta": "supplementary_paper_3",
			"4_magic_delta": "supplementary_paper_4",
			"5_magic_delta": "supplementary_paper_5",
		}

	},

	technical_specific: {
		"baron_g58": "baron_g58",
		"cessna_152": "cessna_152",
		"cessna_172": "cessna_172",
		"da42_austro": "da_42_austro",
		"da42_thielert": "da_42_thielert",
		"pa_3422ot": "pa_3422OT",
		"technam_p2006t": "technam_p2006T",
		"technam_p2008jc": "technam_p2008JC"
	}

};


// ===========================
// CUSTOM TITLES
// ===========================

const customTitles = {

	landing_gear_wheels_break_tyres: "Landing Gear, Wheels, Brakes and Tyres",

	flight_control_system_flight_control_powered_flying_controls: "Flight Control System, Flight Control and Powered Flying Controls",

	smoke_detection_fire_detection_and_protection: "Smoke Detection, Fire Detection and Protection",

	air_masses_fronts_and_western_disturbances: "Air Masses, Fronts and Western Disturbances",

	direction_latitude_and_longitude: "Direction, Latitude and Longitude",

	great_circles_rhumb_lines_and_directions_on_the_earth: "Great Circles, Rhumb Lines and Directions on the Earth",

	fuselage_wings_and_stabilising_surfaces: "Fuselage, Wings and Stabilising Surfaces"
};