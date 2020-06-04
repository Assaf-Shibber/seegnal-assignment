const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
var cors = require("cors");
const app = express();

let port = process.env.PORT || 4000;
app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const GetMainIngredients = async (reaction) => {
    // let newData = []
    const response = await fetch(`https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt.exact:${reaction}&count=patient.drug.medicinalproduct`)
    const data = await response.json();
    return data.results.sort((a, b) => b["count"] - a["count"]).splice(0, 10)
}

app.post("/newData", async(req, res) => {
    const {
        keyWord
    } = req.body
    const dataToSend = await GetMainIngredients(keyWord)
    res.send(dataToSend)

});

app.listen(port, function () {
    console.log("server ur on", port);
});