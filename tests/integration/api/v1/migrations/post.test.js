import database from "infra/database.js";
import orchestretor from "tests/orchestretor";

beforeAll(async () => {
  await orchestretor.waitForAllServices();
});

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations/", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations/", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});

test("DELETE to /api/v1/migrations should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations/", {
    method: "DELETE",
  });

  const responseBody = await response.json();

  expect(response.status).toBe(405);
  expect(responseBody.error).toBe("Method DELETE not allowed");
});
