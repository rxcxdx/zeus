import config from 'config'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(config.get('zeus.eaglePath'))
const sql =
  'DELETE FROM produtos WHERE id="6258344d-0384-4106-88a1-360e4bb0ad8c"'
db.exec(sql, (err) => {
  if (err) console.log(err.message)
})
