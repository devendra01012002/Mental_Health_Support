const express = require("express");
const router = express.Router();
const User = require("../modals/user");
const { jwtAuthMiddleware, generateToken } = require("./jwt");
const bcrypt = require("bcrypt");
const { Aggregate } = require("mongoose");

router.post("/register", async (req, res) => {
  try {
    const data = req.body; 
    const existingUser = await User.findOne({
      Email: data.Email,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "User already exists",
        });
    }

    // Create a new User document using the Mongoose model
    const newpassword = await bcrypt.hash(data.Password, 10);

    // Create a new User document using the Mongoose model
    const newUser = new User({
      Name: data.Name,
      Email: data.Email,
      Age : data.Age,
      Password: newpassword,
    });
  
    // Save the new user to the database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log(token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract aadharCardNumber and password from request body
    const { Email, Password } = req.body;

    // Check if aadharCardNumber or password is missing
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ Email: Email });
    // If user does not exist or password does not match, return error
    const response = await bcrypt.compare(user.Password,Password);
    const isPasswrod = await bcrypt.compare(Password, user.Password);

    if (!isPasswrod) {
      return res.status(500).json({ error: "Invalid Password" });
    }
    // generate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    req.user = token;
    res.cookie({'token':token})
    // return token as response
    res.json({ message: "User login successful!", token: token, candidate: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post('/logout', async (req, res) => {
    console.log("logout route")
     try {
      res.status(200).json({ msg: null });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})
  
router.patch("/check-auth", (req, res) => {
  // Check if the user is authenticated
  console.log("route hit");
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }

});


module.exports = router;
