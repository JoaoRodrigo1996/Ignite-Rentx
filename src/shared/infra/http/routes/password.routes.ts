import { ResetPasswordUserController } from "@modules/accounts/UseCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/UseCases/sendForgotPassworlMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetpasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetpasswordUserController.handle)


export { passwordRoutes }