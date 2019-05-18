const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
var passwordHash = require('password-hash');
const dateformat = require('dateformat');

const mysql = require('mysql');
// var connection = mysql.createConnection({
//     //properties...
//     host: 'us-cdbr-iron-east-02.cleardb.net',
//     user: 'bee1d7c09dd215',
//     password: '650f4fac',
//     database: 'heroku_6c524e3bb34e4a1',
//     port:3306,

// });

var connection = mysql.createConnection({
  //properties...
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orientation',
});

//connection mysql DB
connection.connect((error)=>{
    if(error){
        console.log('error:', error.code);
    }
    else{
        console.log('connected');
    }
});

// Inscription route
router.get('/new_patient', (req, res)=>{
  res.render('contact');
  });

router.get('/patient', (req, res)=>{
  res.render('studentLogin');
  });

router.get('/profs', (req, res)=>{
  res.render('profLogin');
  });

router.get('/admin', (req, res)=>{
  res.render('adminLogin');
  });

// Login Process
router.post('/patient/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  req.checkBody('email', 'l\'email est obligatoire').notEmpty();
  req.checkBody('password', 'le mot de passe est obligatoire').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    for (var i = 0; i < errors.length; i++) {
     req.flash('alert alert-danger', errors[i].msg);
    }
    res.redirect('/users/patient');
  } else {
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
    var sql = 'SELECT * FROM patients WHERE email = ?';
    connection.query(sql, [email], (err,result) => {
      if(err) throw err;
      console.log(result[0].password)
      var isPassword = passwordHash.verify(password, result[0].password)
      if(result == '' || !isPassword){
        req.flash('alert alert-danger', 'mauvais email ou mot de passe');
        res.redirect('/users/patient');
      }
      else{
          res.redirect('/');
      }
    });
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
  const inputFirstName = req.body.inputFirstName;
  const inputLastName = req.body.inputLastName;
  const inputEmail = req.body.inputEmail;
  const inputConfirmEmail = req.body.inputConfirmEmail;
  const inputTel = req.body.inputTel;
  const inputDegree = req.body.inputDegree
  const inputGenre = req.body.inputGenre;
  const inputBirthDate = req.body.inputBirthDate;
  const inputCountry = req.body.inputCountry;
  const inputLanguage = req.body.inputLanguage;
  const inputAddress = req.body.inputAddress;
  const inputAddress2 = req.body.inputAddress2;
  const inputCity = req.body.inputCity;
  const inputProvince = req.body.inputProvince;
  const inputZip = req.body.inputZip;

  // var isPhone = phonenumber(inputTel);

  req.checkBody('inputFirstName', 'le Prenom est obligatoire').notEmpty();
  req.checkBody('inputLastName', 'le Nom est obligatoire').notEmpty();
  req.checkBody('inputEmail', 'l\'email valide est obligatoire').isEmail();
  req.checkBody('inputConfirmEmail', 'les emails doivent etre identique').equals(inputEmail);
  req.checkBody('inputTel', 'le numéro de téléphone est obligatoire').matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  req.checkBody('inputDegree', 'le dernier diplome obtenu est obligatoire').notEmpty();
  req.checkBody('inputGenre', 'le genre est obligatoire').notEmpty();
  req.checkBody('inputBirthDate', 'la date de naissance est obligatoire').notEmpty();
  req.checkBody('inputCountry', 'Le pays de nationalité est obligatoire').notEmpty();
  req.checkBody('inputLanguage', 'la langue parlé est obligatoire').notEmpty();
  req.checkBody('inputAddress', 'l\'address est obligatoire').notEmpty();
  req.checkBody('inputCity', 'la ville est obligatoire').notEmpty();
  req.checkBody('inputProvince', "la province est obligatoire").notEmpty();
  req.checkBody('inputZip', "le code postal est obligatoire").matches('[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]');


  let errors = req.validationErrors();
  if (errors) {
    res.render('contact', {
      errors:errors
    });
  } else {
  const password = inputFirstName.slice(0, 4)+inputLastName.slice(0, 4);
  var hashedPassword = passwordHash.generate(password);
  console.log(password);
  console.log(hashedPassword);

  let now = new Date();
  now = dateformat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
  let newPatient = {
    firstName:inputFirstName,
    lastName:inputLastName,
    password:hashedPassword,
    email:inputEmail,
    tel:inputTel,
    degree:inputDegree,
    genre:inputGenre,
    naissance:inputBirthDate,
    langue:inputLanguage,
    address:inputAddress,
    address2:inputAddress2,
    ville:inputCity,
    province:inputProvince,
    codePostal:inputZip,
    inscriptionDate:now,
    confirm:0
  };
  connection.query('INSERT INTO patients SET ?', newPatient, (err, res) => {
    if(err) throw err;
    console.log('Last insert ID:', res.insertId);
  });

  res.redirect('/')
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
