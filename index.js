const myLibrary = [];
const divInsertElement = document.querySelector('#card-container')

function Book(title, author, numPages, bookRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.bookRead = bookRead;

    this.bookReadString = this.bookRead ? 'book read' : 'not read yet';

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.bookReadString}`;
    }
}

function addBookToLibrary(title, author, numPages, bookRead) {
    const newBook = new Book(title, author, numPages, bookRead);
    myLibrary.push(newBook);
}

function displayMyLibrary(myLibrary) {
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book')
    });
    return ;
}