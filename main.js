class BookCollection {
  constructor() {
    // Initialize an empty array for the books
    this.books = [];

    // Get references to the input fields and buttons
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addButton = document.getElementById('add');
    this.removeButton = document.getElementById('remove');

    // Get a reference to the books list and render it on the page
    this.booksList = document.querySelector('#books ul');
    this.loadBooks();
    this.addEventListeners();
  }

  // Load the saved books from localStorage
  loadBooks() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
      this.renderBooks();
    }
  }

  // Get the books list and render it on the page
  renderBooks() {
    this.booksList.innerHTML = '';
    this.books.forEach((book, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `"${book.title}" by ${book.author}<button data-index="${index}">Remove</button>`;
      this.booksList.appendChild(listItem);
    });
  }

  // Add a book to the collection
  addBook(title, author) {
    const book = { title, author };
    this.books.push(book);
    this.renderBooks();
    localStorage.setItem('books', JSON.stringify(this.books));
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  // Remove a book from the collection
  removeBook(index) {
    this.books = this.books.filter((book, i) => i !== index);
    this.renderBooks();
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Add event listeners to the buttons
  addEventListeners() {
    // Add event listener for the "Add" button
    this.addButton.addEventListener('click', () => {
      const title = this.titleInput.value;
      const author = this.authorInput.value;
      this.addBook(title, author);
    });

    // Add event listener for the "Remove" button
    this.booksList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const index = parseInt(event.target.dataset.index, 10);
        this.removeBook(index);
      }
    });

    // Add event listener for the "Remove All" button
    this.removeButton.addEventListener('click', () => {
      this.books = [];
      this.renderBooks();
      localStorage.setItem('books', JSON.stringify(this.books));
    });
  }
}

// Create a new instance of the BookCollection class
// eslint-disable-next-line no-unused-vars
const collection = new BookCollection();