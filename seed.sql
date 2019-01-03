DROP DATABASE IF EXISTS jokes;
CREATE DATABASE jokes;

\c jokes


CREATE TABLE Authors (
  author_id SERIAL,
  author_name VARCHAR,
  PRIMARY KEY (author_id)
);
CREATE TABLE Jokes (
  joke_id SERIAL,
  joke VARCHAR,
  author_id INT,
  score INT,
  PRIMARY KEY (joke_id),
  FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

SELECT * FROM Jokes;
SELECT * FROM Authors;