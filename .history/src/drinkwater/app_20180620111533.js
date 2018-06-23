var tool = require('../../../utils/tools')

module.export =  {
  getToday: function (req, res) {
    res.send(tool.GetToday())
  }
}