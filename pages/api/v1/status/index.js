import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const resultVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = resultVersion.rows[0].server_version;

  const resultMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = parseInt(
    resultMaxConnections.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const resultUsedConnections = await database.query({
    text: `SELECT count(*)::int used FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const databaseUsedConnectionsValue = resultUsedConnections.rows[0].used;

  const dependencies = {
    database: {
      version: databaseVersionValue,
      max_connections: databaseMaxConnectionsValue,
      used_connections: databaseUsedConnectionsValue,
    },
  };

  response.status(200).json({
    updated_at: updatedAt,
    dependencies,
  });
}

export default status;
