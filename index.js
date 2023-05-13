const path = require('path');

const express           = require("express");
const app               = express();
const fs                = require('fs');

const bodyParser        = require('body-parser');
const jsonParser        = bodyParser.json();

const firestore         = require('./myModules/DHT11Firebase-master/dht11firebase.js').Firestore;
const serviceAccount    = require("./myModules/key/serviceAccountKey.json");
const myFirestore       = new firestore(serviceAccount);

const port      = process.env.PORT || 3000;

let nowDHT11Data = {
    Name:  "DHT11NowData",
    Year:   2021,
    Month:    10,
    Day:      18,
    Hour:     12,
    Min:       0,
    Temp:     28,
    Hun:      50
};

appGetByFile("/",               "/login/index.html",  "html"      );
appGetByFile("/login/style",    "/login/style.css",   "css"       );
appGetByFile("/login/main",     "/login/main.js",     "javascript");

appGetByFile("/home",           "/home/index.html",   "html"      );
appGetByFile("/home/style",     "/home/style.css",    "css"       );
appGetByFile("/home/main",      "/home/main.js",      "javascript");
appGetByFile("/home/main1",     "/home/main1.js",     "javascript");
appGetByFile("/home/main2",     "/home/main2.js",     "javascript");
appGetByFile("/home/main3",     "/home/main3.js",     "javascript");

function appGetByFile(getPath, filePath, headType) {
    app.get(getPath, (req, res) => {
        const pblicDirectory = path.join(process.cwd(), 'public');

        const data      = fs.readFileSync(pblicDirectory + filePath, "utf8");
        const bufferLen = Buffer.byteLength(data, 'utf8');

        let myHead      = {
                            "Content-Type": `text/${headType}; charset=UTF-8`,
                            "Content-Length": bufferLen
                        };
    
        res.writeHead(200, myHead);
        res.write    (data);
        res.end      ();
    });
}

app.post('/data/checkIdPasswd', jsonParser, async (req, res) => {
    console.log("POST[Check Id Passwd]:");
    console.log(req.body);

    res.writeHead(200, {"Content-Type": "text/json"});

    await myFirestore.checkIdPasswd(req.body)
        .then(success => {
            console.log("send:");
            console.log(success);
            res.write(JSON.stringify(success));
            res.end();
        })
        .catch(fail => {
            console.log("Error:");
            console.log(fail);
            res.end();
        });
});

app.post("/data/setDHT11Data", jsonParser, (req, res) => {
    console.log("POST[Set DHT11 Data]:");
    console.log(req.body);

    res.writeHead(200, {"Content-Type": "text/json"});

    myFirestore.setDHT11Data(req.body)
    .then(success => {
        nowDHT11Data = req.body;
        console.log("Send:");
        console.log(success);
        res.write(JSON.stringify(success));
        res.end();
    })
    .catch(fail => {
        console.log("Error:");
        console.log(fail);
        res.end();
    });
});

app.post('/data/getDHT11Data', jsonParser, async (req, res) => {
    console.log("POST[Get DHT11 Data]:");
    console.log(req.body);

    res.writeHead(200, {"Content-Type": "text/json"});

    await myFirestore.getDHT11Data(req.body)
        .then(success => {
            console.log("Send:");
            console.log(success);
            res.write(JSON.stringify(success));
            res.end();
        })
        .catch(fail => {
            console.log("Error:");
            console.log(fail);
            res.end();
        });
});

app.post('/data/getNowDHT11Data', jsonParser, async(req, res) => {
    console.log("POST[Get Now DHT11 Data]:");
    console.log(req.body);
    res.writeHead(200, {"Content-Type": "text/json"});
    res.write(JSON.stringify(nowDHT11Data));
    res.end();
});

app.listen(port);
