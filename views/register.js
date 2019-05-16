var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    //properties...
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customerDB'
});

connection.connect(()=>{
    if(error){
        console.log('error');
    }
    else{
        console.log('connected');
    }
});
