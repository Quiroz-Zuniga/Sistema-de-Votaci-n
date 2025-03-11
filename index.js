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

    // Mostrar/ocultar contraseña
    if (showPasswordCheckbox && passwordInput) {
        showPasswordCheckbox.addEventListener('change', function () {
            passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
        });
    }

    // Manejar el envío del formulario
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let users = getUserData();
        let user = users.find(u => u.email === email);

        if (!user) {
            alert('El correo electrónico no está registrado.');
            return;
        }

        if (user.password === password) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('usuarioActual', JSON.stringify(user)); // Guardar usuario actual
            window.location.href = 'voto.html';
        } else {
            alert('Contraseña incorrecta. Por favor, inténtelo de nuevo.');
        }
    });
}

  // Código para la página de voto (voto.html)
  const form = document.querySelector('.form_voto');
  if (form) {
      form.addEventListener('submit', function (event) {
          event.preventDefault();
  
          const candidatoSeleccionado = document.querySelector('input[name="candidate"]:checked');
  
          if (candidatoSeleccionado) {
              // Obtener el usuario actual (podrías guardar el usuario logueado en localStorage)
              const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  
              if (!usuarioActual) {
                  alert('Debes iniciar sesión para votar.');
                  return;
              }
  
              // Verificar si el usuario ya votó
              let votos = JSON.parse(localStorage.getItem('votos')) || [];
              const usuarioYaVoto = votos.some(voto => voto.usuario.email === usuarioActual.email);
  
              if (usuarioYaVoto) {
                  alert('Ya has votado. No puedes votar más de una vez.');
                  return;
              }
  
              // Guardar el voto
              votos.push({ usuario: usuarioActual, candidato: candidatoSeleccionado.value });
              localStorage.setItem('votos', JSON.stringify(votos));
  
              alert(`Has votado por: ${candidatoSeleccionado.value}`);
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

document.addEventListener('DOMContentLoaded', function () {
    const votos = JSON.parse(localStorage.getItem('votos')) || [];
    const candidatos = ['opcionBukele', 'opcionJuanOrlando', 'opcionJavierMiley', 'opcionSalvadorNasrralla'];

    // Contar votos por candidato
    const conteoVotos = {};
    candidatos.forEach(candidato => {
        conteoVotos[candidato] = votos.filter(voto => voto.candidato === candidato).length;
    });

    // Calcular el total de votos
    const totalVotos = votos.length;

    // Actualizar el ancho de las barras de votos
    candidatos.forEach(candidato => {
        const votosCandidato = conteoVotos[candidato];
        const porcentaje = totalVotos > 0 ? (votosCandidato / totalVotos) * 100 : 0;

        const barra = document.getElementById(`bar${candidato}`);
        if (barra) {
            barra.style.width = `${porcentaje}%`;
        }

        // Mostrar el número de votos
        const votosElement = document.getElementById(`votes${candidato}`);
        if (votosElement) {
            votosElement.textContent = votosCandidato;
        }
    });
});
