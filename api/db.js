import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: "inframapa"
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    console.log('Verifique se o servidor MySQL está em execução e as credenciais estão corretas.');
    process.exit(1);
  } else {
    console.log('✅ Conectado ao banco de dados MySQL.');
  }
})