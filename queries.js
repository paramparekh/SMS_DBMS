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
  pool.query('SELECT "Supplier".supplier_id,"Supplier".supplier_name,"Supplier".address,"Supplier".email, "Supplier".date_of_birth,"Supplier".gender,"Supplier_number".contact_number FROM "Supplier" JOIN "Supplier_number" ON "Supplier".supplier_id = "Supplier_number".supplier_id', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })

}


function getrowcount(table_name)
{
    return new Promise(resolve =>{
      var id;

      text =  "SELECT COUNT(*) AS tot  FROM \"" + table_name + "\"";
       console.log(text);
      pool.query(text,(error,results)=>{
        if(error){
          throw error
        }
        id = parseInt(results.rows[0].tot, 10) + 1;
        console.log(id);
        resolve(id);
      } )
    } )
}

const  addSupplier = async (request, response) => {
   
  
     let supplier=request.body;

     const x = await getrowcount("Supplier");
    // console.log(x);
     var supdata;
   
     supdata=[x,supplier[0]+supplier[1],supplier[2],supplier[3],supplier[4]];
     console.log(supdata);

     pool.query('INSERT INTO "Supplier" (supplier_id, supplier_name, address, email, date_of_birth, gender) VALUES ($1,$2,$3,$4,NOW(),$5)',supdata, (error, results) => {
      
      if (error) {
        throw error 
      }
      response.status(200).json({Lid:x})
    })
 
    

    pool.query('INSERT INTO "Supplier_number" (supplier_id,contact_number) VALUES ($1,$2)',[x,supplier[5]], (error,results) => {
        if(error){
           throw error;
        }
    })    
}

const addmobile = async(request,response) => {
    let mobileDeatils=request.body;
    const x = await getrowcount("Product");
    var product_data,mobile_data;
    //product_data= prdtid,price,qty,status,desc,supid
    product_data=[x,mobileDeatils[2],mobileDeatils[3],mobileDeatils[6],mobileDeatils[5],mobileDeatils[4]];
    //mobile_data=prdtid,company,modelname
    mobile_data=[x,mobileDeatils[0],mobileDeatils[1]];
    console.log(product_data)
    console.log(mobile_data)

    pool.query('INSERT INTO "Product" (product_id, price, quantity, product_status, product_description, supplier_id) VALUES ($1,$2,$3,$4,$5,$6)',product_data, (error, results) => {
      
      if (error) {
        throw error 
      }
      response.status(200).json(product_data)
    })
 
    

    pool.query('INSERT INTO "mobile" (product_id,company,model_name) VALUES ($1,$2,$3)',mobile_data, (error,results) => {
        if(error){
           throw error;
        }
    })   


   
}

module.exports = {
    getMobileDetail,
    getSupplierDetail,
    addSupplier,
    addmobile
}