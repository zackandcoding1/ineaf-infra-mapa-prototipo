import { db } from "../db.js";

// READ – listar dispositivos
export const getDevices = (_, res) => {
  const q = "SELECT * FROM devices";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// READ – obter um dispositivo por ID
export const getDeviceById = (req, res) => {
  const q = "SELECT * FROM devices WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ error: "Dispositivo não encontrado" });
    return res.status(200).json(data[0]);
  });
};

// CREATE – adicionar novo dispositivo
export const addDevice = (req, res) => {
  const q = `
    INSERT INTO devices 
    (name, status, ip, mac, floor, room, x, y, type, cpu, ram, storage, os, uptime, lastConnection)
    VALUES (?)`;

  const values = [
    req.body.name,
    req.body.status,
    req.body.ip,
    req.body.mac,
    req.body.floor,
    req.body.room,
    req.body.x,
    req.body.y,
    req.body.type,
    req.body.cpu,
    req.body.ram,
    req.body.storage,
    req.body.os,
    req.body.uptime,
    req.body.lastConnection
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Dispositivo criado com sucesso", id: data.insertId });
  });
};

// UPDATE – atualizar dispositivo existente
export const updateDevice = (req, res) => {
  const q = `
    UPDATE devices
    SET
      name = ?,
      status = ?,
      ip = ?,
      mac = ?,
      floor = ?,
      room = ?,
      x = ?,
      y = ?,
      type = ?,
      cpu = ?,
      ram = ?,
      storage = ?,
      os = ?,
      uptime = ?,
      lastConnection = ?
    WHERE id = ?`;

  const values = [
    req.body.name,
    req.body.status,
    req.body.ip,
    req.body.mac,
    req.body.floor,
    req.body.room,
    req.body.x,
    req.body.y,
    req.body.type,
    req.body.cpu,
    req.body.ram,
    req.body.storage,
    req.body.os,
    req.body.uptime,
    req.body.lastConnection
    ? new Date(req.body.lastConnection).toISOString().slice(0, 19).replace('T', ' ')
    : null,
    req.params.id,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Erro no UPDATE:", err);
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) return res.status(404).json({ error: "Dispositivo não encontrado" });
    return res.status(200).json({ message: "Dispositivo atualizado com sucesso" });
  });
};

// DELETE – excluir existente
export const deleteDevice = (req, res) => {
  const q = "DELETE FROM devices WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json({ error: "Dispositivo não encontrado" });
    return res.status(200).json({ message: "Dispositivo removido com sucesso" });
  });
};
