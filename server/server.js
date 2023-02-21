const express = require("express");
const mongoose = require("mongoose");
const {User} = require("./model/user")
const routes = require("./routes")

const app = express()

app.use(express.json());

mongoose.connect("mongodb+srv://csci2720:csci2720@cluster0.dhiwgy4.mongodb.net/?retryWrites=true&w=majority")
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*') 
  next()
})

app.use("/api", routes)


const port = 3001; // environment variable
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const programmeSchema = new mongoose.Schema({
  _id: Number,
  venue: String,
  description: String,
  presenter:String,
  price:String,
  date:String
});

const programme = mongoose.model('programme', programmeSchema);

module.exports = {
  programme
}
