const express = require("express")
const { getAllMessageOne, getAllGroupMessagesById } = require("../controllers/messageController")
const isAuthenticated = require("../middlewares/authentication")

const router = express.Router()

router.get("/getAllMessage"  , isAuthenticated ,getAllMessageOne)
router.get("/allGroupMessageById/:groupId" , isAuthenticated , getAllGroupMessagesById)


module.exports = router