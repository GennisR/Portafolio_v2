let burger = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let blur = document.querySelector('.blur');
let closeMenu = document.querySelector(".close-menu");
let closeModal = document.querySelectorAll(".close-modal");
let modal = document.querySelectorAll(".modal-detalles");
let verMas = document.querySelectorAll(".ver-mas");

function btn_menu() {
    burger.classList.toggle('burger-activo');
    nav.classList.toggle('nav-activo');
    blur.classList.toggle('blur-activo');
};

function posicion_blur() {
    if (blur.classList.contains('blur-activo')) {
        blur.classList.add('blur-posicion');
    } else {
        setTimeout(() => {
            blur.classList.remove('blur-posicion');
        }, 500);
    }
};

function scroll_off(){
    document.body.style.overflow = blur.classList.contains('blur-activo') ? 'hidden' : 'auto';
};



//--------Activacion del menu y blur//

burger.addEventListener('click', () => {
    btn_menu();
    posicion_blur();
    scroll_off();
});

closeMenu.addEventListener('click',()=>{
    btn_menu();
    posicion_blur();
    scroll_off();
});

blur.addEventListener('click',()=>{
    if(blur.classList.contains('blur-activo') || nav.classList.contains('nav-activo') || modal.classList.contains('modal-activo')){
        blur.classList.remove('blur-activo');
        nav.classList.remove('nav-activo');
        burger.classList.remove('burger-activo');
        modal.forEach(modal => modal.classList.remove('modal-activo'));
        posicion_blur();
        burger.style.zIndex = '1000';
        scroll_off();
    }
});


//--------Activacion del modal y blur//


let modales = document.querySelectorAll(".modal-detalles");
 // si tienes un fondo desenfocado

// Abrir modal
verMas.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        modales[index].classList.add("modal-activo");
        blur.classList.add('blur-activo');
        posicion_blur();
        burger.style.zIndex = '100';
        scroll_off();
    });
});

// Cerrar modal
closeModal.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        modales[index].classList.remove("modal-activo");
        blur.classList.remove('blur-activo');
        posicion_blur();
        scroll_off();
        burger.style.zIndex = '1000';
    });
});
  
//--------Formulario de contacto//

const campos = [
  document.getElementById('nombre'),
  document.getElementById('email'),
  document.getElementById('mensaje')
];

const estados = document.querySelectorAll('.estado-form .estado');
const enviarBtn = document.querySelector('.btn-enviar');
const form = document.querySelector('.form-contacto');

// crea dinámicamente los elementos de confirmación (si no existen)
let confir1 = document.querySelector('.confirmacion1');
let confir2 = document.querySelector('.confirmacion2');

// función para verificar si todos los campos están llenos
function verificarCampos() {
  const todosLlenos = campos.every(campo => campo.value.trim() !== '');
  enviarBtn.style.animation = todosLlenos ? 'enviarForm 3s infinite' : 'none';
}

// manejar blur (cuando pierde el foco)
campos.forEach((campo, index) => {
  campo.addEventListener('blur', () => {
    if (campo.value.trim() !== '') {
      estados[index].classList.add('estado-activo');
    } else {
      estados[index].classList.remove('estado-activo');
    }
    verificarCampos();
  });

  campo.addEventListener('input', verificarCampos);
});

// permitir enfocar el campo al hacer clic en su estado
document.querySelectorAll('.estado').forEach(estado => {
  estado.addEventListener('click', () => {
    const targetId = estado.getAttribute('data-input');
    const input = document.getElementById(targetId);
    if (input) input.focus();
  });
});

// al enviar el formulario, activar animaciones
form.addEventListener('submit', e => {
  e.preventDefault(); // evita recargar la página

  // quitar animaciones si ya se habían usado antes
  confir1.style.animation = 'none';
  confir2.style.animation = 'none';
  void confir1.offsetWidth; // “reflow” para reiniciar animación
  void confir2.offsetWidth;

  // activar animaciones
  confir1.style.animation = 'confir1 10s forwards';
  confir2.style.animation = 'confir2 10s forwards';

  // opcional: limpiar campos y desactivar botón animado
  form.reset();
  verificarCampos();
});

