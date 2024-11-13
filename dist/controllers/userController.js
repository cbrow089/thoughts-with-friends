import { User, Thought } from '../models/index.js';
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const addFriend = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        res.json({ message: 'Friend added successfully' });
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const addThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        res.json({ thought, user });
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const removeThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getAllUsers = async (_, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getAllThoughts = async (_, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getReactionById = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        const reaction = thought?.reactions.find((reaction) => reaction.reactionId === req.params.reactionId);
        res.json(reaction);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getAllReactions = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought?.reactions);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const updateReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId, 'reactions.reactionId': req.params.reactionId }, { $set: { 'reactions.$': req.body } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getAllFriends = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const friends = await User.find({ _id: { $in: user?.friends } });
        res.json(friends);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getFriendById = async (req, res) => {
    try {
        const friend = await User.findOne({ _id: req.params.friendId });
        res.json(friend);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getAllThoughtsByUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const thoughts = await Thought.find({ _id: { $in: user?.thoughts } });
        res.json(thoughts);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getThoughtByUser = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
