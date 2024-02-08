INSERT INTO asset_types (type_name, description)
VALUES
    ('Python File', 'A file that contains python code for a given project.'),
    ('Documentation', 'A file that contains documentation to supply extra information about any given asset.'),
    ('Project', 'A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants.'),
    ('Java File', 'A file that contains java code for a given project.');


INSERT INTO assets(asset_id, link, asset_description, title, asset_type, upload_date, author)
VALUES
    ('1', 'website.com/piece.py', 'A python program that contains a class which describes the attributes and functions of a chess piece.', 'Piece.py', 'Python File', '1999-12-31', 'BaseUser'),
    ('2', 'website.com/projects/heroes_rising/readme.md', 'Read me file for the project Heroes Rising', 'README.md', 'Documentation', '2024-02-25', 'BaseUser'),
    ('3', 'website.com/projects/heroes_rising', '2D Game developed as part of the first year games module.', 'Heroes Rising', 'Project', '2024-01-25', 'BaseUser');
