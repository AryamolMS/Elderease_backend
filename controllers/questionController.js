import Question from "../Model/questionSchema.js";

// Add a new question
export const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    if (!question || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuestion = new Question({ question, options, correctAnswer });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get 5 random questions for daily quiz
export const getDailyQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
