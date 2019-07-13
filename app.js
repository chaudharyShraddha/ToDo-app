const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
let app = express();

mongoose.connect("mongodb://localhost:27017/todo_list",{useNewUrlParser: true})
.then( console.log( "mongodb is connected") );
let todo = require("./model/schema");

app.use( express.urlencoded({ extended: false }));
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname+"/views"}));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    todo.find().then( doc => {
        res.render("todo", {data: doc});
    })
    
});

app.post("/", (req,res) => {
    let data = new todo({todo: req.body.todo});
    data.save().then( res.redirect("/"));
});

app.get("/delete/:id", (req,res) => {
    todo.findByIdAndRemove(req.params.id).exec();
    res.redirect("/");
})

let PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("server is runnig"));