var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')


router.post('/signup',[
    check('name','name should be at least 3 character').isLength({ min: 3 }),
    check('email','Email is required').isEmail(),
    check('password','password should be at least 3 char long').isLength({min: 3}),
], signup);

router.post('/signin',[
    check('email','Email is required').isEmail(),
    check('password','password is required').isLength({min: 1}),
], signin);

router.get('/signout', signout);

router.get('/testroute',isSignedIn,(req,res)=>{
res.send("a protected route");
});

module.exports= router;