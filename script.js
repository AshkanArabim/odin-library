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
    library.unshift(book)
}

function renderBooks(){
    const bookTable = document.querySelector('tbody')

    bookTable.textContent = '';
    
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


document.querySelector("form").addEventListener('submit', () => {
    const formTitle = document.querySelector('#title').value;
    const formAuthor = document.querySelector('#author').value;
    const formPages = document.querySelector('#pages').value;
    const formRead = document.querySelector('#read').value;
    let x = new Book(formTitle, formAuthor, formPages, formRead);
    bookToLibrary(x);
    renderBooks();
    //the cells get rendered at this point in debugging, but when the debugger is closed, the cells reset.
})

//theme:
document.querySelector('#themeholder').addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark')
});