const { User } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');

async function register(req, res, next) {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try { 
        const savedUser = await User.create({
          email,
          password: hashedPassword,
        });
         res.status(201).json({
           user: {
             email: savedUser.email
           },
         });

    } catch(error){
        console.log('error while saving user', error.name, error.message)
        if (error.message.includes("E11000 duplicate key error")) {
            throw Conflict('Email in use!');
        }
        throw error;
    }
};
 
module.exports = { register }