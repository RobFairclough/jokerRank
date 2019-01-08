# JokerRank:

an actual readme \

## What is this?

JokerRank is a silly site I've made to practise using Node Express and PostgreSQL. It allows a user to view random jokes, submit their own and share them. \

The site is built using JavaScript, Node, Express and Postgres and is hosted using AWS Elastic Beanstalk for the server, and AWS Relational Database Service to host the database. \

## API

The API is freely usable, and calls can be made as below:

GET /api/jokes/all : this will send a JSON object of all jokes \
GET /api/jokes/:author_id : this will send a JSON object of all jokes written by an author with specified ID \
GET /api/jokes/random : this will send a JSON object of a random joke with the joke ID, joke, author's name, and score \

POST /api/jokes/new this will submit a joke, reading from the body in format {joke:'string', author:'string'} \
POST /api/jokes/vote this will submit a vote on a joke based on the id, reading body in format {jokeid:number, vote:'up'/'down'}

GET /api/authors/all : sends a JSON object of all authors \
GET /api/authors/:authorid sends a specific author's JSON object by their id \
GET /api/authors/:authorid/jokes sends a JSON object of a specific author's jokes \

New authors are added during the joke submit process, if their name is not already found in the database.
