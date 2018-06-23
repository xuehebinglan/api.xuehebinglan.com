var tool = require('../../utils/tools.js')

module.export =  {
  getToday: function (req, res) {
    res.send(tool.GetToday())
  }
}