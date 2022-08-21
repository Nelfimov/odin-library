const searchForm = document.querySelector('form.search');
const createForm = document.querySelector('form.create');
const table = document.querySelector('tbody');
let buttonRead = document.querySelectorAll('button.read');
let buttonDelete = document.querySelectorAll('button.delete');
const exampleBook1 = new Book(
  'Lord of the Rings',
  'J.R. Tolkien',
  '1000',
  true,
)
const exampleBook2 = new Book(
  'Moby Dick',
  'unknown',
  '1000',
  false,
)
let myLibrary = [exampleBook1, exampleBook2];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showBooksInLibrary(library) {
  table.replaceChildren(); // Renewing table
  library.forEach((book, index) => {
    let row = document.createElement('tr');

    let readBox = document.createElement('button');
    readBox.textContent = 'READ'
    readBox.setAttribute('data-book', index);
    readBox.setAttribute('class', 'read');
    let tdMarkRead = document.createElement('td');
    tdMarkRead.appendChild(readBox);

    let tdTitle = document.createElement('td');
    tdTitle.textContent = book.title;
    let tdAuthor = document.createElement('td');
    tdAuthor.textContent = book.author;
    let tdPages = document.createElement('td');
    tdPages.textContent = book.pages;
    let tdRead = document.createElement('td');
    tdRead.textContent = book.read;

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'DELETE';
    deleteButton.setAttribute('data-book', index);
    deleteButton.setAttribute('class', 'delete');
    let tdDeleteButton = document.createElement('td');
    tdDeleteButton.appendChild(deleteButton);

    row.append(tdMarkRead, tdTitle, tdAuthor, tdPages, tdRead, tdDeleteButton);
    table.appendChild(row);
  })
  buttonRead = document.querySelectorAll('button.read');
  buttonDelete = document.querySelectorAll('button.delete');
  buttonRead.forEach(button => {
    button.addEventListener('click', () => {
      if (myLibrary[button.getAttribute('data-book')].read === false) {
        myLibrary[button.getAttribute('data-book')].read = true;
        showBooksInLibrary(myLibrary);
      }
    })
  })

  buttonDelete.forEach(button => {
    button.addEventListener('click', () => {
      myLibrary.splice(button.getAttribute('data-book'), 1);
      showBooksInLibrary(myLibrary);
    })
  })
}

function addBookToLibrary() {
  if (createForm.elements.createTitle.value != '') {
    let book = new Book(
      createForm.elements.createTitle.value,
      createForm.elements.createAuthor.value,
      createForm.elements.createPages.value,
      createForm.elements.createRead.checked,
    )
    myLibrary.push(book);
    showBooksInLibrary(myLibrary);
  }
}

function searchForBookInLibrary() {
  const emptyInput = '/(?:)/gi';
  let request = {
    title: RegExp(searchForm.elements.searchTitle.value, 'gi'),
    author: RegExp(searchForm.elements.searchAuthor.value, 'gi'),
    pages: searchForm.elements.searchPages.value,
    read: searchForm.elements.searchRead.checked,
  }
  if (request.title == emptyInput || request.author == emptyInput) {
    if (request.title == emptyInput) request.title = RegExp('a^');
    if (request.author == emptyInput) request.author = RegExp('a^');
  }
  let filteredLibrary = myLibrary.filter(book => {
    if (request.title.test(book.title) && request.read === book.read) return true;
    if (request.author.test(book.author) && request.read === book.read) return true;
    if (request.pages == book.pages && request.read === book.read) return true;
    if (request.read == book.read) return true;
  })
  showBooksInLibrary(filteredLibrary);
}

document.onload = showBooksInLibrary(myLibrary);
document.querySelector('form.create>button').addEventListener('click', addBookToLibrary);
document.querySelector('form.search>button').addEventListener('click', searchForBookInLibrary);
document.querySelector('form.search>button+button').addEventListener('click', () => showBooksInLibrary(myLibrary));