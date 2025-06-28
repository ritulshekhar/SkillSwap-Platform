import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  timezone: String,
  teachSkills: [String],
  learnSkills: [String],
});

export default mongoose.model('User', userSchema);