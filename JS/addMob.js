function addmobile()
{   
        let frm = document.getElementById('frm');
        frm.addEventListener('submit', function (e) {
        e.preventDefault();


        let company = document.getElementsByName("company");
        let model_name = document.getElementsByName("model_name");
        let price = document.getElementsByName("price");
        let quantity = document.getElementsByName("quantity");
        let state = document.getElementsByName('inputState');

        let rtdata = { company, model_name, price, quantity, state };

        console.log(rtdata);
       
    })
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data);

    fetch("http://localhost:3000/shop/Mobpage",
    {
        method: "post",
        headers:{
         'Accept': "application/json",
            "Content-Type": "application/json"
          },
           body:JSON.stringify(data)
      
    })
    .then(function (res) { return res.json(); })
    .then(function (data) { })
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