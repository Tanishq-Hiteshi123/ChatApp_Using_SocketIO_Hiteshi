const express = require ("express")
const { registerUser, loginUser, getUserDetails, getAllUser, getUserById } = require("../controllers/userController")
const isAuthenticated = require("../middlewares/authentication")

const router = express.Router()

router.post("/registerUser" , registerUser )
router.post("/loginUser" , loginUser)
router.get("/getMe" , isAuthenticated ,getUserDetails )
router.get("/allUsers" , isAuthenticated ,getAllUser)
router.get("/getUserById/:userId" , isAuthenticated , getUserById)

module.exports = router