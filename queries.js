const { response } = require('express');
const { request } = require('express');

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
const deletemobile=(request,response)=>{
  const Id = parseInt(request.params.id);
  console.log(`deleted id is ${Id}`);
  
  
  pool.query('DELETE FROM public."Product" WHERE product_id = $1',[Id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({success : "User deleted with ID"})
    }
  )
}
const updateMobile = (request,response)=>{
  const Id = parseInt(request.params.mobile_id);
  console.log(`updated mobile id is ${Id}`);
   const udata = request.body;
   //0: product_id
   //1: company
   //2: model name
   //3: price
   //4: quantity
   //5: product_desription
   //6: product_status
   //7: suplier_name
   console.log(udata);
  pool.query(
    'UPDATE public."Product" SET supplier_id=$2,price=$3,quantity=$4,product_status=$5,product_description=$6 WHERE product_id = $1',
    [udata[0],udata[7],udata[3],udata[4],udata[6],udata[5]],
    (error, results) => {
      if (error) {
        throw error
      }
     // response.status(200).json({success : "User modified with ID"})
    }
  )

    
  pool.query(
    'UPDATE public."mobile" SET company=$1,model_name=$2 WHERE product_id = $3',
    [udata[1],udata[2],udata[0]],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({success : "Mobile with ID" + Id})
    }
  )
   


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
  pool.query('SELECT * FROM (mobile JOIN "Product"  on "mobile".product_id = "Product".product_id  JOIN "Supplier" on "Product".supplier_id="Supplier".supplier_id) ', (error, results) => {
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
        if(results.rows[0].tot!=null)
        id = parseInt(results.rows[0].tot, 10) + 1;
        else
        id=1;
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

const addmobile = async(request,response) => {
    let mobileDeatils=request.body;
    const x = await getrowcount("Product","product_id");
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

const addcustomer = async(request,response) =>{
  let Customer=request.body;


  const x = await getrowcount("Customer","customer_id");
  console.log(x);

  var cusdata;
   /* name,addr,phonenum */
  cusdata=[x,Customer[0],Customer[2],Customer[1]];//,Customer[2],Customer[3]];
  console.log(cusdata);

  pool.query('INSERT INTO "Customer" (customer_id, customer_name,customer_phonenumber,customer_address) VALUES ($1,$2,$3,$4)',cusdata, (error, results) => {
   
   if (error) {
     throw error 
   }
   response.status(200).json({success:"yes"})
 })

  
}

const getcustomerDetail = async(request,response)=>{
  pool.query('SELECT * FROM "Customer" ', (error, results) => {
    if (error) {
      throw error
    }
   
    response.status(200).json(results.rows)
  })
}
module.exports = {
    getMobileDetail,
    getSupplierDetail,
    addSupplier,
    addmobile,
    updateSupplier,
    deleteSupplier,
    deletemobile,
    updateMobile,
    addcustomer,
    getcustomerDetail
}