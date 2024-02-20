// Movies List
const elResult = document.querySelector(".js-movies-result");
const alertNotFound = document.querySelector(".js-not0-found");
const elTemplate = document.querySelector(".js-template").content;
const movieInformation = movies.slice(0, 50);

// runtime yani soat va minutni topish
const runtimeHourAndMin = (runtime) => {
  const hour = Math.floor(runtime / 60);
  const minuts = runtime % 60;
  return `${hour} hur ${minuts} min`;
};

const renderMovies = (array, node) => {
  const docFrg = new DocumentFragment();
  node.innerHTML = "";
  array.forEach((movie) => {
    const moviesClone = elTemplate.cloneNode(true);

    moviesClone.querySelector(
      ".js-img"
    ).src = `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`;
    moviesClone.querySelector(".js-img").alt = movie.Title;
    moviesClone.querySelector(".js-movies-title").textContent =
      movie.Title.toString().split(" ").length > 2
        ? movie.Title.toString().split(" ").slice(0, 2).join(" ")
        : movie.Title;
    moviesClone.querySelector(".js-movies-rating").textContent =
      movie.imdb_rating;
    moviesClone.querySelector(".js-movies-year").textContent = movie.movie_year;
    moviesClone
      .querySelector(".js-movies-year")
      .setAttribute("datetime", `${movie.movie_year}-12-20`);
    moviesClone.querySelector(".js-movies-time").textContent =
      runtimeHourAndMin(movie.runtime);
    moviesClone.querySelector(".js-movies-categories").textContent =
      movie.Categories.replaceAll("|", ", ").slice(0, 22);

    moviesClone.querySelector(".js-modal-btn").dataset.imdbId = movie.imdb_id;

    docFrg.appendChild(moviesClone);
  });
  node.appendChild(docFrg);
};
renderMovies(movieInformation, elResult);

// modal
const modal = document.querySelector(".js-modal");
const elMoviesVideos = modal.querySelector(".js-moda-video");
const elMoviesTitle = modal.querySelector(".js-modal-title");
const elMoviesRuntime = modal.querySelector(".js-modal-runtime");
const elMoviesYear = modal.querySelector(".js-modal-year");
const elMoviesHover = modal.querySelector(".js-modal-hour");
const elModalCatigory = modal.querySelector(".js-modal-catigory");
const elModalSummary = modal.querySelector(".js-modal-summary");
const elModalLink = document.querySelector(".js-movies-link");

const moviesRenderModal = (findMovies) => {
  elMoviesVideos.src = `https://www.youtube-nocookie.com/embed/${findMovies.ytid}`;
  elMoviesTitle.alt = findMovies.Title;
  elMoviesTitle.textContent = findMovies.Title;
  elMoviesRuntime.textContent = findMovies.imdb_rating;
  elMoviesYear.textContent = findMovies.movie_year;
  elMoviesYear.setAttribute("datatime", `${findMovies.movie_year}-12-20`);
  elMoviesHover.textContent = runtimeHourAndMin(findMovies.runtime);
  elModalCatigory.textContent = findMovies.Categories.replaceAll("|", ", ");
  elModalSummary.textContent =
    findMovies.summary.split(" ").length > 10
      ? findMovies.summary.split(" ").slice(0, 80).join(" ")
      : findMovies.summary;
  elModalCatigory.href = `https://www.imdb.com/title/${findMovies.imdb_id}/`;
};

elResult.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (evt.target.matches(".js-modal-btn")) {
    const imdModal = evt.target.dataset.imdbId;
    modal.style.display = "block";
    movies.find((item) => {
      if (item.imdb_id === imdModal) {
        moviesRenderModal(item);
      }
    });
  }
});

// modal yopilish buttoni
const modalClosy = document.querySelector(".js-modal-control");

modalClosy.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal.style.display = "none";
});

// search
const elform = document.querySelector(".js-movies-form");
const elMoviesInput = elform.querySelector(".js-movies-input");

elform.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValeu = elMoviesInput.value.trim();
  const regexMovies = new RegExp(inputValeu, "gi");

  const searchMovies = movies.filter((item) => {
    return String(item.Title).match(regexMovies);
  });

  if (searchMovies.length > 0) {
    renderMovies(searchMovies, elResult);
    alertNotFound.classList.add("hidden");
  } else {
    renderMovies(searchMovies, elResult);
    alertNotFound.classList.remove("hidden");
  }
});

// movies select search
const elSelectSearch = document.querySelector(".js-selecmovies-select");

elSelectSearch.addEventListener("click", (evt) => {
  evt.preventDefault();
  const selectValue = elSelectSearch.value.trim();
  const selectReg = new RegExp(selectValue, "gi");

  if (movies) {
    const filterMovies = movies.filter((item) => {
      return String(item.Categories).match(selectReg);
    });
    if (filterMovies.Length) {
      console.log("xato!!!");
    } else {
      renderMovies(filterMovies, elResult);
    }
  }
  if (selectValue === "more") {
    renderMovies(movieInformation, elResult);
  }
});

// Movies Catigory and Max year only year
const elMoviesFunctionalForm = document.querySelector(
  ".js-movies-functional-form"
);
const elOnlyYear = elMoviesFunctionalForm.querySelector(".js-only-year");
const elMaxYear = elMoviesFunctionalForm.querySelector(".js-max-year");
const elMinYear = elMoviesFunctionalForm.querySelector(".js-min-year");
const moviesCotygory = document.querySelector(".js-movies-catigory");
// Catigory
const handleFilterCategory = (arr) => {
  let result = [];
  arr.forEach((item) => {
    let categories = item.Categories.split("|");
    categories?.forEach((categorie) => {
      if (!result.includes(categorie)) {
        result.push(categorie);
      }
    });
  });
  return result;
};
function handleCreateOption() {
  let result = handleFilterCategory(movies);
  const newOptionDocumentFragment = document.createDocumentFragment();
  result.forEach((item) => {
    const newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;
    newOptionDocumentFragment.appendChild(newOption);
  });
  moviesCotygory.appendChild(newOptionDocumentFragment);
}
elMoviesFunctionalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const categoryValue = formData.get("category");
  if (categoryValue) {
    const items = movies.filter((item) => {
      return item.Categories.match(categoryValue);
    });
    renderMovies(items, elResult);
  }
  if (categoryValue === "All") {
    renderMovies(movieInformation, elResult);
  }

  // ONLY YEAR
  // const onlyYearInpValue = elOnlyYear.value;

  // const onlyYearFilter = movies.filter((item) => {
  //   return parseInt(item.movie_year) == onlyYearInpValue;
  // });
  // renderMovies(onlyYearFilter, elResult);
});
handleCreateOption();
