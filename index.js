const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();


dbconnect().then(res => { console.log("data base connected") }).catch(err => { console.log("err") })
async function dbconnect() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Docuguide-user")
}

const schemaasData = new mongoose.Schema({
    Username: String,
    password: String,

})

const user = mongoose.model("user", schemaasData)

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


app.get("/login/", (req, res) => {
    let { Username, password } = req.query
    console.log(Username, password)
    const obj = new user({ Username, password })
    s().then(res => console.log("data saved in mongodb")).catch(err => console.log("failed to save data  in mongodb"))
    async function s() {
        await obj.save()
    }
    console.log(password)
    res.render("login.ejs")
})







app.listen(8080, () => { console.log("listenning") })
app.use("/", (req, res) => {
    console.log("main page")
    res.render("index.ejs")

})