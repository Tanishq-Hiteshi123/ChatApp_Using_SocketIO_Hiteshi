const express = require("express")
const { getAllMessageOne } = require("../controllers/messageController")
const isAuthenticated = require("../middlewares/authentication")

const router = express.Router()

router.get("/getAllMessage"  , isAuthenticated ,getAllMessageOne)

module.exports = router