import { Request, Response } from "express";
import { userService } from "../services";
import { generateSignedToken, validatePassword } from "../utils/utils";
import { CONSTANTS } from "../utils/constants";

export class UserController {

  constructor() { }

  async getUser(req: Request, res: Response) {
    return res.status(200).send(req.user);
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { email, password } = req?.body;
      if (!(email && password)) {
        return res.status(400).send({ error: "Email & password fields are mandatory" });
      }

      const user = await userService.findUser(email);

      if (!user) {

        let newUser = await userService.createUser(req?.body);

        newUser = newUser.toJSON();

        const token = await generateSignedToken(newUser?.id, email);

        const userToReturn = { ...newUser, ...{ token } };
        delete userToReturn?.password;

        return res.status(201).send(userToReturn);

      } else {
        return res.status(400).send(CONSTANTS.EMAIL_ID_EXISTS);
      }
    } catch (er) {
      console.log(`Error: ${JSON.stringify(er)}`);
      return res.status(400).send({ message: "unable to register, please try again", error: er });
    }
  }

  async authenticateUser(req: Request, res: Response) {
    try {
      const { email, password } = req?.body;
      if (!(email && password)) {
        return res.status(400).send({ error: "Email & password fields are mandatory" });
      }
      const user = await userService.findUser(email);
      if (!user) {
        return res.status(404).send(CONSTANTS.USER_NOT_FOUND);
      }

      const isValidPwd: boolean = await validatePassword(password, user.password.toString());
      if (!isValidPwd) {
        return res.status(401).send({ message: 'Invalid Credentials' });
      }

      const token = await generateSignedToken(user._id, email);
      return res.status(200).send({ token });
    } catch (er) {
      console.log(`Error: ${JSON.stringify(er)}`);
      return res.status(400).send({ message: "unable to login, please try again", error: er });
    }
  }

  async logoutUser(req: Request, res: Response) {
    req.logout();
    return res.status(200).send({ message: "Successfully logged out!!" });
  }
};
