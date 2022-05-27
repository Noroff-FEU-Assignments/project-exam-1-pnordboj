const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

var p = + 1;
const image = "https://patricknj.one/nordbo/wp-json/wp/v2/media" + "/";
const html = document.querySelector(".latestMovies");

const nextButton = document.querySelector("#nextButton")
    nextButton.onclick = function() {
        if(p !== 1) {
            p++
        } else {
            prevButton.style.display = "block";
            p++
        }
        getCarousel();
    }
const prevButton = document.querySelector("#prevButton")
    prevButton.onclick = function() {
        if(p === 1) {
            return
        } else {
            p--
        }
        getCarousel();
    }

async function getCarousel() {
    try {
        // If page=1 the button to go back will not be displayed, avoiding errors.
        if(p === 1) {
            prevButton.style.display = "none"
        }

        const fetchMovie = await fetch(`https://patricknj.one/nordbo/wp-json/wp/v2/posts?per_page=4&page=${p}`);
        const movies = await fetchMovie.json();
        
        // If there is more then 3 object the button to go forward will not be displayed, avoiding errors.
        if(movies.length < 4) {
            nextButton.style.display = "none"
        } else {
            nextButton.style.display = "block"
        }

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
