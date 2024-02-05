-- Used to refresh the database before each coding session
DROP TABLE users CASCADE;
DROP TABLE asset_types CASCADE;
DROP TABLE assets CASCADE;
DROP TABLE asset_attributes CASCADE;
DROP TABLE asset_attribute_values CASCADE;

-- Creates database
CREATE TABLE users (
    user_name VARCHAR(30) PRIMARY KEY,
    user_first_name VARCHAR(30) NOT NULL,
    user_last_name VARCHAR(30) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_role VARCHAR(15) NOT NULL -- Admin, regular user or viewer
);

-- Types of possible asset types, such as python files or documentation
CREATE TABLE asset_types (
    -- should type have an ID?
    type_name VARCHAR(30) PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE assets (
    asset_id INT PRIMARY KEY,
    link VARCHAR(150) NOT NULL,
    asset_description VARCHAR(255) NOT NULL,
    title VARCHAR(150) NOT NULL,
    asset_type VARCHAR(30) REFERENCES asset_types(type_name) NOT NULL,
    upload_date DATE NOT NULL,
    author VARCHAR(30) REFERENCES users(user_name) NOT NULL -- Should be in the user table
);


-- Attributes that belong to a given asset type, such that any asset of a given asset type has these attributes, such as number of lines.
CREATE TABLE asset_attributes (
    asset_attribute_id INT PRIMARY KEY, -- should it be made SERIAL?
    -- might need to have asset_id in this table too, to communicate properly with assets AND asset types
    asset_type VARCHAR(30) REFERENCES asset_types(type_name) NOT NULL,
    attribute_name VARCHAR(50) NOT NULL,
    attribute_description VARCHAR(255) NOT NULL
);

CREATE TABLE asset_attribute_values (
    value_id INT PRIMARY KEY,
    belonging_to_asset_id INT REFERENCES assets(asset_id) NOT NULL,
    asset_type VARCHAR(30) REFERENCES asset_types(type_name) NOT NULL,
    attribute_type_id INT REFERENCES asset_attributes(asset_attribute_id) NOT NULL,
    value VARCHAR (255) NOT NULL
);
    
    -- should have the name or id of the asset, the name or id of the asset type, the name or id of the attribute, and its value.
    
