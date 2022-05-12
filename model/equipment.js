import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  equipmentName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startup: {
    type: Boolean,
  },
  communtiy: {
    type: Boolean,
  },
  student: {
    type: Boolean,
  },
  company: {
    type: Boolean,
  },
  timeCreated: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports =
  mongoose.models.equipment || mongoose.model("equipment", equipmentSchema);
