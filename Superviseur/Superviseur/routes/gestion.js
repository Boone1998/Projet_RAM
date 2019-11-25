var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'malo25030',
  database : 'PanneauRAM'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Vous êtes connecté à votre BDD');
});



router.get('/', function(req, res, next) {
  var queryString = 'SELECT Username, Password, NiveauDroit FROM Authentification';
  var query = connection.query(queryString, function(err, result, fields) {
    if(!err){
      res.render('Pages/gestion', {user: 'admin', fields: fields, data: result});
    }
  });
});

module.exports = router;
