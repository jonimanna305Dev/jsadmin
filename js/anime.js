async function loadAnimeJSON() {
      try {
        const response = await fetch('data/anime.json');
        if (!response.ok) throw new Error('anime.json not found');

        const data = await response.json();

        const container = document.getElementById('cardsContainer');
        const template = document.getElementById('cardTemplate');

        container.innerHTML = '';

        data.forEach(anime => {
          const clone = template.content.cloneNode(true);

          // Image
          clone.querySelector('img').src = anime.image || 'image/placeholder.jpg';
          clone.querySelector('img').alt = anime.title;

          // Title
          clone.querySelector('h3').textContent = anime.title;

          // Category
          clone.querySelector('.category').textContent = anime.category;

          // Link
          clone.querySelector('.anime-link').href = anime.file;

          container.appendChild(clone);
        });

      } catch (err) {
        console.error('Error loading anime:', err);
      }
    }

    loadAnimeJSON();