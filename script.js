let allResults = [];
let currentPage = 1;

$(document).ready(function() {
//SEARCH
$("#searchBtn").click(function() {
  let query = $("#searchInput").val();

  $.getJSON(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`, function (data) {
      allResults = data.items || [];
      currentPage = 1;
      displayResults();
      setupPagination();
});
});

//DISPLAY RESULTS
function displayResults() {
$("#results").empty();

let start = (currentPage - 1) * 10;
let end =  start + 10;

let pageItems = allResults.slice(start, end);

pageItems.forEach(book => {
    let title = book.volumeInfo.title || "No Title";
    let img = book.volumeInfo.imageLinks?.thumbnail || "";

    $("#results").append(`
        <div class="item" data-id="${book.id}">
              <img src="${img}">
              <p>${title}</p>
        </div>
`);
});
}

//PAGNATION
function setupPagination(){
  $("#pagination").empty();

  for (let i = 1; i <= 5; i++) {
    $("#pagination").append(`<button class="pageBtn">${i}</button>`);
  }

  $(".pageBtn").click(function() {
    currentPage = parseInt($(this).text());
    displayResults();
  });
}

//DETAILS
$(document).on("click", ".item", function () {
  let id = $(this).data("id")

  $.getJSON(`https://www.googleapis.com/books/v1/volumes/${id}`, function (data) {

  $("#details").html(`
            <h3>${data.volumeInfo.title} </h3>
               <p><strong>Author:</strong> ${data.volumeInfo.authors?.join(",") || "Unknown"}</p>
               <p>${data.volumeInfo.description|| "No description available"}</p>
            `);
          });
      });

      //COLLECTION (Featured)
      function loadCollection() {
          $.getJSON("https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=15", function(data) {
              $("#collection").empty();
            
              data.items.forEach(book => {
                  let title = book.volumeInfo.title;
                  let img = book.volumeInfo.imageLinks?.thumbnail || "";

                  $("#collection").append(`
                      <div class="item" data-id="${book.id}">
                      <img src="${img}" alt="${title}">
                            <p>${title}</p>
                          </div>
`);
});
});

}

loadCollection();


  
