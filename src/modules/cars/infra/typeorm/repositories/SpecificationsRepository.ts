/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }


  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)

    return specifications;
  }
}

export { SpecificationsRepository };
