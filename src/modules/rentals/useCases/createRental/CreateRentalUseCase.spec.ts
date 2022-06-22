import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/InMemory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there another open to the same user", async () => {

    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    })

    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "123123",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new AppError("There is a rental in progress for this user"))

  })

  it("should not be able to create a new rental if there another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    await expect(createRentalUseCase.execute({
      user_id: "9515",
      car_id: car.id,
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError("Expected return date must be at least 24 hours from now"))
  })
})
