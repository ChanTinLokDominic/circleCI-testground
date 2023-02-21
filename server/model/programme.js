const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const programmeSchema = mongoose.Schema({
    title:{
        require: [true, "need a title"],
        type: String,
        maxlength: 100
    },
    venue:{
        require: [true, "need a venue"],
        type: String,
        maxlength:100
    },
    description:{
        require: [true, "need description"],
        type: String,
        maxlength:1000
    },
    presenter: {
        require :[true, "need presenter"],
        type: String,
        maxlength: 100
    },
    price:{
        require:[true, "need price"],
        type: String,
        maxlength:255
    },
    date:{
        type: String
    }
})


programmeSchema.plugin(aggregatePaginate)

const Programme = mongoose.model("Programme", programmeSchema)
module.exports={
    Programme,
}