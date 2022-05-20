const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts";
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";
const html = document.querySelector(".allMovies");

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
                <div class="listMovies">
                    <a href="specific.html?id=${movies[i].id}"><h3 id="getTitle">${movies[i].title.rendered}</h3></a>
                    <a class="apiImage" href="specific.html?id=${movies[i].id}">
                        <img id="getImg" src="${imageMovie.source_url}">
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