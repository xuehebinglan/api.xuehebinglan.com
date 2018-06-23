var tool = require('../../utils/tools')

module.exports =  {
  getDrinkDetail: (username, date) => {
    return new Promise((resolve, reject) => {
      tool.getJSON('drinkwater').then((data) => {
      resolve(data)
    })
  })
  }
}