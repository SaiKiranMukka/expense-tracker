import { Schema, Types as MongooseTypes } from "mongoose";
import { UserModel } from "../models/user.model";
import { generateHashedPassword } from '../utils/utils';

export class UserService {

  constructor() {}

  async getUser (userId: string) {
    return UserModel.findOne({ "_id": new MongooseTypes.ObjectId(userId) }).exec()
  }

  async createUser (body: any) {
    const user = new UserModel(body);
    user.password = await generateHashedPassword(user.password.toString());
    return UserModel.create(user);
  }

  async updateUser () {
  }

  async findUser (userEmail: string) {
    return await UserModel.findOne({ email: userEmail }).lean().exec();
  }

  async logoutUser (userEmail: string) {
    return UserModel.findOneAndUpdate({ email: userEmail });
  }

};

// To append user information to the Express request Object
declare global {
  namespace Express {
    interface User {
      id: Schema.Types.ObjectId,
      email: string;
    }
  }
}
