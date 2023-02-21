const { authService } = require("../services")
const httpStatus = require("http-status")


const authController = {
    async register(req, res, next){
        try{
            const {username, password} = req.body
            const user = await authService.createUser(username, password)
            const token = await authService.genAuthToken(user)

            res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
                user,
                token,
              });

        }catch(error){
            next(error)
        }
    },
    async isauth(req, res, next){
        res.json(req.user)
    },
    async signin (req, res, next){
        try{
            const {username, password} = req.body
            const user = await authService.signInWithUsernameAndPassword(username, password)
            const token = await authService.genAuthToken(user);
                res.cookie("x-access-token", token).send({
                user,
                token,
                })

        }catch(error){
            next(error)
        }
    }

}

module.exports = authController