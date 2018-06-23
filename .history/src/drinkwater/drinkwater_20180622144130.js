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
  setDrinkCupCapCapacity(options) {
    console.log('options', options)
    tool.getJSON('drinkwater').then((data) => {
      console.log('set')
      let allDrinkData = Object.assign({}, data)

      if (!(options.username in allDrinkData)) {
        // first init
        allDrinkData[options.username] = {}
      }
      if (!options.date in allDrinkData[options.username]) {
        // first init
        allDrinkData[options.username][options.date] = {}
      }

      let currentObject = allDrinkData[options.username][options.date]

      !currentObject.user_name && (currentObject.user_name = options.username)

      if (options.operationType === 'add') {
        currentObject.cup_capacity = options.cupCapacity
        currentObject.total_cup_number += 1
        currentObject.total_drink_water += options.cupCapacity
        currentObject.record_drink.push(options.cupCapacity)
      }
      if (options.operationType === 'sub') {
        currentObject.total_cup_number -= 1
        currentObject.cup_capacity = currentObject.record_drink.pop()
        currentObject.total_drink_water -= currentObject.cup_capacity
      }
      if (options.operationType === 'set') {
        currentObject.cup_capacity = options.cupCapacity
        currentObject.total_drink_water = options.totalDrinkWater
        currentObject.total_cup_number = options.totalCupNumber
        options.recordDrink && (currentObject.record_drink = options.recordDrink)
      }

      this.drinkData = Object.assign({}, allDrinkData)
    })
  },
  initUserData(username, date, cupCapacity) {
    // 第一次点击喝一杯的时候，应该有 username, date, cupCapacity 三个值，但是总杯数是1，总容量是cupCapacity
    this.setDrinkCupCapCapacity({
      username,
      date,
      cupCapacity,
      totalDrinkWater: cupCapacity,
      totalCupNumber: 1,
      recordDrink: [cupCapacity],
      operationType: 'set'
    })
    return new Promise((resolve, reject) => {
      tool.writeJSON('drinkwater', this.drinkData).then((data) => {
        resolve(data)
      })
    })
  }
}
