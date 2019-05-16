const mysql = require('mysql');

//user Schema
const patientSchema = mysql.Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
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
	degree:{
		type: String,
		required: true
	},
	gender:{
		type: String,
		required: true
	},
	dateOfBirth:{
		type: Date,
		required: true
	},
	nationaly:{
		type: String,
		required: true
	},
	langue:{
		type: String,
		required: true
	},
	address:{
		type: String,
		required: true
	},
	address2:{
		type: String,
	},
	city:{
		type: String,
		required: true
	},
	province:{
		type: String,
		required: true
	},
	postalCode:{
		type: String,
		required: true
	},
	InscriptionDate:{
		type: Date,
		required: true
	}
});

const User = module.exports = mysql.model('patient', patientSchema);
