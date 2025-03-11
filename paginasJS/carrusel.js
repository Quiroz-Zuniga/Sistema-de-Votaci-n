document.addEventListener('DOMContentLoaded', function () {
    const carruselContenedor = document.querySelector('.carrusel_contenedor');
    const antesBtn = document.querySelector('.antes');
    const sigueBtn = document.querySelector('.sigue');

    if (carruselContenedor && antesBtn && sigueBtn) {
        const items = document.querySelectorAll('.carrusel-item');
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
    }
});