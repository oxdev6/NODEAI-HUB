import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { router as apiRouter } from "./routes/api.js";
import { errorHandler } from "./middleware/error.js";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/v1", apiRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`control-plane listening on :${port}`);
});


