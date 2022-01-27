import { Router } from "express";
import { Auth } from "../middlewares/auth";
import { DashboardController } from "../controllers/dashboard.controller";

export class DashboardRoutes {
  public router: Router;
  private auth: Auth = new Auth();
  constructor(private dashboardController: DashboardController = new DashboardController()) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get('/currentMonthCategoryWiseStats', this.auth.authenticateJWT, this.dashboardController.getCurrentMonthCategoryWiseStats);
    this.router.get('/lastNMonthsCategoryWisePlot', this.auth.authenticateJWT, this.dashboardController.getLastNMonthsCategoryWisePlot);
    this.router.get('/lastNDaysCategoryWisePlot', this.auth.authenticateJWT, this.dashboardController.getLastNDaysCategoryWisePlot);
    this.router.get('/lastNMonthsPaymentModeWisePlot', this.auth.authenticateJWT, this.dashboardController.getLastNMonthsPaymentModeWisePlot);
    this.router.get('/lastNMonthsCreditUtilization', this.auth.authenticateJWT, this.dashboardController.getLastNMonthsCreditUtilization);
  }
}
