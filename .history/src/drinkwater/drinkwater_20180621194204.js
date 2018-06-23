var tool = require('../../utils/tools')

module.exports = {
  drinkData: {},
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
  setDrinkCupCapCapacity (options) {
    tool.getJSON('drinkwater').then((data) => {
      console.log('set')
      let allDrinkData = data
      let user_name, cup_capacity, total_drink_water, total_cup_number, record_drink

      if (! options.username in allDrinkData) {
        // first init
        allDrinkData[username] = {}
      }
      if (! options.date in allDrinkData[username]) {
        // first init
        allDrinkData[username][date] = {}
      }
      !allDrinkData[username][date].user_name && (allDrinkData[username][date].user_name = options.username)
      
      if (options.operationType === 'add') {
        allDrinkData[username][date].cup_capacity = options.cupCapacity
        allDrinkData[username][date].total_cup_number += 1
        allDrinkData[username][date].total_drink_water += options.cupCapacity
        allDrinkData[username][date].record_drink.push(options.cupCapacity)
      }
      if (options.operationType === 'sub') {
      }      
      allDrinkData[username][date].cup_capacity = options.cupCapacity
      allDrinkData[username][date].total_drink_water = options.totalDrinkWater
      allDrinkData[username][date].total_cup_number = options.totalCupNumber
      options.recordDrink && (allDrinkData[username][date].record_drink = options.recordDrink)
    })
  },
  initUserData (username, date, cupCapacity) {
    // 第一次点击喝一杯的时候，应该有 username, date, cupCapacity 三个值，但是总杯数是1，总容量是cupCapacity 
    setDrinkCupCapCapacity ({
      username,
      date,
      cupCapacity,
      cupCapacity,
      totalCupNumber: 1,
      recordDrink: [cupCapacity],
      operationType: 'set'
    })
  }

}
