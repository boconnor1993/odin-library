// Global variable declaration
const myLibrary = [];
const divInsertElement = document.querySelector('#card-container')

// Create Book object to be used for cards
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

// Create a new Book object and save it to the index
function addBookToLibrary(title, author, numPages, bookRead) {
    const newBook = new Book(title, author, numPages, bookRead);
    myLibrary.push(newBook);
}

// Create the cards and add them to the html
function displayMyLibrary(myLibrary) {
    myLibrary.forEach(book => {
        // Create the card container and give it a class of book
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        // Add in the elements to the card
        const titlePara = document.createElement('p');
        titlePara.textContent = book.title;
        bookDiv.appendChild(titlePara);

        const authorPara = document.createElement('p');
        authorPara.textContent = book.author;
        bookDiv.appendChild(authorPara);

        const numPagesPara = document.createElement('p');
        numPagesPara.textContent = `${book.numPages} pages`;
        bookDiv.appendChild(numPagesPara);

        const bookReadPara = document.createElement('p');
        bookReadPara.textContent = book.bookReadString;
        bookDiv.appendChild(bookReadPara);

        // Append the card to the container
        divInsertElement.appendChild(bookDiv);
    });
}

// Modal logic to make it dynamic
// Get important items from DOM
const modal = document.getElementById('myModal');
const newBookBtn = document.getElementById('newBookBtn');
const span = document.getElementsByClassName("close")[0];

// Open the modal when button is clicked
newBookBtn.onclick = function() {
    modal.style.display = 'block';
}

// Close the modal when the span is clicked
span.onclick = function() {
    modal.style.display = 'none';
}

// Close the modal when window outside the modal is clicked
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}