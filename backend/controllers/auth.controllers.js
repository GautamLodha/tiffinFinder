
const User = require('../models/user.model.js')
const {generateToken} = require('../utils/generateToken.js');

exports.signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phonePrimary,
            role // 👈 important
        } = req.body;
        
        
        // check existing user
        console.log("data receieved");
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        console.log("check done");
        
        
       
        const user = await User.create({
            name,email,password,phonePrimary,role
        })

        console.log("user creaeted",user);
        

        console.log(user);
        

        // const token = generateToken(user._id, user.role);
        const token = generateToken(user._id,user.role);

        res.status(201).json({
            message: 'User registered successfully',
            user,
            token
        });

    } catch (err) {
        console.log(err);
        
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const result = await user.comparePassword(password);
        console.log(result);
        if(user){
            console.log("user is here");
        }

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.role);

        res.json({
            message: 'Login successful',
            user,
            token
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};