let cupones = [
  {
    nombre: "conveniocaja",
    descuento: 5,
    estado: true,
  },
  {
    nombre: "conveniocaja15",
    descuento: 15,
    estado: true,
  },
  {
    nombre: "convenioadultomayor",
    descuento: 25,
    estado: true,
  },
];

/*
function getProducts(){
const request = new XMLHttpRequest();
request.open('GET', "http://localhost:3000/api/productos", false);
request.send(null);
if (request.status === 200) {
  return JSON.parse(request.responseText)
}
}
*/

function revisarDisponibilidad(products){
    productosCarro.forEach((productoStorage) => {
      products.filter((producto) => {
       if (
         producto.sku == productoStorage.sku &&
         productoStorage.cantidad > producto.stock
       ) {
         productoStorage.cantidad = producto.stock;
       }
     });
     localStorage.setItem("productos", JSON.stringify(productosCarro));
    })
    return productosCarro  
} 
 
var host = window.location.protocol + "//" + window.location.host;

async function getProducts(){
  return fetch(host+"/api/productos")
  .then(response => { return response.json()})
  .then(data => {return products=data});
  } 
  

let productosCarro = [];
let precioTotalCompra = 0;
let products=[]

 

 window.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("productos")) {
    productosCarro = JSON.parse(localStorage.getItem("productos"))
    /* products=getProducts()
    revisarDisponibilidad(products)
    actualizarCarro(productosCarro)
    cargarTablaProductos() */
   
    getProducts()
    .then(()=>{revisarDisponibilidad(products)})
    .then(()=>{actualizarCarro(productosCarro)})   
    .then(()=>{cargarTablaProductos()}) 
} 
  else{cargarTablaProductos()}
}); 



function actualizarCarro(listadoProductos){
    localStorage.setItem("productos", JSON.stringify(listadoProductos));

    const valorInicial = 0;
    const sumaProductos = listadoProductos.reduce(
       (acumulador, producto) => acumulador + producto.cantidad, 
       valorInicial

    );

    document.querySelector("#cantidad-productos").innerText = sumaProductos;
} 


function cargarTablaProductos(data) {
    let acumuladorFilas = "";

    precioTotalCompra = 0; 
    productosCarro.forEach((producto, index) => {
        let productoConDetalles = encontrarProducto(producto.sku); 
        let precioUnitario =         productoConDetalles.precio - productoConDetalles.descuento; 
        let totalProducto = producto.cantidad * precioUnitario;
        precioTotalCompra += totalProducto;


        //ARMANDO TABLA
       let template = `
              <tr>
                  <th scope="row">${index + 1}</th>
                  <td>${productoConDetalles.sku}</td>
                  <td>${productoConDetalles.nombre}</td>
                  <td>${productoConDetalles.precio}</td>
                  <td>${productoConDetalles.descuento}</td>
                  <td>${precioUnitario}</td>
                  <td>
                    <button onclick="restar('${productoConDetalles.sku}')">-</button>
                    <input type="number" value=${producto.cantidad} style="width:30px;">
                    <button onclick="sumar('${productoConDetalles.sku}')">+</button>
                  </td>
                  <td>${totalProducto}</td>
              </tr>
      `;
      acumuladorFilas += template;
    });

    document.querySelector("#productos-carrito tbody").innerHTML =
    acumuladorFilas;
  document.querySelector(
    "#precio-total"
  ).innerHTML = `El precio total de la compra es: <strong>$${precioTotalCompra}</strong>`;
}

function encontrarProducto(sku) {
  const resultado = products.filter(producto => producto.sku == sku);
  return resultado[0]
}

//LÓGICA VACIAR CARRITO
document
  .getElementById("btn-vaciar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("productos", "[]");
    location.reload();
  });

//LÓGICA DESCUENTO POR CUPÓN
document.getElementById("btn-descuento").addEventListener("click", function (event) {
    let cuponIngresado = document.getElementById("input-cupon").value;

    let cuponEncontrado = cupones.find(
      (cupon) => cupon.nombre == cuponIngresado
    );


    if (cuponEncontrado && cuponEncontrado.estado == true) {
      alert("cupón encontrado.");
      precioTotalCompra =
        precioTotalCompra -
        (precioTotalCompra * cuponEncontrado.descuento) / 100;
      document.querySelector(
        "#precio-total"
      ).innerHTML = `El precio total de la compra con descuento es: <strong>$${precioTotalCompra}</strong>`;
      cuponEncontrado.estado = false;
    } else {
      alert("El cupón no existe. / o está caducado");
    }
  });


  //RESTAR PRODUCTOS

  function restar(sku){
    productosCarro.forEach((producto, index) => {
      if(sku == producto.sku){
        producto.cantidad = producto.cantidad - 1;
        if(producto.cantidad <= 0){
          if(confirm("Está seguro que desea eliminar?")){
            productosCarro.splice(index, 1)
          }else{
            producto.cantidad =1;
          }
        }
      }
    })
    actualizarCarro(productosCarro);
    cargarTablaProductos();
  }

  //SUMAR PRODUCTOS

  function sumar(sku){
    let productoEncontrado=encontrarProducto(sku)
    productosCarro.forEach((producto, index) => {
      if(sku == producto.sku && productoEncontrado.stock>producto.cantidad ){
        producto.cantidad = producto.cantidad + 1;
      }
      else if(sku == producto.sku && productoEncontrado.stock==producto.cantidad){
        producto.cantidad =productoEncontrado.stock;
        alert(`Stock disponible de ${productoEncontrado.stock} unidades`)
      }
    })
    actualizarCarro(productosCarro);
    cargarTablaProductos();
  }


//LÓGICA DE COMPRA
document.getElementById("boton-pagar").addEventListener("click", function (event) {

  /*
  fetch('http://localhost:3000/api/compraEcommerce/maxIdDetalle', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data=>{
    //dar formato a la fecha
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
      }
    if (mm < 10) {
      mm = '0' + mm;
      }
    var today = dd + '-' + mm + '-' + yyyy;
    
    //dar formato al id de detalle y seguir con la serie
    let maxId=(data.max === null) ? 1 : parseInt(data.max)+1;

    return fetch("http://localhost:3000/api/compraEcommerce", {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "fecha": today,
        "detallepago_id": maxId
      })   
      })
   })
   .then(response => response.json())*/
   if(productosCarro.length>0){
   return fetch(host+"/api/compraEcommerce/compraYDetalle", {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(productosCarro)   
    })
    .then(()=>{
      localStorage.clear()
      setTimeout(function(){location.href=host} , 4000); })  
  }})
