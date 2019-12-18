var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var username = "";
var password = "";
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
  username = req.body.username;
  password = req.body.password;
  var queryString = 'SELECT * FROM Authentification WHERE (Username = ?) AND (Password = ?)';
  var query = connection.query(queryString, [username, password], function(err, result){
    if(!err){
      console.log('Ma requête est passe!');
      console.log(result);
      if(result[0]){
        if((result[0].Username == "admin") && (result[0].Password == "admin")){
          res.render('Pages/acceuil', {user: "admin", title: "Page Admin"});
        }
        else if((result[0].Username == "operateur") && (result[0].Password == "operateur")){
          res.render('Pages/acceuil', {user: "opérateur", title: "Page Opérateur"});
        }
        else if(result[0].Username == "guest"){
          res.render('Pages/acceuil', {user: "Visiteur", title: "Page Visiteur"});
        }
      }
      else{
        res.render('Pages/errorLogin');
      }
    }
  });
});

router.get('/panneau', function(req, res, next){
  res.render('Pages/panneau', {user: username});
});

module.exports = router;
