import User from "../models/user.models.js";

export const getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
