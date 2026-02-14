// async function loadAnime() {
//       const params = new URLSearchParams(window.location.search);
//       const animeName = params.get('anime');
//       if (!animeName) return;

//       const res = await fetch('data/anime.json');
//       const data = await res.json();

//       const anime = data.find(
//         item => item.title.trim() === animeName.trim()
//       );

//       if (!anime) return;

//       document.getElementById('animeTitle').innerHTML =
//         `Watch <span class="text-orange-500">${anime.title}</span>`;

//       document.getElementById('animeCategory').textContent = anime.category;
//       document.getElementById('animeTrailerTitle').textContent = anime.title;
//       document.getElementById('animeDescription').textContent =
//         anime.description || 'No description available.';

//       const videoEl = document.getElementById('animeVideo');
//       const videoSource = document.getElementById('animeVideoSource');
//       const noVideo = document.getElementById('noVideo');

//       if (anime.video && anime.video.trim() !== '') {
//         videoSource.src = anime.video;
//         videoEl.classList.remove('hidden');
//         noVideo.classList.add('hidden');
//         videoEl.load();
//       } else {
//         videoEl.classList.add('hidden');
//         noVideo.classList.remove('hidden');
//       }
//     }

//     loadAnime();

async function loadAnime() {
  try {
    const params = new URLSearchParams(window.location.search);
    const animeName = params.get('anime');
    if (!animeName) return;

    // Fetch both JSON files
    const [animeRes, movieRes] = await Promise.all([
      fetch('data/anime.json'),
      fetch('data/movie.json')
    ]);

    const animeData = await animeRes.json();
    const movieData = await movieRes.json();

    // Merge both arrays
    const data = [...animeData, ...movieData];

    // Find matching title
    const anime = data.find(
      item => item.title.trim().toLowerCase() === animeName.trim().toLowerCase()
    );

    if (!anime) {
      console.log("Anime not found");
      return;
    }

    // Set Content
    document.getElementById('animeTitle').innerHTML =
      `Watch <span class="text-orange-500">${anime.title}</span>`;

    document.getElementById('animeCategory').textContent = anime.category;
    document.getElementById('animeTrailerTitle').textContent = anime.title;
    document.getElementById('animeDescription').textContent =
      anime.description || 'No description available.';

    const videoEl = document.getElementById('animeVideo');
    const videoSource = document.getElementById('animeVideoSource');
    const noVideo = document.getElementById('noVideo');

    if (anime.video && anime.video.trim() !== '') {
      videoSource.src = anime.video;
      videoEl.classList.remove('hidden');
      noVideo.classList.add('hidden');
      videoEl.load();
    } else {
      videoEl.classList.add('hidden');
      noVideo.classList.remove('hidden');
    }

  } catch (error) {
    console.error("Error loading anime:", error);
  }
}

loadAnime();