import mysql from 'mysql2/promise';

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'nodejsbasic',
});

export default pool;