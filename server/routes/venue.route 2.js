const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venue.controller")

router.get(
    "/allVenues",
    venueController.getAllVenues
);

module.exports = router;