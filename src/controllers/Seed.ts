import { NextFunction, Request, Response } from 'express';
import data from '../data/Seed';

const SeedData = (req: Request, res: Response, next: NextFunction) => {
    let response = data.seedData();
    return res.status(201).json({ response });
};

export default { SeedData };
