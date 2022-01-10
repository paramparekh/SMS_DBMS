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

const getSupplierDetail=(request,response)=>{
  pool.query('SELECT * FROM "Supplier"', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })

}

function getcount()
{
    return new Promise(resolve =>{
      var id;
      pool.query('SELECT COUNT(*) as tot FROM "Supplier" ',(error,results)=>{
        if(error){
          throw error
        }
        id = parseInt(results.rows[0].tot, 10) + 1;
        console.log(id);
        resolve(id);
      })
    })
}

const  addSupplier = async (request, response) => {
   
  
     let supplier=request.body;

     const x = await getcount();
     console.log(x);
     var supdata;
   
     supdata=[x,supplier[0]+supplier[1],supplier[2],supplier[3],supplier[4]];
     console.log(supdata);

     pool.query('INSERT INTO "Supplier" (supplier_id, supplier_name, address, email, date_of_birth, gender) VALUES ($1,$2,$3,$4,NOW(),$5)',supdata, (error, results) => {
      console.log("Hii")
      if (error) {
        console.log(error)
        throw error
        
      }
      response.status(200).json(results.rows)
    })

}

module.exports = {
    getMobileDetail,
    getSupplierDetail,
    addSupplier
}