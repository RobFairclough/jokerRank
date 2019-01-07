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
  joke VARCHAR NOT NULL,
  author_id INT NOT NULL,
  score INT DEFAULT 0,
  PRIMARY KEY (joke_id),
  FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

INSERT INTO Authors (author_name)
VALUES ('test'), ('john'), ('paul'), ('george'), ('ringo');

INSERT INTO Jokes (joke, author_id)
VALUES ('hey mark david chapman what are you doing here?', 2), ('beetle beetle beetle', 3), ('my name is george, harrys son', 4), ('ringo the tank engine', 5), ('hey hey were the beatles', 2);
INSERT INTO Jokes (joke, author_id)
VALUES ('test1', 1), ('test2', 1);

SELECT * FROM Jokes;
SELECT * FROM Authors;
SELECT Jokes.joke, Authors.author_name FROM Jokes JOIN Authors ON Jokes.author_id = Authors.author_id;