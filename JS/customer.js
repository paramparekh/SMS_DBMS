function getCustomerdata()  
{
  var table = document.getElementById('myTable');

  url="http://localhost:3000/shop/Cuspage";
  fetch(url).then(res=>res.json()).then(data=>{
      
    console.log(data);
    
    for (var i = 0; i < data.length; i++)
    {
			var row = `<tr>
			<td>${data[i].customer_id}</td>
              <td>${data[i].customer_name}</td>
			<td>${data[i].customer_phonenumber}</td>
              <td>${data[i].customer_address}</td>
            </tr>`
			table.innerHTML += row;
    }   
    }
  )

}

getCustomerdata();