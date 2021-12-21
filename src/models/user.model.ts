import { Document, model, Schema } from "mongoose";

export interface IUser {
  firstName: String,
  lastName: String,
  email: String,
  password: String
};

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

UserSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
}})

//export interface IUserDocument extends IUser, Document {};

export const UserModel = model("User", UserSchema);
