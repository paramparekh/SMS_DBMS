  selectedRow = null;
  let form = document.getElementById('frm');

  function onEdit(td)
  {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("Name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("emailid").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Address").value = selectedRow.cells[2].innerHTML;
    if(selectedRow.cells[4].innerHTML == "Male")
    document.getElementById("gridRadios1").checked = true;
    else
    document.getElementById("gridRadios2").checked = true;
    document.getElementById("phonenumber").value = selectedRow.cells[5].innerHTML;
  }

  async function onDelete(td)
  {
   
      row = td.parentElement.parentElement;
     
       
     // document.getElementById('myTable').deleteRow(row.rowIndex);

      console.log("I am in deleting mode");
      const id = row.cells[0].innerHTML;
      console.log(id);
      const res = await fetch(`http://localhost:3000/shop/${id}`,{
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

  form.addEventListener('submit', async function(e) 
  {
      e.preventDefault();
       const formdata = new FormData(this);
       const data=[formdata.get('Name'),formdata.get('Address'),formdata.get('emailid'),formdata.get('gender'),formdata.get('phonenumber')];
      
           if(selectedRow === null)
           {
              
            const response = await fetch('http://localhost:3000/shop/Suppage',{
              method:'POST',
              headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"},
              body:JSON.stringify(data)
          })
          
           const Data = await response.json();
           console.log(Data.Lid);  
   
           var table = document.getElementById('myTable');
           var row = `<tr>
           <td>${Data.Lid}</td>
          <td>${data[0]}</td>
          <td>${data[1]}</td>
          <td>${data[2]}</td>
          <td>${data[3]}</td>
          <td>${data[4]}</td>
          <td><button onclick="onEdit(this)">edit</button><button onclick="onDelete(this)">delete</button></td>
                  </tr>`
        table.innerHTML += row;

          resetForm();
           }
           else
           {
             console.log("I am in updating mode");
             const id = selectedRow.cells[0].innerHTML;
             ndata = data;
             const response = await fetch(`http://localhost:3000/shop/${id}`,{
               method:"PATCH",
               headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
               body:JSON.stringify(ndata)
             })

             const x = await response.json();
             console.log(x.success);
 
 
             selectedRow.cells[1].innerHTML = ndata[0];
             selectedRow.cells[2].innerHTML = ndata[1];
             selectedRow.cells[3].innerHTML = ndata[2];
             selectedRow.cells[4].innerHTML = ndata[3];
             selectedRow.cells[5].innerHTML = ndata[4];
             
             resetForm();

           }
     
           selectedRow = null;

    })

  function resetForm()
  {
    selectedRow = null;
    document.getElementById("Name").value = "";
    document.getElementById("emailid").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("gridRadios1").checked = false;
    document.getElementById("gridRadios2").checked = false;
    document.getElementById("phonenumber").value = "";
  }  



function getSupplierdata()  
    {
    
      var table = document.getElementById('myTable');
    
      url="http://localhost:3000/shop/Suppage";
      fetch(url).then(res=>res.json()).then(data=>
        {
        console.log(data);
        for (var i = 0; i < data.length; i++)
        {
                var row = `<tr>
                   <td>${data[i].supplier_id}</td>
                  <td>${data[i].supplier_name}</td>
                  <td>${data[i].address}</td>
                  <td>${data[i].email}</td>
                  <td>${data[i].gender}</td>
                  <td>${data[i].contact_number}</td>
                  <td><button onclick="onEdit(this)">edit</button><button onclick="onDelete(this)">delete</button></td>
                          </tr>`
                table.innerHTML += row
        }  

      }
      )
    
    }
 
    
getSupplierdata();
    

    