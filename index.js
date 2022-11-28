require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 5000;

const crypto = require('crypto');
var views = 0;
// log(crypto.randomUUID())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    log(`Live on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    views++;
    res.render("index", { oldText: jwt.decode(req.cookies.oldText) || "", newText: jwt.decode(req.cookies.newText) || "", views });

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


