CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CITIZEN',
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS issue_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    description VARCHAR(500),
    contact_email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS civic_issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,

    category_id INTEGER
        REFERENCES issue_categories(id),

    department_id INTEGER
        REFERENCES departments(id),

    reported_by INTEGER NOT NULL
        REFERENCES users(id),

    status VARCHAR(30) DEFAULT 'REPORTED',

    severity VARCHAR(20) DEFAULT 'MEDIUM',

    ai_confidence FLOAT DEFAULT 0,

    latitude FLOAT,
    longitude FLOAT,

    image_url VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,

    issue_id INTEGER NOT NULL
        REFERENCES civic_issues(id),

    authority_id INTEGER NOT NULL
        REFERENCES users(id),

    assigned_by INTEGER
        REFERENCES users(id),

    status VARCHAR(30) DEFAULT 'ASSIGNED',

    notes TEXT,

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS citizen_verifications (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id),

    document_type VARCHAR(100) NOT NULL,

    document_number VARCHAR(100),

    document_url VARCHAR(500),

    status VARCHAR(30) DEFAULT 'PENDING',

    rejection_reason TEXT,

    verified_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,

    user_id INTEGER
        REFERENCES users(id),

    action VARCHAR(100) NOT NULL,

    entity_type VARCHAR(100),

    entity_id INTEGER,

    details TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);