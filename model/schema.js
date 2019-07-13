const mongoose = require("mongoose");

let schema = mongoose.Schema;

let userData = new schema({
    todo: { type: String, required: true }
});

module.exports = mongoose.model("todo_list", userData);