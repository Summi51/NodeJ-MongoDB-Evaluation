const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  const { name, email, password } = req.body;

  const exists =
    await User.findOne({ email });

  if (exists) {
    return res.status(400).json({
      message: "Email already exists"
    });
  }

  const user = await User.create({
    name,
    email,
    password
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user =
    await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }

  const match =
    await user.comparePassword(password);

  if (!match) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  res.json({ token });
};