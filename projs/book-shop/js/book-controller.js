'use strict';


function onInit() {
    renderBooks();
};

function renderBooks() {
    var books = getBooks();
    var bookStrHTMLs = books.map(function (book) {
        return `<tr>
                    <td>${book.id}</td>
                    <td>${book.bookname}</td>
                    <td data-trans="currency">${book.price}$</td>
                    <td><img class="book-img" src="${book.imgUrl}" height="100" width="100"/></td>
                    <td><button data-trans="read" onclick="renderReadModal(${book.id})" class='book-btn w3-btn w3-ripple w3-blue'>Read</button></td>
                    <td><button data-trans="update" onclick="readAndUpdateBook(${book.id})" class='book-btn w3-btn w3-ripple w3-yellow'>Update</button></td>
                    <td><button data-trans="delete" onclick="onRemoveBook(${book.id})" class='book-btn w3-btn w3-ripple w3-red'>Delete</button></td> 
                </tr>`
    })
    document.querySelector('.books-container').innerHTML = bookStrHTMLs.join('');
}

function onRemoveBook(bookId) {
    var isSure = confirm(getTrans('sure'));
    if (!isSure) return;
    removeBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var elBooknameInput = document.querySelector('.name-input');
    var elPriceInput = document.querySelector('.price-input');
    var bookname = elBooknameInput.value;
    var price = +elPriceInput.value;

    if (!bookname || !price) return;
    addBook(bookname, price);
    elBooknameInput.value = '';
    elPriceInput.value = '';
    renderBooks();
}

function readAndUpdateBook(bookId) {

    var book = getBook(bookId);
    renderUpdateModal(bookId);
    var elBookTitle = document.querySelector('.book-title');
    elBookTitle.innerText = book.bookname;
}

function renderReadModal(bookId) {
    var book = getBook(bookId);
    var elModal = document.getElementById('id01');
    elModal.style.display = 'block';
    var elBookTitle = document.querySelector('.book-title');
    elBookTitle.innerText = book.bookname;
    var elModalContent = document.querySelector('.modal-content');
    elModalContent.innerHTML = `<img class="modal-book-img" src="${book.imgUrl}"/>`;

}


function renderUpdateModal(bookId) {
    var elModal = document.getElementById('id01');
    elModal.style.display = 'block';
    var elModalContent = document.querySelector('.modal-content');
    elModalContent.innerHTML = `<input data-trans="modal-price-input" class="modal-price-input" type="text" placeholder="New Price"/>
                                <button data-trans="modal-price-btn" onclick="handleUpdateBook(${bookId})">Update Price</button>`
    doTrans();
}

function handleUpdateBook(bookId) {
    var price = +document.querySelector('.modal-price-input').value;
    updateBook(bookId, price);
    renderBooks();
    closeModal();
}

function closeModal() {
    document.getElementById('id01').style.display = 'none';
}


function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}