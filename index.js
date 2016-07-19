var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var restify = require('restify');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.use(bodyParser.json())

app.post('/marathon', function(req, result) {
    console.log(JSON.stringify(req.body));

    var client = restify.createJsonClient({
        url: req.body.marathonUrl,
        version: '*'
    });

    client.post(
        "/marathon/v2/apps",
        req.body.marathonJson,
        function (err, req, res, obj) {
            console.log(JSON.stringify(res.body));
            result.send(JSON.stringify(res.body));
        });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


