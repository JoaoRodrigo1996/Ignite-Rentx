import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";


class InMemoryUsersTokenRepository implements IUsersTokenRepository {
  usersTokens: UserTokens[] = []

  async create({ user_id, refresh_token, expires_date }: ICreateUsersTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, { user_id, refresh_token, expires_date })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id)

    this.usersTokens.splice(
      this.usersTokens.indexOf(userToken),
    )
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token)

    return userToken
  }

}

export { InMemoryUsersTokenRepository }