var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || 8080);