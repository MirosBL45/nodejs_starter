import "dotenv/config";
import express, { Request, Response } from "express";
import { connectDB } from "./src/config/db";
import testRoutes from "./src/routes/test.routes";
import testRoutes2 from "./src/routes/test2.routes";
import bodyRoutes from "./src/routes/body.routes";
import queryRoutes from "./src/routes/query.routes";
import paramsRoutes from "./src/routes/params.routes";
import { errorHandler } from "./src/middleware/error.middleware";

const startServer = async () => {
  await connectDB();

  const applikacija = express();

  applikacija.use(express.json());

  applikacija.use((req, res, next) => {
    console.log("1 Prvi middleware");
    next();
  });

  applikacija.use((req, res, next) => {
    console.log("2 Drugi middleware");
    next();
  });

  applikacija.use(errorHandler);

  applikacija.use("/rubi", testRoutes);

  applikacija.use("/srecko", testRoutes2);

  applikacija.use("/bodika", bodyRoutes);
  applikacija.use("/querko", queryRoutes);
  applikacija.use("/paramko", paramsRoutes);

  applikacija.get("/", (req: Request, res: Response) => {
    res.send("Hellooo, Server radi, Rubi lepa maca 7500");
    console.log("3 Rute");
  });

  applikacija.listen(7500, () => {
    console.log("Server sljaka na portu 7500");
  });
};

startServer();
