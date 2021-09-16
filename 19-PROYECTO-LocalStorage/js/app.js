// Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners

eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo teet
    formulario.addEventListener('submit', agregarTweet);    

    //Cuando el documento esta listo.

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}

//Funciones

function agregarTweet(e) {
    e.preventDefault();

    // Texarea donde el usuario escribe

    const tweet = document.querySelector('#tweet').value;

    // Validacion

    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return; //Evita que se ejecuta mas lineas de codigo.
    }

    //Añadir al arreglo de tweets.

    const tweetObj = {
        id: Date.now(),
        tweet
    };
    tweets = [...tweets, tweetObj];

    //Una vez agregado, crear HTML.
    crearHTML();

    //Reiniciar formulario.

    formulario.reset();
}

//Mostar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove(); //Elimina la alerta despues de 3 segundos.
    }, 3000);
}

//Muestra listado de los tweets

function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            //Agregar un boton.

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion de eliminar.

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el HTML.

            const li = document.createElement('li');

            //Añadir el texto

            li.innerText = tweet.tweet;

            //Asignar el boton.

            li.appendChild(btnEliminar);

            //Insertarlo en el HTML.

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a local Storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Eliminar un tweet

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar HTML.

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}