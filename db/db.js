const fs = require('fs')
const fsPromise = fs.promises

module.exports.db = async () => {
  return await fsPromise.readFile(__dirname + '/db.json', 'utf8')
}
