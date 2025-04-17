const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const isImageURL = require('image-url-validator').default;
// const {uid} = require("uid");

const userSchema = require("../schemas/userSchema");
const eventSchema = require("../schemas/eventSchema");

module.exports = {
    register: async (req, res) => {
        const {username, email, passwordOne} = req.body;

        const userExists = await userSchema.findOne({username})
        if (userExists) return res.send({error: true, message: "Username is taken."})

        const emailExists = await userSchema.findOne({email})
        if (emailExists) return res.send({error: true, message: "Email is taken."})

        const salt = await bcrypt.genSalt(5)
        const hash = await bcrypt.hash(passwordOne, salt)

        const user = {
            username,
            email,
            password: hash,
        }

        const newUser = new userSchema(user)
        await newUser.save()

        res.send({error: false, message: "User created successfully!"});
    },
    login: async (req, res) => {
        const {username, password} = req.body;

        const userExists = await userSchema.findOne({username});
        if (!userExists) return res.send({error: true, message: "User does not exist!"});

        const samePassword = await bcrypt.compare(password, userExists.password);
        if (!samePassword) return res.send({error: true, message: "Username or password is invalid."});

        const user = {
            _id: userExists._id,
            username: userExists.username,
            password: userExists.password,
            email: userExists.email
        }

        const token = jwt.sign(user, process.env.SECRET_KEY)

        return res.send({error: false, message: "Logged in successfully!", token: token, user})
    },
    createEvent: async (req, res) => {
        const {authorId, username, title, description, location, date, time, seats, image} = req.body;

        const is_image = await isImageURL(image);
        if (!is_image) {
            return res.send({error: true, message: "Image link is invalid."});
        }

        const event = {
            username,
            authorId,
            title,
            description,
            location,
            date,
            time,
            seats,
            image,
        }

        const newEvent = new eventSchema(event)
        await newEvent.save()

        const events = await eventSchema.find()

        res.send({error: false, message: "Event created successfully!", events});
    },
    allEvents: async (req, res) => {
        const events = await eventSchema.find()

        res.send(events)
    },
    singleEvent: async (req, res) => {
        const eventId = req.params.id
        const event = await eventSchema.findOne({_id: eventId})

        res.send(event)
    },
    editEvent: async (req, res) => {
        const {title, description, location, date, time, seats, image} = req.body;
        const eventId = req.params.id

        const is_image = await isImageURL(image);
        if (!is_image) {
            return res.send({error: true, message: "Image link is invalid."});
        }

        await eventSchema.findOneAndUpdate(
            {_id: eventId},
            {
                $set: {
                    title, description, location, date, time, seats, image
                }
            }
        )

        const events = await eventSchema.find()
        return res.send({error: false, message: "Event updated!", events})
    },
}