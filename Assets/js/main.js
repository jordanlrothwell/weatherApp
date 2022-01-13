let searchFormEl = document.querySelector("#search-form");

let handleSearchFormSubmit = function (event) {
  event.preventDefault();

  let searchInputVal = document.querySelector("#search-input").value;
  
  if (!searchInputVal) {
    console.error("You need to enter a value.");
    return;
  }

  let queryString = "./search-results.html?q=" + searchInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);