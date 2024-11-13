import { Schema, model } from 'mongoose';
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
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
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
    reactions: []
});
export default Thought;
