fetch('data/index/category.json')
.then(res => res.json())
.then(items => {
    const template = document.getElementById('footer-category-template');
    const ul = template.content.querySelector('ul').cloneNode(true);
    ul.innerHTML = '';

    items.filter(i => i.status === 1)
         .forEach(i => ul.innerHTML += 
            `<li class="hover:text-orange-500 transition">${i.name}</li>`
         );

    template.parentElement.appendChild(ul);
});
