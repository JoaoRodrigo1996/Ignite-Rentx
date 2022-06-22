/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable, injectAll } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError("Car does not exist!")
    }

    const specifications = await this.specificationsRepository.findById(specifications_id)

    carExists.specifications = specifications

    await this.carsRepository.create(carExists)

    return carExists

  }

}

export { CreateCarSpecificationUseCase };
