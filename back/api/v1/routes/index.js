
module.exports = function (app, passport) {
  require('./authentication.routes')(app, passport);
  require('./invoice.routes')(app, passport);
};