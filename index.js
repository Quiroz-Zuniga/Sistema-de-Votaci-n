function SaveUserData (username,email, password){
    localStorage.setItem('Username' ,username );
    localStorage.setItem( 'email' , email );
    localStorage.setItem('password' , password);
}

function getUserData() {
    return{
        username: localStorage.getItem('username'),
        email: localStorage.getItem( 'email'),
        password: localStorage.getItem('password')
    };
}         
//Ejecutar cuando el DOM este completamente cargado
document.addEventListener('DOMContentLoaded' , function() {

    const carrusel = document.querySelector('.carrusel_contenedor');
    const item =  document.querySelectorAll('.carrusel-item');
    const antesBtn = document.querySelector('.antes');
    const sigueBtn = document.querySelector('.sigue')
    let currentIndex = 0;
    
    function updateCarrrusel() {
        const offset = -carrusel * 100;
        carrusel.style.transform = `translateX(${offset}%`
    }

    antesBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : item.length - 1;

    });

    sigueBtn.addEventListener('click', function () {
        currentIndex = (currentIndex < item.length - 1) ? currentIndex + 1 : 0;
        updateCarrrusel();
    });

    //Identificar la pagina actual
    const page = document.body.id;

    //Codigo para la pagina de inicio (index.html)
    if (page === 'indexPage') {
        document.getElementById('registerButton').addEventListener('click',function() {
            window.location.href = 'register.html' ;
        });

        document.getElementById('loginButton').addEventListener('click',function() {
            window.location.href = 'login.html';

        });
    }
// codigo para la pagina de registro (register.html)
if (page ==='registerPage') {
document.getElementById('registerForm').addEventListener('submit' , function(event){
event.preventDefault();
let username = document.getElementById('username').value;
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;
let confirmPassword =document.getElementById('confirm-password').value;

        if(password === confirmPassword) {
            SaveUserData(username, email,password);
            alert('usuario registrado exitosamente. ');
            window.location.href = 'login.html';
    }else{
         alert('Las contraseñas no coinciden. Porfavor,intentelo de nuevo.');
         }
    });
}

//codigo para la pagina de inicio de sesion (login.html)
if (page == 'loginPage') {
    const showPasswordCheckbox = document.getElementById('mostrarcontraseña');
    const passwordInput = document.getElementById('password');
    showPasswordCheckbox.addEventListener('change',function() {
        if(showPasswordCheckbox.checked ) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    document.getElementById ('loginForm').addEventListener('submit',function(event){
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let userData = getUserData();

         if(email === userData.email && password === userData.password){
            alert('inicio de sesion exitoso');
             window.location.href = 'voto.html';

        } else {
                alert('correo electronico o contrseña incorrecos. por favor intentelo de nuevo.');
            }
        });
    }
    // Codigo voto//
    const form = document.getElementsByClassName('.form_voto');
        //Llamamos el evento form//
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
           //Constante para la variable Candidato seleccionado//
            const candidatoSeleccionado = document.querySelector('input[name="candidate"]:checked');

            //Condiciones//
            if (candidatoSeleccionado) {
                
                alert(`Has votado por: ${candidatoSeleccionado.value}`);

                
                localStorage.setItem('voto', candidatoSeleccionado.value);

                
                window.location.href = 'resultado.html';
            } else {
                alert('Por favor, selecciona un candidato antes de votar.');
            }
        });
});



// Código para el nav-bar
let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler');
let dropdownIsOpen = false;

// Manejar menús desplegables
if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`);

      if (target) {
        if (target.classList.contains('show')) {
          target.classList.remove('show');
          dropdownIsOpen = false;
        } else {
          target.classList.add('show');
          dropdownIsOpen = true;
        }
      }
    });
  });
}

window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`);
      let targetIsDropdown = dropdown == event.target;

      if (dropdownButton == event.target) {
        return;
      }

      if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
        dropdown.classList.remove('show');
      }
    });
  }
});

function handleSmallScreens() {
  document.querySelector('.navbar-toggler').addEventListener('click', () => {
    let navbarMenu = document.querySelector('.navbar-menu');

    if (!navbarMenu.classList.contains('active')) {
      navbarMenu.classList.add('active');
    } else {
      navbarMenu.classList.remove('active');
    }
  });
}

handleSmallScreens();


