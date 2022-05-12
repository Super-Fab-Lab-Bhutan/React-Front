import mongoose from "mongoose";

const localDB = `mongodb://localhost:27017/role_auth`;

const connectDB = async () => {
  await mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // console.log("Database Connected!");
};

module.exports = connectDB;
