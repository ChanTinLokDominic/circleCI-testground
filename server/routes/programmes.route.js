const express = require("express");
const router = express.Router();
const programmeController = require("../controllers/programme.controller")

router.get(
    "/allProgrammes",
    programmeController.getAllPorgrammes
);

router.post(
    "/paginate/all",
    programmeController.paginateProgrammes
)

router.post("/getProgrammeById", programmeController.getProgrammeById)

router
    .route("/updateProgrammes")
    .post(programmeController.addProgramme)
    .patch(programmeController.updateProgrammes)

router.patch("/removeProgramme", programmeController.deleteProgramme)


module.exports = router;