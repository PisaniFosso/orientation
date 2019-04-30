const mongoose = require('mongoose');

//user Schema
const studentSchema = mongoose.Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type: String,
		required: true
	},
	fatherName:{
		type: String,
		required: true
	},
	fatherProfession:{
		type: String,
		required: true
	},
	motherName:{
		type: String,
		required: true
	},
	motherProfession:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	tel:{
		type: String,
		required: true
	},
	grade:{
		type: String,
		required: true
	},
	dateOfBirth:{
		type: String,
		required: true
	},
	address:{
		type: String,
		required: true
	},
	city:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	inscriptionDate:{
		type: Date,
		required: true
	}
});

const User = module.exports = mongoose.model('student', studentSchema);