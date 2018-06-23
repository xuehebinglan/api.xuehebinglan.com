var tool = require('../../utils/tools')

module.exports = {
  getDrinkDetail: (username, date) => {
    return new Promise((resolve, reject) => {
      tool.getJSON('drinkwater').then((data) => {
        if (!data[username]) {
          resolve({
            errmsg: 'no such user',
            errno: 1
          })
        } else if (!data[username][date]) {
          resolve({
            errmsg: 'no such date',
            errno: 2
          })
        }
        resolve({
          errmsg: 'success',
          errno: 0,
          data: data[username][date]
        })
      })
    })
  },

}
