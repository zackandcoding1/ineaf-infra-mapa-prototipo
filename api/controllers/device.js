import { db } from "../db.js";

export const getDevices = (_, res) => {
    const q = "SELECT * FROM devices";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}