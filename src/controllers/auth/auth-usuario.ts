import { PrismaClient } from '@prisma/client'
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { Response, Request, NextFunction } from 'express';

import Token from '../../classes/token';
import IControllerBase from '../../interfaces/IControllerBase.interface';


const prisma = new PrismaClient();

export default class AuthUsuario implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes();
        //this.router.toString;
        console.log('Clase Auth inicializada');
    }


    public initRoutes() {
        this.router.post(this.path + '/login', this.login.bind(this));
        this.router.post(this.path + '/user', this.postUser.bind(this));
        this.router.get(this.path + '', this.error.bind(this));

        // this.router.get(this.path + '/:rpe', [verificaTokenUsuario, selfUsuario('SELF')], this.getUsuario.bind(this));
    }

    public async error(req: Request, res: Response) {
        console.log(`Error ${req.url}`);
        res.status(500)
            .json({
                ok: false,

            });
        return;
    }
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;
        let result;
        if (!email || !password) {
            res.status(500)
                .json({
                    ok: false,
                    msg: 'Falta informacion'
                });
            return;
        }
        try {
            result = await prisma.user.findUnique({
                where: {
                    email: String(email),
                }
            });
        } catch (error) {
            res.status(200)
                .json({
                    ok: false,
                    msg: 'Usuario no encontrado'
                });
            return;
        }
        const verifica = bcrypt.compareSync(String(password), result.password);
        if (verifica) {
            const tokenUser = Token.getJwtToken({
                id: result.id,
                nombre: result.name,
                email: result.email
            });
            res.status(200)
                .json({
                    ok: true,
                    id_usuario: result.id,
                    token: tokenUser
                });
            return;
        } else {
            return res.send(JSON.stringify({ "status": 404, "error": 'Incorrect password', "token": null }));
        }

    }

    public async postUser(req: Request, res: Response) {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(500)
                .json({
                    ok: false,
                    msg: 'Falta informacion'
                });
            return;
        }
        req.body.password = bcrypt.hashSync(req.body.password, 5);
        const result = await prisma.user.create({
            data: {
                ...req.body,
            },
        })
        const tokenUser = Token.getJwtToken({
            id: result.id,
            nombre: result.name,
            email: result.email
        });
        delete (result.password);
        res.json(result);
    }
}

