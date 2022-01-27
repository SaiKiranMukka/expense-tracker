import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { Auth } from "../middlewares/auth";
import { registerValidation } from "../utils/utils";

export class UserRoutes {
  public router: Router;
  private auth: Auth = new Auth();
  constructor(private userController: UserController = new UserController()) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get('/', this.auth.authenticateJWT, this.userController.getUser);
    this.router.post('/register', this.userController.registerUser);
    //this.router.post('/register', registerValidation, this.userController.registerUser);
    this.router.post('/login', this.userController.authenticateUser);
    this.router.post('/logout', this.userController.logoutUser);
  }
}
