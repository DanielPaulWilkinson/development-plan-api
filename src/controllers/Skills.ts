import { NextFunction, Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import Skill from '../models/Skill';

const CreateSkill = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, competency, categoryId } = req.body;

    const skillModel = new Skill({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        description: description,
        competency: competency,
        categoryId: categoryId
    });

    return skillModel
        .save()
        .then((skill) => res.status(201).json({ skill }))
        .catch((error) => res.status(500).json({ error }));
};

const GetSkill = (req: Request, res: Response, next: NextFunction) => {
    const skillId = req.params.categoryId;
    return Skill.findById(skillId)
        .then((Skill) => (Skill ? res.status(200).json({ Skill }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const GetAllSkills = (req: Request, res: Response, next: NextFunction) => {
    return Skill.find()
        .then((Skills) => res.status(201).json({ Skills }))
        .catch((error) => res.status(500).json({ error }));
};

const UpdateSkill = (req: Request, res: Response, next: NextFunction) => {
    const skillId = req.params.skillId;
    Skill.findById(skillId).then((skillModel) => {
        if (skillModel) {
            skillModel.set({
                name: req.body.skill.name,
                description: req.body.skill.description,
                competency: req.body.skill.competency,
                categoryId: req.body.skill.categoryId
            });

            return skillModel
                .save()
                .then((skill) => res.status(201).json({ skill }))
                .catch((error) => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    });
};

const DeleteSkill = (req: Request, res: Response, next: NextFunction) => {
    const skillId = req.params.skillId;
    return Skill.findByIdAndDelete(skillId)
        .then((skill) => (skill ? res.status(200).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const GetSkillsForCategoryId = (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.CategoryId;

    return Skill.find({
        categoryId: categoryId
    })
        .then((skills) => (skills ? res.status(200).json({ skills }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { CreateSkill, GetSkill, GetAllSkills, UpdateSkill, DeleteSkill, GetSkillsForCategoryId };
