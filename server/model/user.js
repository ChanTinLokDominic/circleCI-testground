const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    username:{
        type:String,
        require: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    favourite:{
        type: Array,
        default:[]
    }
})

userSchema.pre("save", async function (next) {
    let user = this; // when you use pre function, the user(object) already in function
  
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(10); // random set of string based on pwd
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
  
    next();
});

userSchema.statics.usernameTaken = async function (username) {
    const user = await this.findOne({ username });
    return !!user;
};

userSchema.methods.generateAuthToken = function () {
    let user = this;
  
    const userObj = {
      sub: user._id.toHexString(),
      email: user.email,
    };
    const token = jwt.sign(userObj, "superSecretPW", { expiresIn: "1d" });
    // console.log("user", user);
    // console.log("userObj", userObj);
    // console.log("token: ", token);
    return token;
  };

  userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
  };

  userSchema.methods.updatePassword = async function (pwd){
      const user = this
      user.password = pwd
      const salt = await bcrypt.genSalt(10); // random set of string based on pwd
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
  }

  userSchema.methods.updateUsername = async function (newUsername){
      const user = this
      user.username = newUsername
  }




const User = mongoose.model("User", userSchema);
module.exports = { User }