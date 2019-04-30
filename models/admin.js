const mongoose = require('mongoose');

//user Schema

const adminSchema = mongoose.Schema({
	name:{
		type: string,
		required: true
	},
	email:{
		type: string,
		required: true
	},
	username:{
		type: string,
		required: true
	},
	password:{
		type: string,
		required: true
	}
});

const User = module.exports = mongoose.model('admin',adminSchema);