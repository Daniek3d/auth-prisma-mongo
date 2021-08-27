import { Request, Response } from 'express'

// Borre la implementacion de esto por no ser parte del Challenger
const loggerMiddleware = (req: Request, resp: Response, next) => {
    console.log(req.url);
    next();
}

export default loggerMiddleware