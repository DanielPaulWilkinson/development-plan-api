import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill {
    name: String;
    description: String;
    subject: String;
    categoryId: String;
    competency: String;
}

export interface ISkillModel extends ISkill, Document {}

const SkillSchema: Schema = new Schema(
    {
        name: { type: String, required: false },
        subject: { type: String, required: false },
        description: { type: String, required: false },
        competency: { type: String, required: false },
        categoryId: { type: String, required: false }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<ISkillModel>('Skill', SkillSchema, 'skills');
