
const errorHandlerService = require('../services/error-handler.service');

async function admin_login(req, res) {
    try {
        let email = req.body.email.toLowerCase();
        let password = req.body.password;
        let role = req.body.role;
        console.log('Login call body', email, password, role);
        res.status(200).send();
    }catch (error) {
        let [statusCode, message] = errorHandlerService.hanldeError(error);
        return res.status(401).send({message: message});
    }
}

function admin_logout(req, res) {
    res.status(200).send();
}

module.exports = {
    admin_login,
    admin_logout,
};