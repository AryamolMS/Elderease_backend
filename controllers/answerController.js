import mongoose from "mongoose";
import Answer from "../Model/answerSchema.js";

export const submitAnswers = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging log

    const { username, answers } = req.body;
    
    if (!username || !answers || answers.length === 0) {
      console.error("Validation error: Missing username or answers");
      return res.status(400).json({ message: "Username and answers are required." });
    }

    // Validate and convert questionId to ObjectId
    const formattedAnswers = answers.map(answer => {
      if (!mongoose.Types.ObjectId.isValid(answer.questionId)) {
        throw new Error(`Invalid questionId: ${answer.questionId}`);
      }
      return {
        questionId: new mongoose.Types.ObjectId(answer.questionId), // Convert to ObjectId
        selectedOption: answer.selectedOption
      };
    });

    const newAnswer = new Answer({ username, answers: formattedAnswers });

    await newAnswer.save();
    console.log("Answers saved successfully");

    res.status(201).json({ message: "Answers submitted successfully." });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSubmittedAnswers = async (req, res) => {
    try {
      const answers = await Answer.find().populate("answers.questionId", "question");
  
      console.log("Fetched answers from DB:", answers); // Debugging log
  
      if (!answers || answers.length === 0) {
        return res.status(404).json({ message: "No answers found." });
      }
  
      res.status(200).json(answers);
    } catch (error) {
      console.error("Error fetching submitted answers:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

  export const getCorrectAnswers = async (req, res) => {
    try {
      const questions = await Question.find({}, "_id correctAnswer"); // Fetch correct answers
      const correctAnswers = {};
      questions.forEach((q) => {
        correctAnswers[q._id] = q.correctAnswer;
      });
  
      res.status(200).json(correctAnswers);
    } catch (error) {
      console.error("Error fetching correct answers:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };