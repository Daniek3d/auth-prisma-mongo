import * as cors from 'cors';
import * as bodyParser from 'body-parser';


import loggerMiddleware from './middleware/logger';


import App from './app'
import AuthUsuario from './controllers/auth/auth-usuario';
import { verificaTokenUsuario } from './middleware/autenticacion';



const app = new App({
    port: Number(process.env.HTTP_SERVER_PORT),
    controllers: [
        new AuthUsuario(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        cors({ origin: true, credentials: true }),
    ]
})

app.listen();
