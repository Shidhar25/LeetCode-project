const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

require("dotenv").config(); // Load environment variables
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Question Schema and Model
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testCases: {
    type: [String],
    default: []
  }
});

const Question = mongoose.model('Question', questionSchema);

// Create Account Route
app.post("/create-account", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sign-In Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    res.status(200).json({ message: "Sign-in successful!", username: user.username });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const { title, description, testCases } = req.body;
    
    // Add validation
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const question = new Question({
      title,
      description,
      testCases: testCases || []
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.warn('Error adding question:', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




// app.get("/submissions", function(req, res) {
//    // return the users submissions for this problem
//   res.send("Hello World from route 4!")
// });


// app.post("/submissions", function(req, res) {
//    // let the user submit a problem, randomly accept or reject the solution
//    // Store the submission in the SUBMISSION array above
//   res.send("Hello World from route 4!")
// });

// // leaving as hard todos
// // Create a route that lets an admin add a new problem
// // ensure that only admins can do that.
