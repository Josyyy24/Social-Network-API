const { ObjectId } = require(`mongoose`).Types;
const { default: mongoose } = require("mongoose");
const { User, Thought } = require(`../models`);
const { create } = require("domain");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const userId = req.params.userId;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: `Invalid user id!` });
            }
            const user = await User.findOne({ _id: userId })
            .select(`-__v`)
            .populate(`friends`)
            .populate(`thoughts`);

            if (!user) {
                res.status(404).json({ message: `No user found with this id!` });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: `No user found with this id!` });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: `No user found with this id!` });
            }
            res.json({ message: `User deleted!` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};