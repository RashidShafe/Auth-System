const express = require('express');
const router = express.Router();

const { createUser, userSignIn, verifyEmail } = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middleware/validation/user');
const { isAuth } = require('../middleware/auth');

router.post('/create-user', validateUserSignUp, userValidation , createUser);
router.post('/sign-in',validateUserSignIn, userValidation, userSignIn);
router.post("/verify-email",verifyEmail)
router.post('/create-post', isAuth, (req,res)=>{
    res.send('welcome to Valhalla!!');
});

module.exports = router;