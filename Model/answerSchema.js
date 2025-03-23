import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedOption: { type: String, required: true }
    }
  ],
  submittedAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;
