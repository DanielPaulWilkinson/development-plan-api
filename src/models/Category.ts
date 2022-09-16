import mongoose, { Document, Schema } from 'mongoose';
import { ISkill } from './Skill';

export interface ICategory {
    name: String;
    description: String;
    image: String;
    skills: ISkill[];
}

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: false },
        description: { type: String, required: false },
        image: { type: String, required: false },
        skills: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Skill'
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<ICategoryModel>('Category', CategorySchema, 'categories');
