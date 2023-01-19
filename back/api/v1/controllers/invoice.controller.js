
const errorHandlerService = require('../services/error-handler.service');
const fs = require('fs');
const path = require('path');
const { uploadFileS3, listAllFilesS3 } = require('../services/s3-storage.service');
const { getAllItemsDB, updateItemDB } = require('../services/dynamo-db.service');
const { asyncForEach } = require('../utils/javascript.util');

async function getAllInvoices(req, res) {
    try {
        let invoices = await getAllItemsDB('finance_invoices')
        res.status(200).send(invoices);

    }catch (error) {
        let [statusCode, message] = errorHandlerService.hanldeError(error);
        return res.status(statusCode).send({message: message});
    }
}

async function editInvoice(req, res) {
    try {
        console.log(JSON.parse(req.body.item))
        let item = JSON.parse(req.body.item);
        let response = await updateItemDB('finance_invoices', item);

        res.status(200).send();
    }catch (error) {
        let [statusCode, message] = errorHandlerService.hanldeError(error);
        return res.status(statusCode).send({message: message});
    }
}

function base64MimeType(encoded) {
    var result = null;
    if (typeof encoded !== 'string') {return result;}
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {result = mime[1];}
    return result;
  }

async function uploadFilesInvoices(req, res) {
    try {
        let files = JSON.parse(req.body.files);
        if (files && files.length && files.length > 0)
            await asyncForEach(files, async (f) => {
                f.contentType = base64MimeType(f.base64);
                f.base64 = f.base64.replaceAll(" ", "+");
                f.buffer = new Buffer.from(f.base64.replace(/^data:.+;base64,/, ""), 'base64')
                await uploadFileS3(f, 'invoices_original');
            });
        console.log('Uploaded to S3 ', files.length, ' files')
        res.status(200).send();
    }catch (error) {
        let [statusCode, message] = errorHandlerService.hanldeError(error);
        return res.status(statusCode).send({message: message});
    }
}


module.exports = {
    getAllInvoices,
    editInvoice,
    uploadFilesInvoices,
};