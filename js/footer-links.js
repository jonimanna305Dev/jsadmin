fetch('data/index/navber.json')
.then(res => res.json())
.then(items => {
    const template = document.getElementById('footer-links-template');
    const ul = template.content.querySelector('ul').cloneNode(true);
    ul.innerHTML = '';

    items.filter(i => i.status === 1)
         .forEach(i => ul.innerHTML += 
            `<li><a href="${i.url}" class="hover:text-orange-500 transition">${i.title}</a></li>`
         );

    template.parentElement.appendChild(ul);
});
