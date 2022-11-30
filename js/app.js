// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let arituculosCarrito = [];

cargarEventListenners();
function cargarEventListenners() {
  // Cuano agregar un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);
  
  // vacial el carrito
  vaciarCarritoBtn.addEventListener("click", () =>{
    arituculosCarrito = [] // reseteamos el arreglo

    limpiarHTML();    // Eliminamos todo el HTML
})
}

// ===============================================
// funciones
function agregarCurso(e) {
  e.preventDefault(); // Prevenimos la accion por defecto

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina el curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id")

    // eliminar del arreglo arituculosCarrito por el data-id
    arituculosCarrito = arituculosCarrito.filter(curso =>curso .id !== cursoId)
    
    carritoHTML(); // iterar sobre el carrito y mostrar el HTML
}
}

// lee el contenido del html al que le dimos click y trae la informacion del curso
function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  // Revisa si un elemento ya existe en el carrito
  const existe = arituculosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // actualizamos la cantidad
    // .map crea un nuevo arreglo
    const cursos = arituculosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son los duplicados
      }
    });
    arituculosCarrito = [...cursos];
  } else {
    arituculosCarrito = [...arituculosCarrito, infoCurso];
  }

  // agrega elementos al arreglo de arituculosCarrito
  carritoHTML();
}

// Muestra el carrico de comprar en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  arituculosCarrito.forEach((curso) => {
    // Haciendo uso de destructuring
    const { imagen, titulo, precio, cantidad, id } = curso;

    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src = "${imagen}" width = "100"/> </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td> <a href ="#"  class="borrar-curso" data-id ="${id}"> X </td>
        `;
    // Agrega el html de carrtito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimna los cursos de dbody
function limpiarHTML() {
  // Forma lenta
  
  // Forma rapida y mas recomendable
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
