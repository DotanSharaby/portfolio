'use strict';

const BOOKS_KEY = 'books';
var gNextId = 101;
var gBooks;
createBooks();

function getBooks() {
    return gBooks;
}

function createBook(bookname, price, url) {
    return {
        id: gNextId++,
        bookname: bookname,
        price: +price,
        imgUrl: url
    };
};

function createBooks() {
    var books = loadBooksFromStorage();
    if (!books || books.length === 0) {
        books = [
            createBook('Harry Potter', 90, './img/book1.jpg'),
            createBook('Animorphs', 12, './img/book2.jpg'),
            createBook('Kama Sutra', 1.99, './img/book3.jpg')
        ];
    }
    gBooks = books;
    saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) { return book.id === bookId })
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage();
}

// TODO: add possability to add a new book img

function addBook(bookname, price) {
    var book = createBook(bookname, price, './img/defultBook.png');
    gBooks.unshift(book);
    saveBooksToStorage();
}

function updateBook(bookId, price) {
    var book = getBook(bookId);
    if (!book) return;
    book.price = price;
    saveBooksToStorage();
}

function getBook(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    return book;
}


function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks);
}
function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}