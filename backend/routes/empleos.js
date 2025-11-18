// routes/contactos.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Obtener todos los contactos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM empleo");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un contacto
router.post("/", async (req, res) => {
  const { disponibles, modalidad, salario, descripcion } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO empleo (disponibles, modalidad, salario, descripcion) VALUES ($1, $2, $3, $4) RETURNING *",
      [disponibles, modalidad, salario, descripcion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un contacto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM empleo WHERE id = $1", [id]);
    res.json({ mensaje: "Contacto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
