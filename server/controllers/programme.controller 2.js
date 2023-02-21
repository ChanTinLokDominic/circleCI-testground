const { programmeService } = require("../services");
const mongoose = require("mongoose");
const { Programme } = require("../model/programme")

const programmeController = {
    async getAllPorgrammes(req,res,next){
        try{
            const programmes = await Programme.find({})
            res.json(programmes)
        }catch(error){
            next(error)
        }
    }
}

module.exports = programmeController