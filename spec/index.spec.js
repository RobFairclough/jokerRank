const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("/api", () => {
  describe("/authors", () => {
    it("GET /all should return a 200 status and an array", () => {
      return request
        .get("/api/authors/all")
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
          expect(res.body.authors).to.be.an("array");
        });
    });
    it("GET /:authorid should return an author if existing", () => {
      return request
        .get("/api/authors/1")
        .expect(200)
        .then(res => {
          const auth = res.body.author;
          expect(auth.author_name).to.equal("test");
          expect(auth.author_id).to.equal(1);
        });
    });
    it("GET /:authorid/jokes should return all of an author's jokes", () => {
      return request
        .get("/api/authors/1/jokes")
        .expect(200)
        .then(res => {
          const jokes = res.body.jokes;
          expect(jokes).to.eql([
            {
              author_id: 1,
              author_name: "test",
              joke_id: 6,
              joke: "test1",
              score: 0
            },
            {
              author_id: 1,
              author_name: "test",
              joke_id: 7,
              joke: "test2",
              score: 0
            }
          ]);
        });
    });
    it("POST /new should add a new author to the database", () => {
      return request
        .post("/api/authors/new")
        .send({ author: "testauthor" })
        .expect(201)
        .then(res => {
          expect(res.body.author.author_name).to.equal("testauthor");
          return request
            .get("/api/authors/all")
            .expect(200)
            .then(res =>
              expect(
                res.body.authors[res.body.authors.length - 1].author_name
              ).to.equal("testauthor")
            );
        });
    });
  });

  describe("/jokes", () => {
    it("GET /all should return a 200 status and an array", () => {
      return request
        .get("/api/jokes/all")
        .expect(200)
        .then(res => {
          expect(res.body.jokes).to.be.an("array");
        });
    });
    it("GET /random should return a joke object including author name", () => {
      return request
        .get("/api/jokes/random")
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys(
            "joke",
            "author",
            "jokeid",
            "score"
          );
        });
    });
    it("POST /new should add a new joke to the database", () => {
      return request
        .post("/api/jokes/new")
        .send({ joke: "test", author: "test" })
        .expect(201)
        .then(res => {
          const joke = res.body.joke;
          expect(joke.joke).to.equal("test");
          expect(joke.author_id).to.equal(1);
          return request
            .get("/api/jokes/all")
            .expect(200)
            .then(res => {
              expect(
                res.body.jokes.find(joke => joke.joke === "test")
              ).not.to.equal(undefined);
              expect(res.body.jokes[res.body.jokes.length - 1].joke).to.equal(
                "test"
              );
            });
        });
    });
    it("POST /vote should update the score of a joke in the database", () => {
      return request
        .post("/api/jokes/vote")
        .send({ jokeid: 6, vote: "up" })
        .expect(200)
        .then(res => {
          expect(res.body.joke.score).to.equal(1);
          return request
            .post("/api/jokes/vote")
            .send({ jokeid: 6, vote: "down" })
            .expect(200)
            .then(res => {
              expect(res.body.joke.score).to.equal(0);
            });
        });
    });
  });
});
