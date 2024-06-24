
-- Tabla doctor
CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    identification_type VARCHAR(50) NOT NULL,
    identification_number VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    medical_record TEXT NOT NULL,
    medical_specialist TEXT NOT NULL,
    landline_phone VARCHAR(20) NOT NULL,
    note TEXT NOT NULL,
    rating INT NOT NULL,
    pub_name VARCHAR(100) NOT NULL,
    priv_name VARCHAR(100) NOT NULL,
    file_bs64 TEXT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES townships(id)
);

-- Índices para la tabla doctor
CREATE INDEX idx_doctor_city_id ON doctor(city_id);
CREATE INDEX idx_doctor_name ON doctor(first_name, last_name);


-- Tabla healthInsurance
CREATE TABLE healthInsurance (
    id SERIAL PRIMARY KEY,
    company VARCHAR(50) NOT NULL,
    address1 TEXT NOT NULL,
    address2 TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);

-- Índices para la tabla healthInsurance
CREATE INDEX idx_healthInsurance_company ON healthInsurance(company);
CREATE INDEX idx_healthInsurance_city ON healthInsurance(city);


-- Tabla company
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    nit VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES townships(id)
);

-- Índices para la tabla company
CREATE INDEX idx_company_city_id ON company(city_id);

-- Tabla sites
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES townships(id)
);

-- Índices para la tabla sites
CREATE INDEX idx_sites_company_id ON sites(company_id);
CREATE INDEX idx_sites_city_id ON sites(city_id);


-- Tabla relative
CREATE TABLE relative (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    identification_type VARCHAR(50) NOT NULL,
    identification_number VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    place_of_birth TEXT NOT NULL,
    city_id INT NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    occupation VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    health_insurance_id INT NOT NULL,
    company_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    pub_name VARCHAR(100) NOT NULL,
    priv_name VARCHAR(100) NOT NULL,
    file_bs64 TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
    FOREIGN KEY (health_insurance_id) REFERENCES healthInsurance(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES townships(id)
);

-- Índices para la tabla relative
CREATE INDEX idx_relative_user_id ON relative(user_id);
CREATE INDEX idx_relative_doctor_id ON relative(doctor_id);
CREATE INDEX idx_relative_health_insurance_id ON relative(health_insurance_id);
CREATE INDEX idx_relative_company_id ON relative(company_id);
CREATE INDEX idx_relative_city_id ON relative(city_id);
CREATE INDEX idx_relative_name ON relative(first_name, last_name);

-- Tabla emergencyContact
CREATE TABLE emergencyContact (
    id SERIAL PRIMARY KEY,
    relative_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    FOREIGN KEY (relative_id) REFERENCES relative(id)
);

-- Índices para la tabla emergencyContact
CREATE INDEX idx_emergencyContact_relative_id ON emergencyContact(relative_id);



-- Tabla relativeDocuments
CREATE TABLE relativeDocuments (
    id SERIAL PRIMARY KEY,
    relative_id INT NOT NULL,
    pub_name VARCHAR(50) NOT NULL,
    priv_name VARCHAR(50) NOT NULL,
    file_bs64 TEXT NOT NULL,
    FOREIGN KEY (relative_id) REFERENCES relative(id)
);


-- Tabla medicalConsultation
CREATE TABLE medicalConsultation (
    id SERIAL PRIMARY KEY,
    relative_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    date DATE NOT NULL,
    reason TEXT NOT NULL,
    FOREIGN KEY (relative_id) REFERENCES relative(id),
    FOREIGN KEY (city_id) REFERENCES townships(id)
);

-- Índices para la tabla medicalConsultation
CREATE INDEX idx_medicalConsultation_relative_id ON medicalConsultation(relative_id);
CREATE INDEX idx_medicalConsultation_city_id ON medicalConsultation(city_id);
CREATE INDEX idx_medicalConsultation_date ON medicalConsultation(date);

-- Tabla records
CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla records
CREATE INDEX idx_records_medical_consult_id ON records(medical_consult_id);
CREATE INDEX idx_records_date ON records(date);

-- Tabla gynecoObstetrics
CREATE TABLE gynecoObstetrics (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    births INT NOT NULL,
    abortions INT NOT NULL,
    cesarean INT NOT NULL,
    gestations INT NOT NULL,
    menstrual_cycles VARCHAR(50) NOT NULL,
    family_planning VARCHAR(50) NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla gynecoObstetrics
CREATE INDEX idx_gynecoObstetrics_medical_consult_id ON gynecoObstetrics(medical_consult_id);

-- Tabla habits
CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    smoke BOOLEAN NOT NULL,
    liquor BOOLEAN NOT NULL,
    other TEXT NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla habits
CREATE INDEX idx_habits_medical_consult_id ON habits(medical_consult_id);

-- Tabla familiarRecords
CREATE TABLE familiarRecords (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    relative TEXT NOT NULL,
    diagnostic TEXT NOT NULL,
    records TEXT NOT NULL,
    hemorrhagic BOOLEAN NOT NULL,
    thrombotic BOOLEAN NOT NULL,
    oncological BOOLEAN NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla familiarRecords
CREATE INDEX idx_familiarRecords_medical_consult_id ON familiarRecords(medical_consult_id);

-- Tabla vitalSignals
CREATE TABLE vitalSignals (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    size DECIMAL(5,2) NOT NULL,
    imc DECIMAL(5,2) NOT NULL,
    blood_pressure VARCHAR(10) NOT NULL,
    heart_frequency INT NOT NULL,
    system VARCHAR(50) NOT NULL,
    body_area VARCHAR(50) NOT NULL,
    symptom TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla vitalSignals
CREATE INDEX idx_vitalSignals_medical_consult_id ON vitalSignals(medical_consult_id);

-- Tabla laboratory
CREATE TABLE laboratory (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    exam_type VARCHAR(50) NOT NULL,
    exam VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    result TEXT NOT NULL,
    pathology_report BYTEA NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla laboratory
CREATE INDEX idx_laboratory_medical_consult_id ON laboratory(medical_consult_id);
CREATE INDEX idx_laboratory_date ON laboratory(date);

-- Tabla other_specialties
CREATE TABLE other_specialties (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    concept VARCHAR(500) NOT NULL,
    result TEXT NOT NULL,
    pathology_report BYTEA NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla other_specialties
CREATE INDEX idx_other_specialties_medical_consult_id ON other_specialties(medical_consult_id);
CREATE INDEX idx_other_specialties_date ON other_specialties(date);

-- Tabla diagnostic
CREATE TABLE diagnostic (
    id SERIAL PRIMARY KEY,
    medical_consult_id INT NOT NULL,
    diagnostic TEXT NOT NULL,
    epicrisis TEXT NOT NULL,
    FOREIGN KEY (medical_consult_id) REFERENCES medicalConsultation(id) ON DELETE CASCADE
);

-- Índices para la tabla diagnostic
CREATE INDEX idx_diagnostic_medical_consult_id ON diagnostic(medical_consult_id);

-- Tabla doctorRelative
CREATE TABLE doctorRelative (
    id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL,
    relative_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
    FOREIGN KEY (relative_id) REFERENCES relative(id) ON DELETE CASCADE
);

-- Índices para la tabla doctorRelative
CREATE INDEX idx_doctorRelative_doctor_id ON doctorRelative(doctor_id);
CREATE INDEX idx_doctorRelative_relative_id ON doctorRelative(relative_id);
CREATE INDEX idx_doctorRelative_service_id ON doctorRelative(service_id);

-- Tabla Role
CREATE TABLE "role" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    status BOOLEAN NOT NULL
);

-- Índices para la tabla Role
CREATE INDEX idx_Role_name ON "role"(name);

CREATE TABLE UserRole (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES "role"(id) ON DELETE CASCADE
);


-- Tabla doctorService
CREATE TABLE doctorService (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    visit_price DECIMAL(10,2) NOT NULL,
    doctor_id INT NOT NULL,
    discount DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

-- Índices para la tabla doctorService
CREATE INDEX idx_doctorService_doctor_id ON doctorService(doctor_id);
CREATE INDEX idx_doctorService_name ON doctorService(name);

-- Tabla moderatorFee
CREATE TABLE moderatorFee (
    id SERIAL PRIMARY KEY,
    health_insurance_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    income_range VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    copayment DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (health_insurance_id) REFERENCES healthInsurance(id) ON DELETE CASCADE
);

-- Índices para la tabla moderatorFee
CREATE INDEX idx_moderatorFee_health_insurance_id ON moderatorFee(health_insurance_id);
CREATE INDEX idx_moderatorFee_name ON moderatorFee(name);

-- Tabla regimentType
CREATE TABLE regimentType (
    id SERIAL PRIMARY KEY,
    health_insurance_id INT NOT NULL,
    regiment_type BOOLEAN NOT NULL,
    category VARCHAR(50) NOT NULL,
    max_value_event DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (health_insurance_id) REFERENCES healthInsurance(id) ON DELETE CASCADE
);

-- Índices para la tabla regimentType
CREATE INDEX idx_regimentType_health_insurance_id ON regimentType(health_insurance_id);

-- Tabla bonds
CREATE TABLE bonds (
    id SERIAL PRIMARY KEY,
    health_insurance_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (health_insurance_id) REFERENCES healthInsurance(id) ON DELETE CASCADE
);

-- Índices para la tabla bonds
CREATE INDEX idx_bonds_health_insurance_id ON bonds(health_insurance_id);
CREATE INDEX idx_bonds_name ON bonds(name);

-- Tabla contract
CREATE TABLE contract (
    id SERIAL PRIMARY KEY,
    health_insurance_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (health_insurance_id) REFERENCES healthInsurance(id) ON DELETE CASCADE
);

-- Índices para la tabla contract
CREATE INDEX idx_contract_health_insurance_id ON contract(health_insurance_id);
CREATE INDEX idx_contract_start_date ON contract(start_date);
CREATE INDEX idx_contract_end_date ON contract(end_date);

-- Tabla contractServices
CREATE TABLE contractServices (
    id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (contract_id) REFERENCES contract(id)
);

-- Índices para la tabla contractServices
CREATE INDEX idx_contractServices_contract_id ON contractServices(contract_id);

-- Tabla population
CREATE TABLE population (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    identification_type VARCHAR(50) NOT NULL,
    identification_number VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    place_of_birth TEXT NOT NULL,
    address TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    regiment_type BOOLEAN NOT NULL,
    phone VARCHAR(20) NOT NULL,
    occupation VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    position VARCHAR(50) NOT NULL,
    contract_id INT NOT NULL,
    FOREIGN KEY (contract_id) REFERENCES contract(id) ON DELETE CASCADE
);

-- Índices para la tabla population
CREATE INDEX idx_population_contract_id ON population(contract_id);
CREATE INDEX idx_population_name ON population(first_name, last_name);
CREATE INDEX idx_population_identification_number ON population(identification_number);

-- Tabla paymentBill
CREATE TABLE paymentBill (
    id SERIAL PRIMARY KEY,
    health_insurance_id INT NOT NULL,
    relative_id INT NOT NULL,
    doctor_service_id INT NOT NULL,
    FOREIGN KEY (health_insurance_id) REFERENCES healthInsurance(id),
    FOREIGN KEY (relative_id) REFERENCES relative(id),
    FOREIGN KEY (doctor_service_id) REFERENCES doctorService(id)
);

-- Índices para la tabla paymentBill
CREATE INDEX idx_paymentBill_health_insurance_id ON paymentBill(health_insurance_id);
CREATE INDEX idx_paymentBill_relative_id ON paymentBill(relative_id);
CREATE INDEX idx_paymentBill_doctor_service_id ON paymentBill(doctor_service_id);

-- Tabla appointments
CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  doctor_id BIGINT NOT NULL,
  calendly_event_id VARCHAR(255) UNIQUE NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

-- Índices para la tabla appointments
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_appointments_end_time ON appointments(end_time);

-- Tabla appointmentBreakdown
CREATE TABLE appointmentBreakdown (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Índices para la tabla appointmentBreakdown
CREATE INDEX idx_appointmentBreakdown_user_id ON appointmentBreakdown(user_id);
CREATE INDEX idx_appointmentBreakdown_doctor_id ON appointmentBreakdown(doctor_id);
CREATE INDEX idx_appointmentBreakdown_appointment_id ON appointmentBreakdown(appointment_id);

