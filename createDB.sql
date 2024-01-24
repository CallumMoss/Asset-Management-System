CREATE TABLE users
( user_name varchar(30) primary key,
user_firstname varchar(50) NOT NULL,
user_lastname varchar(50) NOT NULL,
user_password varchar(50) NOT NULL,
user_level varchar(15) NOT NULL);

CREATE TABLE assetTypes
( title varchar(50) primary key,
programming_language varchar(50));

CREATE TABLE assets
( asset_id INT primary key,
link varchar(150) NOT NULL,
asset_description varchar(500),
file_type varchar(50) REFERENCES assetTypes(title) NOT NULL,
line_number INT NOT NULL,
upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
author varchar(30) REFERENCES users(user_name) NOT NULL);

CREATE TABLE assetAttributes (
    asset_attributeID INT PRIMARY KEY,
    asset_id INT,
    attribute_name VARCHAR(255) NOT NULL,
    attribute_value VARCHAR(255),
    FOREIGN KEY (asset_id) REFERENCES assets(asset_id)
);
