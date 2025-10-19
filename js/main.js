let burger = document.querySelector('.burger');
let nav = document.querySelector('.nav');
let blur = document.querySelector('.blur');
let closeMenu = document.querySelector(".close-menu");
let closeModal = document.querySelectorAll(".close-modal");
let modal = document.querySelectorAll(".modal-detalles");
let verMas = document.querySelectorAll(".ver-mas");
let enlacesNav = document.querySelectorAll('.nav_menu a');

// Cerrar menú al hacer clic en un enlace de navegación
enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', () => {
        btn_menu();
        posicion_blur();
        scroll_off();
    });
});

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

let modales = document.querySelectorAll(".modal-detalles");

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
  
const campos = [
  document.getElementById('nombre'),
  document.getElementById('email'),
  document.getElementById('mensaje')
];

const estados = document.querySelectorAll('.estado-form .estado');
const enviarBtn = document.querySelector('.btn-enviar');
const form = document.querySelector('.form-contacto');

let confir1 = document.querySelector('.confirmacion1');
let confir2 = document.querySelector('.confirmacion2');

// función para verificar si todos los campos están llenos
function verificarCampos() {
  const todosLlenos = campos.every(campo => campo.value.trim() !== '');
  enviarBtn.style.animation = todosLlenos ? 'enviarForm 3s infinite' : 'none';
}

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


form.addEventListener('submit', async e => {
  e.preventDefault();

  // animaciones
  confir1.style.animation = 'none';
  confir2.style.animation = 'none';
  void confir1.offsetWidth;
  void confir2.offsetWidth;
  confir1.style.animation = 'confir1 10s forwards';
  confir2.style.animation = 'confir2 10s forwards';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      verificarCampos();
      console.log("Formulario enviado con éxito");
    } else {
      console.error("Error al enviar el formulario");
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
});

const doom = document.querySelector(".doom");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");

const preferenciaGuardada = localStorage.getItem('modo');
const sistemaOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (preferenciaGuardada === 'oscuro' || (!preferenciaGuardada && sistemaOscuro)) {
  document.body.classList.add('modo-osc');
  sun.classList.add("sun-a");
  moon.classList.remove("moon-a")
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('modo')) {
    if (e.matches) {
      document.body.classList.add('modo-osc');
      moon.classList.remove("moon-a");
      sun.classList.add("sun-a");
    } else {
      document.body.classList.remove('modo-osc');
      moon.classList.add("moon-a");
      sun.classList.remove("sun-a");
    }
  }
});

doom.addEventListener("click", () => {
  document.body.classList.toggle("modo-osc");
  const modo = document.body.classList.contains("modo-osc") ? "oscuro" : "claro";
  modo == "oscuro" ? moon.classList.remove("moon-a") :  moon.classList.add("moon-a");
  modo == "oscuro" ? sun.classList.add("sun-a") :  sun.classList.remove("sun-a");
  localStorage.setItem("modo", modo);
});
