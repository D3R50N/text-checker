const express = require("express");
const bodyParser = require("body-parser");
const { log } = require("console");
const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
    log(`Live on http://localhost:${PORT}`);
}); 

app.get("/", renderHome);

function renderHome(req, res) {
    res.render("index");
}