const jwt = require('jsonwebtoken');

const JWT_SECRET = "12345678910ConstatAmiable2020";

module.exports = {

    async generateToken(req, res, next) {
        const numero = req.body.numero;
        const assurance = req.body.assurance;
        const accessToken = await jwt.sign({ numero, assurance }, JWT_SECRET);
        req.token = accessToken;
        next();
    },

    async verifyAccessToken(request, response, next) {
        const accessToken = request.params.token;
        try {
            const decoded = await jwt.verify(accessToken, JWT_SECRET)
            console.log(decoded);
            request.auth = {
                credentials: decoded,
                artifact: { accessToken }
            }
            next()
        } catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    },
}