const { programmeService } = require("../services");
const mongoose = require("mongoose");
const { Venue } = require("../model/venue")

const venueController = {
    async getAllVenues(req,res,next){
        try{
            const venues = await Venue.find({})
            res.json(venues)
        }catch(error){
            next(error)
        }
    }
}

module.exports = venueController