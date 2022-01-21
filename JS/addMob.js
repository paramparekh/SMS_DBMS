
let form = document.getElementById('frm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formdata=new FormData(form);
  const data=[formdata.get('company'),formdata.get('model_name'),formdata.get('price'),formdata.get('quantity'),formdata
  .get('Supplier_id'),formdata.get('product_description'),formdata.get('status')]

    console.log(data);

    const response=await fetch("http://localhost:3000/shop/Mobpage",
    {
        method: "post",
        headers:{
         'Accept': "application/json",
            "Content-Type": "application/json"
          },
           body:JSON.stringify(data)
      
    })
    
    
    
    const Data=await response.json();
    console.log(Data);
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
               </tr>`;

     table.innerHTML += row;
     alert("data added succesfully");
    
  });

function getSupplierNames(){
  var sp = document.getElementById('ASupplier');
  console.log("Hii");
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

getSupplierNames();