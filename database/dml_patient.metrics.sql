CREATE TABLE blood_pressure (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES pacientes(id) ON DELETE CASCADE NOT NULL,
    systolic INT NOT NULL,
    diastolic INT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_blood_pressure_patient_id ON blood_pressure(patient_id);
CREATE INDEX idx_blood_pressure_date ON blood_pressure(date);


CREATE TABLE respiratory_rate (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES pacientes(id) ON DELETE CASCADE NOT NULL,
    rate INT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_respiratory_rate_patient_id ON respiratory_rate(patient_id);
CREATE INDEX idx_respiratory_rate_date ON respiratory_rate(date);


CREATE TABLE heart_rate (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES pacientes(id) ON DELETE CASCADE NOT NULL,
    rate INT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_heart_rate_patient_id ON heart_rate(patient_id);
CREATE INDEX idx_heart_rate_date ON heart_rate(date);
