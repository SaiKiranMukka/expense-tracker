import { Schema, Types as MongooseTypes } from "mongoose";
import { ExpenseModel } from "../models/expense.model";

export class ExpenseService {
  constructor() {}

  async createExpense (body: any, userId: any) {
    const expense = new ExpenseModel(body);
    expense.recordedBy = userId;
    return ExpenseModel.create(expense);
  }
  async findExpenseById (expenseId: string) {
    return await ExpenseModel.findOne({ "_id": new MongooseTypes.ObjectId(expenseId) }).lean().exec();
  }

  async findUserExpenses (userId: any) {

    return await ExpenseModel.find({ "recordedBy": userId }).exec(); 
  }

  async updateExpense (expenseId: string, updatedData: any) {
    return await ExpenseModel.findOneAndUpdate({ "_id": new MongooseTypes.ObjectId(expenseId) }, updatedData).exec();
  }

  async removeExpense (expenseId: string) {
    return await ExpenseModel.findOneAndDelete({ "_id": new MongooseTypes.ObjectId(expenseId) }).exec();
  }

}
