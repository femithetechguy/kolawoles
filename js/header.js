// Dynamically populate header from header_content.json
fetch('json/header_content.json')
  .then(response => response.json())
  .then(data => {
    const headerTrack = document.querySelector('.header-track');
    if (headerTrack && Array.isArray(data.items)) {
      headerTrack.innerHTML = '';
      
      // Add responsive handler for orientation changes
      window.addEventListener('resize', () => {
        updateHeaderContent(data, headerTrack);
      });
      
      // Function to update header content based on screen size
      function updateHeaderContent(data, headerTrack) {
        headerTrack.innerHTML = ''; // Clear existing content
        const isMobile = window.innerWidth <= 700;
        
        if (isMobile) {
          // On mobile, just show the icons side by side
          data.items.forEach((item) => {
            if (item.type === 'divider') {
              const divider = document.createElement('span');
              divider.className = 'header-divider';
              headerTrack.appendChild(divider);
            } else {
              const icon = document.createElement('span');
              icon.className = `header-icon bi ${item.icon || ''}`;
              icon.setAttribute('title', item.label || ''); // Add tooltip
              headerTrack.appendChild(icon);
            }
          });
        } else {
          // On desktop, show icons and labels
          data.items.forEach((item) => {
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
      }
      
      // Initialize header content
      updateHeaderContent(data, headerTrack);
      // Animation: Randomly display a topic from either aspect at a random location in the body, never covering a card
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // Function to create a single topic element
      function createTopicElement(topic) {
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
        // Randomize the font size a bit for visual variety
        const fontSize = getRandomInt(90, 140) / 100; // 0.9rem to 1.4rem
        topicDisplay.style.fontSize = `${fontSize}rem`;
        topicDisplay.style.opacity = getRandomInt(70, 95) / 100; // 0.7 to 0.95 opacity
        topicDisplay.textContent = topic;
        return topicDisplay;
      }
      
      // Function to place multiple topics around the page
      function displayMultipleTopics() {
        const allTopics = data.items
          .filter(i => Array.isArray(i.topics))
          .flatMap(i => i.topics);
        
        if (allTopics.length === 0) return;
        
        // Remove any previous topic labels
        document.querySelectorAll('.header-topic-label').forEach(el => el.remove());
        
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
        
        // Add extra padding to each card rect to ensure we're not too close
        const paddedCardRects = cardRects.map(rect => ({
          left: rect.left - 20,
          right: rect.right + 20,
          top: rect.top - 20,
          bottom: rect.bottom + 20
        }));
        
        // Calculate how many topics to show based on screen size
        const screenArea = vw * vh;
        const numTopics = Math.min(Math.floor(screenArea / 80000) + 2, 10); // 2-10 topics depending on screen size
        
        // Try to place multiple topics
        for (let i = 0; i < numTopics; i++) {
          placeRandomTopic(allTopics);
        }
      }
      
      // Function to place a single topic at a random location
      function placeRandomTopic(allTopics) {
        // Pick a random topic
        const topic = allTopics[Math.floor(Math.random() * allTopics.length)];
        const topicDisplay = createTopicElement(topic);
        
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
        const paddedCardRects = cardRects.map(rect => ({
          left: rect.left - 20,
          right: rect.right + 20,
          top: rect.top - 20,
          bottom: rect.bottom + 20
        }));
        
        // Get topic dimensions (vary by text length)
        const estimatedWidth = topic.length * 12 + 40; // Rough estimate based on text length
        const topicWidth = Math.max(100, Math.min(estimatedWidth, 300)); // Between 100-300px
        const topicHeight = 60;
        
        // Try to find a non-overlapping position
        let tries = 0;
        let top, left;
        let overlaps = true;
        
        while (overlaps && tries < 20) {
          // Calculate valid positions
          top = getRandomInt(headerHeight + 20, vh - footerHeight - topicHeight - 20);
          left = getRandomInt(20, vw - topicWidth - 20);
          
          // Define test rectangle
          const testRect = {
            left: left,
            right: left + topicWidth,
            top: top,
            bottom: top + topicHeight
          };
          
          // Check for overlap with cards and other topics
          const otherTopics = Array.from(document.querySelectorAll('.header-topic-label'))
            .map(el => el.getBoundingClientRect());
          
          const allRects = [...paddedCardRects, ...otherTopics];
          
          overlaps = allRects.some(rect => (
            testRect.right > rect.left &&
            testRect.left < rect.right &&
            testRect.bottom > rect.top &&
            testRect.top < rect.bottom
          ));
          
          tries++;
        }
        
        // If we found a good spot or tried enough times
        if (!overlaps) {
          topicDisplay.style.top = `${top}px`;
          topicDisplay.style.left = `${left}px`;
          document.body.appendChild(topicDisplay);
          return true;
        }
        
        return false;
      }
      
      // Only show random topics on larger screens
      if (window.innerWidth > 700) {
        setTimeout(() => {
          displayMultipleTopics();
          setInterval(() => {
            document.querySelectorAll('.header-topic-label').forEach(el => el.remove());
            setTimeout(() => {
              if (window.innerWidth > 700) { // Check again in case of resize
                displayMultipleTopics();
              }
            }, 600); // Hide for 0.6s before showing next
          }, 8000); // Change topics every 8 seconds (increased from 4)
        }, 1000); // Start after 1 second
      }
    }
  });
