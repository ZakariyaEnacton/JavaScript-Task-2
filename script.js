(async () => {
  const searchBar = document.querySelector("#search-bar");
  const clearButton = document.querySelector("#clear-btn");
  const rateFilter = document.querySelector("#ratting");
  const langFilter = document.querySelector("#language");
  const blogCard = document.querySelector("#blog-card");
  const api_url =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";
  const allData = await getData();

  let filterByRating = "all";
  let filterByLang = "all";
  let search;

  async function getData() {
    const respons = await fetch(api_url);
    const data = await respons.json();
    const result = data.results;
    return result;
  }

  function getFilteredData() {
    // return new Promise((resolve) => {
    if (filterByRating != "all" && filterByLang != "all") {
      // resolve(
      return allData
        .filter((l) => l.original_language == filterByLang)
        .filter((a) => a.vote_average >= Number(filterByRating));
      // );
    } else {
      if (filterByRating != "all") {
        // resolve(
        return allData.filter((a) => a.vote_average >= Number(filterByRating));
        // );
      } else if (filterByLang != "all") {
        //  resolve(
        return allData.filter((l) => l.original_language == filterByLang);
        // );
      } else {
        // resolve(
        return allData;
        // );
      }
    }
    // });
  }

  function getDataBySearch() {
    if (getFilteredData() != "all") {
      let val = searchBar.value.toLowerCase();
      return getFilteredData().filter((s) =>
        s.title.toLowerCase().includes(val)
      );
    } else {
      return alert(`Sorry, movie doesn't exist`);
    }
  }

  const displayData = async (data) => {
    const display = data ? await data : await getData();
    console.log("di", display);

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
    displayData(getFilteredData());
  });

  langFilter.addEventListener("change", async () => {
    filterByLang = langFilter.value;

    displayData(getFilteredData());
  });

  searchBar.addEventListener("input", async () => {
    displayData(getDataBySearch());
  });

  clearButton.addEventListener("click", () => {
    searchBar.value = "";
  });
})();
