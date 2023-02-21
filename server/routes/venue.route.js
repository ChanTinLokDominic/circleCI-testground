const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venue.controller")

router.get(
    "/allVenues",
    venueController.getAllVenues
);

router.post(
    "/paginate/all",
    venueController.paginateVenues
)

router.post(
    "/comment",
    venueController.saveComment
)

module.exports = router;