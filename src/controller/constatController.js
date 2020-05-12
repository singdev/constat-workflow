const Constat = require('../models/ConstatModel');
const Assurance = require('../models/AssuranceModel');
const nodemailer = require('nodemailer');
const axios = require('axios');
const ip = require('ip');

const Address = ip.address();

async function main(email, content) {
    
    let transporter = nodemailer.createTransport({
        host: 'SMTP.office365.com',
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
            user: "orpheenve@hotmail.com", 
            pass: "2jptard#O" 
        }
    });

    let info = await transporter.sendMail({
        from: 'orpheenve@hotmail.com', 
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
        const assurance = await Assurance.findOne({ smallName: req.body.assurance});
        if(assurance && assurance.isActive){
            const constat = new Constat(req.body);
            const newConstat = await constat.save();
            const constatUrl = `http://${Address}:2471/constats/${req.token}`;
            //Envoyer par email
            const email = assurance.email;
            const content = `
                <html>
                <p>
                    Un de vos assuré vient de transmettre un constat à l'amiable via notre système. <br>
                    Vous pouvez accéder à toute les informations consernant le sinistre en cliquant sur le lien ci-dessous.
                </p>
                <br>
                <br>
                <a href="${constatUrl}">Cliquez sur ce lien pour accéder au constat</a>
                </html>
            `;
            console.log(email);
            await main(email, content);
            res.send(constatUrl);
        }
    },

    async getConstatState(req, res, next) {
        const constat = await Constat.findOne({numero: req.params.numero});
        if(constat){
		res.send(constat.isRead);
	} else {
		res.sendStatus(404);
	}
    },

    async getConstatPage(req, res, next) {
        //render de quelque chose qui prend en paramètre un constat
        const numero = req.auth.credentials.numero;
        const response = await axios.get(`http://${Address}:2469/registry/${numero}`);
        if(response.status == 200){
            res.render('constat', { data: response.data, assurance: req.auth.credentials.assurance } );
        } else {
            res.render('constat', { error: true, });
        }
    },
}
