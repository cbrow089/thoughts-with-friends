import { User, Thought } from '../models/index.js';
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const addThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        res.json(thought);
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
