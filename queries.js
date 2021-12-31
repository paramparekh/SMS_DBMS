const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Management System',
  password: 'admin',
  port: 5432,
})


const getMobileDetail = (request, response) => {
  pool.query('SELECT * FROM mobile ORDER BY product_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
