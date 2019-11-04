'use strict'
// from only git-glitch
const { execSync }    = require('child_process')
const path            = require('path')

// from git-glitch and FreeCodeCamp- Information Security and Quality Assurance
const express         = require('express')
const bodyParser      = require('body-parser')
const app             = express()

// from only FreeCodeCamp- Information Security and Quality Assurance
var expect            = require('chai').expect;
var cors              = require('cors');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

/* app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'README.md'))
}) */

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });
  
  const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
  })
  
  // git-glitch sync code ****************************
  app.post('/deploy', (request, response) => {
    if (request.query.secret !== process.env.SECRET) {
      response.status(401).send()
      return
    }
    
    if (request.body.ref !== 'refs/heads/glitch') {
      response.status(200).send('Push was not to glitch branch, so did not deploy.')
      return
    }
    
    const repoUrl = request.body.repository.git_url
  
    console.log('Fetching latest changes.')
    const output = execSync(
      `git checkout -- ./ && git pull -X theirs ${repoUrl} glitch && refresh`
    ).toString()
    console.log(output)
    response.status(200).send()
  })
  // **************************************