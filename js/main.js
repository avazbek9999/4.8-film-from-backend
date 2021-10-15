const elForm = document.querySelector('.form');
const elSearchInput = elForm.querySelector('.search-input');
const elPageInput = elForm.querySelector('.page-input');
const elGenreSelect = elForm.querySelector('.genre_select');
const elList = document.querySelector('.list');

const API_KEY = '54195bce';

function renderFilms(arr, node) {
    node.innerHTML = null;
    const fragment=document.createDocumentFragment()
    arr.forEach(row => {
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        const newHeadding = document.createElement('h5');
        const newGenre = document.createElement('p');
        const newTime = document.createElement('time');

        newLi.setAttribute('class', 'list__item');
        newImg.setAttribute('class', 'item__img');
        newImg.setAttribute('src', row.Poster);
        newImg.setAttribute('width', 200);
        newImg.setAttribute('height', 200);
        newHeadding.setAttribute('class', 'item__headding');
        newGenre.setAttribute('class', 'item__genre');
        newTime.setAttribute('class', 'item__time');

        newHeadding.textContent = row.Title;
        newGenre.textContent = row.Type;
        newTime.textContent=row.Year

        newLi.appendChild(newImg);
        newLi.appendChild(newHeadding);
        newLi.appendChild(newGenre);
        newLi.appendChild(newTime);
        
        fragment.appendChild(newLi);
    })
    node.appendChild(fragment);
}

// async function getFilms() {
//     const respons = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputValue}&page=1`);
//     const data = await respons.json();
    
//     if (data.Search?.length) {
//        renderFilms(data.Search, elList);
        
//     }
// }

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const inputValue = elSearchInput.value.trim();
    const selectGanre = elGenreSelect.value;
    const pageValue = elPageInput.value.trim();

    async function getFilms() {
        const respons = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputValue}&type=${selectGanre}&page=${pageValue}`);
        const data = await respons.json();
        if (data.Search.length>0) {
           renderFilms(data.Search, elList);    
        } else {
            return;
        }
    }
    
    getFilms();
    
})
// getFilms();
// renderFilms(data.Search, elList);



