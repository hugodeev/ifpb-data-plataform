'use strict';

/* um truque pra não executar funções muitas vezes seguidas (debounce) */
function debounce(fn, delay = 100) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

/* suavidade na animação (easing) */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

/* TELA DE CARREGAMENTO INICIAL */
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    // espera a barra de progresso terminar antes de sumir
    const hideAfter = window.performance?.now() < 100 ? 1400 : 800;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, hideAfter);
    });

    // segurança: esconde depois de 3s caso o evento 'load' não role
    setTimeout(() => loader.classList.add('hidden'), 3000);
}

/* cursor personalizado (só pra telas grandes, sem toque) */
function initCursor() {
    // detecta se é dispositivo touch - aí não usamos cursor customizado
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let rafId;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // o seguidor tem um movimento mais suave, atrasadinho
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        rafId = requestAnimationFrame(animateCursor);
    }
    rafId = requestAnimationFrame(animateCursor);

    // aumenta o cursor quando passar em cima de elementos clicáveis
    const hoverTargets = 'a, button, [role="button"], .db-card, .viz-card, .highlight-card';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.opacity = '0.5';
            follower.style.width = '56px';
            follower.style.height = '56px';
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
            follower.style.width = '36px';
            follower.style.height = '36px';
        }
    });
}

/* cabeçalho: efeito de rolagem */
function initHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const onScroll = debounce(() => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, 16);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); 
}

/* menu que abre no celular */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;

    let isOpen = false;

    function toggleMenu(open) {
        isOpen = open;
        btn.classList.toggle('active', open);
        btn.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('open', open);
        nav.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', () => toggleMenu(!isOpen));

    // clicou fora do menu? fecha ele.
    document.addEventListener('click', (e) => {
        if (isOpen && !btn.contains(e.target) && !nav.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // tecla ESC também fecha
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) toggleMenu(false);
    });

    // se redimensionar a tela e ela ficar grande, fecha o menu mobile
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 900 && isOpen) toggleMenu(false);
    }, 200));
}

/* efeito de revelar elementos ao rolar a página */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-right');
    if (!elements.length) return;

    // se a pessoa já tiver pedido menos animação, já exibe tudo sem frescura
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // só ativa uma vez
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

/* animação de contador (vai aumentando o número) */
function animateCounter(element, finalValue, duration = 1800, suffix = '') {
    if (!element) return;

    const isDecimal = !Number.isInteger(finalValue);
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = easeOutCubic(progress) * finalValue;

        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
        }

        if (progress < 1) requestAnimationFrame(step);
        else element.textContent = (isDecimal ? finalValue.toFixed(1) : finalValue.toLocaleString('pt-BR')) + suffix;
    }

    requestAnimationFrame(step);
}

/* contadores dos cards de destaque */
function initHighlightCounters() {
    const counterMap = {
        'campi-count':    { value: 23,     suffix: '' },
        'students-count': { value: 28456,  suffix: '' },
        'teachers-count': { value: 1452,   suffix: '' },
        'budget-value':   { value: 382.7,  suffix: '' }
    };

    // só começa a contar quando o card aparecer na tela
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const id = el.id;
                const config = counterMap[id];
                if (config) animateCounter(el, config.value, 1800, config.suffix);
                observer.unobserve(el);
            });
        },
        { threshold: 0.5 }
    );

    Object.keys(counterMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

/* contadores da seção hero */
function initHeroCounters() {
    const stats = document.querySelectorAll('.hero-stat-number[data-target]');
    if (!stats.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const isDecimal = !Number.isInteger(target);
                animateCounter(el, target, 2000, suffix);
                observer.unobserve(el);
            });
        },
        { threshold: 0.5 }
    );

    stats.forEach(el => observer.observe(el));
}

/* marca no menu qual é a página atual */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = (link.getAttribute('href') || '').split('/').pop();
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* dados de exemplo (deixei aqui pra não quebrar nada) */
function loadSampleData() {
    return {
        campuses: [
            { name: 'João Pessoa',    students: 5200, courses: 42 },
            { name: 'Campina Grande', students: 4800, courses: 38 },
            { name: 'Patos',          students: 2100, courses: 22 },
            { name: 'Cajazeiras',     students: 1800, courses: 20 },
            { name: 'Sousa',          students: 1600, courses: 18 }
        ],
        budget: { 2010: 320.5, 2022: 345.2, 2023: 368.9, 2026: 382.7 }
    };
}

function updateDashboard(data) {
    console.log('Dashboard atualizado com:', data);
}

/* micro-interação: card inclina com o mouse (só desktop) */
function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.db-card, .highlight-card, .viz-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* rolagem suave para links internos (âncoras) */
function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
            window.scrollTo({
                top: target.offsetTop - headerH - 16,
                behavior: 'smooth'
            });
        });
    });
}

/* tudo começa a rodar assim que o DOM estiver pronto */
document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initCursor();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initHeroCounters();
    initHighlightCounters();
    highlightCurrentPage();
    initCardTilt();
    initSmoothLinks();

    // carregar dados de exemplo (compatibilidade com versões anteriores)
    setTimeout(() => {
        const data = loadSampleData();
        updateDashboard(data);
    }, 1200);
});