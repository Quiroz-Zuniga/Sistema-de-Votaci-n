function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('nav')?.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('nav')?.classList.add('dark-mode');
    }
});

const toggleMode = document.getElementById('toggleMode');
if (toggleMode) {
    toggleMode.addEventListener('click', toggleDarkMode);
}