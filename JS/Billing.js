
function onDelete(td){
    selectedRow = td.parentElement.parentElement;
    selectedRow.parentElement.removeChild(selectedRow);
}
var quan;
function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
   if(td.innerHTML=="edit"){
       console.log("edit now...");
       td.innerHTML="save";
       quan = selectedRow.cells[4].innerHTML;
      selectedRow.cells[4].innerHTML="<input type='text' value='"+quan+"'>";
   }
   else{
       console.log("saving...");
       if(selectedRow.cells[4].children[0].value > quan)
       alert('Error : invalid quantity');
       else
       selectedRow.cells[4].innerHTML = selectedRow.cells[4].children[0].value; 
       td.innerHTML="edit";
   }
   
}

function onAdd(td){
    selectedrow=td.parentElement.parentElement;
    var data=new Array();
    for(var i=0;i<5;i++){
        data[i]=selectedrow.cells[i].innerHTML;
    }
    var table = document.getElementById('myTable2');
           var row = `<tr>
          <td>${data[0]}</td>
          <td>${data[1]}</td>
          <td>${data[2]}</td>
          <td>${data[3]}</td>
          <td>${data[4]}</td>
          <td><button type="button" class="btn btn-primary" onclick="onEdit(this)">edit</button>
              <button type="button" class="btn btn-primary" onclick="onDelete(this)">delete</button>
          </td>
                  </tr>`
        table.innerHTML += row;
}

function getMobiledata()  
{
  var table = document.getElementById('myTable');

  url="http://localhost:3000/shop/Mobpage";
  fetch(url).then(res=>res.json()).then(data=>{
      
    console.log(data);
   
        for (var i = 0; i < data.length; i++)
        {
             if(data[i].product_status==1){
                var row = `<tr>
			  <td>${data[i].product_id}</td>
              <td>${data[i].company}</td>
			  <td>${data[i].model_name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].quantity}</td>
              <td>
              <button onclick="onAdd(this)" type="button" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
              </svg>
              </button>
            </td>
              </tr>`
			  table.innerHTML += row;
             }
                
            
			
        }  
    } 
    
  )

}

getMobiledata();




 let custfrm = document.getElementById('Custfrm');

custfrm.addEventListener('submit',async function(e)
{
    e.preventDefault();
    const formdata = new FormData(this);
    const data = [formdata.get('Name'),formdata.get('Address'),formdata.get('phonenumber')];
    const response = await fetch('http://localhost:3000/shop/billpage',{
              method:'POST',
              headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"},
              body:JSON.stringify(data)
          })
          const resx = await response.json();
          console.log(resx.success);
    resetForm();

    if(resx.success=="yes")
    alert("customer added successfully!")
    else
    alert("error : insert customer data again")
})

function resetForm()
{
  document.getElementById("Name").value = "";
  document.getElementById("Address").value = "";
  document.getElementById("phonenumber").value = "";
}  

