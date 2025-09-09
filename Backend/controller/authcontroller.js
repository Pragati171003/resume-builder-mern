const bcrypt = require("bcryptjs");      // bcrypt package
const jwt = require("jsonwebtoken");     // jwt package
const User = require("../model/user");   // correct model path


const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, mobile } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ firstName, lastName, email, password: hashedPassword, dob, mobile });
    await newUser.save();

    res.json({ message: "✅ Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "✅ Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
