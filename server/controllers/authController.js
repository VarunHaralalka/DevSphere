import pool from "../database/db.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  //SIGNUP
  const { username, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await pool.query(
      "INSERT INTO users (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, phone]
    );
    const user = response.rows[0];
    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  //LOGIN
  const { email, password } = req.body;
  try {
    const response = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (response.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = response.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    console.log(user);
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
