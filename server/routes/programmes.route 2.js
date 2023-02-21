const express = require("express");
const router = express.Router();
const programmeController = require("../controllers/programme.controller")

router.get(
    "/allProgrammes",
    programmeController.getAllPorgrammes
);

module.exports = router;