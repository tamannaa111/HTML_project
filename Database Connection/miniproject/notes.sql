create database user_notes_db;
use user_notes_db;
create table users(
    id int AUTO_INCREMENT primary key,
    username varchar(50) not null unique,
    PASSWORD varchar(255) not null
    );
    
CREATE TABLE notes(
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int not null,
    title varchar(255),
    content text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );