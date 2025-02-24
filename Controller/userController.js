const Users = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");

// signup
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    console.log("inside register");
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            res.status(406).json("User Already Exist! Please Login..");
        } else {
            const newUser = new Users({
                username,
                email,
                password,
            });
            await newUser.save();
            res.status(200).json(existingUser);
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

// login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email, password });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
            res.status(200).json({ existingUser, token });
        } else {
            res.status(406).json("Email & Passsward does not match");
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

// get an user detail by id

exports.getAUserData = async (req, res) => {
    const {id}= req.params;
    console.log(id);
    

    try {
        const userDetails = await Users.findById(id);
        const {_id,email,username}=userDetails
        
        res.status(200).json({_id,email,username});
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
