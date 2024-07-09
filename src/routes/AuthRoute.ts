import express from "express";
import Container from "typedi";
import AuthController from "../controllers/AuthController";
import RequestValidator from "../middlewares/\bRequestValidator";
import { SignInRequest } from "../requests/SignInRequest";
import { SignUpRequest } from "../requests/SignUpRequest";

const router = express.Router();

const authController = Container.get(AuthController);

router.post(
  "/signIn",
  RequestValidator.validate(SignInRequest),
  authController.signIn
);

router.post(
  "/signUp",
  RequestValidator.validate(SignUpRequest),
  authController.signUp
);

router.get("/user", authController.getAllUsers);

export default router;
