import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    forename: String;
    surname: String;
    email: String;
    password: String;
    token: String;
    passwordConfirmation: String;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        forename: { type: String, required: false },
        surname: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        passwordConfirmation: { type: String, required: true },
        token: { type: String },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema, 'users');
