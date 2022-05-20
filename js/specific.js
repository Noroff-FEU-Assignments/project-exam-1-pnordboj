const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const html = document.querySelector(".getReview");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts" + "/" + id;
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";

async function getReview() {
    try {
        const fetchMovie = await fetch(url);
        const movie = await fetchMovie.json();
        const featureId = `${movie.featured_media}`;
        const fetchImage = await fetch(image + featureId);
        const images = await fetchImage.json();
        html.innerHTML = ``;
        document.title = `${movie.title.rendered} | Movie Corn`;
        document.getElementsByTagName('meta')["description"].content = `${movie.content.rendered}`
        html.innerHTML = `
        <div class="specificReview">
            <h2 id="specificTitle">${movie.title.rendered}</h2>
            <img id="specificImg" src="${images.source_url}">
            <p id="specificDesc">${movie.content.rendered}</p>
        </div>
        `;
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
}

getReview();