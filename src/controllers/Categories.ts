import { json, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category';
import { ISkill } from '../models/Skill';

const CreateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, image, skills } = req.body;

    const categoryModel = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        description: description,
        image: image,
        skills: []
    });

    if (skills != null) {
        skills.forEach((skill: ISkill) => {
            categoryModel.skills.push(skill);
        });
    }

    return categoryModel
        .save()
        .then((category) => res.status(201).json({ category }))
        .catch((error) => res.status(500).json({ error }));
};

const GetCategory = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;
    return Category.findById(categoryId)
        .populate('skills')
        .then((category) => (category ? res.status(200).json({ category }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const GetAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    return await Category.find()
        .populate('skills')
        .then((categories) => res.status(201).json({ categories }))
        .catch((error) => res.status(500).json({ error }));
};

const UpdateCategory = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId).then((categoryModel) => {
        if (categoryModel) {
            categoryModel.set({
                name: req.body.name,
                description: req.body.description,
                image: req.body.description,
                skills: req.body.skills
            });

            return categoryModel
                .save()
                .then((category) => res.status(201).json({ category }))
                .catch((error) => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    });
};

const DeleteCategory = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;
    return Category.findByIdAndDelete(categoryId)
        .then((category) => (category ? res.status(200).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { CreateCategory, GetCategory, GetAllCategories, UpdateCategory, DeleteCategory };
