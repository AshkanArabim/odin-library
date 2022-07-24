let library = [];

function makeBook(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    if (this.pages === this.pagesRead) {
        this.isFinished = true;
    } else {
        this.isFinished = false;
    }
}

function bookToLibrary() {
    //add to library
}