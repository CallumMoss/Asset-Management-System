INSERT INTO users (user_name, user_first_name, user_last_name, user_password, user_role)
VALUES
    ('BaseAdmin', 'Random', 'Admin', 'password', 'Admin'),
    ('BaseUser', 'Random', 'User', 'password', 'User'),
    ('BaseViewer', 'Random', 'Viewer', 'password', 'Viewer');
  
  
INSERT INTO asset_types (type_name, description)
VALUES
    ('Python File', 'A file that contains python code for a given project.'),
    ('Documentation', 'A file that contains documentation to supply extra information about any given asset.'),
    ('Project', 'A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants.'),
    ('Java File', 'A file that contains java code for a given project.');
    
    
INSERT INTO assets (asset_id, link, asset_description, title, asset_type, upload_date, author)
VALUES
    ('1', 'website.com/piece.py', 'A python program that contains a class which describes the attributes and functions of a chess piece.', 'Piece.py', 'Python File', '1999-12-31', 'BaseUser'),
    ('2', 'website.com/projects/heroes_rising/readme.md', 'Read me file for the project Heroes Rising', 'README.md', 'Documentation', '2024-02-25', 'BaseUser'),
    ('3', 'website.com/projects/heroes_rising', '2D Game developed as part of the first year games module.', 'Heroes Rising', 'Project', '2024-01-25', 'BaseUser');
    
INSERT INTO asset_attributes(asset_attribute_id, asset_type, attribute_name, attribute_value, attribute_description)
VALUES -- Later could make the relationship between attribute and asset type a many to many relationship, where one attribute can have many asset types, such as number of lines belonging to python and java file, rather than creating a new number_of_lines for each asset type.
    ('1', 'Python File', 'number_of_lines', '100', 'Number of lines in a python file.'), -- currently belongs to Python File Asset Type
    ('2', 'Java File', 'number_of_lines', '100', 'Number of lines in a java file.'),
    ('3', 'Documentation', 'number_of_lines', '67', 'Number of lines in a documentation file');

    -- should attributes have values?

    -- an asset type has a set of asset attributes. These describe various measurements that an asset of that asset type can hold. Such as a python file having a number of lines.
    -- Should the asset type have values for these asset attributes? Or should I split table into asset type attributes and asset attributes. Asset Type attributes having variables describing the -- necessary information for an attribute, like its name. Asset attributes having values of asset attributes for a given asset.
