var fs = require('fs')

module.exports = {
  GetToday () {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()
    let day = today.getDate()
    return {
      CNtoday: year + '年' + (month + 1) + '月' + day + '日',
      year,
      month,
      day
    }
  },
  getJSON (projectName) {
    // 获取整个文件
    console.log('getJSON')
    return new Promise((resolve, reject) => {
      fs.readFile(`./data/${projectName}/${projectName}.json`, (err, data) => {
        if (err) reject(err)
        let drink = JSON.parse(data)
        resolve(drink)
      })
    })
  },
  writeJSON (projectName, newData) {
    console.log('writeJSON')
    let newJson = JSON.stringify(newData)
    return new Promise((resolve, reject) => {
      fs.writeFile(`./data/${projectName}/${projectName}.json`, newJson, (err) => {
        if (err) reject(err)
        resolve({
          errmsg: 'sucess set',
          errno: 0
        })
      })
    })
  }
}
