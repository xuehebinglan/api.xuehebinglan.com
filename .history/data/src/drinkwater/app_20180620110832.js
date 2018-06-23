import tool from '../../../utils/tools'

export default {
  function (req, res) {
    res.send(tool.GetToday())
  }
}