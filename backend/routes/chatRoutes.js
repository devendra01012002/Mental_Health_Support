const express = require('express');
const router = express.Router();



router.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  // Implement your chatbot logic here
  let botResponse = "I am a bot. You said: " + userMessage;
  res.json({ response: botResponse });
});

module.exports = router;