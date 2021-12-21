import { NextFunction, Request, Response } from 'express';
import { expenseService } from '../services';

export class ExpenseController {
  constructor () {};

  async authorizeUser (req: Request, res: Response, next: NextFunction) {

    try {
      const expense = await expenseService.findExpenseById(req.params?.id);
      if (expense == null) {
        return res.status(404).send({ message: `Expense with Id: ${req.params?.id} Not found` });
      }
      const isAuthorized = req.user?.id == expense?.recordedBy;
      if (!isAuthorized) {
        return res.status(403).send({ message: 'Access Denied' });
      }
      return next();
    } catch (er) {
      return res.status(400).send({ error: er, message: 'Unable to perform the action, please try again' });
    }
  };

  async getExpenses (req: Request, res: Response) {
    try {
      const expensesList = await expenseService.findUserExpenses(req.user?.id);
      return res.status(200).send({ Expenses: expensesList });
    } catch (er) {
      return res.status(200).send([]);
    }
  }

  async createExpense (req: Request, res: Response) {
    try {
      const expenseData = req?.body;
      const { _id } = await expenseService.createExpense(expenseData, req.user?.id);
      return res.status(201).send({ expenseId: _id });
    } catch (er) {
      return res.status(400).send({ error: er, message: 'unable to create, please try again' });
    }
  }

  async getExpenseById (req: Request, res: Response) {
    try {
      const expenseId = req.params?.id;
      const expense = await expenseService.findExpenseById(expenseId);
      return res.status(200).send({ expense });
    } catch (er) {
      return res.status(400).send({ error: er });
    }
  }

  async updateExpense (req: Request, res: Response) {
    try {
      const updatedExpense = await expenseService.updateExpense(req.params?.id, req?.body);
      return res.status(200).send(updatedExpense);
    } catch (er) {
      return res.status(400).send({ error: er, message: 'unable to update, please try again' });
    }
  }

  async removeExpense (req: Request, res: Response) {
    try {
      const expenseId = await expenseService.removeExpense(req.params?.id);
      return res.status(200).send({ expenseId });
    } catch (er) {
      return res.status(400).send({ error: er, message: 'unable to delete, please try again' });
    }
  }
};
