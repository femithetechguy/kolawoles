// Dynamically populate header from header_content.json
fetch('json/header_content.json')
  .then(response => response.json())
  .then(data => {
    const headerTrack = document.querySelector('.header-track');
    if (headerTrack && Array.isArray(data.items)) {
      headerTrack.innerHTML = '';
      
      // Add content statically and centered
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
        // Use header accent color for background and white for foreground text
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent') || '#F85C70';
        topicDisplay.style.background = accentColor.trim();
        topicDisplay.style.color = '#FFFFFF';
        topicDisplay.style.position = 'fixed';
        topicDisplay.style.zIndex = '1000';
        topicDisplay.style.fontWeight = 'bold';
        topicDisplay.style.borderRadius = '0.5rem';
        topicDisplay.style.padding = '0.3rem 1.2rem';
        topicDisplay.style.boxShadow = '0 2px 8px rgba(33,37,41,0.10)';
        topicDisplay.style.pointerEvents = 'none';
        // Smaller font size on mobile
        const isMobile = window.innerWidth <= 600;
        topicDisplay.style.fontSize = isMobile ? '1.5rem' : '2.2rem';
        topicDisplay.textContent = topic;
        // Get viewport dimensions
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        // Avoid header and footer areas
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const headerHeight = header ? header.offsetHeight : 0;
        const footerHeight = footer ? footer.offsetHeight : 0;
        // Get all card bounding rects - ensure we have the freshest state
        const cardRects = Array.from(document.querySelectorAll('.card')).map(card => card.getBoundingClientRect());
        
        // Add extra padding to each card rect to ensure we're not too close
        const paddedCardRects = cardRects.map(rect => ({
          left: rect.left - 20,
          right: rect.right + 20,
          top: rect.top - 20,
          bottom: rect.bottom + 20
        }));
        
        let tries = 0;
        let top, left, topicRect;
        do {
          // Get dimensions first
          const topicWidth = 220; // Estimate topic width
          const topicHeight = 60; // Estimate topic height
          
          // Calculate valid positions
          top = getRandomInt(headerHeight + 20, vh - footerHeight - 60);
          left = getRandomInt(20, vw - topicWidth);
          
          // Define rect before adding to DOM
          const testRect = {
            left: left,
            right: left + topicWidth,
            top: top,
            bottom: top + topicHeight
          };
          
          // Check for overlap with any card
          var overlaps = paddedCardRects.some(cardRect => (
            testRect.right > cardRect.left &&
            testRect.left < cardRect.right &&
            testRect.bottom > cardRect.top &&
            testRect.top < cardRect.bottom
          ));
          
          tries++;
        } while (overlaps && tries < 30);
        // If not overlapping or we gave up trying, display (but not on cards)
        if (!overlaps || tries >= 30) {
          // Double-check one more time with fresh card data
          const finalCardRects = Array.from(document.querySelectorAll('.card')).map(card => card.getBoundingClientRect());
          const finalRect = {
            left: left,
            right: left + 220,
            top: top,
            bottom: top + 60
          };
          
          // Only proceed if not overlapping any cards
          const finalOverlaps = finalCardRects.some(cardRect => (
            finalRect.right > cardRect.left &&
            finalRect.left < cardRect.right &&
            finalRect.bottom > cardRect.top &&
            finalRect.top < cardRect.bottom
          ));
          
          if (!finalOverlaps) {
            topicDisplay.style.top = `${top}px`;
            topicDisplay.style.left = `${left}px`;
            body.appendChild(topicDisplay);
          }
        }
      }
      // Start the random topics animation with a small delay
      setTimeout(() => {
        pickRandomTopicAnywhere();
        setInterval(() => {
          document.querySelectorAll('.header-topic-label').forEach(el => el.remove());
          setTimeout(() => {
            pickRandomTopicAnywhere();
          }, 600); // Hide for 0.6s before showing next
        }, 2200); // Change topic every 2.2s
      }, 1000); // Start after 1 second
    }
  });
