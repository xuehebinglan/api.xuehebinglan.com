var tool = require('../../utils/tools')

module.exports =  {
  getDrinkDetail: (username, date) => {
    return tool.getJSON('drinkwater').then((data) => {
      console.log("data", data)
      resolve(data)
    })
  }
}