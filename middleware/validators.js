const validator = require('email-validator');

module.exports = {

    validateRegistration: (req, res, next) => {
        const {username, email, passwordOne, passwordTwo} = req.body;

        if (!username)
            return res.send({error: true, message: "Username field must be filled."})
        else if (username.length < 4 || username.length > 20)
            return res.send({error: true, message: "Username must be 4 - 20 symbols long."})

        if (!email)
            return res.send({error: true, message: "Email field must be filled."})
        else if (!validator.validate(email))
            return res.send({error: true, message: "Email is invalid."})

        if (!passwordOne)
            return res.send({error: true, message: "Password is required."})
        else if (passwordOne.length < 4 || passwordOne.length > 20)
            return res.send({error: true, message: "Password must be 4 - 20 symbols long."})

        if (!passwordTwo)
            return res.send({error: true, message: "Confirm password is required."})
        else if (passwordOne !== passwordTwo)
            return res.send({error: true, message: "Passwords does not match."})

        next()
    },
    validateLogin: (req, res, next) => {
        const {username, password} = req.body;

        if (!username)
            return res.send({error: true, message: "Username is required."})

        if (!password)
            return res.send({error: true, message: "Password is required."})

        next()
    },

    validateEvent: (req, res, next) => {
        const {title, description, location, date, time, seats, image} = req.body;

        if (!title)
            return res.send({error: true, message: "Title is required."})
        else if (title.length < 5)
            return res.send({error: true, message: "Title must be at least 10 symbols long."})

        if (!description)
            return res.send({error: true, message: "Description is required."})
        else if (description.length < 10)
            return res.send({error: true, message: "Description must be at least 10 symbols long."})

        if (!location)
            return res.send({error: true, message: "Location is required."})

        if (!date)
            return res.send({error: true, message: "Date is required."})

        if (!time)
            return res.send({error: true, message: "Time is required."})

        if (!seats)
            return res.send({error: true, message: "Seat number is required."})
        else if (seats <= 5) {
            return res.send({error: true, message: "Event must have at least 5 seats."})
        }

        if (!image)
            return res.send({error: true, message: "Image is required."})

        next()
    }

}