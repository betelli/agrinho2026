// ===== ELEMENTOS =====
const revealElements = document.querySelectorAll('.reveal');
const chartTabs = document.querySelectorAll('.chart-tab');
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');
const counterElements = document.querySelectorAll('.counter');
const ctx = document.getElementById('mainChart')?.getContext('2d');

// ===== DADOS DO GRÁFICO =====
const chartData = {
  production: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Producao (toneladas)',
        data: [28, 36, 44, 55, 60, 70],
        borderColor: '#2e7d28',
        backgroundColor: 'rgba(46, 125, 40, 0.15)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#2e7d28',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  },
  consumption: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Consumo vinculado',
        data: [22, 29, 34, 42, 48, 57],
        borderColor: '#1f5a19',
        backgroundColor: 'rgba(31, 90, 25, 0.15)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#1f5a19',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  },
  sustainability: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Indice de sustentabilidade',
        data: [3.5, 3.8, 4.1, 4.4, 4.6, 4.8],
        borderColor: '#5fb454',
        backgroundColor: 'rgba(95, 180, 84, 0.15)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#5fb454',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  },
};

// ===== CRIAR GRÁFICO =====
let mainChart = null;
if (ctx) {
  mainChart = new Chart(ctx, {
    type: 'line',
    data: chartData.production,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          labels: {
            color: '#1a3a1f',
            font: { weight: '700', size: 12 },
            padding: 15,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#2e7d28',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          ticks: { color: '#52605a', font: { weight: '600' } },
          grid: { color: 'rgba(46, 125, 40, 0.08)' },
        },
        y: {
          ticks: { color: '#52605a', font: { weight: '600' } },
          grid: { color: 'rgba(46, 125, 40, 0.08)' },
        },
      },
    },
  });
}

// ===== ATUALIZAR GRÁFICO =====
function updateChart(type) {
  if (mainChart) {
    mainChart.data = chartData[type];
    mainChart.update('active');
  }
}

// ===== TABS DOS GRÁFICOS =====
chartTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    chartTabs.forEach((button) => button.classList.remove('active'));
    tab.classList.add('active');
    updateChart(tab.dataset.chart);
  });
});

// ===== FILTROS DE CARDS =====
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'slideUp 0.4s ease-out';
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== ANIMAÇÃO DE CONTADORES =====
function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== OBSERVADOR PARA CONTADORES =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach((el) => {
  counterObserver.observe(el);
});

// ===== REVEAL ANIMATIONS =====
function handleReveal() {
  const trigger = window.innerHeight * 0.85;
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < trigger) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

// ===== MENU MOBILE =====
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '≡';
  });

  navLink.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.textContent = '≡';
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== EFEITO PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  handleReveal();

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 8px 25px rgba(46, 125, 40, 0.3)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.boxShadow = '0 4px 15px rgba(46, 125, 40, 0.2)';
    });
  });

  const metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach((card, index) => {
    card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s backwards`;
  });
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Mensagem enviada com sucesso! ✓';
      submitBtn.style.background = '#2e7d28';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

// ===== ADICIONAR ESTILOS CSS DINÂMICOS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }

  .nav-links.open {
    display: flex !important;
  }

  .card.hidden {
    display: none;
  }
`;
document.head.appendChild(style);

// ===== LISTENER PARA RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (mainChart) {
      mainChart.resize();
    }
  }, 250);
});
