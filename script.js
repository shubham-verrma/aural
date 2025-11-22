// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ADVANCED INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.feature-card, .stat-card, .testimonial-card, .stat-mini').forEach(card => {
    observer.observe(card);
});

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.5;
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
        }
    }
    
    // Parallax for sections
    document.querySelectorAll('.section-header').forEach(header => {
        const rect = header.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollProgress = (windowHeight - rect.top) / windowHeight;
            header.style.transform = `translateY(${scrollProgress * 20}px)`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// ADVANCED BUTTON ANIMATIONS
// ============================================
document.querySelectorAll('.cta-button-primary, .cta-button-primary-large, .cta-button-nav').forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Add pulse animation
        this.style.animation = 'buttonPulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Magnetic effect on hover
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// CARD TILT EFFECT
// ============================================
document.querySelectorAll('.feature-card, .stat-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ============================================
// TEXT REVEAL ANIMATION
// ============================================
function revealText() {
    // Only apply to section titles, not hero-title
    const textElements = document.querySelectorAll('.section-title');
    
    textElements.forEach(element => {
        if (element.querySelector('span')) return; // Skip if already processed
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    entry.target.style.opacity = '1';
                    entry.target.classList.add('revealed');
                    
                    text.split('').forEach((char, index) => {
                        const span = document.createElement('span');
                        span.textContent = char === ' ' ? '\u00A0' : char;
                        span.style.opacity = '0';
                        span.style.animation = `fadeInChar 0.3s ease forwards ${index * 0.03}s`;
                        entry.target.appendChild(span);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B+';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
    return num.toString();
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number-large, .stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                const multiplier = text.includes('B') ? 1000000000 : text.includes('M') ? 1000000 : text.includes('K') ? 1000 : 1;
                const target = number * multiplier;
                
                statNumber.textContent = '0';
                animateCounter(statNumber, target);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card, .stat-mini').forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// CURSOR FOLLOW EFFECT
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    }
    
    .custom-cursor.hover {
        transform: scale(1.5);
        border-color: rgba(0, 212, 255, 1);
    }
    
    @keyframes buttonPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Cursor hover effects
document.querySelectorAll('a, button, .feature-card, .stat-card').forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-cyan));
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }
`;
document.head.appendChild(progressStyle);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        revealText();
    }, 100);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    updateParallax();
}, 10);

window.addEventListener('scroll', optimizedScroll, { passive: true });
