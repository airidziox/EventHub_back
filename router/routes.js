const express = require('express');
const router = express.Router();

const {
    register,
    login,
    createEvent,
} = require('../controllers/mainControllers');

const {
    validateRegistration,
    validateLogin,
    validateEvent
} = require('../middleware/validators');

const userAuth = require('../middleware/userAuth');

router.post("/register", validateRegistration, register)
router.post("/login", validateLogin, login)
router.post("/create", userAuth, validateEvent, createEvent)
// router.get("/allPosts", userAuth, allPosts)

module.exports = router;