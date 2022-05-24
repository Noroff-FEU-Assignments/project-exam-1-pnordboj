const urlMobile = "https://patricknj.one/nordbo/wp-json/wp/v2/posts?categories=4";
const imageMobile = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";
const mobile = document.querySelector(".homeMobile");

async function getMobile() {
    try {
        const fetchMovie = await fetch(urlMobile);
        const movies = await fetchMovie.json();
        mobile.innerHTML = '';
        for(let i = 0; i < movies.length; i++) {
            console.log(movies[i]);
            const featureId = `${movies[i].featured_media}`;
            const fetchImages = await fetch(imageMobile + featureId);
            const imageMovie = await fetchImages.json();
            mobile.innerHTML += `
                <a class="mobileMovies" href="specific.html?id=${movies[i].id}">
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