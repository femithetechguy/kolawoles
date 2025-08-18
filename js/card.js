// Card-specific script for Kolawoles.com
fetch('app.json')
  .then(response => response.json())
  .then(config => {
    const main = document.querySelector('main');
    if (main && config.site.sections) {
      main.innerHTML = '';
      const container = document.createElement('div');
      container.className = 'cards-container';
      config.site.sections.forEach((section, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <span class="icon bi ${section.icon}" style="animation-delay: ${idx * 0.3}s;"></span>
          <h2>${section.title}</h2>
          <p>${section.description}</p>
          <a class="link" href="${section.url}" target="_blank">Visit</a>
        `;
        // Make the whole card clickable
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          // Prevent link click from firing twice
          if (!e.target.classList.contains('link')) {
            // Simply open the URL in a new tab/window
            window.open(section.url, '_blank');
          }
        });
        container.appendChild(card);
      });
      main.appendChild(container);
    }
  });
