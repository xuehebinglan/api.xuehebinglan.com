var tool = require('../../utils/tools')

module.exports =  {
  getDrinkDetail: (username, date) => {
    console.log(username, date)
    return tool.getJSON("drinkwater")
  }
}