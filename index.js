var express = require('express');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 5000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  req.userInfo = {};
  req.userInfo.ipaddres = req.headers['x-forwarded-for'] ||
                          req.connection.remoteAddress;
  req.userInfo.language = req.headers['accept-language'].split(',')[0] ||
                          req.acceptedLanguages;
  req.userInfo.software = req.headers['user-agent'].split('(')[1].split(')')[0];
  next();
});

// app routes
app.get('/', function(req, res) {
  res.json({message: 'hello world'});
});

// api routes
apiRouter = express.Router();
apiRouter.get('/whoami', function(req, res) {
  res.json(req.userInfo);
});

app.use('/api', apiRouter);

app.listen(PORT, function() {
  console.log('running on port ' + PORT);
})
;
