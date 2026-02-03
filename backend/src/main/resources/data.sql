-- Insertamos el Nivel 1: Caso Policial
INSERT INTO levels (title, description, init_script, solution_query)
VALUES (
           'Caso #1: El Diamante Perdido',
           'Han robado un diamante. El culpable mide más de 180cm y tiene ojos verdes. Encuéntralo en la tabla "suspects".',
           'CREATE TABLE suspects (id INT, name VARCHAR(100), height INT, eye_color VARCHAR(50)); INSERT INTO suspects VALUES (1, ''Juan'', 170, ''Brown''), (2, ''El Gato'', 185, ''Green''), (3, ''Maria'', 165, ''Blue'');',
           'SELECT * FROM suspects WHERE height > 180 AND eye_color = ''Green'''
       );

-- Insertamos el Nivel 2: Laboratorio Zombie (¡Nuevo tema!)
INSERT INTO levels (title, description, init_script, solution_query)
VALUES (
           'Caso #2: La Infección',
           'Un virus escapó. Busca en la tabla "patients" a quien tenga status "Infected" y sea del sector "A".',
           'CREATE TABLE patients (id INT, name VARCHAR(100), status VARCHAR(50), sector VARCHAR(10)); INSERT INTO patients VALUES (1, ''Dave'', ''Healthy'', ''A''), (2, ''Frank'', ''Infected'', ''B''), (3, ''Alice'', ''Infected'', ''A'');',
           'SELECT * FROM patients WHERE status = ''Infected'' AND sector = ''A'''
       );