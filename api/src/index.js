const express = require("express");
const pool = require("./db");
const { addMinutes, toHHMM } = require("./time");

const app = express();

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/db-health", async (req, res) => {
  try {
    const r = await pool.query("SELECT 1 as ok");
    res.json({ db: "ok", result: r.rows[0] });
  } catch (e) {
    res.status(500).json({ db: "error" });
  }
});

app.get("/last-metro", async (req, res) => {
  const station = (req.query.station || "").trim();
  if (!station) {
    return res.status(400).json({ error: "station required" });
  }
  try {
    const q = `
      SELECT s.name as station, l.departed_at
      FROM stations s
      JOIN last_metro l ON s.id = l.station_id
      WHERE s.name = $1
    `;
    const r = await pool.query(q, [station]);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: "station not found" });
    }
    res.json({
      station: r.rows[0].station,
      departed_at: r.rows[0].departed_at
    });
  } catch (e) {
    res.status(500).json({ error: "db error" });
  }
});

app.get("/next-metro", async (req, res) => {
  const station = (req.query.station || "").trim();
  if (!station) {
    return res.status(400).json({ error: "station required" });
  }
  const now = new Date();

  try {
    const q = `
      SELECT s.name as station, h.minutes
      FROM stations s
      JOIN headways h ON s.id = h.station_id
      WHERE s.name = $1
    `;
    const r = await pool.query(q, [station]);
    if (r.rows.length === 0) {
      return res.status(404).json({ error: "station not found" });
    }
    const minutes = r.rows[0].minutes;
    const nextDate = addMinutes(now, minutes);
    const nextStr = toHHMM(nextDate);
    res.json({
      station: r.rows[0].station,
      headwayMin: minutes,
      nextArrival: nextStr
    });
  } catch (e) {
    res.status(500).json({ error: "db error" });
  }
});

const port = Number(process.env.APP_PORT || 5000);
if (require.main === module) {
  app.listen(port, () => {
    console.log("server on", port);
  });
}

module.exports = app;
