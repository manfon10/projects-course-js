//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos de carrito

    carrito.addEventListener('click', eliminarCurso);

    //Variar el carrito

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el carrito

        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e) {
    e.preventDefault(); //Prevenimos la accion del href del signo #
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;//parentElement nos trae la info al cual le damos click.
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo articulosCarrito por el id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //Iteramos en el nuevo carrito.
    }
}

//Funcion pára leer el contenido del HTML al que le dimmos click y extraer la info del curso

function leerDatosCurso(curso) {
    //Crear objeto del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Validar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
        if(existe){
            //Actualizamos la cantidad
            const cursos = articulosCarrito.map( curso => {
                if(curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso; //Retorna el objeto actualizado
                }else {
                    return curso; //Retorna los objetos que no son duplicados.
                }
            });

            articulosCarrito = [...cursos];
        }else{
            //Agregar elementos al arreglo de carritos
            articulosCarrito = [...articulosCarrito, infoCurso];
        }

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de comprar en el HTML

function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    //Recorrer carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

    //Agregar en el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos de tbody

function limpiarHTML() {
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma de limpiar->removeChild un hijo->firstChild del padre->contenedorCarrito.
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}