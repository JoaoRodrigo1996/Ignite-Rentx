import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryUsersTokenRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokenRepository"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { InMemoryMailProvider } from "@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let dateProvider: DayjsDateProvider
let inMemoryUsersTokenRepository: InMemoryUsersTokenRepository
let inMemoryMailProvider: InMemoryMailProvider


describe("Send Forgot password mail", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    dateProvider = new DayjsDateProvider()
    inMemoryUsersTokenRepository = new InMemoryUsersTokenRepository()
    inMemoryMailProvider = new InMemoryMailProvider()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokenRepository,
      dateProvider,
      inMemoryMailProvider
    )
  })

  it("should be to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, "senMail")

    await inMemoryUsersRepository.create({
      driver_license: "123456789",
      email: "johndoe@example.com",
      name: "John Doe",
      password: "123",
    })

    await sendForgotPasswordMailUseCase.execute("johndoe@example.com")

    expect(sendMail).toHaveBeenCalled()
  })

  it("Should not be able to send an email if user not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("johndoe@example.com")
    ).rejects.toEqual(new AppError("User does not exist!"))
  })

  it("should be able to create a user token", async () => {
    const generateTokenMail = jest.spyOn(inMemoryUsersRepository, "create")

    await inMemoryUsersRepository.create({
      driver_license: "12345",
      email: "johndoe@example.com",
      name: "John Doe",
      password: "123",
    })

    await sendForgotPasswordMailUseCase.execute("johndoe@example.com")

    expect(generateTokenMail).toHaveBeenCalled()
  })
})


