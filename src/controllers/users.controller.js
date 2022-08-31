import User from "../models/User.js";
import brcypt from "bcryptjs";
import jwt from "../utils/jwt.js";

class UserController {
  async REGISTRATION(req, res) {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await brcypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });
      await user.save();

      res
        .status(201)
        .json({
          token: jwt.sign(user.id),
          userId: user.id,
          message: "User registered",
        });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }

  async LOGIN(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await brcypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password try again" });
      }
      res.status(200).json({ token: jwt.sign(user.id), userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
}

export default new UserController();
