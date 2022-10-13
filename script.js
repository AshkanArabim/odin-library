let library = [];
const form = document.querySelector("form");
const subBtn = document.querySelector("button[type='submit']");
const btnNames = [
  "titleSorter",
  "authorSorter",
  "pagesSorter",
  "readSorter",
  "finishedSorter",
];
const attrs = ["title", "author", "pages", "pagesRead", "isFinished"];
for (let i = 0; i < 5; i++) {
  window[btnNames[i]] = document.querySelector(`thead td:nth-child(${i + 1})`);
}

class Book {
  constructor(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.isFinished = this.pagesRead < this.pages ? false : true;
  }
}

function bookToLibrary(book) {
  library.unshift(book);
}

function renderBooks() {
  const bookTable = document.querySelector("tbody");

  bookTable.textContent = "";

  for (let bookIndex in library) {
    const bookRow = document.createElement("tr");

    for (let attrIndex in library[bookIndex]) {
      const cell = document.createElement("td");
      cell.textContent = library[bookIndex][attrIndex];
      bookRow.appendChild(cell);
    }

    for (i = 0; i <= 1; i++) {
      const x = ["Edit", "Delete"];
      const sideBtn = document.createElement("td");
      sideBtn.setAttribute("class", "sidebutton");
      sideBtn.textContent = x[i];
      if (i === 0) {
        sideBtn.addEventListener("click", () => {
          document.querySelector("#title").value = library[bookIndex].title;
          document.querySelector("#author").value = library[bookIndex].author;
          document.querySelector("#pages").value = library[bookIndex].pages;
          document.querySelector("#read").value = library[bookIndex].pagesRead;
          library.splice(bookIndex, 1);
          subBtn.textContent = "Submit Changes";
        });
      } else if (i === 1) {
        sideBtn.addEventListener("click", () => {
          library.splice(bookIndex, 1);
          renderBooks();
        });
      }
      bookRow.appendChild(sideBtn);
    }

    bookTable.appendChild(bookRow);
  }
}

function foundInTitles(item) {
  let bookExist = false;
  for (let bookIndex in library) {
    if (library[bookIndex].title === item) {
      bookExist = true;
    }
  }
  return bookExist;
}

const inputArray = Array.from(document.querySelectorAll("form>*>input"));

//validation code

for (let input of inputArray) {
  input.addEventListener("invalid", () => {
    input.setCustomValidity("Fill out this field!!!");
  });
}
//validation code

form.addEventListener("submit", () => {
  subBtn.textContent = "Add Book";
  const formTitle = document.querySelector("#title").value;
  const formAuthor = document.querySelector("#author").value;
  const formPages = Number(document.querySelector("#pages").value);
  const formRead = Number(document.querySelector("#read").value);
  if (formPages < formRead) {
    alert("Pages read can't be more than total book pages.");
    return false;
  }
  if (foundInTitles(formTitle)) {
    alert("There's already a book with this title in the library.");
    return false;
  }
  let x = new Book(formTitle, formAuthor, formPages, formRead);
  bookToLibrary(x);
  renderBooks();
  form.reset();
  document.querySelector("#title").focus();
});

for (let i = 0; i < 5; i++) {
  const button = window[btnNames[i]];
  button.addEventListener("click", () => {
    library.sort((a, b) => {
      if (a[attrs[i]] < b[attrs[i]]) {
        return -1;
      } else if (a[attrs[i]] > b[attrs[i]]) {
        return 1;
      } else {
        return 0;
      }
    });

    renderBooks();
  });
}

//theme:
document.querySelector("#themeholder").addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
});
