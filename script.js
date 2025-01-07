// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    // Función para manejar la búsqueda
    function handleSearch(searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        const productos = document.querySelectorAll('.producto');

        productos.forEach(producto => {
            const title = producto.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    }

    // Configuración del buscador desktop
    const desktopSearchInput = document.getElementById('searchInput');
    const desktopSearchButton = document.getElementById('searchButton');

    if (desktopSearchInput && desktopSearchButton) {
        desktopSearchInput.addEventListener('input', () => handleSearch(desktopSearchInput));
        desktopSearchButton.addEventListener('click', () => handleSearch(desktopSearchInput));
    }

    // Configuración del buscador móvil
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchButton = document.getElementById('mobileSearchButton');

    if (mobileSearchInput && mobileSearchButton) {
        mobileSearchInput.addEventListener('input', () => handleSearch(mobileSearchInput));
        mobileSearchButton.addEventListener('click', () => handleSearch(mobileSearchInput));
    }

    // Manejo del tema
    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Configuración del switch de tema desktop
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') === 'dark';
        themeToggle.checked = savedTheme;
        setTheme(savedTheme);

        themeToggle.addEventListener('change', (e) => {
            setTheme(e.target.checked);
            if (mobileThemeToggle) {
                mobileThemeToggle.checked = e.target.checked;
            }
        });
    }

    // Configuración del switch de tema móvil
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        const savedTheme = localStorage.getItem('theme') === 'dark';
        mobileThemeToggle.checked = savedTheme;
        setTheme(savedTheme);

        mobileThemeToggle.addEventListener('change', (e) => {
            setTheme(e.target.checked);
            if (themeToggle) {
                themeToggle.checked = e.target.checked;
            }
        });
    }

    // Manejo del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // WhatsApp functionality
    const productos = document.querySelectorAll('.producto');
    const phoneNumber = '5491141438386'; // Reemplaza con tu número de WhatsApp

    productos.forEach(producto => {
        producto.addEventListener('click', () => {
            const productName = producto.querySelector('h3').textContent;
            const message = `Hola, me interesa este producto: ${productName}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });

        // Agregar estilo de cursor pointer
        producto.style.cursor = 'pointer';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
});
