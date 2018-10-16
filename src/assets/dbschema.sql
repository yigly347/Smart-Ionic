CREATE TABLE IF NOT EXIST smj_lot(
	smj_lot_id INTEGER PRIMARY KEY AUTOINCREMENT, 
	name TEXT, 
	ad_org_id INT,
	smj_location TEXT,
	smj_area TEXT,
	smj_formation TEXT,
	smj_p_services TEXT,
	smj_initial_height NUMERIC,
	smj_final_height NUMERIC,
	smj_temp NUMERIC,
	smj_pressure NUMERIC,
	smj_humidity NUMERIC,
	smj_wind_speed NUMERIC,
	smj_wind_direction TEXT,
	smj_altitude NUMERIC,
	smj_longitude NUMERIC,
	smj_latitude NUMERIC

);
INSERT INTO smj_lot(name, ad_org_id) VALUES('lote de fresas',100000);
INSERT INTO smj_lot(name, ad_org_id) VALUES('lote de manzanas',100001);