const { programmeService } = require("../services");
const mongoose = require("mongoose");
const { Venue } = require("../model/venue");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");

const venueController = {
    async getAllVenues(req,res,next){
        try{
            const venues = await Venue.find({})
            res.json(venues)
        }catch(error){
            next(error)
        }
    },
    async paginateVenues(req, res, next){
        try{
            let aggQueryArray = []

            if(req.body.keywords && req.body.keywords != ""){
                const re = new RegExp(`${req.body.keywords}`, "gi")
                aggQueryArray.push({
                    $match:{ name: {$regex: re}}
                })
            }
            if(req.body.venueCode && req.body.venueCode != ""){
                const re = new RegExp(`${req.body.venueCode}`, "gi")
                aggQueryArray.push({
                    $match:{ venueCode: {$regex: re}}
                })
            }
            
            let aggQuery = Venue.aggregate(aggQueryArray)
            const venues = await Venue.aggregatePaginate(aggQuery)
            res.json(venues)
        }catch(error){
            next(error)
        }
    },
    async saveComment(req, res, next){
        try{
            const venue = await Venue.findOneAndUpdate(
                {venueCode: req.body.venueCode},
                {
                    $addToSet:{
                        comment:{
                            comment: req.body.comment
                        }
                    }
                },
                { new : true}
            )
            if(!venue){
                throw new ApiError(httpStatus.BAD_REQUEST, "venueCode not exist")
            }
            res.json(venue)
        }catch(error){
            next(error)
        }
    }
   
}

module.exports = venueController