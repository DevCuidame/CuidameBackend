CREATE TABLE controlMedicines (
    id SERIAL PRIMARY KEY, -- Identificador único
    medicament_name VARCHAR(50) NOT NULL, -- Nombre del Medicamento
    date_order DATE NOT NULL, -- Fecha de la Orden
    duration VARCHAR(100), -- Duración
    dose VARCHAR(100), -- Dosis
    frequency VARCHAR(100), -- Frecuencia
    quantity VARCHAR(100), -- Cantidad
    authorized BOOLEAN DEFAULT FALSE, -- No autorizado
    mipres BOOLEAN DEFAULT FALSE, -- Checkbox Mipres
    controlled_substances BOOLEAN DEFAULT FALSE, -- Checkbox Estupefacientes
    eps_authorization BOOLEAN DEFAULT FALSE, -- Checkbox Autorización EPS
    pharmacy VARCHAR(100), -- Farmacia o institución
    date_auth DATE, -- Fecha Autorización
    phone VARCHAR(15), -- Teléfono
    address TEXT, -- Dirección
    description TEXT, -- ¿Por qué no se autorizó?
    delivery_status VARCHAR(50), -- Estado de la entrega
    delivery_date DATE, -- Fecha Entrega
    comments TEXT, -- Observaciones
    id_patient INT NOT NULL,

    FOREIGN KEY (id_patient) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE imagesmedicine (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,           -- Nombre de la imagen
    path TEXT NOT NULL,                   -- Ruta de almacenamiento
    category VARCHAR(50) NOT NULL,            -- Nombre de la imagen
	id_order INT NOT NULL,                -- ID de la orden de medicamentos
    created_at TIMESTAMP DEFAULT NOW(),   -- Fecha de creación

    FOREIGN KEY (id_order) REFERENCES controlMedicines(id) ON DELETE CASCADE
);
