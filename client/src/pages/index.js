import express from "express";
import cors from "cors";
import emailRouter from "./email.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", emailRouter);

app.listen(3000, () => {
  console.log("Servidor a correr em http://localhost:3000");
});
