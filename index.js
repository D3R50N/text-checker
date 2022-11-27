const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { log } = require("console");
const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    log(`Live on http://localhost:${PORT}`);
}); 

app.get("/", (req, res) => {
    res.render("index", { oldText: req.cookies.oldText|| "", newText:req.cookies.newText|| "" });

    
});
    
app.post("/", (req, res)=>{
    let oldText = req.body.oldTextValue;
    let newText = req.body.newTextValue;
    res.cookie("oldText", oldText);
    res.cookie("newText", newText);

    res.redirect("back");
})


