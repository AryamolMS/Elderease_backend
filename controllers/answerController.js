import mongoose from "mongoose";
import Answer from "../Model/answerSchema.js";
import Question from "../Model/questionSchema.js";


export const submitAnswers = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging log

    const { username, answers } = req.body;

    if (!username || !answers || answers.length === 0) {
      console.error("Validation error: Missing username or answers");
      return res.status(400).json({ message: "Username and answers are required." });
    }

    let score = 0; // Initialize score

    // Validate and convert questionId to ObjectId
    const formattedAnswers = await Promise.all(
      answers.map(async (answer) => {
        if (!mongoose.Types.ObjectId.isValid(answer.questionId)) {
          throw new Error(`Invalid questionId: ${answer.questionId}`);
        }
        
        const question = await Question.findById(answer.questionId);
        if (!question) {
          throw new Error(`Question not found for ID: ${answer.questionId}`);
        }

        // Check if selected answer is correct
        if (question.correctAnswer === answer.selectedOption) {
          score += 1; // Increase score for correct answers
        }

        return {
          questionId: new mongoose.Types.ObjectId(answer.questionId),
          selectedOption: answer.selectedOption,
        };
      })
    );

    // Save user's answers in the database
    const newAnswer = new Answer({ username, answers: formattedAnswers });
    await newAnswer.save();
    console.log("Answers saved successfully");

    // Return the score to the frontend
    res.status(201).json({ message: "Answers submitted successfully.", score });

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