import { Document, model, ObjectId, Schema } from "mongoose";

export interface IExpense{
  title: string,
  category: string,
  subCategory: string,
  amount: number,
  paymentMode: string,
  remarks: string,
  recordedBy: ObjectId
};

export const ExpenseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subCategory: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMode: {
    type: String,
    trim: true
  },
  remarks: {
    type: String,
    trim: true
  },
  recordedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
}, {
  timestamps: true
});

export interface IExpenseDocument extends IExpense, Document {};

export const ExpenseModel = model<IExpenseDocument>('Expense', ExpenseSchema);
