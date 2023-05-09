const searchBar = document.querySelector('#search-bar');
const clearButton = document.querySelector('#clear-btn');
const rateFilter = document.querySelector('#ratting');
const langFilter = document.querySelector('#language');
const cards = document.querySelector('#card')
const blogCard = document.querySelector('#blog-card')
const blogSection = document.querySelector('.blog-section')

const api_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";

const getData = async () => {
    const respons = await fetch(api_url2)
    const data = await respons.json()
    const result = data.results
    return result;
}

const displayData = async () => {
    const display = await getData();

    let value = display.map((object) => {
        const { title, vote_average, original_language, backdrop_path } = object
        // console.log(object);
        return `
        <div class="blog-card" id="card">
            <div class="blog-card-image">
                <img class="card-image" src="https://image.tmdb.org/t/p/original${backdrop_path}" alt="Loding...">
            </div>
            <div class="card-footer">
            <div class="title">
                <h6 class="movie-name">${title}</h6>
            </div>
            <div class="language">                            
                <p class="language">Language : ${original_language}</p>
            </div>
            <div class="ratting-block">
                <p class="movie-ratting">${vote_average}</p>
            </div>
            </div>
        </div>
        `
    }).join("")
    blogCard.innerHTML = value
}
displayData()


rateFilter.addEventListener('change', async () => {
    const filter = await getData();

    filter.filter((r) => {
        r.vote_average <= rateFilter.value;
    })
})

langFilter.addEventListener('change', async () => {
    const lang = await getData()

    lang.filter((l) => {
        const language = l.original_language == langFilter.value
        console.log(language);
    })
})