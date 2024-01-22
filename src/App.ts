import "reflect-metadata";
import express, { Router, Application } from 'express'
import http from 'http';
import cors from 'cors';
import { autoInjectable, container } from 'tsyringe';
import { readdirSync } from 'fs';
import { resolve } from 'path'
import autobind from "autobind-decorator";
import { AddressInfo } from "net";
import SequelizeConnection from './Configs/SequelizeConnection';
import { ErrorHandlingMiddleware } from "./Middleware/ErrorMiddleware";
import { AuthMiddleware } from "./Middleware/AuthMiddleware";

@autoInjectable()
@autobind
export class App {
    private app!: Application;
    private port: string | number = 5002;

    constructor() {
        this.init();
    }
    private init() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
        this.initRoutes();
    }
    async initRoutes() {
        const list = readdirSync(resolve(__dirname, './Routes'));
        const routeTable = [];
        const router = Router();
        for (const f of list) {
            const filename = f.replace(/\.[^/.]+$/, "");
            const routerModule = await import(`./Routes/${f}`);
            const routerClass = routerModule[filename];
            const routerInstance = container.resolve<any>(routerClass);
            if (routerInstance.route) {
                const r = filename.replace('Routes', "").toLowerCase();
                router.use(`/${r}`, routerInstance.route)
                routeTable.push(`/${r}`)
            } else {
                throw `Routes not defined for ${filename}`
            }

        }
        const authenticationMiddleware=container.resolve(AuthMiddleware)
        this.app.use('/api',authenticationMiddleware.authenticate,router);
        // this.app.use('/api',router);

        console.table(routeTable);
        this.configureErrorMiddleware();
        this.listen();
    }
    private configureErrorMiddleware() {
        const errorMiddleware=container.resolve(ErrorHandlingMiddleware);
        if(errorMiddleware.handleError){
            this.app.use(errorMiddleware.handleError);
        }
        
    }
    private listen(): void {

        const server = http.createServer(this.app);
        server.listen(this.port)
        server.on('error', (err) => {
            console.error("error", err.message);
            process.exit(1);
        });
        server.on('listening', async () => {
            const addr: AddressInfo  = server.address() as AddressInfo;
            console.log(`App listening on the ${addr.address}:${addr.port}`);
            await SequelizeConnection.createDBIfNotExist();
            await SequelizeConnection.connect();

        });

    }
}