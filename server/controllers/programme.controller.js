const { programmeService } = require("../services");
const mongoose = require("mongoose");
const { Programme } = require("../model/programme")
const {Venue} = require("../model/venue");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");

const programmeController = {
    async getAllPorgrammes(req,res,next){
        try{
            const programmes = await Programme.find({})
            res.json(programmes)
        }catch(error){
            next(error)
        }
    },
    async paginateProgrammes(req, res, next){
        try{
            let aggQueryArray = []

            if(req.body.venueCode && req.body.venueCode != ""){
                const re = new RegExp(`${req.body.venueCode}`, "gi")
                aggQueryArray.push({
                    $match:{ venue: {$regex: re}}
                })
            }
            let aggQuery = Programme.aggregate(aggQueryArray)

            const options = {
                limit: 50
            }
            const programmes = await Programme.aggregatePaginate(aggQuery, options)
            res.json(programmes)
        }catch(error){
            next(error)
        }
    },
    async updateProgrammes(req, res, next){
        try{
            const programme = await Programme.findOneAndUpdate(
                {_id: req.body.id},
                { $set:{
                    ...req.body
                }},
                {new: true}
            )

            res.json(programme)
        }catch(error){
            next(error)
        }
    },
    async addProgramme (req,res, next){
        try{
            const {title, venue, description, presenter, price, date} = req.body
            const programme = new Programme({title, venue, description, presenter, price, date})
            await programme.save()
            res.json(programme)
        }catch(error){
            next(error)
        }
    },
    async deleteProgramme (req, res, next){
        try{
            const programme = await Programme.findOne({_id: req.body.id})
            if(!programme){
                throw new ApiError(httpStatus.BAD_REQUEST, "cannot find the programme")
            }
            await Programme.deleteOne({_id: req.body.id})
            res.json({"ok":"programme has been deleted"})
        }catch(error){
            next(error)
        }
    },
    async getProgrammeById (req, res, next){
        try{
            const programme = await Programme.findOne({_id: req.body.id})
            if(!programme){
                throw new ApiError(httpStatus.BAD_REQUEST, "cannot find the programme")
            }
            res.json(programme)
        }catch(error){
            next(error)
        }
    }
}

module.exports = programmeController