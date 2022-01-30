selectedRow = null;
let x = document.getElementById("add");
    x.addEventListener("click",()=>{
      location.href="../Modules/addMob.html";
  })

 
function getSupplierNames(){
  var sp = document.getElementById('sn');
  //console.log("Hii");
  url="http://localhost:3000/shop/Suppage";
  fetch(url).then(res=>res.json()).then(data=>
    {
    //console.log(data);
    for (var i = 0; i < data.length; i++)
    {
            var opt=document.createElement("OPTION");
            opt.innerHTML=data[i].supplier_name;
            opt.value=data[i].supplier_id;
            sp.options.add(opt);
    }  

  }
  )
}

async function onSave(){
  selectedRow.cells[1].innerHTML = selectedRow.cells[1].children[0].value;
  selectedRow.cells[2].innerHTML = selectedRow.cells[2].children[0].value;
  selectedRow.cells[3].innerHTML = selectedRow.cells[3].children[0].value;
  selectedRow.cells[4].innerHTML = selectedRow.cells[4].children[0].value;
  selectedRow.cells[5].innerHTML = selectedRow.cells[5].children[0].value;
  selectedRow.cells[6].innerHTML = selectedRow.cells[6].children[0].value;
  selectElement = document.getElementById('sn');
  output = selectElement.options[selectElement.selectedIndex].text;
  supplier_id=selectElement.options[selectElement.selectedIndex].value;
  console.log(output)
  selectedRow.cells[7].innerHTML =  output;
  selectedRow.cells[8].children[0].style.display="block";
  selectedRow.cells[9].children[0].style.display="none";
  //Patching data

            console.log("I am in updating mode of mobile");
            const mobile_id = selectedRow.cells[0].innerHTML;
            ndata = [selectedRow.cells[0].innerHTML,selectedRow.cells[1].innerHTML,selectedRow.cells[2].innerHTML,selectedRow.cells[3].innerHTML,selectedRow.cells[4].innerHTML,selectedRow.cells[5].innerHTML,selectedRow.cells[6].innerHTML,supplier_id];
            const response = await fetch(`http://localhost:3000/shop/updatemobile/${mobile_id}`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(ndata)
            })

            const x = await response.json();
            console.log(x.success);

}

function onEdit(td)
  {
    
    selectedRow = td.parentElement.parentElement;
    product_id=selectedRow.cells[0].innerHTML;
    company = selectedRow.cells[1].innerHTML;
    model_name = selectedRow.cells[2].innerHTML;
    quantity = selectedRow.cells[4].innerHTML;
    price = selectedRow.cells[3].innerHTML;
    product_description = selectedRow.cells[5].innerHTML;
    supplier_name = selectedRow.cells[6].innerHTML;
    selectedRow.cells[8].children[0].style.display="none";
    selectedRow.cells[9].innerHTML=`<button onclick='onSave()' class='btn btn-primary' >Save</button>`;
    selectedRow.cells[1].innerHTML="<input type='text' id='company"+product_id+"' value='"+company+"'>";
    selectedRow.cells[2].innerHTML="<input type='text' id='model"+product_id+"' value='"+model_name+"'>";
    selectedRow.cells[4].innerHTML="<input type='text' id='qty"+product_id+"' value='"+quantity+"'>";
    selectedRow.cells[3].innerHTML="<input type='text' id='price"+product_id+"' value='"+price+"'>";
    selectedRow.cells[5].innerHTML="<input type='text' id='pd"+product_id+"' value='"+product_description+"'>"
    selectedRow.cells[6].innerHTML="<select id='sts' class='form-control'><option>true</option><option>false</option></select>"
    selectedRow.cells[7].innerHTML=" <select id='sn' class='form-control'></select>";
    getSupplierNames();

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
              <td>${data[i].product_status}</td>
              <td>${data[i].supplier_name}</td>
              <td><button onclick="onEdit(this)" class='btn btn-primary'>edit</button></td>
              <td></td>
              <td><button onclick="onDelete(this)" class='btn btn-primary'>delete</button></td>
					  </tr>`
			table.innerHTML += row;
    }   
    }
  )

}

getMobiledata();

    


