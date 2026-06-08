const revealElements = document.querySelectorAll('.reveal');
const chartTabs = document.querySelectorAll('.chart-tab');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const ctx = document.getElementById('mainChart').getContext('2d');

const chartData = {
  production: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Produção (toneladas)',
        data: [28, 36, 44, 55, 60, 70],
        borderColor: '#3c7f2a',
        backgroundColor: 'rgba(60, 127, 42, 0.16)',
        tension: 0.35,
        fill: true,
      },
    ],
  },
  consumption: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Consumo vinculado',
        data: [22, 29, 34, 42, 48, 57],
        borderColor: '#2f5f24',
        backgroundColor: 'rgba(47, 95, 36, 0.18)',
        tension: 0.35,
        fill: true,
      },
    ],
  },
  sustainability: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Índice de sustentabilidade',
        data: [3.5, 3.8, 4.1, 4.4, 4.6, 4.8],
        borderColor: '#6aa84f',
        backgroundColor: 'rgba(106, 168, 79, 0.18)',
        tension: 0.35,
        fill: true,
      },
    ],
  },
};

const mainChart = new Chart(ctx, {
  type: 'line',
  data: chartData.production,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#1c3325',
          font: { weight: '600' },
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#1c3325',
        bodyColor: '#52605a',
        borderColor: '#d8e4d2',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#52605a' },
        grid: { color: 'rgba(216, 228, 210, 0.8)' },
      },
      y: {
        ticks: { color: '#52605a' },
        grid: { color: 'rgba(216, 228, 210, 0.8)' },
      },
    },
  },
});

function updateChart(type) {
  mainChart.data = chartData[type];
  mainChart.update();
}

chartTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    chartTabs.forEach((button) => button.classList.remove('active'));
    tab.classList.add('active');
    updateChart(tab.dataset.chart);
  });
});

function handleReveal() {
  const trigger = window.innerHeight * 0.9;
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < trigger) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}
