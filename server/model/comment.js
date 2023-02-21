const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    username:{
        require: [true, "need username"],
        ref: "User"
    },
    comment:{
        require: [true, "need comment"],
        type: String,
        maxlength: 255
    }
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = { Comment }