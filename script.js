const searchBar = document.querySelector('#search-bar');
const clearButton = document.querySelector('#clear-btn');
const rateFilter = document.querySelector('#ratting');
const countryFilter = document.querySelector('#country');

const api_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"

const getData = async () => {
    const respons = await fetch(api_url)
    const data = await respons.json()
    console.log(data);
    return data;
}
getData()