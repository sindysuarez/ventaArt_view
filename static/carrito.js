$( document ).ready(function() {
  $('.ui.dropdown').dropdown();

    renderHTML();

});
$(function(){
  $('#newProduct').submit(function(e){
    var form = document.forms["newProduct"];
    var producto = form.elements["producto"];
    var cantidad = form.elements["cantidad"];
    var valorUnitario = form.elements["valorUnitario"];
    var newproducts = [producto[producto.selectedIndex].text,producto[producto.selectedIndex].value,cantidad.value,valorUnitario.value];
    console.log(newproducts);
    var products=new Array();
    if (localStorage["products"]) {
      products = JSON.parse(localStorage["products"]);
    }
    products.push(newproducts);
    localStorage["products"]=JSON.stringify(products);
    // alert(localStorage["products"]);
    // localStorage.removeItem("products");

    renderHTML();
    return false;
  });
});

function renderHTML() {
  if(localStorage["products"].length!=2){
    var products = JSON.parse(localStorage["products"]);
    var items=" ";
    var i=0;
    var totalFactura = 0;
    for (i; i < products.length; i++) {
      var item = products[i];
      var total = item[2]*item[3];
      totalFactura+=total;
      var info = "<tr><td>"+item[0]+"</td><td>"+item[2]+"</td><td>$"+item[3]+"</td><td>$"+total.toLocaleString()+"</td>";
      var boton = "<td><button class='ui circular icon purple tiny button' onclick='eliminar("+i+")'><i class='trash icon'></i></button></td></tr>";
      var description = info+boton;
      items+=description;
    }
    var totalFac = document.getElementById('total');
    var itemsProducts = document.getElementById('itemsProducts');
    totalFac.value = "$"+totalFactura.toLocaleString();
    itemsProducts.innerHTML = items;
  }else{
    var itemsProducts = document.getElementById('itemsProducts');
    itemsProducts.innerHTML = "<h2 class='ui header'>Aun no se ha agregado productos</h2>";
  }
}

function eliminar(pos) {
  var products = JSON.parse(localStorage["products"]);
  products.splice(pos,1);
  localStorage["products"]=JSON.stringify(products);
  console.log(products);
  renderHTML();
}
