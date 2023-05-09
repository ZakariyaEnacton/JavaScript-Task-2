const searchBar = document.querySelector('#search-bar');
const clearButton = document.querySelector('#clear-btn');
const rateFilter = document.querySelector('#ratting');
const countryFilter = document.querySelector('#country');
const cards = document.querySelector('#card')
const blogCard = document.querySelector('#blog-card')
const blogSection = document.querySelector('.blog-section')

const api_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";

// fetch(api_url)
//     .then((res) => res.json)
//     .then((data) => {
//         var value = data;
//         console.log(data);
//     })
//     .catch()

const getData = async () => {
    const respons = await fetch(api_url)
    const data = await respons.json()
    const result = data.results
    // console.log(data);
    console.log(result);
    return result;
}
// getData()


const displayData = async () => {
    const display = await getData();

    let value = display.map((object) => {
        const { title, vote_average, original_language } = object

        return `
        <div class="blog-card" id="card">
            <div class="blog-card-image">
                <img class="card-image" src="images/img3.jpeg" alt="Loding...">
            </div>
            <div class="card-footer">
                <div class="title">
                    <h6 class="movie-name">${title}</h6>
                </div>
                <div class="language">Language : ${original_language}</div>
                <div class="ratting-block">
                    <p class="movie-ratting">${vote_average}</p>
                </div>
            </div>
        </div>
        `
        // console.log(object);
    }).join("")
    blogCard.innerHTML = value
}
displayData()

const filterMovieList = () => {

}