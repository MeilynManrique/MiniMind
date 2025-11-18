// index.js
import 'dotenv/config';

import express from "express";
import cors from "cors";
import contactosRoutes from "./routes/empleos.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/empleos", contactosRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
