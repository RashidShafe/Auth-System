const User = require('../models/user');

exports.createUser = async (req,res) => {
    const {fullname,email,password} = req.body;
    
    const isNew = await User.isThisEmailInUse(email);
    if(!isNew) return res.json({
        success: false,
        message:"mail in use, try login"
    });

    const user = await User({
        fullname,
        email,
        password
    });

    await user.save();
    res.json(user);
}