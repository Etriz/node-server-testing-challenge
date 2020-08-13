const supertest = require("supertest");
const server = require("./server");

describe("server.js", () => {
  test("should be in test env", async () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});
