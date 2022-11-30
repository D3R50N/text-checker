require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { log } = require("console");
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 1234;

const crypto = require('crypto');
var views = 0;
var now = new Date();
var update_date = now.getDate() + "/" + now.getMonth()+"/"+now.getFullYear()+" at "+now.getHours()+":"+now.getMinutes();
// log(crypto.randomUUID())
fs.readFile('db/update_date.txt', 'utf8', function (err, data) {
    if (err) {
        fs.writeFileSync('db/update_date.txt', update_date);
    }
    else {
        update_date = data; 
        // fs.writeFileSync('db/update_date.txt', update_date.toString());
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    log(`Live on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    fs.readFile('db/views.txt', 'utf8', function (err, data) {
        if (err) {
            views = 1;
        }
        else {
            views = parseInt(data);
            views++;
        }
        fs.writeFileSync('db/views.txt', views.toString());
        return res.render("index", { oldText: jwt.decode(req.cookies.oldText) || "", newText: jwt.decode(req.cookies.newText) || "", views, update_date });

    });

});

app.post("/", (req, res) => {
    res.redirect("back");

    let oldText = req.body.oldTextValue;
    let newText = req.body.newTextValue;
try{
        res.cookie("oldText", jwt.sign(oldText, process.env.TOKEN));
    res.cookie("newText", jwt.sign(newText, process.env.TOKEN));
}
catch (e) {
    log(e)
}

    res.redirect("back");
})


