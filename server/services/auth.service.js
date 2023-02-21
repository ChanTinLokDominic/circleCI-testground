const { User } = require("../model/user");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError")
const userService = require("./user.service")

const createUser = async (username, password) => {
  try {
    if (await User.usernameTaken(username)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry username taken");
    }
    const user = new User({ username, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};


const signInWithUsernameAndPassword = async (username, password)=>{
    try{
        const user = await userService.findUserByUsername(username)

        if(!user){
            throw new ApiError(httpStatus.UNAUTHORIZED, "username does not exist")
        }

        if(!(await user.comparePassword(password))){
            throw new ApiError(httpStatus.UNAUTHORIZED, "password incorrect")
        }

        return user

    }catch(error){
        throw error
    }
}


module.exports = {
  createUser,
  genAuthToken,
  signInWithUsernameAndPassword,
};
