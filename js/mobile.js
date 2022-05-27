const imageMobile = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";
const mobile = document.querySelector(".homeMobile");
const nextMobile = document.querySelector("#nextButtonMobile");
const prevMobile = document.querySelector("#prevButtonMobile");

var perPageValue = + 1

nextMobile.onclick = function() {
    if (perPageValue === 5) {
        return
    } else {
        perPageValue++
    }
    getMobile();
    console.log(`https://patricknj.one/nordbo/wp-json/wp/v2/posts?per_page=2&page=${perPageValue}`)

}

prevMobile.onclick = function() {
    if(perPageValue === 1) {
        return
    } else {
        perPageValue--
        getMobile();
    }
}

async function getMobile() {
    try {
        const fetchMovie = await fetch(`https://patricknj.one/nordbo/wp-json/wp/v2/posts?per_page=2&page=${perPageValue}`);
        const movies = await fetchMovie.json();

        if(perPageValue === 5) {
            return
        } else {
            nextMobile.style.display = "block"
        }

        mobile.innerHTML = '';
        for(let i = 0; i < movies.length; i++) {
            const featureId = `${movies[i].featured_media}`;
            const fetchImages = await fetch(imageMobile + featureId);
            const imageMovie = await fetchImages.json();
            mobile.innerHTML += `
                <a class="mobileMovies" href="html/specific.html?id=${movies[i].id}">
                    <h3 id="mobileTitle">${movies[i].title.rendered}</h3>
                    <img id="mobileImg" alt="${movies[i].title.rendered}" src="${imageMovie.source_url}">
                </a>
            `;
        }
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('Error', error);
    }
}

getMobile();