const toggleMode = document.getElementById('toggleMode');

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
});

toggleMode.addEventListener('click', function() {

    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);

    const slider = document.querySelector('.slider');
    if (isDarkMode) {
        slider.style.transform = 'translateX(26px)';
    } else {
        slider.style.transform = 'translateX(0)';
    }
});

window.addEventListener('load', function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const slider = document.querySelector('.slider');
        slider.style.transform = 'translateX(26px)';
    }
});

