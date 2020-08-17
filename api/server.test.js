const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

const userInfo = {
  first_name: "ryan",
  last_name: "paulson",
  email: "ryanp@gmail.com",
};

describe("server.js", () => {
  test("should be in test env", async () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET /", () => {
  let res = {};
  beforeAll(async () => {
    res = await request(server).get("/");
  });

  test("should return 200 status", async () => {
    expect(res.status).toBe(200);
  });

  test("should return a JSON obj", async () => {
    expect(res.type).toBe("application/json");
  });

  test('should return {api:"up"}', async () => {
    expect(res.body).toEqual({ api: "up" });
  });
});

describe("POST /register", () => {
  let res = {};
  beforeAll(async () => {
    await db("users").truncate();
    res = await request(server).post("/api/register").send(userInfo);
  });
  test("should return 201 status", async () => {
    expect(res.status).toBe(201);
  });
  test("should return added user name", async () => {
    expect(res.body.first_name).toContain("ryan");
  });
});

describe("DELETE /delete", () => {
  let res = {};
  const id = 1;
  beforeAll(async () => {
    res = await request(server).delete(`/api/delete/${id}`);
  });
  test("should return 200 status", async () => {
    expect(res.status).toBe(200);
  });
  test("should return deleted id", async () => {
    expect(res.body.deleted.id).toBe(id);
  });
  test("should have removed the user", async () => {
    let get = await request(server).get(`/api/users/${id}`);
    expect(get.body.message).toBe("user id doesn't exist");
  });
});
