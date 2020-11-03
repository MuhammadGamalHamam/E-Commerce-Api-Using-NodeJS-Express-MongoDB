const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

//localhost:5050/api/accounts/signup
router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;
   
    User.findOne({ email: req.body.email }, (err, existingUser) => {
     if (existingUser) {
       res.json({
         success: false,
         message: 'This email is already exist'
       });
   
     } else {
       user.save();
   
       var token = jwt.sign({
         user: user
       }, config.secret, {
         expiresIn: '1d'
       });
   
       res.json({
         success: true,
         message: 'token Successfully',
         token: token
       });
     }
    });
   });

   //localhost:5050/api/accounts/login
   router.post('/login', (req, res, next) => {

    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
  
      if (!user) {
        res.json({
          success: false,
          message: 'User not found'
        });
      } else if (user) {
  
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'wrong password'
          });
        } else {
          var token = jwt.sign({
            user: user
          }, config.secret, {
            expiresIn: '7d'
          });
  
          res.json({
            success: true,
            mesage: "token Successfully",
            token: token
          });
        }
      }
    });
  });


module.exports = router;