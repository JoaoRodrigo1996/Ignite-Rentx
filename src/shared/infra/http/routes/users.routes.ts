/* eslint-disable import/prefer-default-export */
import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../../../../modules/accounts/UseCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarConstroller";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/UseCases/profileUser/ProfileUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
