const express = require("express");
const usersRoute = require("./users.route")
const programmeRoute = require("./programmes.route")
const venueRoute = require("./venue.route")
const authRoute = require("./auth.route")
const router = express.Router()


const routesIndex = [
    {
        path: "/users",
        route: usersRoute
    },
    {
        path:"/programmes",
        route: programmeRoute
    },
    {
        path:"/venues",
        route: venueRoute
    },
    {
        path:"/auth",
        route: authRoute
    }
]

routesIndex.forEach((route)=>{
    router.use(route.path, route.route)
})

module.exports = router;