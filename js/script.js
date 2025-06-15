const startDate = new Date('2025-05-28T18:53:00');

function updateTimer() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displaySeconds = seconds % 60;
    const displayMinutes = minutes % 60;
    const displayHours = hours % 24;

    // Atualizar os cards individuais
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = displayHours;
    document.getElementById('minutes').textContent = displayMinutes;
    document.getElementById('seconds').textContent = displaySeconds;
}

// Função para adicionar efeito de contagem animada
function animateNumber(element, targetNumber) {
    const currentNumber = parseInt(element.textContent) || 0;
    if (currentNumber !== targetNumber) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Versão melhorada da função updateTimer com animações
function updateTimerWithAnimation() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displaySeconds = seconds % 60;
    const displayMinutes = minutes % 60;
    const displayHours = hours % 24;

    // Elementos dos cards
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Animar mudanças nos números
    animateNumber(daysElement, days);
    animateNumber(hoursElement, displayHours);
    animateNumber(minutesElement, displayMinutes);
    animateNumber(secondsElement, displaySeconds);

    // Atualizar os valores
    daysElement.textContent = days;
    hoursElement.textContent = displayHours;
    minutesElement.textContent = displayMinutes;
    secondsElement.textContent = displaySeconds;
}

// Inicializar o contador
setInterval(updateTimerWithAnimation, 1000);
updateTimerWithAnimation(); // Chamada inicial para exibir imediatamente

// Adicionar efeitos de hover e interatividade
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de parallax suave no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Efeito de entrada para os cards quando ficam visíveis
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todos os elementos que devem ter animação de entrada
    const animatedElements = document.querySelectorAll('.time-card, .image-container');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Adicionar efeito de clique nos cards de tempo
    const timeCards = document.querySelectorAll('.time-card');
    timeCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Efeito de digitação no título (opcional)
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar o efeito de digitação após um pequeno delay
        setTimeout(typeWriter, 500);
    }
});

