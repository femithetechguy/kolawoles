// Dynamically populate header from header_content.json
fetch('json/header_content.json')
  .then(response => response.json())
  .then(data => {
    const headerTrack = document.querySelector('.header-track');
    if (headerTrack && Array.isArray(data.items)) {
      headerTrack.innerHTML = '';
      data.items.forEach((item, idx) => {
        if (item.type === 'divider') {
          const divider = document.createElement('span');
          divider.className = 'header-divider';
          headerTrack.appendChild(divider);
        } else {
          const icon = document.createElement('span');
          icon.className = `header-icon bi ${item.icon || ''}`;
          headerTrack.appendChild(icon);
          const label = document.createElement('span');
          label.className = 'header-label';
          label.textContent = item.label || '';
          headerTrack.appendChild(label);
        }
      });
    }
  });
