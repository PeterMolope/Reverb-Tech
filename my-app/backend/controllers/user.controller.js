import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // find all users
    res.json({ users });
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.Id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const refreshToken = req.cookies.refreshToken;
    // if (refreshToken) {
    //   const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    //   await redis.del(`refresh_token:${decode.userId}`);
    //   res.clearCookie("accessToken");
    //   res.clearCookie("refreshToken");
    //   res.json({ message: "User Logged out" });
    // }

    await User.findByIdAndDelete(req.params.Id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
