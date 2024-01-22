
import env from 'dotenv';
env.config();

export const DB_CONFIG = {
    dbPort: Number(process.env.POSTGRES_PORT),
    dbHost: process.env.POSTGRES_HOST,
    dbName: process.env.POSTGRES_DATABASE,
    dbUserName: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    dbDialect: process.env.POSTGRES_DIALECT,
    url: '',
}
export const PUBLIC_URL = ['auth']
export const PORT = process.env.PORT || 5002;




