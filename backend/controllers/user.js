const { isValidObjectId } = require('mongoose');
const User = require('../models/user');
const VerificationToken = require('../models/verificationToken');

const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const verificationToken = require('../models/verificationToken');

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

    const OTP = Math.floor(Math.random() * 9000) + 1000;
    const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP
    })

    await verificationToken.save();

    // sending mail to the user with OTP code
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "journal.engine.0@gmail.com",
            pass: "ftfdauzwgkxzxdkv",
        },
    });
    async function mail() {
        try {
            await transporter.sendMail({
                from: '"Baaaaaa Foo 👻" <you@me.love>', // sender address
                to: user.email, // list of receivers
                subject: "Succesfully Hacked ✔", // Subject line
                html: `<h1>${OTP}</h1>`, // html body
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    mail();
    // sending mail to the user with OTP code (END)

    await user.save();
    res.json(user);
};

exports.userSignIn = async (req, res) => {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    const mail = isUser ? isUser.email : '';

    if (!isUser) return res.json({
        success: false,
        message: "user not found with this email"
    });

    const isMatch = await isUser.comparePassword(password);
    if (!isMatch) return res.json({
        success: false,
        message: "Wrong Password"
    });

    const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
        success: true, mail, token
    });
};

exports.verifyEmail = async(req,res)=>{
    const {userId, otp} = req.body;

    if(!userId || !otp.trim()) return res.json({
        success: false,
        message: "False"
    });

    if(!isValidObjectId(userId)) return res.json({
        success: false,
        message: "Invalid user id"
    });

    const user = await User.findById(userId);

    if(!user) return res.json({
        success: false,
        message: "No user found"
    }); 

    if(user.verified) return res.json({
        success: false,
        message: "Account aready verified!"
    }); 

    const token=await VerificationToken.findOne({owner: user._id})

    if(!token) return res.json({
        success: false,
        message: "User not found!"
    });

    const isMatched = await token.compareToken(otp);

    if(!isMatched) return res.json({
        success: false,
        message: "not a valid token"
    });

    await User.findByIdAndUpdate(userId, { verified: true });
    await verificationToken.findByIdAndDelete(token._id);

    res.json({
        success:true,
    });
};