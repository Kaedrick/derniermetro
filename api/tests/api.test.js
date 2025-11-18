const request = require("supertest");
const app = require("../src/index");

describe("api", () => {
  test("health", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  test("last-metro bad param", async () => {
    const res = await request(app).get("/last-metro");
    expect(res.statusCode).toBe(400);
  });
});
