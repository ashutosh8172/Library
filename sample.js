const BASE_URL = "http://openlibrary.org/search.json";

const bookTable = document.getElementById("book-table");
const bookTableBody = bookTable.querySelector("tbody");

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = document.getElementById("search-query").value;
  const url = new URL(BASE_URL);
  url.searchParams.set("q", query);
  try {
    const response = await fetch(url);
    const data = await response.json();
    const books = data.docs.slice(0, 10);
    bookTableBody.innerHTML = "";
    books.forEach((book) => {
      const title = book.title;
      const author = book.author_name?.[0] || "Unknown";
      const publishDate = book.publish_date || "Unknown";
      const publisher = book.publisher?.[0] || "Unknown";
      const row = `
						<tr>
							<td>${title}</td>
							<td>${author}</td>
							<td>${publishDate}</td>
							<td>${publisher}</td>
						</tr>
					`;
      bookTableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error(error);
  }
});
var currentImageIndex = 0;
var images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];

document.getElementById("prevBtn").addEventListener("click", function () {
  if (currentImageIndex === 0) {
    currentImageIndex = images.length - 1;
  } else {
    currentImageIndex--;
  }
  document.getElementById("image").src = images[currentImageIndex];
});

document.getElementById("nextBtn").addEventListener("click", function () {
  if (currentImageIndex === images.length - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  document.getElementById("image").src = images[currentImageIndex];
});
