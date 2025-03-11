function SaveUserData(username, email, password) {
  // Obtener usuarios
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Nuevo Usuario
  let newUsers = {
      username: username,
      email: email,
      password: password
  };

  users.push(newUsers);
  // Guardar en localStorage
  localStorage.setItem('users', JSON.stringify(users));
  console.log("Usuario guardado: ", users);
}

// Función para obtener los datos del usuario
function getUserData() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  const carruselContenedor = document.querySelector('.carrusel_contenedor');
  const items = document.querySelectorAll('.carrusel-item');
  const antesBtn = document.querySelector('.antes');
  const sigueBtn = document.querySelector('.sigue');
  let currentIndex = 0;

  function updateCarrusel() {
      const offset = -currentIndex * 100;
      carruselContenedor.style.transform = `translateX(${offset}%)`;
  }

  antesBtn.addEventListener('click', function () {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      updateCarrusel();
  });

  sigueBtn.addEventListener('click', function () {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      updateCarrusel();
  });

  updateCarrusel();

  // Identificar la página actual
  const page = document.body.id;

  // Código para la página de inicio (index.html)
  if (page === 'indexPage') {
      document.getElementById('registerButton').addEventListener('click', function () {
          window.location.href = 'register.html';
      });

      document.getElementById('loginButton').addEventListener('click', function () {
          window.location.href = 'login.html';
      });
  }

  // Código para la página de registro (register.html)
  if (page === 'registerPage') {
      document.getElementById('registerForm').addEventListener('submit', function (event) {
          event.preventDefault();
          let username = document.getElementById('username').value;
          let email = document.getElementById('email').value;
          let password = document.getElementById('password').value;
          let confirmPassword = document.getElementById('confirm-password').value;

          if (password === confirmPassword) {
              SaveUserData(username, email, password);
              alert('Usuario registrado exitosamente.');
              window.location.href = 'login.html';
          } else {
              alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
          }
      });
  }

  // Código para la página de inicio de sesión (login.html)
  if (page === 'loginPage') {
      const showPasswordCheckbox = document.getElementById('mostrarcontraseña');
      const passwordInput = document.getElementById('password');
      showPasswordCheckbox.addEventListener('change', function () {
          if (showPasswordCheckbox.checked) {
              passwordInput.type = 'text';
          } else {
              passwordInput.type = 'password';
          }
      });

      document.getElementById('loginForm').addEventListener('submit', function (event) {
          event.preventDefault();

          let email = document.getElementById('email').value;
          let password = document.getElementById('password').value;

          // Obtener todos los usuarios
          let users = getUserData();

          // Buscar un usuario que coincida con el correo y la contraseña
          let user = users.find(u => u.email === email && u.password === password);

          if (user) {
              alert('Inicio de sesión exitoso');
              window.location.href = 'voto.html';
          } else {
              alert('Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.');
          }
      });
  }

  // Código para la página de voto (voto.html)
  const form = document.querySelector('.form_voto');
  if (form) {
      form.addEventListener('submit', function (event) {
          event.preventDefault();

          // Obtener el candidato seleccionado
          const candidatoSeleccionado = document.querySelector('input[name="candidate"]:checked');

          // Condiciones
          if (candidatoSeleccionado) {
              alert(`Has votado por: ${candidatoSeleccionado.value}`);

              // Guardar el voto en localStorage
              localStorage.setItem('voto', candidatoSeleccionado.value);

              // Redirigir a la página de resultados
              window.location.href = 'resultado.html';
          } else {
              alert('Por favor, selecciona un candidato antes de votar.');
          }
      });
  }
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

// Seleccionar los elementos HTML relevantes
const toggleMode = document.getElementById('toggleMode');
const modeIcon = document.getElementById('modeIcon');

// Función para alternar entre modo claro y oscuro
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  // Verifica si el modo oscuro está activado
  const isDarkMode = document.body.classList.contains('dark-mode');

  // Guardar la preferencia en localStorage
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
};

// Escuchar el evento de clic en el botón
toggleMode.addEventListener('click', toggleDarkMode);

// Mantener el modo seleccionado al recargar la página
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('darkMode');

  // Si el usuario tenía activado el modo oscuro, aplicarlo
  if (savedMode === 'enabled') {
      document.body.classList.add('dark-mode');
      modeIcon.src = 'img/sol.png';
      modeIcon.alt = 'Modo Claro';
  }
});

