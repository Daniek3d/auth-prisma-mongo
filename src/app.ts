import * as express from 'express';
import { Application } from 'express';

export default class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.assets();
        this.template();
        this.routes(appInit.controllers);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/api/v1', controller.router);
        })
    }

    private assets() {
        // this.app.use(compression());
        this.app.use(express.static('public/'));
        // this.app.use(express.static('views'))
    }

    private template() {
        this.app.set('home engine', 'pug');
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Api Authorization http://localhost:${this.port}`);
        })
    }
}