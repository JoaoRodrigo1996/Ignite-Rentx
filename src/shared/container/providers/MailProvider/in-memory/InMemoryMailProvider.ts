import { IMailProvider } from "../IMailProvider";


class InMemoryMailProvider implements IMailProvider {
  private message: any[] = []

  async senMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    this.message.push({ to, subject, variables, path })
  }

}


export { InMemoryMailProvider }