// Requires
var express = require('express');
var linkCtrl = require('./controllers/link');
var db = require('./models');
var Hashids = require("hashids");

// GLOBAL hashids with salt
hashids = new Hashids("this is my salt");

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.use('/link', linkCtrl);

app.get('/', function(req,res) {
  res.render('index');
})

app.get('/links', function(req,res) {
  // res.send('Links page');


// model.findAll({
//   attributes: [
//       'id',
//       [sequelize.fn('date_format', sequelize.col('date_col'), '%Y-%m-%d'), 'date_col_formed']
//   ]})
//   .success(function(result) {
//     console.log(result);
// });

  // db.link.all({attributes: [
  //                 'id',
  //                 'url',
  //                 'clicked',
  //                 [link.fn('date_format', link.col('createdAt'), '%Y-%m-%d'), 'createdAt_fmt'],
  //                 [link.fn('date_format', link.col('updatedAt'), '%Y-%m-%d'), 'updatedAt_fmt']]},
  //                 {order: 'clicked DESC'}).then(function(links) {
  //   // console.log(links);
  //   linksObj = {};
  //   links.forEach(function(link, index, array) {
  //     // var slinkObj = {};
  //     var hash = "http://localhost:3000/" + hashids.encode(link.id);
  //     link.get().hashurl = hash;
  //     // console.log("Link:", link.get());
  //     // console.log("Link ID: ", link.id);
  //     // console.log("Hash:", hash);

  //     linksObj[index] = link.get();
  //   })
  //   res.render('links', linksObj);
  //   // res.send(linksObj);
  // })



  db.link.all({order: 'clicked DESC'}).then(function(links) {
    // console.log(links);
    linksObj = {};
    links.forEach(function(link, index, array) {
      // var slinkObj = {};
      var hash = req.headers.host + '/' + hashids.encode(link.id);
      link.get().hashurl = hash;
      // console.log("Link:", link.get());
      // console.log("Link ID: ", link.id);
      // console.log("Hash:", hash);

      linksObj[index] = link.get();
    })
    res.render('links', linksObj);
    // res.send(linksObj);
  })
})

app.get('/:hashedId', function(req,res) {

  var id = parseInt(hashids.decode(req.params.hashedId));

  db.link.find({ where: {id: id} }).then(function(link) {

    link.clicked = link.clicked + 1
    link.save().then(function(link) {
      res.redirect(link.url);
    })
  }).catch(function(error) {
      console.log('Someone hit a 404 while using link shortener');
      res.redirect('/link/404');
    })
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on port 3000...');
})
