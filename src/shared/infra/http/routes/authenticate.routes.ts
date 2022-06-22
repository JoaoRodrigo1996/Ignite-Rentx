/* eslint-disable import/prefer-default-export */
import { RefreshTokenController } from "@modules/accounts/UseCases/refreshToken/RefreshTokenController";
import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/UseCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh_token", refreshTokenController.handle)

export { authenticateRoutes };
