import pool from "../database/db";

const fetchUserInfo = async (req, res) => {
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

export { fetchUserInfo };
