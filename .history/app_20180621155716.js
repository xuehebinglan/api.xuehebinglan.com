var tool = require('./utils/tools')

var express = require('express')
var app = express()
var fs = require('fs')

var user_name_file_is_writting = false
app.use('/static', express.static('public'));

var routerFunctions = require('./src/index')

// let apiPath = {
//   '/': function (req, res) {
//     res.sendFile( __dirname + '/' + 'index.html')
//   },
//   '/api/get_today': (req, res) => routerFunctions.drinkwater.getToday(req, res)
// }


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => res.send('err!!!!'))

// app.get('/api/get_today', apiPath['/api/get_today'])

app.get('/drinkwater/*', function (req, res) {
  console.log(routerFunctions)
  console.log(routerFunctions.drinkwater.getDrinkDetail('a', 'b'))
  // fs.readFile('./data/drinkwater/drinkwater.json', (err, data) => {
  //   if (err) throw err
  //   let user_info = JSON.parse(data)
  //   res.send(user_info)
  // })
  
  res.send(routerFunctions.drinkwater.getDrinkDetail('xjw', 20180621))
})

app.get('/api/get_name', (req, res) => {
  if (user_name_file_is_writting) {
    res.send("busy")
    return
  }
  fs.readFile('./data/user_name.json', (err, data) => {
    if (err) throw err
    let user_info = JSON.parse(data)
    res.send(user_info)
  })
})

app.get('/api/get_info', (req, res) => res.send({'a':1, 'b': ['sa', 2]}))

app.get('/api/set_name', (req, res) => {
  if (user_name_file_is_writting) {
    res.send("busy")
    return
  }

  let name = req.param('name')
  console.log(name)
  let user_info = {'name': name}
  let user_info_str = JSON.stringify(user_info)
  user_name_file_is_writting = true
  fs.writeFile('user_name.json', user_info_str, (err) => {
    user_name_file_is_writting = false
    if (err) throw err
    res.send('set name ok')
  })
})

app.listen(9998, 'localhost')
