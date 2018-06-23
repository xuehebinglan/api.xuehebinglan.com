var tool = require('../../utils/tools.js')

module.exports =  {
  getToday: function (req, res) {
    res.send(tool.GetToday())
  }
}