/* eslint-disable no-console */
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersTokenRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokenRepository: InMemoryUsersTokenRepository;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokenRepository = new InMemoryUsersTokenRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository, inMemoryUsersTokenRepository, dateProvider
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "user@test.com",
      password: "1234",
      driver_license: "00123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existing user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234",
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "User Test Error",
      email: "user@user.com",
      password: "1234",
      driver_license: "9874",
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "Incorrectpassword",
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
