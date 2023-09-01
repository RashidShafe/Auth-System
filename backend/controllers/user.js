const User = require('../models/user');

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

    await user.save();
    res.json(user);
};

exports.userSignIn =async (req,res) =>{
    const {email,password} = req.body;
    const isUser = await User.findOne({email});

    if(!isUser) return res.json({
        success:false,
        message:"user not found with this email"
    });

    const isMatch = await isUser.comparePassword(password);
    if(!isMatch) return res.json({
        success:false,
        message:"Wrong Password"
    });

    res.json({
        success:true, user:isUser
    });
}