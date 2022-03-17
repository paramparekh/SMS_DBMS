
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