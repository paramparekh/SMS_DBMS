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
							<td>${data[i].IME_no}</td>
              <td>${data[i].battery_no}</td>
              <td>${data[i].charger_no}</td>
					  </tr>`
			table.innerHTML += row
    }   
    }
  )

}

getMobiledata();

/*

IME_no: "123456789123456"
battery_no: "123456789123456"
charger_no: "123456789123456"
company: "Vivo"
model_name: "91i"
price: "8800"
product_description: "Vivo 91i"
product_id: "1"
product_status: true
purchase_id: "1"
quantity: "5"

*/

