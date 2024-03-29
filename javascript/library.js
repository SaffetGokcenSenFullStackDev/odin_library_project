// the definition of the class Library
class Library {
    // the object books is a private property of the Library class 
    #books;

    // the constructor initiates the private property books
    constructor(books={}) {
        this.#books = books;
    }

    // get the array of the names of the books in the library
    getBookNamesArray() {
        return Object.getOwnPropertyNames(this.#books);
    }

    // gets the book object with the specified name
    getBook(nameOfBook) {
        return this.#books[nameOfBook];
    }

    // add a new book to the #books object with the key equal to the title of 
    // the book
    addBook(newBook) {
        this.#books[newBook.getTitle()] = newBook;
    }

    // remove the book from the books object, i.e. from the library
    removeBook(theTitle) {
        delete this.#books[theTitle];
    } 
}

class Book {
    #author;

    #title;

    #numOfPages;

    #publisher;

    #publicationDate;
    
    #readStatus;

    constructor(author, title, numOfPages, publisher, publicationDate, 
        readStatus=false) {
        this.#author = author;
        this.#title = title;
        this.#numOfPages = numOfPages;
        this.#publisher = publisher;
        this.#publicationDate = publicationDate;
        this.#readStatus = readStatus;
    }

    // gets the title of the book
    getTitle() {
        return this.#title;
    }

    // gets the author of the book
    getAuthor() {
        return this.#author;
    }

    // gets the number of pages of the book
    getNumOfPages() {
        return this.#numOfPages;
    }

    // gets the publisher of the book
    getPublisher() {
        return this.#publisher;
    }

    // gets the publication date of the book
    getPublicationDate() {
        return this.#publicationDate;
    }

    // gets the read status of the book
    getReadStatus() {
        return this.#readStatus;
    }

    // sets the read status of the book
    setReadStatus(theStatus) {
        this.#readStatus = theStatus;
    }

    // removes the book from the library
    removeMeFromLibrary(theLibrary) {
        theLibrary.removeBook(this.#title);
    }
}

// The access to the add-book-form
const addBookForm = document.getElementById('add-book-form');

// This function makes the add-book-form appear
function bringInTheForm() {
    addBookForm.style.display = "block";
}

// This function makes the add-book-form disappear
function magicAwayTheForm() {
    addBookForm.style.display = "none";
}

// the function for displaying the book info and buttons
function displayBookInfoAndButtons(
    theLib, theBook, theDiv, theTitle, theAuthor, thePublisher, thePubDate, 
    thePageNumber
    ) {
    // the div containing the book info part and the book buttons part
    const parentDiv = document.createElement("div");
    // set the class of the parent div to the class "parent-div"
    parentDiv.classList.add("parent-div");


    // the part containing the book info
    const childDiv1 = document.createElement("div");
    // the class of the childDiv1 is set
    childDiv1.classList.add("book-info");

    // p element for displaying the book title
    const pTitle = document.createElement("p");
    // the title of the book
    const titleText = document.createTextNode(`Title: ${theTitle}`);
    // the title of the book is written into the paragraph
    pTitle.appendChild(titleText);
    // the paragraph with the title of the book is added to the book info div
    childDiv1.appendChild(pTitle);

    // p element for displaying the book author
    const pAuthor = document.createElement("p");
    // the author of the book
    const authorText = document.createTextNode(`Author: ${theAuthor}`);
    // the author is written into the paragraph
    pAuthor.appendChild(authorText);
    // the paragraph with the author of the book is added to the book info div
    childDiv1.appendChild(pAuthor);

    // p element for displaying the book publisher
    const pPublisher = document.createElement("p");
    // the publisher of the book
    const publisherText = document.createTextNode(`Publisher: ${thePublisher}`);
    // the publisher is written into the paragraph
    pPublisher.appendChild(publisherText);
    // the paragraph with the publisher of the book is added to the book info 
    // div
    childDiv1.appendChild(pPublisher);
    
    // p element for displaying the book publication date
    const pPublicationDate = document.createElement("p");
    // the publication date of the book
    const pubDateText = document.createTextNode(
        `Publication date: ${thePubDate}`
    );
    // the publication date is written into the paragraph
    pPublicationDate.appendChild(pubDateText);
    // the paragraph with the publication date of the book is added to the book
    // info div
    childDiv1.appendChild(pPublicationDate);

    // p element for displaying the book page number
    const pPageNumber = document.createElement("p");
    // the page number of the book
    const pageNumberText = document.createTextNode(
        `Number of pages: ${thePageNumber}`
    );
    // the page number is written into the paragraph
    pPageNumber.appendChild(pageNumberText);
    // the paragraph with the page number of the book is added to the book info 
    // div
    childDiv1.appendChild(pPageNumber);

    // p element for displaying the read status of the book
    const pReadStatus = document.createElement("p");
    // the read status of the book
    const readStatusText = document.createTextNode("Read: No");
    // the read status is written into the paragraph
    pReadStatus.appendChild(readStatusText);
    // the paragraph with the read status of the book is added to the book info 
    // div
    childDiv1.appendChild(pReadStatus);

    // add the book info div to the parent div
    parentDiv.appendChild(childDiv1);
    // add the parent div with the book info div and book button div to the list
    theDiv.appendChild(parentDiv);
    
    // the part containing the book buttons part
    const childDiv2 = document.createElement("div");
    // the class of the book buttons div is set
    childDiv2.classList.add("book-buttons");

    // create the p element for the remove book button
    const pRemoveBookButton = document.createElement("p");
    // create a button to remove the book from the library
    const removeButton = document.createElement("input");
    // the type of the button is set
    removeButton.type = "button";
    // set the label of the button
    removeButton.value = "Remove from the library";
    // the class of the button is set
    removeButton.classList.add ("remove-book");

    removeButton.addEventListener('click', () => {
        theLib.removeBook(theTitle);
        removeButton.parentElement.parentElement.parentElement.remove();
    });

    // add the remove book button to the paragraph
    pRemoveBookButton.appendChild(removeButton);
    // the paragraph with the button is added to the button div
    childDiv2.appendChild(pRemoveBookButton);

    // create the p element for the read-status update book button
    const pReadStatusUpdateButton = document.createElement("p");
    // create a button to update the read status of the book
    const readStatusUpdateButton = document.createElement("input");
    // the type of the button is set
    readStatusUpdateButton.type = "button";
    // set the label of the button
    readStatusUpdateButton.value = "Update the read status";
    // the class of the button is set
    readStatusUpdateButton.classList.add ("update-read-status");

    readStatusUpdateButton.addEventListener('click', () => {
        const bookReadStatus = theBook.getReadStatus();
        if (!bookReadStatus) {
            theBook.setReadStatus(true);
            readStatusText.textContent = "Read: Yes";
        }
        else {
            theBook.setReadStatus(false);
            readStatusText.textContent = "Read: No";
        }
    });

    // add the read-status update button to the paragraph
    pReadStatusUpdateButton.appendChild(readStatusUpdateButton);
    // the paragraph with the button is added to the button div
    childDiv2.appendChild(pReadStatusUpdateButton);

    // the button div is added to the parent div
    parentDiv.appendChild(childDiv2);
}

// Create a new Library object
const theLibrary = new Library();

// the access to the book list div
const divBookList = document.getElementById("book-list");

// This function submits the book info
function deliverBookInfo(evt) {
    evt.preventDefault();
    const bookTitle = document.getElementById('book-title').value;
    const bookAuthor = document.getElementById('author-name').value;
    const bookPublisher = document.getElementById('publisher').value;
    const bookPublicationDate = document.getElementById('publication-date').value;
    const bookPageNumber = document.getElementById('number-of-pages').value;
    // A new book is created using the form values
    const theBook = new Book(
        bookAuthor, 
        bookTitle, 
        bookPageNumber, 
        bookPublisher, 
        bookPublicationDate
    );
    // The new book is added to the library
    theLibrary.addBook(theBook);
    // The add-book-form is reset
    addBookForm.reset();
    // The add-book-form disappears
    addBookForm.style.display = "none";

    displayBookInfoAndButtons(
        theLibrary, theBook, divBookList, bookTitle, bookAuthor, bookPublisher, 
        bookPublicationDate, bookPageNumber
    );
}

// The access to the add-book-button
const addBookButton = document.getElementById('add-book-button');
// When the add-book-button is clicked, a form for entering book info appears
addBookButton.addEventListener('click', bringInTheForm);
// The access to the close-form-button
const closeFormButton = document.getElementById('close-form-button');
// When the close-form-button is clicked, the form for enterin the book info 
// disappears
closeFormButton.addEventListener('click', magicAwayTheForm)
// The access to the submit-book-info button
const submitBookInfo = document.getElementById('submit-book-info');
// When the submit-book-info button is clicked, the information is recorded
submitBookInfo.addEventListener('click', deliverBookInfo);