import User from "../models/user.model.js";
import z from "zod";

function getRandomTeam() {
  const teams = ["MI", "CSK", "RCB", "GT", "RR", "KKR", "DC", "PBKS", "SRH"];
  const randomIndex = Math.floor(Math.random() * teams.length);
  return teams[randomIndex];
}

const RegisterUser = async (req, res) => {
  try {
    const { fullname, username, email, password, city } = req.body;

    // Validate input using Zod schema
    const schema = z.object({
      fullname: z.string().min(1, "Fullname is required"),
      username: z.string().min(1, "Username is required"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      city: z.string().min(1, "City is required"),
    });

    // Parse and validate request body
    schema.parse({ fullname, username, email, password, city });

    // Check if the user already exists
    const doesUserExist = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (doesUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const user = await User.create({
      fullname,
      username,
      email,
      password,
      city,
      team: getRandomTeam(),
    });

    const isUserCreated = await User.findById(user._id).select("-password");

    if (!isUserCreated) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res
      .status(200)
      .json({ message: "User created successfully", user: isUserCreated });
  } catch (error) {
    // validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const generateAccesstoken = async (userId) => {
  try {
    const existedUser = await User.findById(userId);
    const accessToken = existedUser.generateAccessToken();

    await existedUser.save({ validateBeforeSave: false });

    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input using Zod schema
    const schema = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    // Parse and validate request body
    schema.parse({ email, password });

    // Check if the user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    if (!user.isPasswordCorrect(password)) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate a new access token
    const accessToken = await generateAccesstoken(user._id);
    const userLogin={
      username:user.username,
      fullname:user.fullname,
      email:user.email,
      team:user.team,
      accessToken:user.AcessToken
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Ensure this is true only in production
      sameSite: "strict", // Prevents CSRF
    })
    .json({
      message: "Login Successful",
      data: { user: userLogin },
    });
  
  } catch (error) {
    // Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation Error",
        errors: error.errors,
      });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const GetUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json("user", user);
};


const updateTeam = async (req, res) => {
  try {
    const { team } = req.params;

    // Validate that `team` is a string
    z.string().parse(team);

    // Update the user's team
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Assumes user ID is available in `req.user` (from middleware)
      { team },
      { new: true } // Ensures the returned user is the updated version
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ team: updatedUser.team });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updateTeam;


export { RegisterUser, UserLogin, GetUser, updateTeam };
