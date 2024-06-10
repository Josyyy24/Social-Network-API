const connection = require('./config/connection');
const { User, Thought } = require('./models');
const mongoose = require('mongoose');

const seedUsers = async () => {
    await mongoose.connection.dropDatabase();
    
    const thoughts = [
        {
            thoughtText: `I have a thought`,
            username: `user1`,
        },
        {
            thoughtText: `I have another thought`,
            username: `user2`,  
        },  
        {
            thoughtText: `I have the best thought`,
            username: `user3`,
        },
    ]

    const createdThoughts = await Thought.insertMany(thoughts);

    const users = [
        {
            username: `user1`,
            email: `user1@example.com`,
            thoughts: [createdThoughts[0]._id],
            friends:[],
        },
        {
            username: `user2`,
            email: `user2@example.com`,
            thoughts: [createdThoughts[1]._id],
            friends:[],
        },
        {
            username: `user3`,
            email: `user3@example.com`,
            thoughts: [createdThoughts[2]._id],
            friends:[],
        },
    ];

    try {
        await User.insertMany(users);
        console.log(`Users seeded in database`);
    } catch (err) {
        console.error(`error seeding users:`, err);
    } finally {
        mongoose.connection.close();
    };  

seedUsers();
