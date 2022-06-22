/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesuseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesuseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
