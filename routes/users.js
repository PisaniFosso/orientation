const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');

// Bring Student Model
let Student = require('../models/student');

// Inscription route
router.get('/future_students', (req, res)=>{
  res.render('contact');
  });

router.get('/parent', (req, res)=>{
  res.render('studentLogin');
  });

router.get('/profs', (req, res)=>{
  res.render('profLogin');
  });

router.get('/admin', (req, res)=>{
  res.render('adminLogin');
  });

// Login Process
router.post('/student/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  req.checkBody('email', 'l\'email est obligatoire').notEmpty();
  req.checkBody('password', 'le mot de passe est obligatoire').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    for (var i = 0; i < errors.length; i++) {
     req.flash('alert alert-danger', errors[i].msg);
    }
    res.redirect('/users/parent');
  } else {
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/parent',
    failureFlash: true
  })(req, res, next);
}
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('alert alert-success', 'vous êtes maintenant déconnecté');
  res.redirect('/exit');
});



// Register students
router.post('/registration', function (req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const fatherName = req.body.fatherName;
  const fatherProfession = req.body.fatherProfession;
  const motherName = req.body.motherName;
  const motherProfession = req.body.motherProfession;
  const email = req.body.email;
  const tel = req.body.tel;
  const grade = req.body.grade;
  const dateOfBirth = req.body.dateOfBirth;
  const address = req.body.address;
  const city = req.body.city;
  const password = req.body.firstName.slice(0, 4)+req.body.lastName.slice(0, 4);

  req.checkBody('firstName', 'le Prenom de l\'élève est obligatoire').notEmpty();
  req.checkBody('lastName', 'le Nom de l\'élève est obligatoire').notEmpty();
  req.checkBody('fatherName', 'le Nom complet du père est obligatoire').notEmpty();
  req.checkBody('fatherProfession', 'profession du père est obligatoire').notEmpty();
  req.checkBody('motherName', 'le Nom complet de la mère est obligatoire').notEmpty();
  req.checkBody('motherProfession', 'profession de la mère est obligatoire').notEmpty();
  req.checkBody('email', 'l\'email est obligatoire').notEmpty();
  req.checkBody('tel', 'le numéro de téléphone est obligatoire').notEmpty();
  req.checkBody('grade', 'la classe est obligatoire').notEmpty();
  req.checkBody('dateOfBirth', 'la date de naissance est obligatoire').notEmpty();
  req.checkBody('address', 'l\'address est obligatoire').notEmpty();
  req.checkBody('city', 'la ville est obligatoire').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    res.render('contact', {
      errors:errors
    });
  } else {
    console.log(password);
  let newStudent = new Student({
    firstName:firstName,
    lastName:lastName,
    fatherName:firstName,
    fatherProfession:firstName,
    motherName:firstName,
    motherProfession:firstName,
    email:email,
    tel:tel,
    grade:grade,
    dateOfBirth:dateOfBirth,
    address:address,
    city:city,
    password:password,
    inscriptionDate:Date.now()

  });

  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newStudent.password, salt, (err, hash)=>{
      if (err) {
        console.log(err);
      }else{
        newStudent.password = hash;
        newStudent.save((err)=>{
          if (err) {
            console.log(err);
            return;
          } else {
            res.render('studentLogin', {
              success: 'Merci d\'avoir choisir le GSBAC pour l\'éducation de votre enfant'
            });
          }
        })
      }
    });
  });
  }
    
  });

// // Access Control
// function ensureAuthenticated(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   } else {
//     req.flash('danger', 'Please login');
//     res.redirect('/users/login');
//   }
// }


module.exports = router;
