import { UserService } from "./user.service";
import { ExpenseService } from "./expense.service";

const userService: UserService  = new UserService();
const expenseService: ExpenseService = new ExpenseService();

export {
  userService,
  expenseService
}