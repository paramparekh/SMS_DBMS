  let form = document.getElementById('frm');

  form.addEventListener('submit', async function(e) 
  {
      e.preventDefault();
       const formdata = new FormData(this);
       const data=[formdata.get('firstname'),formdata.get('lastname'),formdata.get('Address'),formdata.get('emailid'),formdata.get('gender'),formdata.get('phonenumber')];
      
    
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
       <td>${data[5]}</td>
       <td><button>edit</button><button>delete</button></td>
               </tr>`
     table.innerHTML += row;

     
    })

    
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
                  <td>${data[i].date_of_birth}</td>
                  <td>${data[i].gender}</td>
                  <td>${data[i].contact_number}</td>
                  <td><button>edit</button><button>delete</button></td>
                          </tr>`
                table.innerHTML += row
        }  

      }
      )
    
    }
    
getSupplierdata();
    

    