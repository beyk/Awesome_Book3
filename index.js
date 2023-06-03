// Define a Book class to manage the book list
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookList = [];
  }

  // Add a book to the list
  add() {
    // Check if both title and author fields have values
    if (document.getElementById('title').value && document.getElementById('author').value) {
      // Create a temporary object to hold the book information
      const temp = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
      };
      // Add the book to the book list and store it in local storage
      this.bookList.push(temp);
      localStorage.setItem('bookList', JSON.stringify(this.bookList));
      // Update the book list display
      this.bookList = JSON.parse(localStorage.getItem('bookList'));
      this.displayInfo();
    }
  }

  // Display the book list
  displayInfo() {
    if (JSON.parse(localStorage.getItem('bookList'))) {
      this.bookList = JSON.parse(localStorage.getItem('bookList'));
      const bookShelf = document.getElementById('bookShelf');
      bookShelf.innerHTML = '';
      this.bookList.forEach((book, index) => {
        // Create a new div element to hold the book information
        const childDiv = document.createElement('div');
        childDiv.classList.add('book-row');
        // Add the book title and author to the div
        childDiv.innerHTML = `<p class="title-p">"${book.title}" By: ${book.author}</p>`;
        // Add a remove button to the div
        const removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.innerHTML = '<b>Remove</b>';
        childDiv.appendChild(removeButton);
        // Add the div to the book list display
        bookShelf.appendChild(childDiv);
        // Add a click event listener to the remove button to remove the book from the list
        removeButton.addEventListener('click', (event) => {
          event.preventDefault();
          this.remove(index);
        });
      });
    }
  }

  // Remove a book from the list
  remove(index) {
    this.bookList.splice(index, 1);
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    // Update the book list display
    this.displayInfo();
  }
}

// Define variables to hold DOM elements
const list = document.getElementById('list');
const addNew = document.getElementById('addNew');
const contact = document.getElementById('contact');
const addSection = document.getElementById('addSection');
const listSection = document.getElementById('listSection');
const contactSection = document.getElementById('contactSection');
const home = document.getElementById('homePage');

// Define functions to show different sections of the page
const listShow = () => {
  addSection.style.display = 'none';
  listSection.style.display = 'block';
  contactSection.style.display = 'none';
  home.style.display = 'none';
  addNew.style.color = 'black';
  contact.style.color = 'black';
  list.style.color = 'rgb(59, 59, 190)';
};

const addShow = () => {
  addSection.style.display = 'flex';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
  home.style.display = 'none';
  list.style.color = 'black';
  contact.style.color = 'black';
  addNew.style.color = 'rgb(59, 59, 190)';
};

const contactShow = () => {
  addSection.style.display = 'none';
  listSection.style.display = 'none';
  contactSection.style.display = 'flex';
  home.style.display = 'none';
  list.style.color = 'black';
  addNew.style.color = 'black';
  contact.style.color = 'rgb(59, 59, 190)';
};

const homePage = () => {
  addSection.style.display = 'none';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
  home.style.display = 'block';
  list.style.color = 'black';
  addNew.style.color = 'black';
};

// Add event listeners to the navigation buttons
list.addEventListener('click', listShow);
addNew.addEventListener('click', addShow);
contact.addEventListener('click', contactShow);
document.getElementById('logo').addEventListener('click', homePage);

// Create a new Book object and display the book list
const newBook = new Book();
newBook.displayInfo();

// Add an event listener to the "Add" button to add a new book to the list
document.getElementById('addButton').addEventListener('click', () => {
  newBook.add();
  // Clear the title and author fields after adding the book
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});