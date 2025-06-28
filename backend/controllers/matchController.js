import User from '../models/User.js';

export const getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) return res.status(404).json({ message: 'User not found' });

    const matches = await User.find({
      _id: { $ne: currentUser._id },
      teachSkills: { $in: currentUser.learnSkills },
      learnSkills: { $in: currentUser.teachSkills }
    });

    res.status(200).json({ matches });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
