import tool from '../../../utils/tools'

export default {
  getToday: function (req, res) {
    res.send(tool.GetToday())
  }
}