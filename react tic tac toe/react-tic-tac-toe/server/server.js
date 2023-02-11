const express = require('express');
const scoreboardRouter = require('./routers/scoreboard_api')
const app = express();


app.use(express.json()); 



app.use((req,res,next)=>{
  console.log(req.method)
  // console.log(req.headers)
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next()
})







app.use('/score',scoreboardRouter)



app.listen(4000, () => {
  console.log('Server listening on port 4000');

});

