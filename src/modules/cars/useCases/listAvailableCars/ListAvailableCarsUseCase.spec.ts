/* eslint-disable no-console */
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 240.0,
      license_plate: "BBB-5468",
      fine_amount: 260,
      brand: "Car brand",
      category_id: "Category id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 240.0,
      license_plate: "BBB-5468",
      fine_amount: 260,
      brand: "Car brand test",
      category_id: "Category id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car brand test",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car description",
      daily_rate: 240.0,
      license_plate: "CCC-5468",
      fine_amount: 260,
      brand: "Car brand test",
      category_id: "Category id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car description",
      daily_rate: 240.0,
      license_plate: "CCC-5468",
      fine_amount: 260,
      brand: "Car brand test",
      category_id: "123456789",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456789",
    });

    expect(cars).toEqual([car]);
  });
});
