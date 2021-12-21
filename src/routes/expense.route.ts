import { Router } from "express";
import { Auth } from "../middlewares/auth";
import { ExpenseController } from "../controllers/expense.controller";

export class ExpenseRoutes {
  public router: Router;
  private auth: Auth = new Auth();
  constructor(private expenseController: ExpenseController = new ExpenseController()) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get('/', this.auth.authenticateJWT, this.expenseController.getExpenses);
    this.router.post('/', this.auth.authenticateJWT, this.expenseController.createExpense);
    this.router.get('/:id', this.auth.authenticateJWT, this.expenseController.authorizeUser, this.expenseController.getExpenseById);
    this.router.put('/:id', this.auth.authenticateJWT, this.expenseController.authorizeUser, this.expenseController.updateExpense);
    this.router.delete('/:id', this.auth.authenticateJWT, this.expenseController.authorizeUser, this.expenseController.removeExpense);
  }
}
