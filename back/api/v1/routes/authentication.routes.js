module.exports = function (app) {
  const login = require('../controllers/authentication.controller');
  const config = require('../../../config');

  app.route(config.base_enpoint+'/login')
    .post(login.admin_login);
  
  app.route(config.base_enpoint+'/logout')
    .post(login.admin_logout);
};