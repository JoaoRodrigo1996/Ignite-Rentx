/* eslint-disable no-console */
import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";

import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import "../../container";
import { AppError } from "../../errors/AppError";
import upload from "@config/upload";

createConnection();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });

    next();
  }
);

export { app };

/* 
  SOLID
  ----------------------------------------------------------------
  S -> SRP - Responsability Principle (Princípío da Responsabilidade Única)
  O -> OCP - Open-Closed Principle (Princípio Aberto/Fechado)
  L -> LSP - Liskov Substitution Principle (Princípio da Substituição de Liskov)
  I -> OSP - Interface Segregation Principle (Princípio da Segregação de Interface)
  D -> DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência)
*/
