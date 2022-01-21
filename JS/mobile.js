let x = document.getElementById("add");
    x.addEventListener("click",()=>{
      location.href="../Modules/addMob.html";
  })
  
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
              <td><button class='btn btn-primary'>edit</button></td>
              <td><button class='btn btn-primary'>delete</button></td>
					  </tr>`
			table.innerHTML += row
    }   
    }
  )

}

getMobiledata();

    


