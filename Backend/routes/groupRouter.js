const express = require("express");
const { getAllGroups, createGroup, addNewMembersToGroup } = require("../controllers/groupController");
const isAuthenticated = require("../middlewares/authentication");

const router = express.Router()

router.get("/getAllGroups" , isAuthenticated ,getAllGroups)
router.post("/createGroup" , isAuthenticated ,createGroup)
router.post("/addNewMember" , isAuthenticated ,addNewMembersToGroup)


module.exports = router;

