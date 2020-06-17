const Constat = require('../models/ConstatModel');
const Assurance = require('../models/AssuranceModel');
const nodemailer = require('nodemailer');
const axios = require('axios');
const ip = require('ip');

const PORT = process.env.PORT || 2471;
const Address = process.env.REGISTRY_HOST || ip.address() + ":" + PORT;
const Domain = process.env.DOMAIN || Address;

async function sendEmail(email, content) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "nho.notification@gmail.com",
            pass: "ABClotus"
        }
    });

    let info = await transporter.sendMail({
        from: 'nho.notification@gmail.com',
        to: email,
        subject: "Nouveau Constat à l'amiable GA",
        html: content
    });

    transporter.sendMail(info, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {

    async registerConstatAndNotify(req, res, next) {
        const assurance = await Assurance.findOne({ smallName: req.body.assurance });
        if (assurance && assurance.isActive) {
	    const constat = new Constat(req.body);
            const newConstat = await constat.save();
            const constatUrl = `https://${Domain}/constats/${req.token}`;
            //Envoyer par email
            const email = assurance.email;
            const content = `
                <html>
                <p>
                    Un de vos assuré vient de transmettre un constat à l'amiable via notre système. <br>
                    Vous pouvez accéder à toutes les informations consernant le sinistre en cliquant sur le lien ci-dessous.
                </p>
                <br>
                <br>
                <a href="${constatUrl}">Cliquez sur ce lien pour accéder au constat</a>
                </html>
            `;
            console.log(email);
            await sendEmail(email, content);
            res.send(constatUrl);
        } else {
            res.sendStatus(404);
        }
    },

    async getConstatState(req, res, next) {
        const constat = await Constat.findOne({ numero: req.params.numero });
        console.log(constat);
	if (constat) {
            res.send(constat.isRead);
        } else {
            res.sendStatus(404);
        }
    },

    async getConstatPage(req, res, next) {
        const numero = req.auth.credentials.numero;
        //Changer l'etat du constat
        try {
            const constat = await Constat.findOne({ numero });
            console.log(constat);
	    constat.isRead = true;
            const res = await constat.save();
        } catch (err) {
            console.log(err);
        }
        //render de quelque chose qui prend en paramètre un constat
        const response = await axios.get(`http://${Address}/registry/${numero}`);
        if (response.status == 200) {
            res.render('constat', { data: response.data, assurance: req.auth.credentials.assurance, registryHost: Address });
        } else {
            res.render('constat', { error: true, });
        }
    },
}

