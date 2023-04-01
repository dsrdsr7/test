
const express = require("express");
const app = express();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: 'dogwood-garden-382315',
    keyFilename: 'C:\\Users\\User\\Desktop\\кладовка)\\dogwood-garden-382315-f58b3243e2e9.json'
});

const bucketName = 'nure_bucket';
const bucket = storage.bucket(bucketName);

const fileName = '1_image.jpg';
const file = bucket.file(fileName);

const config = {
    action: 'read',
    expires: Date.now() + 60 * 1000 // дата истечения ссылки
};

/*const sql = require('mssql');

const config = {
    user: "dsrdsr7",
    password: "NAMS9kUgcwgQS@S",
    server: "nure-mykolchuk.database.windows.net",
    database: "Internet_cloth_shop",
    options: {
        encrypt: true,
        trustServerCertificate: false
    },
};*/

app.get("/", function(request, response){
    //const pool = new sql.ConnectionPool(config);
    file.getSignedUrl(config, function (err, url) {
        if (err) {
            console.error(err);
            return;
        }
        response.send(`<img src="${url}" />`); // передача ссылки в тег img
    });
});

app.listen(3000);




