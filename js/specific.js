const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const html = document.querySelector(".getReview");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts" + "?" + id;
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";

async function getReview() {
    try {
        const fetchMovie = await fetch(url);
        const movie = await fetchMovie.json();
        const featureId = `${movie.featured_media}`;
        const fetchImage = await fetch(image + featureId);
        const image = await fetchImage.json();
        console.log(movie);
        html.innerHTML = `
        <div class="specificReview">
            <h2 id="specificTitle">${movie.title.rendered}</h3>
            <img id="specificImg" src="${image.source_url}">
        </div>
        `;
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
}

getReview();