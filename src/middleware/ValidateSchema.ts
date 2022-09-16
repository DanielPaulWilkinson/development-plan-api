import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../Logging';
import { ISkill } from '../models/Skill';
import { ICategory } from '../models/Category';
import { IUser } from '../models/User';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    skill: {
        create: Joi.object<ISkill>({
            name: Joi.string().required().length(50),
            description: Joi.string().required().length(200),
            competency: Joi.string().required(),
            subject: Joi.string().required().length(50),
            categoryId: Joi.string().required()
        }),
        update: Joi.object<ISkill>({}),
        delete: Joi.object<ISkill>({}),
        categorySkills: Joi.object<ISkill>({}),
        get: Joi.object<ISkill>({}),
        all: Joi.object<ISkill>({})
    },
    category: {
        create: Joi.object<ICategory>({
            name: Joi.string().required().length(50),
            description: Joi.string().required().length(200),
            skills: Joi.array().required(),
            image: Joi.string().required()
        }),
        update: Joi.object<ICategory>({
            name: Joi.string().required().length(50),
            description: Joi.string().required().length(200),
            skills: Joi.array().required(),
            image: Joi.string().required()
        }),
        delete: Joi.object<ICategory>({}),
        get: Joi.object<ICategory>({}),
        all: Joi.object<ICategory>({})
    },
    user: {
        login: Joi.object<IUser>({
            password: Joi.string().required(),
            email: Joi.string().required().email()
        }),
        register: Joi.object<IUser>({
            password: Joi.string().required().min(6).max(15).label('Password'),
            passwordConfirmation: Joi.any()
                .equal(Joi.ref('password'))
                .required()
                .label('Confirm password')
                .options({ messages: { 'any.only': '{{#label}} does not match' } }),
            email: Joi.string().required().email()
        }),
        logout: Joi.object<IUser>({
            password: Joi.string().required(),
            email: Joi.string().required().email()
        })
    }
};
