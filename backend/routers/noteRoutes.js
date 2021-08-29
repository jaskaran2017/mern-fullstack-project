const express = require("express");
const { getNotes, createNotes, getNoteById } = require("../controller/noteController");
const { protector } = require("../middleware/authMiddleware");

const router = new express.Router();

router.route("/").get(protector, getNotes);
router.route("/:id").get(getNoteById)
router.route("/create").post(protector, createNotes);
// router.route("/demo").post(protector, demo);
// router.route("/:id").get().put().delete();

module.exports = router;
