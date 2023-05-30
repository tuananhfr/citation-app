import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

import morgan from "morgan";
// import dbConnect from "./config/dbConnect";
import { createServer } from "http";
import citationRouter from "./routers/citationRouter";
import favoriteRouter from "./routers/favoriteRoute";

const app = express();
const result = dotenv.config({
  path: path.join(__dirname, "..", ".env.production"),
});
process.env = {
  ...process.env,
  ...result.parsed,
};

dotenv.config();

const PORT: string | number = process.env.PORT || 4000;

const httpServer = createServer(app);

// dbConnect();
app.use(morgan("dev"));

const corsOptions = {
  origin: process.env.URL_FRONTEND,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded());

// api
app.use("/api/citation", citationRouter);
app.use("/api/favorite", favoriteRouter);

app.get("/api/random", async (req, res) => {
  try {
    const response = await axios.get("https://kaamelott.chaudie.re/api/random");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
