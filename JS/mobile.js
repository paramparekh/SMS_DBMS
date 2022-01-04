let d=document.getElementById("data");
url="http://localhost:3000/Mobpage";
fetch(url).then(res=>res.json()).then(data=>{
  console.log(data)

    d.innerHTML= `
    <div style="background-color: #EBEBEB;">
    <p>${data[0].product_id}</p>
    <p>${data[0].company}</p>
    <p>${data[0].model_name}</p>
    <p>${data[0].IME_no}</p>
    <p>${data[0].battery_no}</p>
    <p>${data[0].charger_no}</p>
    </div>

   
    `  
}
)

