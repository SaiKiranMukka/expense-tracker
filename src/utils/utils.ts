import { check } from "express-validator";
import { CONSTANTS } from "./constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const registerValidation = [
  check('email')
    .exists()
    .withMessage(CONSTANTS.EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(CONSTANTS.EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(CONSTANTS.PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(CONSTANTS.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];

export const loginValidation = [
  check('email')
    .exists()
    .withMessage(CONSTANTS.EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(CONSTANTS.EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(CONSTANTS.PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(CONSTANTS.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];

export const generateHashedPassword = async (pwd: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
}

export const generateSignedToken = async (id: string, email: string) => {
  return jwt.sign({ id, email }, config.SECRET_KEY, { expiresIn: config.JWT_EXPIRY_TIME });
}

export const verifySignedToken = async (token: any) => {
  return jwt.verify(token, config.SECRET_KEY);
}

export const validatePassword = async (providedPwd: string, actualPwd: string,) => {
  return await bcrypt.compare(providedPwd, actualPwd);
}

export const getLastNMonthsNames = (numOfMonths: number) => {

  const currentDate: Date = new Date();
  const lastNMonths: Array<string> = [];

  for (let i = 0; i < numOfMonths; i++) {
    lastNMonths.push(CONSTANTS.MONTH_NAMES[currentDate.getMonth()] + ', ' + currentDate.getFullYear());
    currentDate.setMonth(currentDate.getMonth() - 1);
  };

  return lastNMonths;
}

export const getLastNDaysDates = (numOfDays: number) => {

  const currentDate: Date = new Date();
  const lastNDays: Array<string> = [];

  for (let i = 0; i < numOfDays; i++) {
    lastNDays.push(CONSTANTS.MONTH_NAMES[currentDate.getMonth()].substring(0, 3) + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear());
    currentDate.setDate(currentDate.getDate() - 1);
  };

  return lastNDays;
}

export const getPaymentModesList = () => {
  return ['Credit Card', 'Debit Card', 'Cash', 'Cheque', 'Online Transaction'];
}