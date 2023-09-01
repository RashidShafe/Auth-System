const {check, validationResult} = require('express-validator');

exports.validateUserSignUp = [
    check('fullname').trim().not().isEmpty().isString().withMessage('input name correctly'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    check('password').trim().not().isEmpty().isLength({min:8}).withMessage('invalid password'),
    check('confirmPass').trim().not().isEmpty().custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error("Password not Matched!!");
        }
        return true;
    })
];

exports.userValidation = (req, res,next)=>{
    const result=validationResult(req).array();
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({
        success:false,
        message:error
    })
};

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage("input email correctly"),
    check('password').trim().not().isEmpty().withMessage('input pass correctly')
]