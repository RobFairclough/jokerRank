const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../mainapp");
const request = supertest(app);

describe("/api", () => {
  describe("/authors", () => {
    it("GET /all should return a 200 status and an array", done => {
      return request
        .get("/api/authors/all")
        .expect(200)
        .then(res => {
          expect(res.body.authors).to.be.an("array");
          done();
        });
    });
  });
  describe("/jokes", () => {});
});
