import { Response, Request, NextFunction } from 'express';
// import Token from '../classes/token';



// Borre la implementacion de esto por no ser parte del Challenger
export const verificaApiId = (req: any, res: Response, next: NextFunction) => {
    next();
}


