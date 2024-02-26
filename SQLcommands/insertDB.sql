INSERT INTO asset_types (type_name, description)
VALUES
    ('Python File', 'A file that contains python code for a given project.'),
    ('Documentation', 'A file that contains documentation to supply extra information about any given asset.'),
    ('Project', 'A collection of assets which outline the integral parts of a project, such as code files, relevant documentation and participants.'),
    ('Java File', 'A file that contains java code for a given project.');

INSERT INTO languages(language_name)
VALUES
    ('Java'), ('Python'), ('C'), ('C++'), ('JavaScript'), ('C#'), ('PHP'), ('Swift'), ('Objective-C'), ('TypeScript'),
    ('Ruby'), ('Go'), ('Rust'), ('Kotlin'), ('Perl'), ('Scala'), ('HTML'), ('CSS'), ('SQL'), ('Shell'), ('Assembly'),
    ('R'), ('Dart'), ('Haskell'), ('Lua'), ('Julia'), ('MATLAB'), ('Groovy'), ('Clojure'), ('VBScript'), ('Pascal'),
    ('Fortran'), ('Ada'), ('Lisp'), ('Scheme'), ('Prolog'), ('Erlang'), ('D'), ('Dylan'), ('Smalltalk'), ('Tcl'), ('Elixir'),
    ('Racket'), ('COBOL'),('F#'), ('PowerShell'), ('Bash'), ('Objective-J'), ('Delphi'), ('LabVIEW'), ('Scratch'), ('PL/SQL');
