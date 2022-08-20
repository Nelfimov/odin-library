let myLibrary = [];
const searchForm = document.querySelector('form.search');
const createForm = document.querySelector('form.create');


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = () => {
  console.log(`The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read === true ? 'is read' : 'is not read'}`)
}

function addBookToLibrary() {
  let book = new Book(
    createForm.elements.createTitle.value,
    createForm.elements.createAuthor.value,
    createForm.elements.createPages.value,
    createForm.elements.createRead.checked,
  )
  myLibrary.push(book);
}

function searchForBookInLibrary() {
  let request = {
    title: searchForm.elements.searchTitle.value,
    author: searchForm.elements.searchAuthor.value,
    pages: searchForm.elements.searchPages.value,
    read: searchForm.elements.searchRead.checked,
  }
  console.log(request);
}

document.querySelector('form.create>button').addEventListener('click', addBookToLibrary);
document.querySelector('form.search>button').addEventListener('click', searchForBookInLibrary);