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
              <td>${data[i].supplier_id}</td>
              <td><button class='btn btn-primary' onclick="onedit(this)">edit</button></td>
              <td><button class='btn btn-primary'  onclick="ondelete(this)" >delete</button></td>
					  </tr>`
			table.innerHTML += row
    }   
    }
  )

}

getMobiledata();

    


