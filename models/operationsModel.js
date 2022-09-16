import mongoose from "mongoose";

const operationsSchema = mongoose.Schema({
  concept: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  type: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersBudget",
  },
});

const Operations = mongoose.model("operations", operationsSchema);

export default Operations;
