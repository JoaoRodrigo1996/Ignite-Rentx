/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // usuário existe
    const user = await this.usersRepository.findByEmail(email);
    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    // Senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }
    // Gerar JsonWebToken
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token,
      user: { name: user.name, email: user.email },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
