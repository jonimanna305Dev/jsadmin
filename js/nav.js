fetch('data/index/navber.json')
  .then(res => res.json())
  .then(navItems => {
    const template = document.getElementById('nav-template');
    const navbar = document.getElementById('navbar-sticky');
    const ul = template.content.querySelector('ul').cloneNode(true);
    ul.innerHTML = '';

    navItems
      .filter(item => item.status === 1)
      .forEach(item => ul.innerHTML += 
        `<li><a href="${item.url}" class="block py-2 px-3 rounded md:p-0 hover:text-black transform">${item.title}</a></li>`
      );

    navbar.prepend(ul);
  })
  .catch(err => console.error('Error loading navbar JSON:', err));
