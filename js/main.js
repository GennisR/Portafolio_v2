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
    });
});
