selectedRow = null;
let x = document.getElementById("add");
    x.addEventListener("click",()=>{
      location.href="../Modules/addMob.html";
  })
  


  function onedit(td)
  {
    
    selectedRow = td.parentElement.parentElement;
    company = selectedRow.cells[1].innerHTML;
    model_name = selectedRow.cells[2].innerHTML;
    quantity = selectedRow.cells[4].innerHTML;
    price = selectedRow.cells[3].innerHTML;
    product_description = selectedRow.cells[5].innerHTML;
    supplier_id = selectedRow.cells[6].innerHTML;
    console.log(price);
    localStorage.setItem("company",company);
    localStorage.setItem("model_name",model_name);
    localStorage.setItem("quantity",quantity);
    localStorage.setItem("price",price);
    localStorage.setItem("product_description",product_description);
    localStorage.setItem("supplier_id",supplier_id);
 
    location.href="addMob.html";
    

  }


  async function onDelete(td)
  {
   
      row = td.parentElement.parentElement;
     
       
     // document.getElementById('myTable').deleteRow(row.rowIndex);

      console.log("I am in deleting mode");
      const id = row.cells[0].innerHTML;
      console.log(id);
      const res = await fetch(`http://localhost:3000/shop/mobile/${id}`,{
        method:"DELETE",
        headers:{
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        },
      //  body:JSON.stringify(id)
      })

      const Data = await res.json();
      console.log(Data.success);
      row.parentElement.removeChild(row);
       
     
     
  }


function getMobiledata()  
{
  var table = document.getElementById('myTable');

  url="http://localhost:3000/shop/Mobpage";
  fetch(url).then(res=>res.json()).then(data=>{
      
    console.log(data);
    
    for (var i = 0; i < data.length; i++)
    {
			var row = `<tr>
							<td>${data[i].product_id}</td>
              <td>${data[i].company}</td>
							<td>${data[i].model_name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].quantity}</td>
              <td>${data[i].product_description}</td>
<<<<<<< HEAD
              <td>${data[i].supplier_id}</td>
              <td><button class='btn btn-primary' onclick="onedit(this)">edit</button></td>
              <td><button class='btn btn-primary'  onclick="ondelete(this)" >delete</button></td>
=======
              <td>${data[i].supplier_name}</td>
              <td><button onclick="onEdit(this)" class='btn btn-primary'>edit</button></td>
              <td><button onclick="onDelete(this)" class='btn btn-primary'>delete</button></td>
>>>>>>> ed930003e0cac78cb431c4c0d18fbb4af71c6c05
					  </tr>`
			table.innerHTML += row;
    }   
    }
  )

}

getMobiledata();

    


