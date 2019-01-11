# JokerRank:

## What is this?

JokerRank is a silly site I've made to practise using Node Express and PostgreSQL. It allows a user to view random jokes, submit their own and share them.

The site is built using JavaScript, Node, Express and Postgres and is hosted using AWS Elastic Beanstalk for the server, and AWS Relational Database Service to host the database.

## The site

The website is easy to use, visits to the homepage will provide the viewer with jokes picked at random to vote on or ask for a new joke.

Users can submit their own jokes via the submit page, where they will be immediately put into the database and tweeted by the account @rankjoker on Twitter.

## Alexa

This site also has an Alexa Skill, available via the skill store - to use the skill once installed, simply say "Alexa, Joker Rank" and the skill will make a call to our API, retrieve a joke without bad words and read the joke back to you.

## Stack

### Front-end

I initially built the website using vanilla HTML and CSS, with some built-in JS for requesting jokes.\ Later on, I switched to the CSS framework Bulma. This helped to modernise the look of the website without me having to spend too much time focussing on CSS and responsiveness.

### Back-end

The back-end server is built from Node and Express, and is hosted on AWS Elastic Beanstalk.\ The jokes and authors are stored in a Postgres database which is hosted on AWS Relation Database Service. I went with AWS for hosting as I'd been planning to build an Alexa skill making use of the app from early on, and I'd heard that AWS offered free credit for Alexa developers. I found AWS tough to get a hang of initially but as I got used to it it became easier to use.

### Alexa Skill

The Alexa skill itself was built on the Alexa developer platform (I don't think this was optional) which is intuitive and fairly simple to use. The functionality of the Alexa app is based on an AWS Lambda function as recommended by the Alexa platform - this was a little tough to build as the syntax was alien to me.\
My first submission of the skill to the store was rejected for two reasons: The skill would hang without exiting or reprompting the user after telling the user a joke and would contain bad language(this may have only been an issue because I initially clicked the wrong category - kids novelty and humour instead of just novelty and humour).
I remedied the first issue by adding a "withShouldEndSession(true)" method to the handler. In future I may alter this to ask additional queries to allow the user to vote a joke up or down, or ask for another joke.
The second issue I fixed by adding a new GET request /api/jokes/getrandomclean, which functions the same as getrandom but applies a profanity filter before selecting the random joke.

## API

The API is freely usable, and calls can be made as below:

GET /api/jokes/all : this will send a JSON object of all jokes \
GET /api/jokes/:author_id : this will send a JSON object of all jokes written by an author with specified ID \
GET /api/jokes/random : this will send a JSON object of a random joke with the joke ID, joke, author's name, and score
GET /api/jokes/randomclean : as above, but performs a profanity check so the joke won't include any bad words (as judged by npm library "bad-words")

POST /api/jokes/new : this will submit a joke, reading from the body in format {joke:'string', author:'string'} \
POST /api/jokes/vote : this will submit a vote on a joke based on the id, reading body in format {jokeid:number, vote:'up'/'down'} \

GET /api/authors/all : sends a JSON object of all authors \
GET /api/authors/:authorid : sends a specific author's JSON object by their id \
GET /api/authors/:authorid/jokes : sends a JSON object of a specific author's jokes
New authors are added during the joke submit process, if their name is not already found in the database.

POST /api/report : this will submit a report reading from the body in format {report: 'string under 250 chars'}, at present this will only send a tweet via the @rankjoker twitter
