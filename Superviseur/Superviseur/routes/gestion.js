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

router.post('/', function(req, res) {
  console.log(req.body.modifUser);
  if(req.body.modifUser == "Ajout"){
    var updateSQL = 'INSERT INTO Authentification (Username, Password, NiveauDroit) VALUES ?';
    var valuesSQL = [[req.body.newUser, req.body.newPass, req.body.Droit]];
    var query = connection.query(updateSQL,[valuesSQL], function(err, result){
      if(!err){
        console.log('1 record inserted');
      }
    });
  }
  else if(req.body.modifUser == "Delete"){
    var deleteSQL = 'DELETE FROM Authentification WHERE Username = ?';
    var deleteValue = req.body.newUser;
    connection.query(deleteSQL, [deleteValue], function(err, result){
      if(!err){
        console.log('1 record deleted');
      }
    });
  }
  var queryStringDemande = 'SELECT Username, Password, NiveauDroit FROM Authentification';
  connection.query(queryStringDemande, function(err, result, fields) {
    if(!err){
      res.render('Pages/gestion', {user: 'admin', fields: fields, data: result});
    }
  });
});

module.exports = router;
