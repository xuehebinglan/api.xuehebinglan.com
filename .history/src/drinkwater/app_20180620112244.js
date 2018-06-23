var tool = require('../../utils/tools.js')

module.exports =  {
  getToday: function (req, res) {
    debugger
    res.send(tool.GetToday())
  }
}