const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

module.exports = {

    async createUser(req, res, next) {
        const hash = await bcrypt.hash(req.body.password, 10);
        if (hash != null) {
            req.body.password = hash;
            const user = new User(req.body);
            try {
                const newUser = await user.save();
                res.send(newUser);
            } catch (err) {
                res.send(500);
            }
        } else {
            res.sendStatus(500);
        }
    },

    async updateUser(req, res, next) {
        req.body.password = undefined;
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(501);
            }
        } catch(err){
            res.sendStatus(501);
        }
    },

    async getUser(req, res, next) {
        const users = await User.find({ _id: req.params.id });
        if (users) {
            res.send(users);
        } else {
            res.send(500);
        }
    }
}