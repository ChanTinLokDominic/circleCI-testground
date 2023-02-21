const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const venueSchema = mongoose.Schema({
    venueCode:{
        require: [true, "need code"],
        type: String,
        unique: 1,
        maxlength: 100
    },
    name:{
        require: [true, "need a venuename"],
        type: String,
        maxlength: 100
    },
    latitude:{
        require: [true, "need latitude"],
        type: Number,
        maxlength:50
    },
    longitude: {
        require:[true, "need longitude"],
        type: Number,
        maxlength:50
    },
    comment:{
        type: Array,
        default:[]
    }
})

venueSchema.plugin(aggregatePaginate)

const Venue = mongoose.model("Venue", venueSchema)
module.exports = { Venue }