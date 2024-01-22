const config = {
  dialect: process.env.POSTGRES_DIALECT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
};

module.exports = config;