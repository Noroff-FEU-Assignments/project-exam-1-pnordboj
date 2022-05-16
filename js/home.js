const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts";
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";
const html = document.querySelector(".latestMovies");

async function getMovies() {
    try {
        const fetchMovie = await fetch(url);
        const movies = await fetchMovie.json();
        html.innerHTML = '';
        for(let i = 0; i < movies.length; i++) {
            const featureId = `${movies[i].featured_media}`;
            const fetchImages = await fetch(image + featureId);
            const imageMovie = await fetchImages.json();
            html.innerHTML += `
                <div class="homeMovies">
                    <a href="html/specific.html?id=${movies[i].id}"><h3 id="homeTitle">${movies[i].title.rendered}</h3></a>
                    <a class="apiImage" href="html/specific.html?id=${movies[i].id}">
                        <img id="homeImg" src="${imageMovie.source_url}">
                    </a>
                </div>
            `;
        }
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('Error', error);
    }
}

getMovies();