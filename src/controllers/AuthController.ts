import { Request } from "express";
import { Service } from "typedi";
import { asyncWrapper } from "../utils/asynWrapper";
import { SuccessResponse } from "../utils/SuccessReponse";
import UserService from "../services/UserService";

// Dependency Injection
@Service()
export default class AuthController {
  constructor(public userService: UserService) {}

  signIn = asyncWrapper(async (req: Request) => {
    const { email, password } = req.body;
    const response = await this.userService.signIn(email, password);
    return new SuccessResponse(response);
  });

  signUp = asyncWrapper(async (req: Request) => {
    const { email, name, password } = req.body;
    const response = await this.userService.signUp(email, name, password);
    return new SuccessResponse(response);
  });

  getAllUsers = asyncWrapper(async () => {
    console.log("runhere");
    const response = await this.userService.getAllUsers();
    return new SuccessResponse(response);
  });
}
