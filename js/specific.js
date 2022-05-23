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
        console.log(movie);
        document.title = `${movie.title.rendered} | Movie Corn`;
        document.getElementsByTagName('meta')["description"].content = `${movie.content.rendered}`
        html.innerHTML = `
        <div class="specificReview">
            <div class="titleImage">
                <h2 id="specificTitle">${movie.title.rendered}</h2>
                <img id="specificImg" alt="${movie.title.rendered}" src="${images.source_url}">
            </div>
            <div class="movieScore">
                    <h4>Our Score:</h4>
                    <h3>${movie.meta.yasr_overall_rating} / 5</h3>
                </div>
        </div>
        <label class="movieDesc">${movie.excerpt.rendered}</label>
        
        `;
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('error', error);
    }
}

// <div id="specificDesc">

getReview();