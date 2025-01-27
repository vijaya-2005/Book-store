const mongoose = require("mongoose");
// const { type } = require("os");
const book_schema = mongoose.Schema(
    {
        "Name":{
            type:String,
            required:true
        },
        "Author":{
            type:String,
            required:true
        },
        "ISBN":{
            type:String,
            required:true,
            unique:true
        }
    }
);
const book_model = mongoose.model("BookStore",book_schema);
module.exports = book_model;