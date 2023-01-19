const { AWSService } = require('./cognito-auth.service');
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

var ddb;

function init() {
    ddb = new AWSService.DynamoDB({apiVersion: '2012-08-10'});
}

function updateItemDB(table, item) {
    return new Promise(async (resolve, reject) => {
        init();
        const params = {
            TableName: table,
            Item: marshall(item)
        }
        ddb.putItem(params, function(err, data) {
            if (err) { reject(err); }
            else {resolve(data) }
        });
    });
}

function deleteItemDB(table, key) {
    return new Promise(async (resolve, reject) => {
        init();
        const params = {
            TableName: table,
            Key: key
        }
        ddb.deleteItem(params, function(err, data) {
            if (err) { reject(err); }
            else {resolve(data) }
        });
    });
}

function getAllItemsDB(table) {
    return new Promise(async (resolve, reject) => {
        init();
        var params = {
            // ExpressionAttributeValues: {
            //   ':document': {S: 'invoice'},
            // },
            // KeyConditionExpression: 'document = :document',
            // ProjectionExpression: 'Episode, Title, Subtitle',
            // FilterExpression: 'contains (Subtitle, :topic)',
            TableName: table
        };
        ddb.scan(params, function (err, data) {
            console.log(err, data.Items)
            let items = [];
            data.Items.forEach(i => {
                items.push(unmarshall(i));
            });
            if (err) { reject(err); }
            else { resolve(items); }
        });
    });
}


module.exports = {
    updateItemDB,
    deleteItemDB,
    getAllItemsDB,
}
