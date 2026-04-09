let allResults = [];
let currentPage = 1;

//SEARCH
$("#searchBtn").click(function() {
  let query = $("searchInput").val();

  $,getJSON(`https://www.googleapi.com/books/v1/volumes?q=${query}&maxResults=40`, function (data) {
  allResults = data.items || [];
  currentPage = 1;
  displayResults();
  setupPagination();
});
});

//DISPLAY RESULTS
function displayResults(); {
$("#results").empty();

let start = (currentPage - 1) * 10;
let end =  start + 10;

let pageItems = allResults.slice(start, end);

pageItems.forEach(book => {
    let title = books.volumeInfo.title || "No Title";
    let img = book.volumeInfo.imageLinks?.thumbnail || "";

    $("#results").append(`
        <div class="item" data id="${book.id}">
              <img src="${img}">
              <p>${title}</p>
        </div>
`);
});
}


  
