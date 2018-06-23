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
      let user_name, cup_capacity, total_drink_water, total_cup_number, record_drink

      if (! username in allDrinkData) {
        // first init
        allDrinkData[username] = {}
      }
      if (! date in allDrinkData[username]) {
        // first init
        allDrinkData[username][date] = {}
      }
      allDrinkData[username][date].user_name = username
      allDrinkData[username][date].cup_capacity = cupCapacity
      allDrinkData[username][date].total_drink_water = totalDrinkWater
      allDrinkData[username][date].total_cup_number = totalCupNumber
      allDrinkData[username][date].record_drink = recordDrink
    })
  },
  initUserData (username, date, cupCapacity) {
    // 第一次点击喝一杯的时候，应该有 username, date, cupCapacity 三个值，但是总杯数是1，总容量是cupCapacity 
    setDrinkCupCapCapacity (username, date, cupCapacity, cupCapacity, 1, [cupCapacity])
  }

}
