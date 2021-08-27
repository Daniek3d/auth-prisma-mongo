import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';
import Usuario from '../interfaces/usuario.interface';


export const verificaTokenUsuario = (req: any, res: Response, next: NextFunction) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401);
        return;
    }
    const token = authheader.split(' ')[1];
    let mensaje: String;
    if (token) {
        Token.comprobarToken(token)
            .then((decoded: any) => {
                req.usuario = decoded.usuario;
                next();
            })
            .catch(err => {
                // console.log(err);
                switch (err) {
                    case 'TokenExpiredError':
                        mensaje = 'Token Expirado';
                        break;

                    default:
                        mensaje = `Error desconocido: ${err.message}`
                        break;
                }
                res.status(401).json({
                    ok: false,
                    tipo: err.name,
                    mensaje
                });

            });
    } else {
        res.json({
            ok: false,
            mensaje: `Debe de proporcionar Token Usuario`
        });
    }
}


export const selfUsuario = function (role) {
    return async (req, res, next) => {
        // console.log(role, '---' + req.usuario.rpe);
        if (req.usuario.rpe === req.params.rpe && 'SELF' === role) {
            next();
        } else {
            return res.json({
                ok: false,
                mensaje: `Usuario no tiene permisos.`
            });
        }

    }
}