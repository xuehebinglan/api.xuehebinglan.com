var tool = require('../../utils/tools')

module.exports =  {
  getDrinkDetail: (username, date) => {
    tool.getJSON('drinkwater').then((data) => {
      console.log("data", data)
    })
  }
}