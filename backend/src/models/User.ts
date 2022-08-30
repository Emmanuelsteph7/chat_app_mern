import mongoose, { Schema, Document } from 'mongoose';

export interface UserI {
  name: string;
  email: string;
  password: string;
  picture: string;
}

export interface UserModelI extends UserI, Document {}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // this means when the user is displayed, the password won't be sent along
    },
    picture: {
      type: String,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserModelI>('User', UserSchema);

export default UserModel;
