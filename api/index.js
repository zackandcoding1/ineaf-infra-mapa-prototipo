import express from "express";
import deviceRoutes from "./routes/devices.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rota raiz
app.get("/", (req, res) => {
    res.json({
        message: "API do InfraMapa rodando!",
        version: "1.0.0",
        endpoints: {
            devices: "/api/devices"
        }
    });
});

// Rotas da API com prefixo /api
app.use("/api/devices", deviceRoutes);

// Rota 404 para endpoints não encontrados
app.use((req, res) => {
    res.status(404).json({ 
        error: "Rota não encontrada",
        path: req.path,
        availableRoutes: ["/", "/api/devices"]
    });
});

// Iniciar servidor
const PORT = 8800;
app.listen(PORT, () => {
    console.log("=================================");
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Raiz: http://localhost:${PORT}/`);
    console.log(`📡 API: http://localhost:${PORT}/api/devices`);
    console.log("=================================");
});