const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Management System',
  password: 'admin',
  port: 5432,
})
const deleteSupplier = (request,response) => {
  const Id = parseInt(request.params.id);
  console.log(`deleted id is ${Id}`);
  
  
  pool.query('DELETE FROM public."Supplier" WHERE supplier_id = $1',[Id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({success : "User deleted with ID"})
    }
  )
 // response.status(200).json({success:true})
}

const updateSupplier = (request,response) => {
  const Id = parseInt(request.params.id);
  console.log(`updated id is ${Id}`);
   const udata = request.body;
   console.log(udata);
  pool.query(
    'UPDATE public."Supplier" SET supplier_name= $1,address = $2,email = $3,gender = $4 WHERE supplier_id = $5',
    [udata[0],udata[1],udata[2],udata[3],Id],
    (error, results) => {
      if (error) {
        throw error
      }
     // response.status(200).json({success : "User modified with ID"})
    }
  )

    
  pool.query(
    'UPDATE public."Supplier_number" SET contact_number= $1 WHERE supplier_id = $2',
    [udata[4],Id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({success : "User contact with ID" + Id})
    }
  )
   



 // response.status(200).json({success:true})
}

const getMobileDetail = (request, response) => {
  pool.query('SELECT * FROM mobile JOIN "Product" on "mobile".product_id = "Product".product_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getSupplierDetail=(request,response)=>{
  pool.query('SELECT "Supplier".supplier_id,"Supplier".supplier_name,"Supplier".address,"Supplier".email,"Supplier".gender,"Supplier_number".contact_number FROM "Supplier" JOIN "Supplier_number" ON "Supplier".supplier_id = "Supplier_number".supplier_id', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })

}


function getrowcount(table_name,attr)
{
    return new Promise(resolve =>{
      var id;

      text =  "SELECT MAX(" + attr + ") AS tot  FROM \"" + table_name + "\"";
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

     const x = await getrowcount("Supplier","supplier_id");
     console.log(x);
     var supdata;
   
     supdata=[x,supplier[0],supplier[1],supplier[2],supplier[3]];
     console.log(supdata);

     pool.query('INSERT INTO "Supplier" (supplier_id, supplier_name, address, email, gender) VALUES ($1,$2,$3,$4,$5)',supdata, (error, results) => {
      
      if (error) {
        throw error 
      }
      response.status(200).json({Lid:x})
    })
 
    

    pool.query('INSERT INTO "Supplier_number" (supplier_id,contact_number) VALUES ($1,$2)',[x,supplier[4]], (error,results) => {
        if(error){
           throw error;
        }
    })    
}

const addmobile = (request,response) => {
   console.log(request.body);
   
}


module.exports = {
    getMobileDetail,
    getSupplierDetail,
    addSupplier,
    addmobile,
    updateSupplier,
    deleteSupplier
}