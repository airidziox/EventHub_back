const express = require('express');
const router = express.Router();

const {
    register,
    login,
    createEvent,
    allEvents,
    singleEvent,
    editEvent,
    deleteEvent
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
router.get("/allEvents", userAuth, allEvents)
router.get("/event/:id", userAuth, singleEvent)
router.post("/edit/:id", userAuth, editEvent)
router.post("/delete/:id", userAuth, deleteEvent)

module.exports = router;