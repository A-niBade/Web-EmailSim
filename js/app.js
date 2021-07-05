// VARIABLES
const btnEnviar = document.querySelector('#enviar');
const form = document.querySelector('#enviar-mail');

// VARIABLES DE INPUTS
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto'); 
const mensaje = document.querySelector('#mensaje'); 
const erMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarForm);
    asunto.addEventListener('blur', validarForm);
    mensaje.addEventListener('blur', validarForm);

    form.addEventListener('submit', enviarMail);
}

// FUNCIONES
function iniciarApp() {
    btnEnviar.disabled= true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// VALIDACIONES DE FORMULARIO
function validarForm(e) {
    if(e.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        if(erMail.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no válido');
        }
    }

    if(erMail.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
}

function mostrarError(mensaje) {
    const msjError = document.createElement('p');
    msjError.textContent = mensaje;
    msjError.classList.add('border', 'border-red-500', 'bg-red-500', 'p-3', 'mt-5', 'text-center', 'error', 'text-white', 'font-bold', 'uppercase');
    
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        form.appendChild(msjError);
    }
}

function enviarMail(e) {
    e.preventDefault();

    const spinner = document.querySelector("#spinner");
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        form.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            resetForm();
        }, 5000);
    }, 3000 );
}

function resetForm() {
    form.reset();
    iniciarApp();
}