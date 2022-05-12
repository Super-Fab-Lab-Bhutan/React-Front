import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
  },
});
module.exports =
  mongoose.models.program || mongoose.model("program", ProgramSchema);
