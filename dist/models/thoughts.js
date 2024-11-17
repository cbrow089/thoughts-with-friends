import mongoose, { Schema, model } from 'mongoose';
// Create the Reaction schema
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Ensure virtuals are included in JSON output
ThoughtSchema.set('toJSON', { virtuals: true });
ThoughtSchema.set('toObject', { virtuals: true });
const Thought = model('Thought', ThoughtSchema);
Thought.create({
    thoughtText: 'test thought',
    createdAt: new Date(),
    username: 'testuser',
    reactions: [
        {
            reactionId: new mongoose.Types.ObjectId(),
            reactionBody: 'test reaction',
            username: 'testuser',
            createdAt: new Date()
        }
    ]
});
export default Thought;
