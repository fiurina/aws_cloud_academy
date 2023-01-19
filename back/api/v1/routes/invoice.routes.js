module.exports = function (app) {
  const invoice = require('../controllers/invoice.controller');
  const config = require('../../../config');

  app.route(config.base_enpoint+'/invoices')
  .get(invoice.getAllInvoices);
  
  app.route(config.base_enpoint + '/invoices/upload')
    .post(invoice.uploadFilesInvoices)
  
  app.route(config.base_enpoint+'/invoice')
    .post(invoice.editInvoice)
};