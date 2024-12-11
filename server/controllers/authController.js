const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT, { expiresIn: "1d" });
};

// register function
const register = async (req, res) => {
  const { username, password } = req.body;
  // first check if username and password are entered
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // check if username is already being used
    const existingUser = await prisma.user.findUnique({ where: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // generate a token and respond
    const token = generateToken(user);
    res
      .status(201)
      .json({ user: { id: user.id, username: user.username }, token });
  } catch (error) {
    console.error("Error in registering user", error);
  }
};

// login function
const login = async (req, res) => {
  const { username, password } = req.body;

  //   error handling
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // find user by username
    const user = await prisma.user.findUnique({ where: { username } });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    // error handling
    if (!user || !isCorrectPassword) {
      return res
        .status(401)
        .json({ message: "Incorrect username and/or password entered" });
    }

    // Generate a token and respond just like before
    const token = generateToken(user);
    res
      .status(201)
      .json({ user: { id: user.id, username: user.username }, token });
  } catch (error) {
    console.error("Error in logging in user", error);
  }
};

// me function to show authenticated user details
const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true },
    });

    // Error handling
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details", error);
  }
};

module.exports = { register, login, me };
