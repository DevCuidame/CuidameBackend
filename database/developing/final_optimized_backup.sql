
-- Creating missing sequences
CREATE SEQUENCE IF NOT EXISTS public.alergias_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.antecedentes_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.appointmentbreakdown_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.appointments_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.atecedentes_familiares_id_seq START 1;
CREATE SEQUENCE IF NOT EXISTS public.bathroomhairdresser_id_seq START 1;


CREATE TABLE IF NOT EXISTS public.pacientes
(
    id bigint NOT NULL,
    code character varying(100)  NOT NULL,
    nombre character varying(255)  NOT NULL,
    apellido character varying(255)  NOT NULL,
    tipoid character varying(80)  NOT NULL,
    numeroid character varying(80)  NOT NULL,
    telefono character varying(30)  NOT NULL,
    fecha_nacimiento date,
    genero character varying(30)  NOT NULL,
    ciudad character varying(50)  NOT NULL,
    departamento character varying(50)  NOT NULL,
    direccion character varying(255)  NOT NULL,
    rh character varying(35)  NOT NULL,
    eps character varying(50),
    prepagada character varying(50),
    arl character varying(50),
    seguro_funerario character varying(50),
    a_cargo_id bigint NOT NULL,
    image character varying(255),
    enterprise character varying(255),
    nit character varying(255),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    photourl character varying(255),
    imagebs64 text,
    CONSTRAINT pacientes_pkey PRIMARY KEY (id),
    CONSTRAINT pacientes_code_key UNIQUE (code)
);


CREATE TABLE IF NOT EXISTS public.alergias
(
    FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id),
    id bigint NOT NULL ,
    id_paciente bigint NOT NULL,
    tipo_alergia character varying(100),
    descripcion character varying(1000),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT alergias_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.antecedentes
(
    FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id),
    id bigint NOT NULL ,
    id_paciente bigint NOT NULL,
    tipo_antecedente character varying(50),
    descripcion_antecedente character varying(1000),
    fecha_antecedente date,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT antecedentes_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.appointmentbreakdown
(
    id integer NOT NULL ,
    user_id integer NOT NULL,
    doctor_id integer NOT NULL,
    appointment_id integer NOT NULL,
    CONSTRAINT appointmentbreakdown_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.appointments
(
    id bigint NOT NULL ,
    user_id bigint NOT NULL,
    doctor_id bigint NOT NULL,
    calendly_event_id character varying(255)  NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    status character varying(50)  NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT appointments_pkey PRIMARY KEY (id),
    CONSTRAINT appointments_calendly_event_id_key UNIQUE (calendly_event_id)
);

CREATE TABLE IF NOT EXISTS public.antecedentes_familiares
(
    FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id),
    id bigint NOT NULL ,
    id_paciente bigint NOT NULL,
    tipo_antecedente character varying(50),
    parentesco character varying(100),
    descripcion_antecedente character varying(1000),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT antecedentes_familiares_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.bathroomhairdresser
(
    id bigint NOT NULL ,
    fullname character varying(100)  NOT NULL,
    idtype character varying(100)  NOT NULL,
    idnumber character varying(100)  NOT NULL,
    id_veterinarian character varying(20),
    occupation character varying(20),
    phone character varying(100)  NOT NULL,
    city_id bigint NOT NULL,
    address character varying(100)  NOT NULL,
    email character varying(100)  NOT NULL,
    calendy character varying(100)  NOT NULL,
    price character varying(10)  NOT NULL,
    CONSTRAINT bathroomhairdresser_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.blood_glucose
(
    id integer NOT NULL ,
    patient_id integer NOT NULL,
    rate integer NOT NULL,
    date timestamp without time zone NOT NULL,
    CONSTRAINT blood_glucose_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.blood_oxygen
(
    id integer NOT NULL ,
    patient_id integer NOT NULL,
    rate integer NOT NULL,
    date timestamp without time zone NOT NULL,
    CONSTRAINT blood_oxygen_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.blood_pressure
(
    id integer NOT NULL ,
    patient_id integer NOT NULL,
    systolic integer NOT NULL,
    diastolic integer NOT NULL,
    date timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    CONSTRAINT blood_pressure_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.bonds
(
    id integer NOT NULL ,
    health_insurance_id integer NOT NULL,
    name character varying(50)  NOT NULL,
    price numeric(10, 2) NOT NULL,
    CONSTRAINT bonds_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.clinics_services
(
    id integer NOT NULL ,
    name character varying(255)  NOT NULL,
    CONSTRAINT clinics_services_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.clinics_services_breakdown
(
    id integer NOT NULL ,
    clinic_service_id integer,
    veterinary_clinic_id integer,
    status boolean NOT NULL,
    CONSTRAINT clinics_services_breakdown_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.codes
(
    id bigint NOT NULL ,
    code character varying(100)  NOT NULL,
    hashcode character varying(100)  NOT NULL,
    license character varying(50)  NOT NULL,
    agreement character varying(50),
    created_at timestamp(0) without time zone NOT NULL,
    status character varying(20),
    CONSTRAINT codes_pkey PRIMARY KEY (id),
    CONSTRAINT codes_code_key UNIQUE (code),
    CONSTRAINT codes_hashcode_key UNIQUE (hashcode)
);

CREATE TABLE IF NOT EXISTS public.company
(
    id integer NOT NULL ,
    name character varying(50)  NOT NULL,
    address text  NOT NULL,
    nit character varying(20)  NOT NULL,
    phone character varying(20)  NOT NULL,
    contact character varying(50)  NOT NULL,
    city_id integer NOT NULL,
    CONSTRAINT company_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.condicion
(
    id bigint NOT NULL ,
    id_paciente bigint NOT NULL,
    discapacidad character varying(100),
    embarazada character varying(10),
    cicatrices_descripcion character varying(1000),
    tatuajes_descripcion character varying(1000),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT condicion_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.contactos
(
    id bigint NOT NULL ,
    id_usuario bigint NOT NULL,
    nombre1 character varying(100),
    telefono1 character varying(50),
    nombre2 character varying(100),
    telefono2 character varying(50),
    nombre3 character varying(100),
    telefono3 character varying(50),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT contactos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.contract
(
    id integer NOT NULL ,
    health_insurance_id integer NOT NULL,
    type character varying(50)  NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    CONSTRAINT contract_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.contractservices
(
    id integer NOT NULL ,
    contract_id integer NOT NULL,
    name character varying(50)  NOT NULL,
    type character varying(50)  NOT NULL,
    price numeric(10, 2) NOT NULL,
    CONSTRAINT contractservices_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.dbbomberos
(
    id bigint NOT NULL ,
    nombres character varying(100)  NOT NULL,
    apellidos character varying(100)  NOT NULL,
    cedula character varying(100)  NOT NULL,
    registro_bomberos character varying(100)  NOT NULL,
    CONSTRAINT dbbomberos_pkey PRIMARY KEY (id),
    CONSTRAINT dbbomberos_apellidos_key UNIQUE (apellidos),
    CONSTRAINT dbbomberos_cedula_key UNIQUE (cedula),
    CONSTRAINT dbbomberos_nombres_key UNIQUE (nombres),
    CONSTRAINT dbbomberos_registro_bomberos_key UNIQUE (registro_bomberos)
);

CREATE TABLE IF NOT EXISTS public.dbdefensacivil
(
    id bigint NOT NULL ,
    nombres character varying(100)  NOT NULL,
    apellidos character varying(100)  NOT NULL,
    cedula character varying(100)  NOT NULL,
    registro_defensa_civil character varying(100)  NOT NULL,
    CONSTRAINT dbdefensacivil_pkey PRIMARY KEY (id),
    CONSTRAINT dbdefensacivil_apellidos_key UNIQUE (apellidos),
    CONSTRAINT dbdefensacivil_cedula_key UNIQUE (cedula),
    CONSTRAINT dbdefensacivil_nombres_key UNIQUE (nombres),
    CONSTRAINT dbdefensacivil_registro_defensa_civil_key UNIQUE (registro_defensa_civil)
);

CREATE TABLE IF NOT EXISTS public.dbmedicina
(
    id bigint NOT NULL ,
    nombres character varying(100)  NOT NULL,
    apellidos character varying(100)  NOT NULL,
    cedula character varying(100)  NOT NULL,
    registro_medico character varying(100)  NOT NULL,
    CONSTRAINT dbmedicina_pkey PRIMARY KEY (id),
    CONSTRAINT dbmedicina_apellidos_key UNIQUE (apellidos),
    CONSTRAINT dbmedicina_cedula_key UNIQUE (cedula),
    CONSTRAINT dbmedicina_nombres_key UNIQUE (nombres),
    CONSTRAINT dbmedicina_registro_medico_key UNIQUE (registro_medico)
);

CREATE TABLE IF NOT EXISTS public.dbpolicia
(
    id bigint NOT NULL ,
    nombres character varying(100)  NOT NULL,
    apellidos character varying(100)  NOT NULL,
    cedula character varying(100)  NOT NULL,
    placa character varying(100)  NOT NULL,
    CONSTRAINT dbpolicia_pkey PRIMARY KEY (id),
    CONSTRAINT dbpolicia_apellidos_key UNIQUE (apellidos),
    CONSTRAINT dbpolicia_cedula_key UNIQUE (cedula),
    CONSTRAINT dbpolicia_nombres_key UNIQUE (nombres),
    CONSTRAINT dbpolicia_placa_key UNIQUE (placa)
);

CREATE TABLE IF NOT EXISTS public.departments
(
    id bigint NOT NULL ,
    name character varying(255)  NOT NULL,
    code integer NOT NULL,
    CONSTRAINT departments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.diagnostic
(
    id integer NOT NULL ,
    medical_consult_id integer NOT NULL,
    diagnostic text  NOT NULL,
    epicrisis text  NOT NULL,
    CONSTRAINT diagnostic_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.doctor
(
    id integer NOT NULL ,
    first_name character varying(50)  NOT NULL,
    last_name character varying(50)  NOT NULL,
    identification_type character varying(50)  NOT NULL,
    identification_number character varying(50)  NOT NULL,
    city_id integer NOT NULL,
    address text  NOT NULL,
    phone character varying(20)  NOT NULL,
    medical_record text  NOT NULL,
    medical_specialist text  NOT NULL,
    landline_phone character varying(20)  NOT NULL,
    note text  NOT NULL,
    rating integer NOT NULL,
    pub_name character varying,
    priv_name character varying,
    file_bs64 text,
    icon_bs64 text,
    CONSTRAINT doctor_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.doctorrelative
(
    id integer NOT NULL ,
    doctor_id integer NOT NULL,
    relative_id integer NOT NULL,
    service_id integer NOT NULL,
    CONSTRAINT doctorrelative_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.doctorservice
(
    id integer NOT NULL ,
    name character varying(50)  NOT NULL,
    visit_price numeric(10, 2) NOT NULL,
    doctor_id integer NOT NULL,
    discount numeric(5, 2) NOT NULL,
    CONSTRAINT doctorservice_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.documents
(
    id integer NOT NULL ,
    provider_id integer NOT NULL,
    pub_name character varying(255)  NOT NULL,
    priv_name character varying(255)  NOT NULL,
    file_bs64 text  NOT NULL,
    CONSTRAINT documents_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.emergencycontact
(
    id integer NOT NULL ,
    relative_id integer NOT NULL,
    first_name character varying(50)  NOT NULL,
    last_name character varying(50)  NOT NULL,
    phone character varying(20)  NOT NULL,
    CONSTRAINT emergencycontact_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.enfermedades
(
    id bigint NOT NULL ,
    id_paciente bigint NOT NULL,
    enfermedad character varying(200),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT enfermedades_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.establishment
(
    id integer NOT NULL ,
    provider_id integer NOT NULL,
    own boolean NOT NULL,
    full_name character varying(255)  NOT NULL,
    CONSTRAINT establishment_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.familiarrecords
(
    id integer NOT NULL ,
    medical_consult_id integer NOT NULL,
    relative text  NOT NULL,
    diagnostic text  NOT NULL,
    records text  NOT NULL,
    hemorrhagic boolean NOT NULL,
    thrombotic boolean NOT NULL,
    oncological boolean NOT NULL,
    CONSTRAINT familiarrecords_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.gynecoobstetrics
(
    id integer NOT NULL ,
    medical_consult_id integer NOT NULL,
    births integer NOT NULL,
    abortions integer NOT NULL,
    cesarean integer NOT NULL,
    gestations integer NOT NULL,
    menstrual_cycles character varying(50)  NOT NULL,
    family_planning character varying(50)  NOT NULL,
    CONSTRAINT gynecoobstetrics_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.habits
(
    id integer NOT NULL ,
    medical_consult_id integer NOT NULL,
    smoke boolean NOT NULL,
    liquor boolean NOT NULL,
    other text  NOT NULL,
    CONSTRAINT habits_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.healthinsurance
(
    id integer NOT NULL,
    company character varying(50)  NOT NULL,
    address1 text  NOT NULL,
    address2 text  NOT NULL,
    city character varying(50)  NOT NULL,
    phone character varying(20)  NOT NULL,
    email character varying(50)  NOT NULL,
    CONSTRAINT healthinsurance_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.heart_rate
(
    id integer NOT NULL ,
    patient_id integer NOT NULL,
    rate integer NOT NULL,
    date timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    CONSTRAINT heart_rate_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.hotelnursery
(
    id bigint NOT NULL ,
    fullname character varying(100)  NOT NULL,
    idtype character varying(100)  NOT NULL,
    idnumber character varying(100)  NOT NULL,
    id_veterinarian character varying(20),
    occupation character varying(20),
    phone character varying(100)  NOT NULL,
    city_id bigint NOT NULL,
    address character varying(100)  NOT NULL,
    email character varying(100)  NOT NULL,
    calendy character varying(100)  NOT NULL,
    price character varying(10)  NOT NULL,
    CONSTRAINT hotelnursery_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.ingreso_salud
(
    id bigint NOT NULL ,
    nombres character varying(80)  NOT NULL,
    numeroid character varying(80)  NOT NULL,
    hora_ingreso timestamp(0) without time zone NOT NULL,
    CONSTRAINT ingreso_salud_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.laboratory
(
    id integer NOT NULL ,
    medical_consult_id integer NOT NULL,
    exam_type character varying(50)  NOT NULL,
    exam character varying(50)  NOT NULL,
    date date NOT NULL,
    result text  NOT NULL,
    pathology_report bytea NOT NULL,
    CONSTRAINT laboratory_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.legal_representative
(
    id integer NOT NULL ,
    provider_id integer NOT NULL,
    identification_type character varying(255)  NOT NULL,
    identification_number character varying(255)  NOT NULL,
    full_name character varying(255)  NOT NULL,
    email character varying(255)  NOT NULL,
    CONSTRAINT legal_representative_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.license
(
    id bigint NOT NULL ,
    code character varying(100)  NOT NULL,
    agreement character varying(50)  NOT NULL,
    discount numeric(10, 0) NOT NULL,
    price integer NOT NULL,
    total numeric(100, 0) NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT license_pkey PRIMARY KEY (id),
    CONSTRAINT license_agreement_key UNIQUE (agreement),
    CONSTRAINT license_code_key UNIQUE (code),
    CONSTRAINT license_discount_key UNIQUE (discount),
    CONSTRAINT license_price_key UNIQUE (price),
    CONSTRAINT license_total_key UNIQUE (total)
);

CREATE TABLE IF NOT EXISTS public.mascotas
(
    id bigint NOT NULL ,
    id_usuario bigint NOT NULL,
    hashcode character varying(80)  NOT NULL,
    nombre character varying(50)  NOT NULL,
    especie character varying(50)  NOT NULL,
    raza character varying(50)  NOT NULL,
    peso character varying(50)  NOT NULL,
    sexo character varying(50)  NOT NULL,
    color character varying(100)  NOT NULL,
    fechanacimiento date NOT NULL,
    descripcion character varying(1000)  NOT NULL,
    seguro character varying(100)  NOT NULL,
    estatura character varying(50)  NOT NULL,
    temperamento character varying(100)  NOT NULL,
    nochip character varying(100),
    photourl character varying(100),
    photoname character varying(500),
    created_at timestamp(0) without time zone,
    petid character varying(50),
    castrated boolean,
    CONSTRAINT mascotas_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.medicalconsultation
(
    id integer NOT NULL ,
    relative_id integer NOT NULL,
    type character varying(50)  NOT NULL,
    city_id integer NOT NULL,
    date date NOT NULL,
    reason text  NOT NULL,
    CONSTRAINT medicalconsultation_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.medicamentos
(
    id bigint NOT NULL ,
    id_paciente bigint NOT NULL,
    medicamento character varying(100),
    laboratorio character varying(100),
    formula character varying(255),
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT medicamentos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.moderatorfee
(
    id integer NOT NULL ,
    health_insurance_id integer NOT NULL,
    name character varying(50)  NOT NULL,
    price integer NOT NULL,
    income_range character varying(50)  NOT NULL,
    category character varying(50)  NOT NULL,
    copayment numeric(10, 2) NOT NULL,
    CONSTRAINT moderatorfee_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.other_specialties
(
    id integer NOT NULL ,
    medical_consult_id integer NOT NULL,
    type character varying(50)  NOT NULL,
    date date NOT NULL,
    concept character varying(500)  NOT NULL,
    result text  NOT NULL,
    pathology_report bytea NOT NULL,
    CONSTRAINT other_specialties_pkey PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS public.paymentbill
(
    id integer NOT NULL ,
    health_insurance_id integer NOT NULL,
    relative_id integer NOT NULL,
    doctor_service_id integer NOT NULL,
    CONSTRAINT paymentbill_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.personal_salud
(
    id bigint NOT NULL,
    tipoid character varying(80)  NOT NULL,
    numeroid character varying(80)  NOT NULL,
    primer_nombre character varying(255)  NOT NULL,
    primer_apellido character varying(255)  NOT NULL,
    CONSTRAINT personal_salud_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.pertenencias
(
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    hashcode character varying(80)  NOT NULL,
    objeto character varying(50)  NOT NULL,
    descripcion character varying(1000),
    created_at timestamp(0) without time zone,
    CONSTRAINT pertenencias_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.petsdiseasecondition
(
    id bigint NOT NULL,
    pet_id bigint NOT NULL,
    typediseasecondition character varying(100)  NOT NULL,
    name character varying(100)  NOT NULL,
    diagnosticdate date NOT NULL,
    status character varying(100)  NOT NULL,
    description character varying(200)  NOT NULL,
    CONSTRAINT petsdiseasecondition_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.petstreatment
(
    id bigint NOT NULL,
    pet_id bigint NOT NULL,
    typetreatment character varying(100)  NOT NULL,
    name character varying(100)  NOT NULL,
    status character varying(100)  NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    frequency character varying(100)  NOT NULL,
    CONSTRAINT petstreatment_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.petsvaccine
(
    id bigint NOT NULL,
    pet_id bigint NOT NULL,
    name character varying(100)  NOT NULL,
    laboratory character varying(100)  NOT NULL,
    startdate date NOT NULL,
    nextdate date,
    dose character varying(50)  NOT NULL,
    photourl character varying(10000000),
    photoname character varying(500),
    CONSTRAINT petsvaccine_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.petsveterinarian
(
    id bigint NOT NULL,
    pet_id bigint NOT NULL,
    fullname character varying(100)  NOT NULL,
    idtype character varying(100)  NOT NULL,
    idnumber character varying(100)  NOT NULL,
    phone character varying(100)  NOT NULL,
    city_id bigint NOT NULL,
    address character varying(100)  NOT NULL,
    email character varying(100)  NOT NULL,
    calendy character varying(100),
    CONSTRAINT petsveterinarian_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.population
(
    id integer NOT NULL,
    first_name character varying(50)  NOT NULL,
    last_name character varying(50)  NOT NULL,
    identification_type character varying(50)  NOT NULL,
    identification_number character varying(50)  NOT NULL,
    age integer NOT NULL,
    gender character varying(10)  NOT NULL,
    marital_status character varying(20)  NOT NULL,
    place_of_birth text  NOT NULL,
    address text  NOT NULL,
    category character varying(50)  NOT NULL,
    regiment_type boolean NOT NULL,
    phone character varying(20)  NOT NULL,
    occupation character varying(50)  NOT NULL,
    status character varying(20)  NOT NULL,
    "position" character varying(50)  NOT NULL,
    contract_id integer NOT NULL,
    CONSTRAINT population_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.provider
(
    id integer NOT NULL,
    provider_type character varying(255)  NOT NULL,
    identification_type character varying(255)  NOT NULL,
    identification_number character varying(255)  NOT NULL,
    full_name character varying(255)  NOT NULL,
    email character varying(255)  NOT NULL,
    phone character varying(255)  NOT NULL,
    address character varying(255)  NOT NULL,
    city bigint NOT NULL,
    department character varying(255),
    photo_bs64 text,
    pub_photo character varying(255),
    priv_photo character varying(255),
    status boolean NOT NULL,
    CONSTRAINT provider_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.provider_services
(
    id integer NOT NULL,
    provider_id integer NOT NULL,
    service_id integer NOT NULL,
    status boolean NOT NULL,
    CONSTRAINT provider_services_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.records
(
    id integer NOT NULL,
    medical_consult_id integer NOT NULL,
    type character varying(50)  NOT NULL,
    date date NOT NULL,
    description text  NOT NULL,
    CONSTRAINT records_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.regimenttype
(
    id integer NOT NULL,
    health_insurance_id integer NOT NULL,
    regiment_type boolean NOT NULL,
    category character varying(50)  NOT NULL,
    max_value_event numeric(10, 2) NOT NULL,
    CONSTRAINT regimenttype_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.relative
(
    id integer NOT NULL,
    user_id bigint NOT NULL,
    doctor_id bigint NOT NULL,
    first_name character varying(50)  NOT NULL,
    last_name character varying(50)  NOT NULL,
    identification_type character varying(50)  NOT NULL,
    identification_number character varying(50)  NOT NULL,
    age integer NOT NULL,
    gender character varying(10)  NOT NULL,
    marital_status character varying(20)  NOT NULL,
    place_of_birth text  NOT NULL,
    city_id integer NOT NULL,
    address text  NOT NULL,
    phone character varying(20)  NOT NULL,
    occupation character varying(50)  NOT NULL,
    "position" character varying(50)  NOT NULL,
    health_insurance_id integer NOT NULL,
    company_id integer NOT NULL,
    status character varying(20)  NOT NULL,
    CONSTRAINT relative_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.respiratory_rate
(
    id integer NOT NULL,
    patient_id integer NOT NULL,
    rate integer NOT NULL,
    date timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    CONSTRAINT respiratory_rate_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.role
(
    id integer NOT NULL,
    name character varying(50)  NOT NULL,
    status boolean NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.services
(
    id integer NOT NULL,
    name character varying(255)  NOT NULL,
    CONSTRAINT services_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.sites
(
    id integer NOT NULL,
    address text  NOT NULL,
    phone character varying(20)  NOT NULL,
    contact character varying(50)  NOT NULL,
    city_id integer NOT NULL,
    company_id integer NOT NULL,
    CONSTRAINT sites_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.townships
(
    id bigint NOT NULL,
    department_id bigint NOT NULL,
    code character varying(255)  NOT NULL,
    name character varying(255)  NOT NULL,
    CONSTRAINT townships_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.userrole
(
    id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    CONSTRAINT userrole_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL ,
    code character varying(100),
    hashcode character varying(200),
    name character varying(100)  NOT NULL,
    lastname character varying(100)  NOT NULL,
    typeperson character varying(100),
    typeid character varying(100)  NOT NULL,
    numberid character varying(80),
    address character varying(100),
    city_id bigint,
    phone character varying(80)  NOT NULL,
    email character varying(255)  NOT NULL,
    parentesco character varying(100),
    notificationid character varying(255),
    password character varying(255),
    session_token character varying(255),
    verificado boolean NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    service character varying(20),
    pubname character varying(100),
    privname character varying(100),
    imagebs64 text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_code_key UNIQUE (code),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_hashcode_key UNIQUE (hashcode),
    CONSTRAINT users_notificationid_key UNIQUE (notificationid)
);

CREATE TABLE IF NOT EXISTS public.vacunas
(
    id bigint NOT NULL,
    id_paciente bigint NOT NULL,
    vacuna character varying(100),
    updated_at timestamp(0) without time zone NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    CONSTRAINT vacunas_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.veterinarians
(
    id bigint NOT NULL ,
    fullname character varying(100)  NOT NULL,
    idtype character varying(100)  NOT NULL,
    idnumber character varying(100)  NOT NULL,
    phone character varying(100)  NOT NULL,
    city_id bigint NOT NULL,
    address character varying(100)  NOT NULL,
    email character varying(100)  NOT NULL,
    calendy character varying(100),
    price character varying(10),
    reg_veterinarian character varying(20),
    occupation character varying(20),
    CONSTRAINT veterinarians_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.veterinary_clinics
(
    id integer NOT NULL,
    business_name character varying(255)  NOT NULL,
    entity_type character varying(100)  NOT NULL,
    priority character varying(100),
    strategy character varying(255),
    name_1 character varying(100),
    name_2 character varying(100),
    last_name_1 character varying(100),
    last_name_2 character varying(100),
    registration_date date,
    renewal_date date,
    vicinity character varying(255),
    township integer,
    phone_1 character varying(15),
    phone_2 character varying(15),
    email character varying(255),
    ciiu_1 character varying(500),
    ciiu_2 character varying(500),
    ciiu_3 character varying(500),
    ciiu_4 character varying(500),
    activity character varying(500),
    company_size character varying(500),
    owner_name character varying(500),
    legal_representative_name character varying(500),
    CONSTRAINT veterinary_clinics_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vitalsignals
(
    id integer NOT NULL,
    medical_consult_id integer NOT NULL,
    weight numeric(5, 2) NOT NULL,
    size numeric(5, 2) NOT NULL,
    imc numeric(5, 2) NOT NULL,
    blood_pressure character varying(10)  NOT NULL,
    heart_frequency integer NOT NULL,
    system character varying(50)  NOT NULL,
    body_area character varying(50)  NOT NULL,
    symptom text  NOT NULL,
    description text  NOT NULL,
    CONSTRAINT vitalsignals_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.wellnessspa
(
    id bigint NOT NULL,
    fullname character varying(100)  NOT NULL,
    idtype character varying(100)  NOT NULL,
    idnumber character varying(100)  NOT NULL,
    id_veterinarian character varying(20),
    occupation character varying(20),
    phone character varying(100)  NOT NULL,
    city_id bigint NOT NULL,
    address character varying(100)  NOT NULL,
    email character varying(100)  NOT NULL,
    calendy character varying(100)  NOT NULL,
    price character varying(10)  NOT NULL,
    CONSTRAINT wellnessspa_pkey PRIMARY KEY (id)
);


ALTER TABLE IF EXISTS public.appointmentbreakdown
    ADD CONSTRAINT appointmentbreakdown_appointment_id_fkey FOREIGN KEY (appointment_id)
    REFERENCES public.appointments (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_appointmentbreakdown_appointment_id
    ON public.appointmentbreakdown(appointment_id);


ALTER TABLE IF EXISTS public.appointmentbreakdown
    ADD CONSTRAINT appointmentbreakdown_doctor_id_fkey FOREIGN KEY (doctor_id)
    REFERENCES public.doctor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_appointmentbreakdown_doctor_id
    ON public.appointmentbreakdown(doctor_id);


ALTER TABLE IF EXISTS public.appointmentbreakdown
    ADD CONSTRAINT appointmentbreakdown_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_appointmentbreakdown_user_id
    ON public.appointmentbreakdown(user_id);


ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id)
    REFERENCES public.doctor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id
    ON public.appointments(doctor_id);


ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_appointments_user_id
    ON public.appointments(user_id);



ALTER TABLE IF EXISTS public.bathroomhairdresser
    ADD CONSTRAINT bathroomhairdresser_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.blood_glucose
    ADD CONSTRAINT fk_patient FOREIGN KEY (patient_id)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.blood_oxygen
    ADD CONSTRAINT fk_patient FOREIGN KEY (patient_id)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.blood_pressure
    ADD CONSTRAINT blood_pressure_patient_id_fkey FOREIGN KEY (patient_id)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_blood_pressure_patient_id
    ON public.blood_pressure(patient_id);


ALTER TABLE IF EXISTS public.bonds
    ADD CONSTRAINT bonds_health_insurance_id_fkey FOREIGN KEY (health_insurance_id)
    REFERENCES public.healthinsurance (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_bonds_health_insurance_id
    ON public.bonds(health_insurance_id);


ALTER TABLE IF EXISTS public.clinics_services_breakdown
    ADD CONSTRAINT clinics_services_breakdown_clinic_service_id_fkey FOREIGN KEY (clinic_service_id)
    REFERENCES public.clinics_services (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.clinics_services_breakdown
    ADD CONSTRAINT clinics_services_breakdown_veterinary_clinic_id_fkey FOREIGN KEY (veterinary_clinic_id)
    REFERENCES public.veterinary_clinics (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.company
    ADD CONSTRAINT company_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_company_city_id
    ON public.company(city_id);


ALTER TABLE IF EXISTS public.condicion
    ADD CONSTRAINT condicion_id_paciente_fkey FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.contactos
    ADD CONSTRAINT contactos_id_usuario_fkey FOREIGN KEY (id_usuario)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.contract
    ADD CONSTRAINT contract_health_insurance_id_fkey FOREIGN KEY (health_insurance_id)
    REFERENCES public.healthinsurance (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_contract_health_insurance_id
    ON public.contract(health_insurance_id);


ALTER TABLE IF EXISTS public.contractservices
    ADD CONSTRAINT contractservices_contract_id_fkey FOREIGN KEY (contract_id)
    REFERENCES public.contract (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_contractservices_contract_id
    ON public.contractservices(contract_id);


ALTER TABLE IF EXISTS public.diagnostic
    ADD CONSTRAINT diagnostic_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_diagnostic_medical_consult_id
    ON public.diagnostic(medical_consult_id);


ALTER TABLE IF EXISTS public.doctor
    ADD CONSTRAINT doctor_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_doctor_city_id
    ON public.doctor(city_id);


ALTER TABLE IF EXISTS public.doctorrelative
    ADD CONSTRAINT doctorrelative_doctor_id_fkey FOREIGN KEY (doctor_id)
    REFERENCES public.doctor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_doctorrelative_doctor_id
    ON public.doctorrelative(doctor_id);


ALTER TABLE IF EXISTS public.doctorrelative
    ADD CONSTRAINT doctorrelative_relative_id_fkey FOREIGN KEY (relative_id)
    REFERENCES public.relative (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_doctorrelative_relative_id
    ON public.doctorrelative(relative_id);


ALTER TABLE IF EXISTS public.doctorservice
    ADD CONSTRAINT doctorservice_doctor_id_fkey FOREIGN KEY (doctor_id)
    REFERENCES public.doctor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_doctorservice_doctor_id
    ON public.doctorservice(doctor_id);


ALTER TABLE IF EXISTS public.documents
    ADD CONSTRAINT documents_provider_id_fkey FOREIGN KEY (provider_id)
    REFERENCES public.provider (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.emergencycontact
    ADD CONSTRAINT emergencycontact_relative_id_fkey FOREIGN KEY (relative_id)
    REFERENCES public.relative (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_emergencycontact_relative_id
    ON public.emergencycontact(relative_id);


ALTER TABLE IF EXISTS public.enfermedades
    ADD CONSTRAINT enfermedades_id_paciente_fkey FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.establishment
    ADD CONSTRAINT establishment_provider_id_fkey FOREIGN KEY (provider_id)
    REFERENCES public.provider (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.familiarrecords
    ADD CONSTRAINT familiarrecords_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_familiarrecords_medical_consult_id
    ON public.familiarrecords(medical_consult_id);


ALTER TABLE IF EXISTS public.gynecoobstetrics
    ADD CONSTRAINT gynecoobstetrics_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_gynecoobstetrics_medical_consult_id
    ON public.gynecoobstetrics(medical_consult_id);


ALTER TABLE IF EXISTS public.habits
    ADD CONSTRAINT habits_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_habits_medical_consult_id
    ON public.habits(medical_consult_id);


ALTER TABLE IF EXISTS public.heart_rate
    ADD CONSTRAINT heart_rate_patient_id_fkey FOREIGN KEY (patient_id)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_heart_rate_patient_id
    ON public.heart_rate(patient_id);


ALTER TABLE IF EXISTS public.hotelnursery
    ADD CONSTRAINT hotelnursery_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.laboratory
    ADD CONSTRAINT laboratory_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_laboratory_medical_consult_id
    ON public.laboratory(medical_consult_id);


ALTER TABLE IF EXISTS public.legal_representative
    ADD CONSTRAINT legal_representative_provider_id_fkey FOREIGN KEY (provider_id)
    REFERENCES public.provider (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.mascotas
    ADD CONSTRAINT mascotas_id_usuario_fkey FOREIGN KEY (id_usuario)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.medicalconsultation
    ADD CONSTRAINT medicalconsultation_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_medicalconsultation_city_id
    ON public.medicalconsultation(city_id);


ALTER TABLE IF EXISTS public.medicalconsultation
    ADD CONSTRAINT medicalconsultation_relative_id_fkey FOREIGN KEY (relative_id)
    REFERENCES public.relative (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_medicalconsultation_relative_id
    ON public.medicalconsultation(relative_id);


ALTER TABLE IF EXISTS public.medicamentos
    ADD CONSTRAINT medicamentos_id_paciente_fkey FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.moderatorfee
    ADD CONSTRAINT moderatorfee_health_insurance_id_fkey FOREIGN KEY (health_insurance_id)
    REFERENCES public.healthinsurance (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_moderatorfee_health_insurance_id
    ON public.moderatorfee(health_insurance_id);


ALTER TABLE IF EXISTS public.other_specialties
    ADD CONSTRAINT other_specialties_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_other_specialties_medical_consult_id
    ON public.other_specialties(medical_consult_id);


ALTER TABLE IF EXISTS public.pacientes
    ADD CONSTRAINT pacientes_a_cargo_id_fkey FOREIGN KEY (a_cargo_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.paymentbill
    ADD CONSTRAINT paymentbill_doctor_service_id_fkey FOREIGN KEY (doctor_service_id)
    REFERENCES public.doctorservice (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_paymentbill_doctor_service_id
    ON public.paymentbill(doctor_service_id);


ALTER TABLE IF EXISTS public.paymentbill
    ADD CONSTRAINT paymentbill_health_insurance_id_fkey FOREIGN KEY (health_insurance_id)
    REFERENCES public.healthinsurance (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_paymentbill_health_insurance_id
    ON public.paymentbill(health_insurance_id);


ALTER TABLE IF EXISTS public.paymentbill
    ADD CONSTRAINT paymentbill_relative_id_fkey FOREIGN KEY (relative_id)
    REFERENCES public.relative (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_paymentbill_relative_id
    ON public.paymentbill(relative_id);


ALTER TABLE IF EXISTS public.pertenencias
    ADD CONSTRAINT pertenencias_id_user_fkey FOREIGN KEY (id_user)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.petsdiseasecondition
    ADD CONSTRAINT petsdiseasecondition_pet_id_fkey FOREIGN KEY (pet_id)
    REFERENCES public.mascotas (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.petstreatment
    ADD CONSTRAINT petstreatment_pet_id_fkey FOREIGN KEY (pet_id)
    REFERENCES public.mascotas (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.petsvaccine
    ADD CONSTRAINT petsvaccine_pet_id_fkey FOREIGN KEY (pet_id)
    REFERENCES public.mascotas (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.petsveterinarian
    ADD CONSTRAINT petsveterinarian_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.petsveterinarian
    ADD CONSTRAINT petsveterinarian_pet_id_fkey FOREIGN KEY (pet_id)
    REFERENCES public.mascotas (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.population
    ADD CONSTRAINT population_contract_id_fkey FOREIGN KEY (contract_id)
    REFERENCES public.contract (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_population_contract_id
    ON public.population(contract_id);


ALTER TABLE IF EXISTS public.provider
    ADD CONSTRAINT provider_city_fkey FOREIGN KEY (city)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.provider_services
    ADD CONSTRAINT provider_services_provider_id_fkey FOREIGN KEY (provider_id)
    REFERENCES public.provider (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.provider_services
    ADD CONSTRAINT provider_services_service_id_fkey FOREIGN KEY (service_id)
    REFERENCES public.services (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.records
    ADD CONSTRAINT records_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_records_medical_consult_id
    ON public.records(medical_consult_id);


ALTER TABLE IF EXISTS public.regimenttype
    ADD CONSTRAINT regimenttype_health_insurance_id_fkey FOREIGN KEY (health_insurance_id)
    REFERENCES public.healthinsurance (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_regimenttype_health_insurance_id
    ON public.regimenttype(health_insurance_id);


ALTER TABLE IF EXISTS public.relative
    ADD CONSTRAINT relative_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_relative_city_id
    ON public.relative(city_id);


ALTER TABLE IF EXISTS public.relative
    ADD CONSTRAINT relative_company_id_fkey FOREIGN KEY (company_id)
    REFERENCES public.company (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_relative_company_id
    ON public.relative(company_id);


ALTER TABLE IF EXISTS public.relative
    ADD CONSTRAINT relative_doctor_id_fkey FOREIGN KEY (doctor_id)
    REFERENCES public.doctor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_relative_doctor_id
    ON public.relative(doctor_id);


ALTER TABLE IF EXISTS public.relative
    ADD CONSTRAINT relative_health_insurance_id_fkey FOREIGN KEY (health_insurance_id)
    REFERENCES public.healthinsurance (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_relative_health_insurance_id
    ON public.relative(health_insurance_id);


ALTER TABLE IF EXISTS public.relative
    ADD CONSTRAINT relative_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_relative_user_id
    ON public.relative(user_id);


ALTER TABLE IF EXISTS public.respiratory_rate
    ADD CONSTRAINT respiratory_rate_patient_id_fkey FOREIGN KEY (patient_id)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_respiratory_rate_patient_id
    ON public.respiratory_rate(patient_id);


ALTER TABLE IF EXISTS public.sites
    ADD CONSTRAINT sites_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
CREATE INDEX IF NOT EXISTS idx_sites_city_id
    ON public.sites(city_id);


ALTER TABLE IF EXISTS public.sites
    ADD CONSTRAINT sites_company_id_fkey FOREIGN KEY (company_id)
    REFERENCES public.company (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_sites_company_id
    ON public.sites(company_id);


ALTER TABLE IF EXISTS public.townships
    ADD CONSTRAINT townships_department_id_fkey FOREIGN KEY (department_id)
    REFERENCES public.departments (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.userrole
    ADD CONSTRAINT userrole_role_id_fkey FOREIGN KEY (role_id)
    REFERENCES public.role (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.userrole
    ADD CONSTRAINT userrole_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT users_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;



ALTER TABLE IF EXISTS public.vacunas
    ADD CONSTRAINT vacunas_id_paciente_fkey FOREIGN KEY (id_paciente)
    REFERENCES public.pacientes (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.veterinarians
    ADD CONSTRAINT veterinarians_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.veterinary_clinics
    ADD CONSTRAINT veterinary_clinics_township_fkey FOREIGN KEY (township)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.vitalsignals
    ADD CONSTRAINT vitalsignals_medical_consult_id_fkey FOREIGN KEY (medical_consult_id)
    REFERENCES public.medicalconsultation (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_vitalsignals_medical_consult_id
    ON public.vitalsignals(medical_consult_id);


ALTER TABLE IF EXISTS public.wellnessspa
    ADD CONSTRAINT wellnessspa_city_id_fkey FOREIGN KEY (city_id)
    REFERENCES public.townships (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;

