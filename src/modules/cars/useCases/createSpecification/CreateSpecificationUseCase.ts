/* eslint-disable no-useless-constructor */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

/* eslint-disable import/prefer-default-export */
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
