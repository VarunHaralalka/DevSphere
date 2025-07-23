import pool from "../database/db.js";

//here we will just intialise the row for the user
export const createUserInfo = async (req, res) => {
  const { user_id } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO user_info (user_id) VALUES ($1) RETURNING *",
      [user_id]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error("Error creating user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const fetchUserInfo = async (req, res) => {
  const { user_id } = req.params;
  try {
    const response = await pool.query(
      "Select * from user_info where user_id = $1",
      [user_id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editUserInfo = async (req, res) => {
  const { user_id } = req.params;
  const {
    fullname,
    about,
    github,
    portfolio,
    image_url,
    location,
    linkedin,
    skills,
    tech_stack,
    open_to_work,
  } = req.body;
  try {
    const response = await pool.query(
      "UPDATE user_info SET fullname = $1, about = $2, github = $3, portfolio = $4, image_url = $5, location = $6, linkedin = $7, skills = $8, tech_stack = $9, open_to_work = $10 WHERE user_id = $11 RETURNING *",
      [
        fullname,
        about,
        github,
        portfolio,
        image_url,
        location,
        linkedin,
        skills,
        tech_stack,
        open_to_work,
        user_id,
      ]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error editing user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
