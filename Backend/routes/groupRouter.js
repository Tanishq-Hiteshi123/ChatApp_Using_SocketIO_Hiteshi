const express = require("express");
const { getAllGroups } = require("../controllers/groupController");
const isAuthenticated = require("../middlewares/authentication");

const router = express.Router()

router.get("/getAllGroups" , isAuthenticated ,getAllGroups)

module.exports = router;

