// Configurações iniciais
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initMobileMenu();
    initDataCounters();
    initChartPlaceholders();
    
    // Verificar página atual para destacar navegação
    highlightCurrentPage();
    
    // Configurar ano atual no footer (se aplicável)
    setCurrentYear();
});

// Menu Mobile
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '100%';
            navList.style.left = '0';
            navList.style.right = '0';
            navList.style.backgroundColor = 'white';
            navList.style.padding = '20px';
            navList.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            navList.style.gap = '15px';
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!menuBtn.contains(event.target) && !navList.contains(event.target)) {
                navList.style.display = 'none';
            }
        });
    }
}

// Animação dos contadores nos cards
function initDataCounters() {
    // Valores finais (simulados - depois virão de API)
    const finalValues = {
        'campi-count': 23,
        'students-count': 28000,
        'teachers-count': 1452,
        'budget-value': 382.7
    };
    
    // Animar cada contador
    Object.keys(finalValues).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            animateCounter(element, finalValues[id]);
        }
    });
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const duration = 2000; // 2 segundos
    const increment = finalValue / (duration / 16); // 60fps
    const isDecimal = finalValue % 1 !== 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        // Formatar o valor
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString('pt-BR');
        }
    }, 16);
}

// Interatividade nos placeholders de gráficos
function initChartPlaceholders() {
    const vizPlaceholders = document.querySelectorAll('.viz-placeholder');
    
    vizPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        placeholder.addEventListener('click', function() {
            const parent = this.closest('.viz-preview');
            const link = parent.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

// Destacar página atual na navegação
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Definir ano atual no footer (se houver elemento com id "current-year")
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Simulação de carregamento de dados (para demonstração)
function loadSampleData() {
    // Esta função seria substituída por uma chamada real à API JP, CG, PT, Cajazeiras e Sousa
    console.log('Carregando dados do IFPB...');
    
    // Dados de exemplo
    const sampleData = {
        campuses: [
            { name: 'João Pessoa', students: 5200, courses: 42 },
            { name: 'Campina Grande', students: 4800, courses: 38 },
            { name: 'Patos', students: 2100, courses: 22 },
            { name: 'Cajazeiras', students: 1800, courses: 20 },
            { name: 'Sousa', students: 1600, courses: 18 }
        ],
        budget: {
            2010: 320.5,
            2022: 345.2,
            2023: 368.9,
            2026: 382.7
        }
    };
    
    return sampleData;
}

// Função para atualizar os dados na página (será expandida)
function updateDashboard(data) {
    // Esta função será expandida para atualizar gráficos
    console.log('Dashboard atualizado com:', data);
}

// Carregar dados ao iniciar (simulação)
setTimeout(() => {
    const data = loadSampleData();
    updateDashboard(data);
}, 1000);