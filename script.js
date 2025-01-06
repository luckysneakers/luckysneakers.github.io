// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }
    
    // Theme switch handler
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const productosContainers = document.querySelectorAll('.productos');
    const marcaSections = document.querySelectorAll('.marca');

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

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Mostrar todo si no hay término de búsqueda
            marcaSections.forEach(section => section.style.display = 'block');
            document.querySelectorAll('.producto').forEach(prod => prod.style.display = 'block');
            return;
        }

        let foundAny = false;
        
        marcaSections.forEach(section => {
            const productos = section.querySelectorAll('.producto');
            let foundInSection = false;
            
            productos.forEach(producto => {
                const title = producto.querySelector('h3').textContent.toLowerCase();
                const shouldShow = title.includes(searchTerm);
                producto.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) {
                    foundInSection = true;
                    foundAny = true;
                }
            });
            
            section.style.display = foundInSection ? 'block' : 'none';
        });

        const noResultsMsg = document.getElementById('noResultsMessage');
        if (!noResultsMsg && !foundAny) {
            const msg = document.createElement('div');
            msg.id = 'noResultsMessage';
            msg.className = 'no-results';
            msg.textContent = 'No se encontraron productos';
            document.querySelector('main').appendChild(msg);
        } else if (noResultsMsg && foundAny) {
            noResultsMsg.remove();
        }
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Mobile Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
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
