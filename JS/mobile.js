let x = document.getElementById("add");
    x.addEventListener("click",()=>{
      location.href="../Modules/addMob.html";
  })

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
              <td>${data[i].supplier_name}</td>
              <td><button onclick="onEdit(this)" class='btn btn-primary'>edit</button></td>
              <td><button onclick="onDelete(this)" class='btn btn-primary'>delete</button></td>
					  </tr>`
			table.innerHTML += row;
    }   
    }
  )

}

getMobiledata();

    


