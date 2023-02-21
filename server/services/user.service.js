const { User } = require("../model/user");
const {Programme} = require("../model/programme")
const mongoose = require("mongoose");

const addUser = async (body)=>{
    try{
        const programme = new Programme({
            ...body
        })
        await programme.save()
        return programme
    }catch(error){
        throw error
    }
}

const findUserByUsername = async (username) => {
    return await User.findOne({ username: username });
  };

module.exports = {
    addUser,
    findUserByUsername
}
