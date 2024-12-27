
import mysql from 'mysql2/promise'
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'abrevation123',
    database : 'crud'
})
export default pool;