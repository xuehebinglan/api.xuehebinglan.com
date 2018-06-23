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
  setDrinkCupCapCapacity (username, date, cupCapacity, totalDrinkWater, totalCupNumber, recordDrink) {
    tool.getJSON('drinkwater').then((data) => {
      console.log('set')
      let allDrinkData = data
      {
        "user_name": "xjw",
        "cup_capacity": 200,
        "total_drink_water": 300,
        "total_cup_number": 2,
        "record_drink": [100, 200]
      }
    })
  },
  initUserData (username, date, cupCapacity) {
    // 第一次点击喝一杯的时候，应该有 username, date, cupCapacity 三个值，但是总杯数是1，总容量是cupCapacity 
     
  }

}
