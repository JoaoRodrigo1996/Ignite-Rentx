import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { sign, verify } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token:string
  refresh_token:string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!userToken) {
      throw new AppError("Refresh Token not found")
    }

    await this.usersTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.usersTokenRepository.create({
      user_id,
      refresh_token,
      expires_date,
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      refresh_token, token:newToken
    }
  }
}

export { RefreshTokenUseCase }