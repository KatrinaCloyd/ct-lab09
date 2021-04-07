DROP TABLE IF EXISTS vacations;

CREATE TABLE vacations(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    destination TEXT NOT NULL, 
    start_date TEXT NOT NULL, 
    end_date TEXT NOT NULL,
    details TEXT 
)
