import { Types as MongooseTypes } from "mongoose";
import { ExpenseModel } from "../models/expense.model";
import { CONSTANTS } from "../utils/constants";

export class ExpenseService {
  constructor() { }

  async createExpense(body: any, userId: any) {
    const expense = new ExpenseModel(body);
    expense.recordedBy = userId;
    return ExpenseModel.create(expense);
  }
  async findExpenseById(expenseId: string) {
    return await ExpenseModel.findOne({ "_id": new MongooseTypes.ObjectId(expenseId) }).lean().exec();
  }

  async findUserExpenses(userId: any) {

    return await ExpenseModel.find({ "recordedBy": userId }).exec();
  }

  async updateExpense(expenseId: string, updatedData: any) {
    return await ExpenseModel.findOneAndUpdate({ "_id": new MongooseTypes.ObjectId(expenseId) }, updatedData).exec();
  }

  async removeExpense(expenseId: string) {
    return await ExpenseModel.findOneAndDelete({ "_id": new MongooseTypes.ObjectId(expenseId) }).exec();
  }

  async getCurrentMonthCategoryWiseStats(userId: any) {
    const currDate: Date = new Date();
    currDate.setDate(1);

    return await ExpenseModel.aggregate([
      {
        $match: { recordedBy: new MongooseTypes.ObjectId(userId), createdAt: { $gte: currDate } }
      },
      {
        $group: {
          _id: {
            ["category" as string]: "$category"
          },
          totalAmount: { $sum: "$amount" },
        }
      },
      {
        $project: {
          _id: 0,
          ["category" as string]: "$_id.category",
          totalAmount: 1,
        }
      },
    ]).exec();

  }

  async getLastNMonthsCategoryWiseTotal(numOfMonths: number, userId: any) {

    const currDate: Date = new Date();
    currDate.setMonth(currDate.getMonth() - numOfMonths - 1);

    const monthNames: string[] = [...CONSTANTS.MONTH_NAMES];
    monthNames.unshift("");

    return await ExpenseModel.aggregate([
      {
        $match: { recordedBy: new MongooseTypes.ObjectId(userId), createdAt: { $gte: currDate } }
      },
      {
        $group: {
          _id: {
            ["category" as string]: "$category",
            ["monthNumber" as string]: { $month: "$createdAt" },
            ["year" as string]: { $year: "$createdAt" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
          ["category" as string]: "$_id.category",
          ["month" as string]: {
            $concat: [
              { $arrayElemAt: [monthNames, "$_id.monthNumber"] },
              ", ",
              { "$toString": "$_id.year" }
            ]
          }
        }
      }
    ]).exec();
  }

  async getLastNDaysCategoryWiseTotal(numOfDays: number, userId: any) {

    const currDate: Date = new Date();
    currDate.setDate(currDate.getDate() - numOfDays - 1);

    const monthNames: string[] = [...CONSTANTS.MONTH_NAMES];
    monthNames.unshift("");

    return await ExpenseModel.aggregate([
      {
        $match: { recordedBy: new MongooseTypes.ObjectId(userId), createdAt: { $gte: currDate } }
      },
      {
        $group: {
          _id: {
            ["category" as string]: "$category",
            ["dayNumber" as string]: { $dayOfMonth: "$createdAt" },
            ["monthNumber" as string]: { $month: "$createdAt" },
            ["year" as string]: { $year: "$createdAt" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
          ["category" as string]: "$_id.category",
          ["date" as string]: {
            $concat: [
              { $substr: [{ $arrayElemAt: [monthNames, "$_id.monthNumber"] }, 0, 3] },
              " ",
              { "$toString": "$_id.dayNumber" },
              ", ",
              { "$toString": "$_id.year" }
            ]
          }
        }
      }
    ]).exec();
  }

  async getLastNMonthsPaymentModeWiseTotal(numOfMonths: number, userId: any) {

    const currDate: Date = new Date();
    currDate.setMonth(currDate.getMonth() - numOfMonths);
    currDate.setDate(1);

    return await ExpenseModel.aggregate([
      {
        $match: { recordedBy: new MongooseTypes.ObjectId(userId), createdAt: { $gte: currDate } }
      },
      {
        $group: {
          _id: { ["paymentMode" as string]: "$paymentMode" },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
          ["paymentMode" as string]: "$_id.paymentMode"
        }
      }
    ]).exec();
  }

  async getLastNMonthsCreditCardTotal(numOfMonths: number, userId: any) {

    const currDate: Date = new Date();
    currDate.setMonth(currDate.getMonth() - numOfMonths - 1);

    const monthNames: string[] = [...CONSTANTS.MONTH_NAMES];
    monthNames.unshift("");

    return await ExpenseModel.aggregate([
      {
        $match: { recordedBy: new MongooseTypes.ObjectId(userId), paymentMode: { $eq: 'Credit Card' }, createdAt: { $gte: currDate } }
      },
      {
        $group: {
          _id: {
            ["monthNumber" as string]: { $month: "$createdAt" },
            ["year" as string]: { $year: "$createdAt" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
          ["month" as string]: {
            $concat: [
              { $arrayElemAt: [monthNames, "$_id.monthNumber"] },
              ", ",
              { "$toString": "$_id.year" }
            ]
          }
        }
      }
    ]).exec();
  }

}
