interface IMailProvider {
  senMail(to: string, subject: string, variables: any, path: string): Promise<void>
}

export { IMailProvider }