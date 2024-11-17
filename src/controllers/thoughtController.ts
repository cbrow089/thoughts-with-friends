import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const getThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}


export const addThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const removeThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const removeReaction = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log(`Removing reaction with ID: ${req.params.reactionId} from thought ID: ${req.params.thoughtId}`);

        // Check if the thought exists
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            console.log('Thought not found');
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Check if the reaction exists
        const reactionExists = thought.reactions.some(reaction => reaction.reactionId.toString() === req.params.reactionId);
        if (!reactionExists) {
            console.log('Reaction not found');
            return res.status(404).json({ message: 'Reaction not found' });
        }
        // Log the current reactions
        console.log('Current Reactions:', thought.reactions);
        // Proceed to remove the reaction
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: new mongoose.Types.ObjectId(req.params.reactionId) } } },
            { new: true }
        );

        console.log('Updated Thought:', updatedThought);

        return res.json(updatedThought);
    } catch (err) {
        console.error('Error removing reaction:', err);
        return res.status(400).json(err);
    }
}
