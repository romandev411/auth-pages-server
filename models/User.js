const fs = require('fs')
const fsPromise = fs.promises
const PATH_DB = __dirname + '/../db/db.json'
const { db } = require(__dirname + '/../db/db.js')

class User {
  constructor ({ email, password }) {
    this.setId().then(data => {
      this.id = data
    })
    this.email = email
    this.password = password
    this.createAt = new Date()

    this.createUser()

    return Promise.resolve(this)
  }

  async setId () {
    return JSON.parse(await db()).length
  }

  async createUser () {
    const newData = [...JSON.parse(await db()), this]

    fsPromise.writeFile(PATH_DB, JSON.stringify(newData), 'utf8')
  }

  static async getUser (data) {
    const arrayDb = JSON.parse(await db())

    const result = arrayDb.find(el => {
      return el.email === data.login
    })

    if (result?.password === data.password) {
      return result
    } else {
      return false
    }
  }
}

module.exports = User
