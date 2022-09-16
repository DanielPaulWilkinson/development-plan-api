import { NextFunction, Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Logging from '../Logging';

const Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { forename, surname, email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            forename: forename,
            surname: surname,
            email: email,
            password: encryptedPassword
        });

        const token = jwt.sign({ user_id: user._id, email }, config.auth.token, {
            expiresIn: '2h'
        });

        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        Logging.error(error);
        res.status(500).json(error);
    }
};

const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('All input is required');
        }

        const user = await User.findOne({ email }).populate({
            path: 'categories',
            model: 'Category',
            populate: {
                path: 'skills',
                model: 'Skill'
            }
        });

        if (user && (await bcrypt.compare(password, user.password.toString()))) {
            const token = jwt.sign({ user_id: user._id, email }, config.auth.token, {
                expiresIn: '2h'
            });

            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send('Invalid Credentials');
    } catch (error) {
        Logging.error(error);
        res.status(500).json(error);
    }
};

const Logout = (req: Request, res: Response, next: NextFunction) => {};

export default { Register, Login, Logout };
