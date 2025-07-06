-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(10) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
);

-- Posts table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    collab BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

