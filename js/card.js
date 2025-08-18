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
            // On mobile, add back button functionality to the destination
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            if (isMobile) {
              // Create a back button script to inject into the destination
              const backButtonScript = `
                if (!document.querySelector('.kolawoles-back-btn')) {
                  const backBtn = document.createElement('div');
                  backBtn.className = 'kolawoles-back-btn';
                  backBtn.innerHTML = '<i class="bi bi-arrow-left"></i>';
                  backBtn.style.position = 'fixed';
                  backBtn.style.top = '15px';
                  backBtn.style.left = '15px';
                  backBtn.style.zIndex = '9999';
                  backBtn.style.backgroundColor = '#F85C70';
                  backBtn.style.color = '#FFFFFF';
                  backBtn.style.borderRadius = '50%';
                  backBtn.style.width = '40px';
                  backBtn.style.height = '40px';
                  backBtn.style.display = 'flex';
                  backBtn.style.justifyContent = 'center';
                  backBtn.style.alignItems = 'center';
                  backBtn.style.fontSize = '1.5rem';
                  backBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                  backBtn.style.cursor = 'pointer';
                  backBtn.onclick = function() { window.close(); };
                  document.body.appendChild(backBtn);
                  
                  // Load Bootstrap Icons if needed
                  if (!document.querySelector('link[href*="bootstrap-icons"]')) {
                    const iconLink = document.createElement('link');
                    iconLink.rel = 'stylesheet';
                    iconLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css';
                    document.head.appendChild(iconLink);
                  }
                }
              `;
              
              // Store the script to local storage so it can be executed on destination page
              localStorage.setItem('kolawoles-back-btn-script', backButtonScript);
              
              // Open the URL
              const newWindow = window.open(section.url, '_blank');
              
              // The popup blocker might prevent this, but we'll try
              if (newWindow) {
                newWindow.addEventListener('DOMContentLoaded', function() {
                  newWindow.eval(backButtonScript);
                });
              }
            } else {
              // Regular desktop behavior
              window.open(section.url, '_blank');
            }
          }
        });
        container.appendChild(card);
      });
      main.appendChild(container);
    }
  });
