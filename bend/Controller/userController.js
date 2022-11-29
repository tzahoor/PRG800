const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const registerUser = async (req, res) => {
    const { firstname, email, password ,orgName,lastname} = req.body

    if (!firstname|| !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        orgName
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.firstname,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}
const generateToken = (id) => {
    return jwt.sign({ id:id }, "secret", {
        expiresIn: '7d',
    })
}
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.firstname,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
module.exports={
    registerUser,
    loginUser
}
