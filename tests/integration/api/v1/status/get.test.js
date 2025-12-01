test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status/");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const databaseInfo = responseBody.dependencies.database;

  expect(typeof databaseInfo.version).toEqual("string");
  expect(databaseInfo.version).toBe("16.0");

  expect(typeof databaseInfo.max_connections).toEqual("number");
  expect(databaseInfo.max_connections).toBe(100);

  expect(typeof databaseInfo.used_connections).toEqual("number");
  expect(databaseInfo.used_connections).toEqual(1);
});
