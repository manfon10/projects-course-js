// Variabes

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Variables para cambpos del form
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListeners();
function eventListeners() {
    //Cuando la App carga
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del frmulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearForm);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursos-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    if(e.target.value.length > 0) {

        //Elimina los errores..

        const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios..');
    }

    if(e.target.type === 'email') {
        //const resultado = e.target.value.indexOf('@'); //indexOf busca dentro de un string que existe un valor, en este caso @
        if(er.test(e.target.value)) {
            const error = document.querySelector('p.error');
                if(error) {
                    error.remove();
                }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursos-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error'); //querySelectAll es para revisar solo un valor, en este caso la clase error.

    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    } 
}

function enviarEmail(e) {
    e.preventDefault();

    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundos coultar spinner y mostrar mensaje.
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje al enviar correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente.';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'font-bold', 'uppercase');

        //Insertar el parrafo antes del spinner.
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //Eliminar el mensae de exito

            resetearForm();
        }, 5000);
    }, 3000);
}

//Funcion para resetear form

function resetearForm() {
    formulario.reset();

    iniciarApp();
}