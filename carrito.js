let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCarritoComparado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const numerito = document.querySelector("#numerito");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const BotonDeCategoria = document.querySelectorAll(".boton_categoria");
const form = document.querySelector("#form");


//////////////////////// control menu lateral///////////////////
const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside_visible");
})
    
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
})
  
BotonDeCategoria.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
}))
//////////////////////////////////////////////////////////////////
 

BotonDeCategoria.forEach(boton => {
  boton.addEventListener("click", (e) => {


    BotonDeCategoria.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

      titulo_principal.innerText = productoCategoria.categoria.nombre;

      const productosBoton = productos.filter(producto => producto.categoria.id === e.
        currentTarget.id);
      cargar_productos(productosBoton);
    } else {
      titulo_principal.innerText = "Todos los Servicios.";
      cargar_productos(productos);
    }

  })
});



function cargarProductosCarrito() {


  actualizarNumerito(); //actulaiza el numerito

  
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComparado.classList.add("disabled");
    form.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito_producto");
      div.innerHTML = ` 
                <img class="carrito_producto_imagen" src="${
                  producto.imagen
                }" alt="${producto.titulo}">
               <div class="carrito_producto_titulo">
                
                  <h3>${producto.titulo}</h3>
                </div>
      
               <div class="carrito_producto_cantidad">
                  <small>Cantidad</small>
                  <p>  Un.  ${producto.cantidad}</p>
               </div>
      
         
              </div>
              <button class="carrito_producto_eliminar" id="${
                producto.id
              }"><i class="bi bi-trash"></i></button>
      
          `;
      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComparado.classList.add("disabled");
    form.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}



function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `COP ${new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalCalculado)}`;
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  actualizarNumerito(); //actulaiza el numerito

  botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}


function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}


function eliminarDelCarrito(e) {
  ///////////////Libreria producto eliminado  "Toastify"////////
  Toastify({
    text: "Recerva eliminada",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right,#28c8fc,rgb(148, 31, 31))",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: "2vh",
    },
    offset: {
      x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  ////////////libreria de alerta  =  "sweetAlert" ///////////////////////
  Swal.fire({
    title: "¿Estás seguro?",
    icon: "question",
    html: `Se van a borrar ${productosEnCarrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    )} Recervas.`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
      );
      cargarProductosCarrito();
    }
  });
}
//////////////////////////////////////////////////////////

//  FUNCION PARA TOMAR CAPTURA DE PANTALLA SE EJECUTA EN EVENTO CLIK comparcarrito*/

//Función para tomar la captura de pantalla
function tomarCapturaDePantalla() {
  const carritoProductos = document.getElementById("carritoProductos");
  const totalEnFormularioElemento =
    document.getElementById("totalEnFormulario");
  const imagenCapturadaElemento = document.getElementById("imagenCapturada");

  // Obtener el valor total antes de tomar la captura
  const totalAntesDeCaptura = total.innerText;

  html2canvas(carritoProductos).then((canvas) => {
    // Convertir el canvas a una imagen base64
    const imagenCapturada = canvas.toDataURL("image/png");

    // Establecer la imagen en el elemento img
    imagenCapturadaElemento.src = imagenCapturada;
    imagenCapturadaElemento.style.display = "block";

    // Actualizar el total con el valor antes de la captura
    total.innerText = totalAntesDeCaptura;

    // Mostrar el total en el formulario
    //totalEnFormularioElemento.innerText = `Total: ${totalAntesDeCaptura}`; no borrar

    // Guardar el total en el localStorage
    localStorage.setItem("totalCarrito", totalAntesDeCaptura);

    // Guardar la imagen y el total en el localStorage
    localStorage.setItem(
      "capturaCarrito",
      JSON.stringify({ imagen: imagenCapturada, total: totalAntesDeCaptura })
    );
  });
}

////////////////////////////////////////////////////////////////////

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

  actualizarNumerito(); //actulaiza el numerito

  const totalEnFormularioElemento =
    document.getElementById("totalEnFormulario");
  // Mostrar la captura de pantalla antes de enviar el formulario
  tomarCapturaDePantalla();

  ///elemento visibles y no visibles //////////////
  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComparado.classList.remove("disabled");
  form.classList.remove("disabled");
  /////////////////////////////////////////////////////////////////////

  // Construir el array con detalles de productos
  
  const detallesProductos = productosEnCarrito.map(
    (producto) => `
  NOMBRE: ${producto.titulo}

  PRECIO Un:COP ${new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(producto.precio)}

  CANTIDAD: ${producto.cantidad} 
  
  SUB_TOTAL:COP ${new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(producto.precio * producto.cantidad)}
  
`
  );

  // Calcular el total de la compra
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `COP ${new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(totalCalculado)}`;

  // Unir los detalles de productos en un solo string
  const detallesProductosHTML = detallesProductos.join("");

  // Obtener el contenedor de detallesProductos (lista)
  const detallesProductosList = document.getElementById("detallesProductos");

  // Asignar los detalles de productos a la lista
  detallesProductosList.innerHTML = detallesProductosHTML;

  // Enviar el formulario
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_wx2zj1j"; //enlaces de servicio emailjs//
    const templateID = "template_kcfw06u";

    // elementos que se enviaran del formulario/////

    emailjs
      .send(serviceID, templateID, {
        nombre_id: document.getElementById("nombre").value,
        correo_id: document.getElementById("correo_id").value,
        telefono_id: document.getElementById("telefono_id").value,
        direccion_id: document.getElementById("direccion_id").value,
        ciudad_id: document.getElementById("ciudad_id").value,
        mensaje_id: document.getElementById("mensaje").value,


        
        //capturaPantallaBase64: capturaPantallaBase64.value,
        imagenCapturada: document.getElementById("imagenCapturada"),
        detallesProductos: detallesProductosHTML,
        total: `COP ${new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(totalCalculado)}`,

        form,
      })
      //invocasion  sweetalert
      .then(
        Swal.fire({
          title: "¿Solicitud enviada...?",
          icon: "question",
          html: `${productosEnCarrito.reduce(
            (acc, producto) => acc + producto.cantidad,
            0
          )} Recervas.`,
        }).then((result) => {
          if (result.isConfirmed) {
            // Limpiar el carrito
            productosEnCarrito.length = 0;
            localStorage.setItem(
              "productos-en-carrito",
              JSON.stringify(productosEnCarrito)
            );
            cargarProductosCarrito();
          } else {
            cargarProductosCarrito();
          }
        })
      );
  });
}
// FIN DE LA FUNCION COMPRAR CARRITO////
