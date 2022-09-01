class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  static getFormCreate() { return document.querySelector('form.create') };

  static getFormSearch() { return document.querySelector('form.search') };

  static addBookToLibrary() {
    if (this.getFormCreate().elements.createTitle.value != '') {
      let book = new Book(
        this.getFormCreate().elements.createTitle.value,
        this.getFormCreate().elements.createAuthor.value,
        this.getFormCreate().elements.createPages.value,
        this.getFormCreate().elements.createRead.checked,
      )
      myLibrary.push(book);
      this.showBooksInLibrary(myLibrary);
    }
  };

  static searchForBookInLibrary() {
    console.log('Searching');
    const emptyInput = '/(?:)/gi';
    let request = {
      title: RegExp(this.getFormSearch().elements.searchTitle.value, 'gi'),
      author: RegExp(this.getFormSearch().elements.searchAuthor.value, 'gi'),
      pages: this.getFormSearch().elements.searchPages.value,
      read: this.getFormSearch().elements.searchRead.checked,
    }
    if (request.title == emptyInput || request.author == emptyInput) {
      if (request.title == emptyInput) request.title = RegExp('a^');
      if (request.author == emptyInput) request.author = RegExp('a^');
    }
    let filteredLibrary = myLibrary.filter(book => {
      if (request.title.test(book.title)) return true;
      if (request.author.test(book.author)) return true;
      if (request.pages == book.pages) return true;
    })
    this.showBooksInLibrary(filteredLibrary);
  };

  static showBooksInLibrary(library) {
    const table = document.querySelector('tbody');
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

    let buttonRead = document.querySelectorAll('button.read');
    buttonRead.forEach(button => {
      button.addEventListener('click', () => {
        if (myLibrary[button.getAttribute('data-book')].read === false) {
          myLibrary[button.getAttribute('data-book')].read = true;
          this.showBooksInLibrary(myLibrary);
        }
      })
    })

    let buttonDelete = document.querySelectorAll('button.delete');
    buttonDelete.forEach(button => {
      button.addEventListener('click', () => {
        myLibrary.splice(button.getAttribute('data-book'), 1);
        this.showBooksInLibrary(myLibrary);
      })
    })
  }
}

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


document.onload = Book.showBooksInLibrary(myLibrary);
document.querySelector('form.create>button').addEventListener('click', () => Book.addBookToLibrary());
document.querySelector('form.search>button').addEventListener('click', () => Book.searchForBookInLibrary());
document.querySelector('form.search>button+button').addEventListener('click', () => Book.showBooksInLibrary(myLibrary));