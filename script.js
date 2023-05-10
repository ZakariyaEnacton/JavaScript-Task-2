(async () => {
  const searchBar = document.querySelector("#search-bar");
  const clearButton = document.querySelector("#clear-btn");
  const rateFilter = document.querySelector("#ratting");
  const langFilter = document.querySelector("#language");
  const cards = document.querySelector("#card");
  const blogCard = document.querySelector("#blog-card");
  const blogSection = document.querySelector(".blog-section");
  const api_url =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";
  const allData = await getData();

  let filterByRating = "all";
  let filterByLang = "all";

  async function getData() {
    const respons = await fetch(api_url);
    const data = await respons.json();
    const result = data.results;
    return result;
  }

  async function getFilteredData({ type }) {
    return new Promise((resolve) => {
      if (filterByRating != "all" && filterByLang != "all") {
        resolve(
          allData
            .filter((l) => l.original_language == filterByLang)
            .filter((a) => a.vote_average >= Number(filterByRating))
        );
      } else {
        if (filterByRating != "all") {
          resolve(
            allData.filter((a) => a.vote_average >= Number(filterByRating))
          );
        } else if (filterByLang != "all") {
          resolve(allData.filter((l) => l.original_language == filterByLang));
        } else {
          resolve(allData);
        }
      }
    });
  }

  const displayData = async (data) => {
    const display = data ? data : await getData();

    let value = display
      .map((object) => {
        const { title, vote_average, original_language, backdrop_path } =
          object;
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
        `;
      })
      .join("");
    blogCard.innerHTML = value;
  };
  displayData();

  rateFilter.addEventListener("change", async () => {
    filterByRating = rateFilter.value;
    getFilteredData({
      type: "rating",
    }).then((filteredData) => {
      displayData(filteredData);
    });
  });

  langFilter.addEventListener("change", async () => {
    filterByLang = langFilter.value;

    getFilteredData({
      type: "language",
    }).then((filteredData) => {
      displayData(filteredData);
    });
  });

  searchBar.addEventListener("input", async () => {
    const searchResult = await getData();

    let val = searchBar.value.toLowerCase();

    let search = searchResult.filter((s) =>
      s.title.toLowerCase().includes(val)
    );
    displayData(search);
  });

  clearButton.addEventListener("click", () => {
    searchBar.value = "";
  });
})();
