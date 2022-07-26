let library = [];

const form = document.querySelector('form');

const subBtn = document.querySelector("button[type='submit']");

for (i=0; i<5; i++) {
    const btnNames = ['titleSorter','authorSorter','pagesSorter','readSorter','finishedSorter'];
    window[btnNames[i]] = document.querySelector(`thead td:nth-child(${i+1})`);
}

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
            if (i === 0) {
                sideBtn.addEventListener('click', () => {
                    console.log('editted')
                    document.querySelector('#title').value = library[bookIndex].title;
                    document.querySelector('#author').value = library[bookIndex].author;
                    document.querySelector('#pages').value = library[bookIndex].pages;
                    document.querySelector('#read').value = library[bookIndex].pagesRead;
                    library.splice(bookIndex, 1);
                    subBtn.textContent = 'Submit Changes';
                })
            } else if(i === 1) {
                sideBtn.addEventListener('click', () => {
                    console.log('deleted');
                    library.splice(bookIndex, 1);
                    renderBooks();
                })
            }
            bookRow.appendChild(sideBtn);
        }
        
        bookTable.appendChild(bookRow)
    }
}

function sortTitle() {
    library.sort((a,b) => {
        if(a.title > b.title){return -1;}
        else if(a.title < b.title){return 1;}
        else {return 0;}
    });
    renderBooks();
    console.log('sort title')
}

function sortAuthor() {
    console.log('sort author')
}

function sortPages() {
    console.log('sort pages')
}

function sortRead() {
    console.log('sort read')
}

function sortFinished() {
    console.log('sort finished')
}

form.addEventListener('submit', () => {
    subBtn.textContent = 'Add Book';
    const formTitle = document.querySelector('#title').value;
    const formAuthor = document.querySelector('#author').value;
    const formPages = document.querySelector('#pages').value;
    const formRead = document.querySelector('#read').value;
    let x = new Book(formTitle, formAuthor, formPages, formRead);
    bookToLibrary(x);
    renderBooks();
    form.reset();
})

for (i=0; i<5; i++) {
    const btnNames = ['titleSorter','authorSorter','pagesSorter','readSorter','finishedSorter'];
    const funcs = ['sortTitle', 'sortAuthor', 'sortPages', 'sortRead', 'sortFinished'];
    window[btnNames[i]].addEventListener('click', window[funcs[i]]);
}

//theme:
document.querySelector('#themeholder').addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark')
});