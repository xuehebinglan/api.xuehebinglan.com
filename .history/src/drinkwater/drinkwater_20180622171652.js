var tool = require('../../utils/tools')

module.exports = {
  drinkData: {},
  getDrinkDetail: (username, date) => {
    return new Promise((resolve, reject) => {
      tool.getJSON('drinkwater').then((data) => {
        console.log(data)
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
        } else {
          resolve({
            errmsg: 'success',
            errno: 0,
            data: data[username][date]
          })
        }
      })
    })
  },
  setData(options) {
    console.log('setData')
    console.log('options', options)
    return new Promise((resolve, reject) => {
      tool.getJSON('drinkwater').then((data) => {
        console.log('set')
        console.log('data', data)
        let allDrinkData = Object.assign({}, data)

        if (!(options.username in allDrinkData)) {
          // first init
          allDrinkData[options.username] = {}
        }
        if (!(options.date in allDrinkData[options.username])) {
          // first init
          allDrinkData[options.username][options.date] = {}
        }

        let currentObject = allDrinkData[options.username][options.date]

        !currentObject.user_name && (currentObject.user_name = options.username)

        if (options.operationType === 'add') {
          currentObject.cup_capacity = options.cupCapacity
          currentObject.total_cup_number += -0 + 1
          currentObject.total_drink_water = parseInt(currentObject.total_drink_water) + parseInt(options.cupCapacity)
          currentObject.record_drink.push(options.cupCapacity)
        }
        if (options.operationType === 'sub') {
          currentObject.total_cup_number -= -0 + 1
          currentObject.cup_capacity = currentObject.record_drink.pop()
          currentObject.total_drink_water = parseInt(currentObject.total_drink_water) - parseInt(options.cupCapacity)

        }
        if (options.operationType === 'set') {
          currentObject.cup_capacity = options.cupCapacity
          currentObject.total_drink_water = options.totalDrinkWater
          currentObject.total_cup_number = options.totalCupNumber
          options.recordDrink && (currentObject.record_drink = options.recordDrink)
        }
        this.drinkData = Object.assign({}, allDrinkData)
        resolve(allDrinkData)
      })
    })
  },
  initUserData(username, date, cupCapacity) {
    // 第一次点击喝一杯的时候，应该有 username, date, cupCapacity 三个值，但是总杯数是1，总容量是cupCapacity
    console.log('initUserData')
    console.log(username, date, cupCapacity)
    return new Promise((resolve, reject) => {
      this.setData({
        username,
        date: 'd' + date,
        cupCapacity,
        totalDrinkWater: cupCapacity,
        totalCupNumber: 1,
        recordDrink: [cupCapacity],
        operationType: 'set'
      }).then((allDrinkData) => {
        tool.writeJSON('drinkwater', allDrinkData).then((data) => {
          resolve(data)
        })
      })

    })
  },
  setUserData(username, date, cupCapacity, operationType) {
    console.log('setUserData')
    return new Promise((resolve, reject) => {
      this.setData({
        username,
        date: 'd' + date,
        cupCapacity,
        operationType
      }).then((allDrinkData) => {
        tool.writeJSON('drinkwater', allDrinkData).then((data) => {
          resolve(data)
        })
      })
  })}
}
