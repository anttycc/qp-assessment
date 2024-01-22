import { Dialect, Options, Sequelize } from "sequelize";
import { Client } from 'pg';
import { DB_CONFIG } from "./Constants";
class SequelizeConnection {
  private static instance: Sequelize;
  static async createDBIfNotExist() {
    try {
      const client = new Client({
        user: DB_CONFIG.dbUserName,
        password: DB_CONFIG.dbPassword,
        port: DB_CONFIG.dbPort,
        host: DB_CONFIG.dbHost
      })
      await client.connect();
      const res = await client.query(`SELECT  FROM pg_database WHERE datname = '${DB_CONFIG.dbName}'`);
      if (res.rowCount === 0) {
        console.log("NOT EXISTS");
        await client.query(`CREATE DATABASE ${DB_CONFIG.dbName}`);
      }
      await client.end();
    } catch (e) {
      console.log(e);
    }

  }
  static getInstance(): Sequelize {
    if (!SequelizeConnection.instance) {
      const dbConfig = {} as Options;
      dbConfig.port = DB_CONFIG.dbPort;
      dbConfig.host = DB_CONFIG.dbHost;
      dbConfig.database = DB_CONFIG.dbName;
      dbConfig.username = DB_CONFIG.dbUserName;
      dbConfig.password = DB_CONFIG.dbPassword;
      dbConfig.logging = false;
      dbConfig.dialect = DB_CONFIG.dbDialect as Dialect;
      SequelizeConnection.instance = new Sequelize(
        dbConfig
      );
    }

    return SequelizeConnection.instance;
  }

  static async connect(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.authenticate();
      console.log("Database connection authenticated successfully");
      await sequelize.sync({alter:true});
      return sequelize;
    } catch (ex: any) {
      console.log("Error while creation connection to database :: " + ex.message);
      return sequelize;
    }
  }

  static async close(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.close();
      console.log("Database connection closed successfully");
      return sequelize;
    } catch (ex: any) {
      console.log("Error while closing database connection :: " + ex.message);
      return sequelize;
    }
  }

}

export default SequelizeConnection;
