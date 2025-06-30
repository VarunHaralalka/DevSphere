import pool from "../database/db.js";

export const getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const response = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    res.status(200).json({
      message: "User fetched successfully",
      response: response.rows[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  //deleting a user will also delete all the posts and collab posts associated with the user
  const { user_id } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [user_id]
    );
    res.status(200).json({
      message: "User deleted successfully ",
      response: response.rows[0],
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
