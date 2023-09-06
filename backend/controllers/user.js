const User = require('../models/user');
const VerificationToken = require('../models/verificationToken');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    const isNew = await User.isThisEmailInUse(email);

    if (!isNew) {
        return res.json({
            success: false,
            message: "mail in use, try login"
        });
    }
    const user = await User({
        fullname,
        email,
        password
    });

    const OTP = Math.floor(Math.random()*9000)+1000;
    const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP
    })

    await verificationToken.save();
    await user.save();
    res.json(user);
};

exports.userSignIn =async (req,res) =>{
    const {email,password} = req.body;
    const isUser = await User.findOne({email});
    const mail=isUser ? isUser.email : '' ;

    if(!isUser) return res.json({
        success:false,
        message:"user not found with this email"
    });

    const isMatch = await isUser.comparePassword(password);
    if(!isMatch) return res.json({
        success:false,
        message:"Wrong Password"
    });

    const token = jwt.sign({userId: isUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'});

    res.json({
        success:true, mail, token
    });
}