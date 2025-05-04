//*////////////////////// CARGA LOS ELEMENTOS DESDE UN JSON STRING//////////////////////// *//

const BotonCategoria = document.querySelectorAll(".boton_categoria");
const titulo_principal = document.querySelector(".titulo_principal");
let botonesAgregar = document.querySelectorAll(".producto_agregar");
const numerito = document.querySelector("#numerito");

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

//*////////////////////// push cambio de fondo//////////////////////// *//
const toggle_fondo = document.getElementById("toggle_fondo");
const contenedor_padre = document.querySelector(".contenedor_padre");
const slogan = document.querySelector(".slogan");
const tituloslogan = document.getElementById("tituloslogan");
const titulo_carrusel = document.querySelector(".titulo_carrusel");
const titulo_slider_manual = document.querySelector(".titulo_slider_manual");
const titulolanding = document.querySelector(".titulo_landing");
const slogan_landing = document.querySelector(".parrafo_slogan_inicio");
const elemento = document.getElementsByClassName("elemento ul li");

toggle_fondo.onclick = function () {
  toggle_fondo.classList.toggle("active_fondo");
  contenedor_padre.classList.toggle("active_fondo");
  slogan.classList.toggle("active_fondo");
  tituloslogan.classList.toggle("active_fondo");
  titulo_carrusel.classList.toggle("active_fondo");
  titulo_slider_manual.classList.toggle("active_fondo");
  slogan_landing.classList.toggle("active_fondo");
};

/*////////////////////funcion para cargar peoductos del JSON al galeria de inicio/////////// */
const contenedorProductos = document.querySelector("#contenedor_Productos"); //declaracion

let productos = []; //peticion
fetch("./productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargar_productos(productos);
  });

function cargar_productos(productoElegidos) {
  contenedorProductos.innerHTML = "";

  productoElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <div class="caracteristicas">
   <span class="texto_animadoone">% Talento creatividad e inspiración</span>
     <hr class="linea_twow"><span class="texto_animadotwow">Total exclusividad</span>
    </div>

        <img class="img_producto" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto_detalles">
        
          <h3 class="producto_titulo">${producto.titulo}</h3>
          <div class="carrito_producto_precio">
          </div>

        
          <div class="container_Boton_detalles  " id="containerBotondetalles">
          <div class="content_detalles">
            <h1 class="titulo_detalles"></h1>
            <p class="parrafo_detalles">El desarrollo web es una actividad esencial para cualquier negocio que
              quiera tener presencia y éxito en el entorno digital. Una página web es la carta de presentación de
              una marca, el escaparate de sus productos o servicios, y el canal de comunicación con sus clientes
              <a class="enlace_detalles" href="#">Bigers</a>
            </p>
          </div>
          <div class="togglebtn_detalles"></div>
        </div>
        

        </div>
      `;

    contenedorProductos.append(div);

    /*///////////// eleemnto para activar boton detalles dentro dela funcion cargar peoductos OJOO/////////*/
    const togglebtn = div.querySelector(".togglebtn_detalles");
    const container_Boton_detalles = div.querySelector(
      ".container_Boton_detalles"
    );

    togglebtn.addEventListener("click", function () {
      const detallesAbiertos = document.querySelectorAll(
        ".container_Boton_detalles.active_text"
      );
      detallesAbiertos.forEach((detalleAbierto) => {
        if (detalleAbierto !== container_Boton_detalles) {
          detalleAbierto.classList.remove("active_text");
        }
      });

      container_Boton_detalles.classList.toggle("active_text");
    });
  });
}

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


/* CIERRA EL BOTON CATEGORIA Y CARGA LOS PRODUCTOS DE LA CATEGORIA*/

document.addEventListener("DOMContentLoaded", function () {
  BotonCategoria.forEach((boton) => {
    boton.addEventListener("click", () => {
      const categoriaSeleccionada = boton.dataset.categoria;
      cargar_productos_filtrados(categoriaSeleccionada);

      /**/ /////////////////////FILTRADO LISTA DESPLEGABLE CATEGORIAS PRODUCTOS//////// */

      function cargar_productos_filtrados(categoriaSeleccionada) {
        fetch("./productos.json")
          .then((response) => response.json())
          .then((data) => {
            const productosFiltrados = data.filter(
              (producto) => producto.categoria === categoriaSeleccionada
            );
            mostrar_productos_filtrados(productosFiltrados);
          })
          .catch((error) => console.error("Error al cargar Servicio:", error));
      }
    });

    function mostrar_productos_filtrados(productos) {
      // Aquí deberías tener lógica para mostrar los productos filtrados en tu interfaz
      // Por ejemplo, puedes utilizar la función cargar_productos() con los productos filtrados
      cargar_productos(productos);
    }
  });
});

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*////////////////////////// SCRIPT SLIDER MANUAL//////////////////*/

// Seleccionar elementos del DOM
const carousel = document.querySelector(".carousel"); // Contenedor del carrusel
const firstImg = carousel.querySelectorAll("img")[0]; // Primera imagen del carrusel
const arrowIcons = document.querySelectorAll(".wrapper .cont_controls i "); // Íconos de flecha

// Variables para rastreo del estado del arrastre y desplazamiento
let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

// Función para mostrar u ocultar las flechas de navegación
const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // Ancho de desplazamiento máximo
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block"; // Flecha izquierda
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block"; // Flecha derecha
};

// Event listeners para los íconos de flecha
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const firstImg = carousel.querySelector("img:first-child"); // Seleccionar la primera imagen dentro del carrusel

    if (!firstImg || typeof firstImg.clientWidth === "undefined") {
      return; // Retornar si firstImg o clientWidth no están definidos
    }

    let firstImgWidth = firstImg.clientWidth + 14; // Ancho de la primera imagen + margen
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth; // Desplazamiento
    setTimeout(() => showHideIcons(), 60); // Mostrar/ocultar íconos después de 60ms
  });
});

// Función para desplazamiento automático
const autoSlide = () => {
  const firstImg = carousel.querySelector("img:first-child"); // Seleccionar la primera imagen dentro del carrusel

  if (
    carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth ||
    carousel.scrollLeft <= 0 ||
    !firstImg || // Verificar si firstImg está definido
    typeof firstImg.clientWidth === "undefined" // Verificar si clientWidth está definido en firstImg
  ) {
    return; // Retornar si no hay más imágenes hacia la izquierda o si firstImg o clientWidth no están definidos
  }

  let positionDiff = Math.abs(positionDiff); // Hacer positionDiff positivo
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // Si el usuario desplaza hacia la derecha
    carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  } else {
    // Si el usuario desplaza hacia la izquierda
    carousel.scrollLeft -=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
};


/**/ ///////////////// FUNCION DE CONTROLES CLICK ESLIDER PRODUCTOS O SERVICIOS/////////// */
document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("contenedor_Productos");
  const botonIzquierda = document.getElementById("left");
  const botonDerecha = document.getElementById("right");

  // Ancho de desplazamiento, ajusta el valor según la cantidad de imágenes que quieras mostrar a la vez
  const anchoDesplazamiento = 350;

  // Función para desplazar hacia la izquierda
  botonIzquierda.addEventListener("click", function () {
    contenedor.scrollLeft -= anchoDesplazamiento;
  });

  // Función para desplazar hacia la derecha
  botonDerecha.addEventListener("click", function () {
    contenedor.scrollLeft += anchoDesplazamiento;
  });
});
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//


// funcion para abrir menu lateral//
function toggleMenu() {
  const menulateral = document.getElementById('menu_lateral');
  menulateral.classList.toggle('abierto');
  
}
function closeMenu() {
  const menulateral = document.getElementById('menu_lateral');
  menulateral.classList.remove('abierto');
}