const Assurance = require('../models/AssuranceModel');
const Memory = require('../database/Memory');

module.exports = {

    async createAssurance(req, res, next) {
        const smallName = req.body.smallName.split(':')[0];
        const name = req.body.smallName.split(':')[1];
        req.body.smallName = smallName;
        req.body.name = name;
        req.body.logo = smallName + "_logo.png";
        const assurance = new Assurance(req.body);
        try {
            const newAssurance = await assurance.save();
            let assurances = await Assurance.find({});
            assurances = assurances.sort((a, b) => {
                const fullname1 = a.name;
                const fullname2 = b.name;
                return fullname1.localeCompare(fullname2);
            })
            let allAssurance = Memory.assurances;
            res.redirect('/');
            res.render('index', { title: "FEGASA - Constat à l'amiable", assurances, allAssurance });
        } catch (err) {
            console.log(err);
            res.send(500);
        }
    },

    async getAllAssurance(req, res, next) {
        try {
            const assurances = await Assurance.find({});
            res.send(assurances);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    async getAssurancesInMemory(req, res, next) {
        try {
            const assurances = Memory.assurances;
            res.send({ assurances });
        } catch (err) {
            res.sendStatus(500);
        }

    },

    async updateAssurance(req, res, next) {
        if (!req.params.id) {
            res.sendStatus(403);
            return;
        }
        const id = req.params.id
        try {
            const assurance = await Assurance.findOneAndUpdate({ _id: id }, req.body);
            let assurances = await Assurance.find({});
            assurances = assurances.sort((a, b) => {
                const fullname1 = a.name;
                const fullname2 = b.name;
                return fullname1.localeCompare(fullname2);
            })
            let allAssurance = Memory.assurances;
            res.render('index', { title: "FEGASA - Constat à l'amiable", assurances, allAssurance });
            res.redirect('/')
        }catch(err){
            res.sendStatus(500);
        }
    }
}
