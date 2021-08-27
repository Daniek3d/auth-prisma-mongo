import * as jwt from 'jsonwebtoken';


export default class Token {

    private static seed: string = process.env.SEED;
    private static caducidad: string = '2h';

    constructor() { }

    static getJwtToken(payload: any): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });

    }

    static comprobarToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    // console.log('Error Token: ', err.name, err.message);
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        });
    }


}
