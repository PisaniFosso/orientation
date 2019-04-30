const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/student');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = (passport)=>{
  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done)=>{
    // Match email
    let query = {email:email};
    User.findOne(query, (err, user)=>{
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'email ou mot de passe incorrect', type:'alert alert-danger'});
      }

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch)=>{
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'email ou mot de passe incorrect', type:'alert alert-danger'});
        }
      });
    });
  }));

  passport.serializeUser((user, done)=>{
    done(null, user._id);
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}
