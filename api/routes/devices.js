import express from "express";
import {
  getDevices,
  getDeviceById,
  addDevice,
  updateDevice,
  deleteDevice
} from "../controllers/device.js";

const router = express.Router();

// Rotas CRUD
router.get("/", getDevices);        // Lista todos
router.get("/:id", getDeviceById);  // Busca um por ID
router.post("/", addDevice);        // Cria novo
router.put("/:id", updateDevice);   // Atualiza existente
router.delete("/:id", deleteDevice); // Deleta existente

export default router;
