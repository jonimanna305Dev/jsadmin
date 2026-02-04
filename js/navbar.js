const toggleButton = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
  const menu = document.getElementById('navbar-sticky');

  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });