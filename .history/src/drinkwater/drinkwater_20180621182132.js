var tool = require('../../utils/tools')

module.exports = {
  getDrinkDetail: (username, date) => {
    return new Promise((resolve, reject) => {
      tool.getJSON('drinkwater').then((data) => {
        if (!data[username]) {
          resolve({
            errmsg: 'no such user'
          })
        }
        resolve(data[username][date])
      })
    })
  },

}
