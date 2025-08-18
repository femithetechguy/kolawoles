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
      // Animation: Randomly display a topic from either aspect at a random location in the body, never covering a card
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      function pickRandomTopicAnywhere() {
        const allTopics = data.items
          .filter(i => Array.isArray(i.topics))
          .flatMap(i => i.topics);
        if (allTopics.length === 0) return;
        const topic = allTopics[Math.floor(Math.random() * allTopics.length)];
        // Remove any previous topic labels
        document.querySelectorAll('.header-topic-label').forEach(el => el.remove());
        // Pick a random location in the body, avoiding cards
        const body = document.body;
        const topicDisplay = document.createElement('span');
        topicDisplay.className = 'header-topic-label';
        topicDisplay.style.position = 'fixed';
        topicDisplay.style.zIndex = '1000';
        topicDisplay.style.fontWeight = 'bold';
        topicDisplay.style.background = 'var(--color-accent)';
        topicDisplay.style.color = 'var(--color-bg)';
        topicDisplay.style.borderRadius = '0.5rem';
        topicDisplay.style.padding = '0.3rem 1rem';
        topicDisplay.style.boxShadow = '0 2px 8px rgba(33,37,41,0.10)';
        topicDisplay.style.pointerEvents = 'none';
        topicDisplay.textContent = topic;
        // Get viewport dimensions
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        // Avoid header and footer areas
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const headerHeight = header ? header.offsetHeight : 0;
        const footerHeight = footer ? footer.offsetHeight : 0;
        // Get all card bounding rects
        const cardRects = Array.from(document.querySelectorAll('.card')).map(card => card.getBoundingClientRect());
        let tries = 0;
        let top, left, topicRect;
        do {
          top = getRandomInt(headerHeight + 20, vh - footerHeight - 60);
          left = getRandomInt(20, vw - 220);
          topicDisplay.style.top = `${top}px`;
          topicDisplay.style.left = `${left}px`;
          body.appendChild(topicDisplay);
          topicRect = topicDisplay.getBoundingClientRect();
          // Check for overlap with any card
          var overlaps = cardRects.some(cardRect => (
            topicRect.right > cardRect.left &&
            topicRect.left < cardRect.right &&
            topicRect.bottom > cardRect.top &&
            topicRect.top < cardRect.bottom
          ));
          topicDisplay.remove();
          tries++;
        } while (overlaps && tries < 20);
        // If not overlapping, display
        if (!overlaps) {
          topicDisplay.style.top = `${top}px`;
          topicDisplay.style.left = `${left}px`;
          body.appendChild(topicDisplay);
        }
      }
      pickRandomTopicAnywhere();
      setInterval(() => {
        document.querySelectorAll('.header-topic-label').forEach(el => el.remove());
        setTimeout(() => {
          pickRandomTopicAnywhere();
        }, 600); // Hide for 0.6s before showing next
      }, 2200); // Change topic every 2.2s
    }
  });
