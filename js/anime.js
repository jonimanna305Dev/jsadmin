document.addEventListener('DOMContentLoaded', () => {

  let animeData = [];
  let currentPage = 1;
  const itemsPerPage = 8;

  const container = document.getElementById('cardsContainer');
  const template = document.getElementById('cardTemplate');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageNumbers = document.getElementById('pageNumbers');

  async function loadAnimeJSON() {
    try {
      const response = await fetch('data/anime.json');
      if (!response.ok) throw new Error('anime.json not found');

      animeData = await response.json();
      renderPage();
      renderPageNumbers();

    } catch (err) {
      console.error('Error loading anime:', err);
    }
  }

  function renderPage() {
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    animeData.slice(start, end).forEach(anime => {
      const clone = template.content.cloneNode(true);

      clone.querySelector('img').src = anime.image || 'image/placeholder.jpg';
      clone.querySelector('img').alt = anime.title;
      clone.querySelector('h3').textContent = anime.title;
      clone.querySelector('.category').textContent = anime.category;
      clone.querySelector('.anime-link').href = anime.file;

      container.appendChild(clone);
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(animeData.length / itemsPerPage);
  }

  function renderPageNumbers() {
    pageNumbers.innerHTML = '';
    const totalPages = Math.ceil(animeData.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;

      btn.className = `
          px-4 py-2 rounded-full text-sm
          ${i === currentPage
          ? 'bg-orange-500 text-black font-bold'
          : 'bg-gray-700 text-white hover:bg-orange-500'}
        `;

      btn.addEventListener('click', () => {
        currentPage = i;
        renderPage();
        renderPageNumbers();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      pageNumbers.appendChild(btn);
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
      renderPageNumbers();
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(animeData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
      renderPageNumbers();
    }
  });

  loadAnimeJSON();
});

