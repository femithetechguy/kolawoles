// Global script for Kolawoles.com
fetch('app.json')
  .then(response => response.json())
  .then(config => {
    document.title = config.site.name;
    const header = document.querySelector('.header');
    if (header) {
      header.textContent = config.site.name;
    }
    const main = document.querySelector('main');
    if (main && config.site.sections) {
      main.innerHTML = '';
      config.site.sections.forEach(section => {
        const div = document.createElement('div');
        div.className = 'section';
        div.innerHTML = `
          <span class="icon bi ${section.icon}"></span>
          <h2>${section.title}</h2>
          <p>${section.description}</p>
          <a class="link" href="${section.url}" target="_blank">Visit</a>
        `;
        main.appendChild(div);
      });
    }
  });