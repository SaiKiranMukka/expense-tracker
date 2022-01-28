import { Request, Response } from 'express';
import { getLastNDaysDates, getLastNMonthsNames, getPaymentModesList } from '../utils/utils';
import { expenseService } from '../services';
import { CONSTANTS } from '../utils/constants';

export class DashboardController {

  constructor() { }

  async getCurrentMonthCategoryWiseStats(req: Request, res: Response) {

    const categoryWiseData: any = {};

    for (let category of Object.keys(CONSTANTS.CATEGORIES)) {
      categoryWiseData[CONSTANTS.CATEGORIES[category]] = Object.assign({}, { "category": CONSTANTS.CATEGORIES[category], "totalAmount": 0 });
    }

    try {
      const currentMonthData = await expenseService.getCurrentMonthCategoryWiseStats(req.user?.id);

      for (let i = 0; i < currentMonthData.length; i++) {
        categoryWiseData[currentMonthData[i].category] = Object.assign({}, currentMonthData[i]);
      }

      return res.status(200).send(Object.values(categoryWiseData));
    } catch (er) {
      console.log(er);
      return res.status(200).send(Object.values(categoryWiseData));
    }

  }

  async getLastNMonthsCategoryWisePlot(req: Request, res: Response) {

    const numOfMonths: number = Number(req.query?.numOfMonths) ?? 3;
    const lastNMonthsNames: string[] = getLastNMonthsNames(numOfMonths);

    const categoryWiseData: any = {};

    for (let category of Object.keys(CONSTANTS.CATEGORIES)) {
      categoryWiseData[CONSTANTS.CATEGORIES[category]] = new Array(numOfMonths).fill(0);
    }

    const responseData = {
      labels: lastNMonthsNames,
      datasets: [
        {
          label: CONSTANTS.CATEGORIES.SAVINGS,
          data: categoryWiseData[CONSTANTS.CATEGORIES.SAVINGS],
          backgroundColor: 'rgb(53, 162, 235)',
          stack: 'Incoming',
        },
        {
          label: CONSTANTS.CATEGORIES.EXPENSE + 's',
          data: categoryWiseData[CONSTANTS.CATEGORIES.EXPENSE],
          backgroundColor: 'rgb(255, 99, 132)',
          stack: 'Outgoing',
        },
        {
          label: CONSTANTS.CATEGORIES.INVESTMENT + 's',
          data: categoryWiseData[CONSTANTS.CATEGORIES.INVESTMENT],
          backgroundColor: 'rgb(75, 192, 192)',
          stack: 'Outgoing',
        }
      ]
    };

    try {
      const lastNMonthsData = await expenseService.getLastNMonthsCategoryWiseTotal(numOfMonths, req.user?.id);

      for (let i = 0; i < lastNMonthsData.length; i++) {
        categoryWiseData[lastNMonthsData[i].category][lastNMonthsNames.indexOf(lastNMonthsData[i].month)] = lastNMonthsData[i].totalAmount;
      }

      return res.status(200).send(responseData);
    } catch (er) {
      console.log(er);
      return res.status(200).send(responseData);
    }
  }

  async getLastNDaysCategoryWisePlot(req: Request, res: Response) {

    const numOfDays: number = Number(req.query?.numOfDays) ?? 7;
    const lastNDaysDates: string[] = getLastNDaysDates(numOfDays);

    const categoryWiseData: any = {};

    for (let category of Object.keys(CONSTANTS.CATEGORIES)) {
      categoryWiseData[CONSTANTS.CATEGORIES[category]] = new Array(numOfDays).fill(0);
    }

    const responseData = {
      labels: lastNDaysDates,
      datasets: [
        {
          label: CONSTANTS.CATEGORIES.SAVINGS,
          data: categoryWiseData[CONSTANTS.CATEGORIES.SAVINGS],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235, 0.5)',
        },
        {
          label: CONSTANTS.CATEGORIES.EXPENSE + 's',
          data: categoryWiseData[CONSTANTS.CATEGORIES.EXPENSE],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132, 0.5)',
        },
        {
          label: CONSTANTS.CATEGORIES.INVESTMENT + 's',
          data: categoryWiseData[CONSTANTS.CATEGORIES.INVESTMENT],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192, 0.5)',
        }
      ]
    };

    try {

      const lastNDaysData = await expenseService.getLastNDaysCategoryWiseTotal(numOfDays, req.user?.id);

      for (let i = 0; i < lastNDaysData.length; i++) {
        categoryWiseData[lastNDaysData[i].category][lastNDaysDates.indexOf(lastNDaysData[i].date)] = lastNDaysData[i].totalAmount;
      }

      return res.status(200).send(responseData);
    } catch (er) {
      return res.status(200).send(responseData);
    }
  }

  async getLastNMonthsPaymentModeWisePlot(req: Request, res: Response) {

    const numOfMonths: number = Number(req.query?.numOfMonths) ?? 0;
    const paymentModesList: string[] = getPaymentModesList();
    const paymentModeWiseData: number[] = new Array(paymentModesList.length).fill(0);

    const responseData = {
      labels: paymentModesList,
      datasets: [
        {
          label: '# of Rupees',
          data: paymentModeWiseData,
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    try {
      const lastNMonthsData = await expenseService.getLastNMonthsPaymentModeWiseTotal(numOfMonths, req.user?.id);

      for (let i = 0; i < lastNMonthsData.length; i++) {
        paymentModeWiseData[paymentModesList.indexOf(lastNMonthsData[i].paymentMode)] = lastNMonthsData[i].totalAmount;
      }

      return res.status(200).send(responseData);
    } catch (er) {
      return res.status(200).send(responseData);
    }
  }

  async getLastNMonthsCreditUtilization(req: Request, res: Response) {

    const numOfMonths: number = Number(req.query?.numOfMonths) ?? 0;
    const lastNMonthsNames: string[] = getLastNMonthsNames(numOfMonths);
    const creditCardData: number[] = new Array(numOfMonths).fill(0);

    const responseData = {
      labels: lastNMonthsNames,
      datasets: [
        {
          label: 'Credit Utilized',
          data: creditCardData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.75)',
          stack: 'Outgoing',
        }
      ]
    };

    try {
      const lastNMonthsCreditData = await expenseService.getLastNMonthsCreditCardTotal(numOfMonths, req.user?.id);

      for (let i = 0; i < lastNMonthsCreditData.length; i++) {
        creditCardData[lastNMonthsNames.indexOf(lastNMonthsCreditData[i].month)] = lastNMonthsCreditData[i].totalAmount;
      }

      return res.status(200).send(responseData);
    } catch (er) {
      return res.status(200).send(responseData);
    }
  }
}
