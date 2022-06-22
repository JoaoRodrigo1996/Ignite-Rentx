import { Specification } from "../infra/typeorm/entities/Specification";

/* eslint-disable import/prefer-default-export */
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findById(ids: string[]): Promise<Specification[]>
}

export { ISpecificationRepository, ICreateSpecificationDTO };
