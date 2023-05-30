// Define the book collection array
let books = [];

// Get the input fields and buttons
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('add');
const removeButton = document.getElementById('remove');

// Get the books list and render it on the page
const booksList = document.querySelector('#books ul');

function renderBooks() {
  booksList.innerHTML = '';
  books.forEach((book, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${book.title} by ${book.author}<button data-index="${index}">Remove</button>`;
    booksList.appendChild(listItem);
  });
}

// Add a book to the collection
function addBook(title, author) {
  const book = { title, author };
  books.push(book);
  renderBooks();
}

// Remove a book from the collection
function removeBook(index) {
  books = books.filter((book, i) => i !== index);
  renderBooks();
}

// Load the saved books from localStorage
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  renderBooks();
}

// Add event listeners to the buttons
addButton.addEventListener('click', () => {
  const title = titleInput.value;
  const author = authorInput.value;
  addBook(title, author);
  localStorage.setItem('books', JSON.stringify(books));
  titleInput.value = '';
  authorInput.value = '';
});

booksList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    // Get the index of the book to remove
    const index = parseInt(event.target.dataset.index, 10);
    removeBook(index);
    localStorage.setItem('books', JSON.stringify(books));
  }
});

removeButton.addEventListener('click', () => {
  books = [];
  renderBooks();
  localStorage.setItem('books', JSON.stringify(books));
});