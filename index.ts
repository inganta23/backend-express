import express, { Express, Request, Response } from "express";
import cors from "cors";
import taskRoute from "./src/routes/taskRoute";
import { PORT } from "./src/config";

const app: Express = express();
const port = PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/task", taskRoute);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
