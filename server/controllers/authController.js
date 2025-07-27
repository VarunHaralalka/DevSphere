import pool from "../database/db.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    if (
      (await pool.query("SELECT 1 FROM users WHERE email=$1", [email])).rows
        .length
    )
      return res.status(409).json({ error: "Email already registered" });

    if (
      (await pool.query("SELECT 1 FROM users WHERE username=$1", [username]))
        .rows.length
    )
      return res.status(409).json({ error: "Username already taken" });

    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "INSERT INTO users (username, email, password, phone) VALUES ($1,$2,$3,$4) RETURNING *",
      [username, email, hashed, phone]
    );
    delete rows[0].password;
    res.status(201).json({ message: "User created", user: rows[0] });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (!rows.length)
      return res.status(401).json({ error: "Invalid email or password" });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ error: "Invalid email or password" });
    delete user.password;
    res.status(200).json({ message: "Login successful", user });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
