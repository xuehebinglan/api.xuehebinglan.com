var fs = require('fs')

module.exports = {
    GetToday() {
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
        fs.readFile('./data/user_name.json', (err, data) => {
            if (err) throw err
            let user_info = JSON.parse(data)
            res.send(user_info)
          })
    }
}