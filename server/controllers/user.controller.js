const { userService } = require("../services");
const {ApiError} = require("../middleware/apiError");
const httpStatus = require("http-status");
const { User } = require("../model/user");


const userController = {
    async adduser(req,res,next){
        try{
            const {username, password} = req.body
            if( await User.usernameTaken(req.body.username)){
                throw new ApiError(httpStatus.BAD_REQUEST, "Sorry username taken")
            }
            const user = new User({username, password})
            console.log(user)
            await user.save()
            res.json(user)
        }catch(error){
            next(error)
        }
    },
    async updateUsernameAndPassword(req, res, next){
        try{
            const user = await User.findOne({username: req.body.username})
            if(!user){
                throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry username not exist")
            }
            if( await User.usernameTaken(req.body.newUsername)){
                throw new ApiError(httpStatus.BAD_REQUEST, "Sorry username taken")
            }
            await user.updateUsername(req.body.newUsername)
            await user.updatePassword(req.body.password)
            
            await user.save()
            res.json(user)
        }catch(error){
            next(error)
        }
    },
    async getUserByUsername(req, res, next){
        try{
            const user = await User.findOne({username: req.body.username})
            res.json(user)
        }catch(error){
            next(error)
        }
    }
    ,
    async getAllusers(req, res, next){
        try{
            const users = await User.find({})
            if(!users){
                return new ApiError(httpStatus.NOT_FOUND, "users not found")
            }
            res.json(users)
        }catch(error){
            next(error)
        }
    },
    async deleteUser(req, res, next){
        try{
            const user = await User.findOne({username: req.body.username})
            if(!user){
                throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry username not exist")
            }
            await User.deleteOne({username: req.body.username})

            res.json({"ok":"username has been deleted"})
            
        }catch(error){
            next(error)
        }
    },
    async addUserFavourite(req, res, next){
        try{
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {
                    $addToSet:{
                        favourite:{
                            venueCode: req.body.venueCode
                        }
                    }
                },
                { new: true}
            )
            res.json(user)
        }catch(error){
            next(error)
        }
    },
    async removeUserFavourite(req, res, next){
        try{
            const venue = await User.findOne({favourite: {venueCode: req.body.venueCode}})
            console.log(venue)
            if(!venue){
                throw new ApiError(httpStatus.BAD_REQUEST, "cannot find venueCode")
            }
            const user = User.findOneAndUpdate(
                {username: req.body.username},
                {
                    $pull:{
                        favourite:{
                            venueCode: req.body.venueCode
                        }
                    }
                },
                { new : true}
            )
            res.json(user)
        }catch(error){
            next(error)
        }

    }
}

module.exports = userController