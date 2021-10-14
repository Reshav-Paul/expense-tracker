import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { UserType, mUserType } from '../types/types';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
});

UserSchema.virtual('url').get(function (this: mUserType) {
    return '/user/' + this._id;
})

UserSchema.pre('save', function (next) {
    let doc = this;
    bcrypt.genSalt(Math.floor(Math.random() * 10) + 10,
        function (err: mongoose.CallbackError | undefined, salt: any) {
            if (err) return next(err);
            bcrypt.hash(doc.password, salt, function (err: mongoose.CallbackError | undefined, hashedPass: any) {
                if (err) return next(err);
                doc.password = hashedPass;
                next();
            })
        }
    );
});

module.exports = mongoose.model<mUserType>('User', UserSchema);