const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Management System',
  password: 'admin',
  port: 5432,
})


const getMobileDetail = (request, response) => {
  pool.query('SELECT * FROM mobile JOIN "Product" on "mobile".product_id = "Product".product_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addMobile = (request, response) => 
{ 

 /* const { name, email } = request.body;
  
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
*/

 
   console.log(request.body);

     

}

module.exports = {
    getMobileDetail,
    addMobile
}