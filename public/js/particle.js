const particlesContainer = document.getElementById('particles');
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = Math.random() * 100 + '%';

  const duration = Math.random() * 10 + 10;
  particle.style.animationDuration = duration + 's';

  const randomStart = Math.random() * duration;
  particle.style.animationDelay = `-${randomStart}s`;

  particlesContainer.appendChild(particle);
}