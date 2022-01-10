
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
  //  console.log(data);

    fetch("http://localhost:3000/shop/MobilePage/addMobile",
    {
        method: "post",
        headers:{
         'Accept': "application/json",
            "Content-Type": "application/json"
          },
           body:JSON.stringify(data)
      
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {})
  });

