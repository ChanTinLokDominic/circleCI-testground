

const axios = require("axios")


const test = async () =>{
    const response = await axios.post("http://localhost:3001/api/venues/comment", {"venueCode": "3110031", "comment": "hello"})
    console.log(response.data.comment)
}

test()


