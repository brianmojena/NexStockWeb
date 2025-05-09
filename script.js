/* NexStock - Interacciones y Animaciones */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las animaciones y efectos
    initParallaxEffect();
    initScrollAnimations();
    initGlowEffects();
    initMockupAnimations();
    initHoverEffects();
});

// Efecto parallax para elementos de fondo (desactivado para evitar movimiento no deseado)
function initParallaxEffect() {
    // Se ha desactivado el efecto parallax para los mockups
    // Solo mantenemos el efecto sutil en el fondo
    window.addEventListener('mousemove', (e) => {
        const mouseY = e.clientY / window.innerHeight;
        document.querySelector('.noise-overlay').style.opacity = 0.3 + (mouseY * 0.2);
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    // Opciones para el Intersection Observer
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Callback para el Intersection Observer
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    };
    
    // Crear el observer
    const observer = new IntersectionObserver(animateOnScroll, options);
    
    // Elementos a observar para animación
    const elementsToAnimate = [
        ...document.querySelectorAll('.benefit-card'),
        ...document.querySelectorAll('.step'),
        document.querySelector('.philosophy-content'),
        document.querySelector('.interface-showcase'),
        document.querySelector('.final-cta'),
        ...document.querySelectorAll('.section-title')
    ];
    
    // Observar cada elemento
    elementsToAnimate.forEach(element => {
        if (element) {
            // Añadir clase inicial para preparar la animación
            element.classList.add('animate-ready');
            observer.observe(element);
        }
    });
    
    // Animación especial para el hero section al cargar
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) heroContent.classList.add('animate-in');
        if (heroImage) heroImage.classList.add('animate-in');
    }, 300);
}

// Efectos de brillo (glow) en elementos interactivos
function initGlowEffects() {
    // Efecto de brillo al pasar el mouse sobre botones
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x-position', `${x}px`);
            button.style.setProperty('--y-position', `${y}px`);
        });
    });
    
    // Efecto de pulso para elementos con acento
    const pulseElements = document.querySelectorAll('.accent, .benefit-icon, .step-number');
    
    pulseElements.forEach(element => {
        // Crear un efecto de pulso aleatorio
        const duration = 3 + Math.random() * 2; // Entre 3 y 5 segundos
        element.style.animation = `pulse ${duration}s infinite alternate ease-in-out`;
        element.style.animationDelay = `${Math.random() * 2}s`; // Retraso aleatorio
    });
}

// Animaciones simplificadas para el mockup (ahora es una imagen SVG)
function initMockupAnimations() {
    // Animación para el gráfico en la sección de filosofía
    const interfaceChart = document.querySelector('.interface-chart');
    if (interfaceChart) {
        createDynamicChart(interfaceChart);
    }
}

// Crear elementos de datos dinámicos
function createDataItem(item, index) {
    // Crear estructura interna para el elemento de datos
    const title = document.createElement('div');
    title.className = 'data-title';
    title.textContent = ['Ventas', 'Stock', 'Pedidos'][index % 3];
    title.style.color = 'var(--accent-primary)';
    title.style.fontSize = '0.8rem';
    title.style.marginBottom = '5px';
    title.style.fontFamily = 'Orbitron, sans-serif';
    
    const value = document.createElement('div');
    value.className = 'data-value';
    value.textContent = ['$8,540', '342 uds', '15 nuevos'][index % 3];
    value.style.fontSize = '1.2rem';
    value.style.fontWeight = 'bold';
    
    const indicator = document.createElement('div');
    indicator.className = 'data-indicator';
    indicator.textContent = ['+12%', '-8%', '+23%'][index % 3];
    indicator.style.fontSize = '0.8rem';
    indicator.style.color = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-primary)'][index % 3];
    
    // Añadir elementos al contenedor
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.justifyContent = 'center';
    item.style.alignItems = 'center';
    item.style.padding = '10px';
    
    item.appendChild(title);
    item.appendChild(value);
    item.appendChild(indicator);
    
    // Añadir animación de entrada
    item.style.opacity = '0';
    item.style.animation = 'fadeIn 0.5s ease-in-out forwards';
    item.style.animationDelay = `${0.5 + index * 0.2}s`;
}

// Efectos al pasar el mouse sobre elementos
function initHoverEffects() {
    // Efecto en tarjetas de beneficios
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Efecto en pasos
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('mouseenter', () => {
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.2)';
                number.style.transition = 'transform 0.3s ease';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });
    
    // Efecto en enlaces del footer
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
            link.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}

// Añadir estilos CSS para las animaciones
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes dash {
            to { stroke-dashoffset: 0; }
        }
        
        @keyframes pulse {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .hero-content.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .hero-image {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .hero-image.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::after {
            content: '';
            position: absolute;
            top: var(--y-position, 50%);
            left: var(--x-position, 50%);
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            border-radius: 50%;
            transition: width 0.5s ease, height 0.5s ease;
        }
        
        .btn:hover::after {
            width: 200px;
            height: 200px;
        }
    `;
    
    document.head.appendChild(style);
}

// Inicializar estilos de animación
addAnimationStyles();