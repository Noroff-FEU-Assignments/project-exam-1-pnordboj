const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://patricknj.one/nordbo/wp-json/wp/v2/posts";
const html = document.querySelector(".latestMovies");

async function getMovies() {
    try {
        const fetchApi = await fetch(url);
        const movies = await fetchApi.json();
        html.innerHTML = '';
        for(let i = 0; i < movies.length; i++) {
            html.innerHTML += `
                <div class="homeMovies">
                    <a class="apiImage" href=""><img id="homeImg" src=""></a>
                    <a href=""><h2 id="homeTitle">${movies[i].title.rendered}</h2></a>
                </div>
            `;
        }
    } catch(error) {
        console.log(error);
        html.innerHTML = displayError('Error', error);
    }
}