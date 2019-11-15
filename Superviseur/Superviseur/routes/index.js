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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Pages/index', { title: 'Express' });
});

router.post('/', function(req, res, next){
  console.log(req.body.username);
  console.log(req.body.password);
  var username = req.body.username;
  var password = req.body.password;
  var queryString = 'SELECT * FROM Authentification WHERE Username = "'+username+'" AND Password = "'+password+'"';
  var query = connection.query(queryString, function(err, rows, fields){
    if(!err){
      console.log('Ma requête est passe!');
      res.render('Pages/acceuilAdmin', {})
    };
  });
});

module.exports = router;
