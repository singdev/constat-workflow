const ip = require('ip');

const PORT = process.env.PORT || '2471';
const ADDR = process.env.DOMAIN || ip.address() + ':' + PORT;

module.exports = {
    root: {
        username: "root",
        passowrd: "fervexaromadeparis2020"
    },

    assurances: [
        {
            name: "Pas de police d'assurance",
            smallName: "none",
            logo: "ca_logo.png",
            logoUrl: `http://${ADDR}/images/logo-assurances/ca_logo.png`,
        },
        {
            name: "Axa",
            smallName: "axa",
            logo: "axa_logo.png",
            logoUrl: `http://${ADDR}/images/logo-assurances/axa_logo.png`
        },
        {
            name: "Ogar",
            smallName: "ogar",
            logo: "ogar_logo.jpg",
            logoUrl: `http://${ADDR}/images/logo-assurances/ogar_logo.jpg`
        },
        {
            name: "Nsia",
            smallName: "nsia",
            logo: "nsia_logo.png",
            logoUrl: `http://${ADDR}/images/logo-assurances/nsia_logo.png`
        },
        {
            name: "Saham assurance",
            smallName: "saham",
            logo: "saham_logo.png",
            logoUrl: `http://${ADDR}/images/logo-assurances/saham_logo.png`
        },
    ]
}