const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const html = document.querySelector(".getReview");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts" + "/?id=" + id;
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "?id=";

async function getReview() {
    try {
        const fetchMovie = await fetch(url);
        const movie = await fetchMovie.json();
        const featureId = `${movie[0].featured_media}`;
        const fetchImage = await fetch(image + featureId);
        const images = await fetchImage.json();
        html.innerHTML = ``;
        console.log(movie);
        console.log(images);
        html.innerHTML = `
        <div class="specificReview">
            <h2 id="specificTitle">${movie[0].title.rendered}</h2>
            <img id="specificImg" src="${images[0].source_url}">
        </div>
        `;
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
}

getReview();