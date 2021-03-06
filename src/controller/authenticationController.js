const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Memory = require('../database/Memory');
const Assurance = require('../models/AssuranceModel');
const User = require('../models/UserModel');


const JWT_SECRET = "12345678910ConstatAmiable2020";

module.exports = {
    async rootAuthentication(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        if (username == Memory.root.username &&
            password == Memory.root.passowrd) {
            const accessToken = await jwt.sign({ user: Memory.root }, JWT_SECRET);
            res.send(accessToken);
        } else {
            res.sendStatus(403);
        }
    },

    async authenticate(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username: username });
        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const accessToken = await jwt.sign({ uid: user._id }, JWT_SECRET);
                res.cookie("auth", accessToken);
                let assurances = await Assurance.find({});
                assurances = assurances.sort((a, b) => {
                  const fullname1 = a.name;
                  const fullname2 = b.name;
                  return fullname1.localeCompare(fullname2);
                })
                let allAssurance = Memory.assurances;
                res.redirect('/');
                res.render('index', { title: "FEGASA - Constat à l'amiable", assurances, allAssurance });
            } else {
                res.status(403)
                res.redirect('/');
                let assurances = await Assurance.find({});
                assurances = assurances.sort((a, b) => {
                  const fullname1 = a.name;
                  const fullname2 = b.name;
                  return fullname1.localeCompare(fullname2);
                })
                res.render('index', { title: "FEGASA - Constat à l'amiable", assurances });
            }
        } else {
            res.sendStatus(403);
        }
    },

    async verifyAccessToken(request, response, next) {

        const accessToken = request.cookies.auth;
        try {
            console.log(accessToken);
            const decoded = await jwt.verify(accessToken, JWT_SECRET)

            request.auth = {
                credentials: decoded.uid,
                artifact: { accessToken }
            }
            next()
        } catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    },

    async verifyAccessTokenForRoot(request, response, next) {
        const header = request.headers['authorization'];

        if(!header || !header.includes('Bearer ')){
            response.sendStatus(401);
            return;
        }

        const accessToken = header.split(' ')[1];
        try {
            console.log(accessToken);
            const decoded = await jwt.verify(accessToken, JWT_SECRET)

            request.auth = {
                credentials: decoded.uid,
                artifact: { accessToken }
            }
            next()
        } catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}