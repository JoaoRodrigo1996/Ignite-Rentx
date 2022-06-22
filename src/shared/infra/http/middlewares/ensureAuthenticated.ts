/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Bearer uashdiuahsjdhajsh123123121234h12n -> TOKEN
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_token
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Token invalid", 401);
  }
}
