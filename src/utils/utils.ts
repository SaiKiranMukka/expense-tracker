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
