/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
