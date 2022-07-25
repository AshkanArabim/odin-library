let library = [];

function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    if (this.pages > this.pagesRead) {
        this.isFinished = false;
    } else {
        this.isFinished = true;
    }
}

function bookToLibrary(book) {
    library.push(book)
}

function renderBooks(){
    const bookTable = document.querySelector('tbody')
    
    for (let bookIndex in library) {
        const bookRow = document.createElement('tr');
        
        for (let attrIndex in library[bookIndex]) {
            const cell = document.createElement('td');
            cell.textContent = library[bookIndex][attrIndex];
            bookRow.appendChild(cell);
        }
        
        for(i=0; i<=1; i++){
            const x = ['Edit','Delete'];
            const sideBtn = document.createElement('td');
            sideBtn.setAttribute('class','sidebutton');
            sideBtn.textContent = x[i]
            bookRow.appendChild(sideBtn);
        }
        
        bookTable.appendChild(bookRow)
    }
}

// document.querySelector("button[type='submit']").addEventListener(click, () => {
    
// })