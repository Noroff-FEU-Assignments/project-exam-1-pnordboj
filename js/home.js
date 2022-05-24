const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts?categories=4";
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";
const html = document.querySelector(".latestMovies");
const html2 = document.querySelector(".homeMobile");

async function getCarousel() {
    try {
        const fetchMovie = await fetch(url);
        const movies = await fetchMovie.json();
        html.innerHTML = '';
        for(let i = 0; i < movies.length; i++) {
            const featureId = `${movies[i].featured_media}`;
            const fetchImages = await fetch(image + featureId);
            const imageMovie = await fetchImages.json();
            html.innerHTML += `
                <figure class="${i === 0 ? 'selectedImage' : ''}">
                    <a href="html/specific.html?id=${movies[i].id}">
                        <h3 id="carouselTitle">${movies[i].title.rendered}</h3>
                    </a>
                    <img id="carouselImg" alt="${movies[i].title.rendered}" src="${imageMovie.source_url}">
                </figure>
                
            `;
        }
        const images = document.querySelectorAll("img");
        images.forEach(function(image) {
            image.onmouseover = function(event) {
                document.querySelector(".selectedImage").classList.remove("selectedImage");
                document.querySelector("a").href = "";
                const addSelected = event.target.parentNode;
                addSelected.classList.add("selectedImage");
            }
        });
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('Error', error);
    }
}

getCarousel();
