// Global variable declaration
const myLibrary = [];
const divInsertElement = document.querySelector('#card-container')

// Create Book class to be used for cards
class Book {
    constructor(title, author, numPages, bookRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.bookRead = bookRead;
        this.bookReadString = this.bookRead ? 'Book read' : 'Not read yet';
    }

    info() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.bookReadString}`;
    }

    toggleReadStatus(index) {
        this.bookRead = !this.bookRead;  // Toggle read status
        this.bookReadString = this.bookRead ? 'Book read' : 'Not read yet';  // Update read string
    }
}

// Create Library class to be used on collection of books
class Library {
    constructor() {
        this.books = [];
    }

    // Create a new Book object and save it to the index
    addBookToLibrary(title, author, numPages, bookRead) {
        const newBook = new Book(title, author, numPages, bookRead);
        this.books.push(newBook);
    }

    // Create the cards and add them to the html
    displayMyLibrary() {
        // Clear existing cards
        while (divInsertElement.firstChild) {
            divInsertElement.removeChild(divInsertElement.firstChild);
        }

        this.books.forEach((book, index) => {
            // Create the card container and give it a class of book
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            // Add in the elements to the card
            // Add title
            const titlePara = document.createElement('p');
            titlePara.textContent = book.title;
            titlePara.classList.add('title');
            bookDiv.appendChild(titlePara);

            // Add detail container
            const detailContainer = document.createElement('div');
            detailContainer.classList.add('detail-container')
            // Add author
            const authorPara = document.createElement('p');
            authorPara.textContent = book.author;
            detailContainer.appendChild(authorPara);

            // Add numPages
            const numPagesPara = document.createElement('p');
            numPagesPara.textContent = `${book.numPages} pages`;
            detailContainer.appendChild(numPagesPara);

            // Add bookRead
            const bookReadPara = document.createElement('p');
            bookReadPara.textContent = book.bookReadString;
            detailContainer.appendChild(bookReadPara);

            bookDiv.appendChild(detailContainer);

            // Add icons into a container
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('icon-container');
            // Add readIcon
            const readIcon = document.createElement('i');
            readIcon.className = 'bx bxs-book-add';
            readIcon.addEventListener('click', () => {
                myLibraryInstance.toggleReadStatus(index);
            });
            iconContainer.appendChild(readIcon);
            //Add trashIcon
            const trashIcon = document.createElement('i');
            trashIcon.className = 'bx bxs-trash';
            trashIcon.addEventListener('click', () => {
                myLibraryInstance.deleteBook(index);
            });
            
            iconContainer.appendChild(trashIcon);
            bookDiv.appendChild(iconContainer);

            // Append the card to the container
            divInsertElement.appendChild(bookDiv);
        });
    }   

    toggleReadStatus(index) {
        this.books[index].toggleReadStatus();
        this.displayMyLibrary();
    }
    

    deleteBook(index) {
        this.books.splice(index, 1);
        this.displayMyLibrary();
    }
}

// Create an instance of the Library class
const myLibraryInstance = new Library();

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

// Listen for Add Book button to be submitted
const bookForm = document.getElementById('bookForm');

// Listen for submission
bookForm.addEventListener('submit', function(event) {
    // Prevent default submit button behaviour
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numPages = document.getElementById('numPages').value;
    const readTrue = document.getElementById('readTrue').checked;
    const readFalse = document.getElementById('readFalse').checked;

    // Validate form completeness
    if (title && author && numPages && (readTrue || readFalse)) {

        const bookRead = readTrue ? true : false;

        // Add book to library, then clear form data and display cards
        // Call methods on the Library instance
        myLibraryInstance.addBookToLibrary(title, author, numPages, bookRead);
        bookForm.reset();
        modal.style.display = 'none';
        myLibraryInstance.displayMyLibrary();
    }
    else {
        alert('Please complete all fields')
    }
})


// Add some popular books as library dummy data
myLibraryInstance.addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
myLibraryInstance.addBookToLibrary("1984", "George Orwell", 328, false);
myLibraryInstance.addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true);
myLibraryInstance.addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
myLibraryInstance.addBookToLibrary("Moby-Dick", "Herman Melville", 720, false);

// Display the library
myLibraryInstance.displayMyLibrary();
