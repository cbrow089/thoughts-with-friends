import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';

const seedDatabase = async () => {
    await db();
    console.log('Database connected.');

   const userData = [
        {
            username: 'john_doe',
            email: 'john.doe@example.com',
            thoughts: [], // Add ObjectId references if you have thoughts
            friends: []   // Add ObjectId references if you have friends
        },
        {
            username: 'jane_smith',
            email: 'jane.smith@example.com',
            thoughts: [], // Add ObjectId references if you have thoughts
            friends: []   // Add ObjectId references if you have friends
        },
        {
            username: 'alice_jones',
            email: 'alice.jones@example.com',
            thoughts: [], // Add ObjectId references if you have thoughts
            friends: []   // Add ObjectId references if you have friends
        },
        {
            username: 'bob_brown',
            email: 'bob.brown@example.com',
            thoughts: [], // Add ObjectId references if you have thoughts
            friends: []   // Add ObjectId references if you have friends
        }
    ];


    await User.deleteMany({});
    await Thought.deleteMany({});
    await User.create(userData);
    console.log('Users seeded.');
}

seedDatabase();