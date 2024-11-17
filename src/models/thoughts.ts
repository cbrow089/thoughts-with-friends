import mongoose, { Schema, model, Document } from 'mongoose';


// Define the Reaction interface
interface IReaction extends Document {
    reactionId: mongoose.Types.ObjectId; // The ID of the reaction
    reactionBody: string; // The content of the reaction
    username: string; // The user who made the reaction
    createdAt: Date; // The date the reaction was created
}

// Create the Reaction schema
const ReactionSchema = new Schema<IReaction>({
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

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
}

const ThoughtSchema = new Schema<IThought>({
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

ThoughtSchema.virtual('reactionCount').get(function(this: IThought) {
    return this.reactions.length;
});

// Ensure virtuals are included in JSON output
ThoughtSchema.set('toJSON', { virtuals: true });
ThoughtSchema.set('toObject', { virtuals: true });

const Thought = model<IThought>('Thought', ThoughtSchema);

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