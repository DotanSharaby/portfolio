'use strict';

var gTrans = {
    title: {
        en: 'Welcome to My Book Store!',
        he: 'ברוכים הבאים לחנות הספרים שלי!'
    },
    read: {
        en: 'Read',
        he: 'קרא'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    'book-id': {
        en: 'Id',
        he: 'מק"ט'
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'book-cover': {
        en: 'Cover',
        he: 'כריכה'
    },
    'book-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'add-bookname-placeholder': {
        en: 'Book Name',
        he: 'שם הספר'
    },
    'add-price-placeholder': {
        en: 'Price',
        he: 'מחיר'
    },
    'add-btn': {
        en: 'Add new Book',
        he: 'הוסף ספר חדש'
    },
    'currency': {
        en: '$',
        he: '₪'
    },
    'modal-price-input': {
        en: 'New Price',
        he: 'מחיר חדש'
    },
    'modal-price-btn': {
        en: 'Update Price',
        he: 'עדכן מחיר'
    },
    sure: {
        en: 'Are you sure you want to delete this book?',
        he: 'למחוק את הספר בוודאות?'
    },
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;

        var txt = getTrans(transKey);
        // Translating is actually complex and needs a library
        if (transKey === 'currency') {
            var str = el.innerText;
            var newStr = str.slice(0, -1);
            if (el.innerText.includes('$')) el.innerText = Math.round(usdToIls(+newStr)) + txt;
            else if (el.innerText.includes('₪')) el.innerText = Math.round(ilsToUsd(+newStr)) + txt;
            continue;
        }

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}

function usdToIls(num) {
    return num * 3.54;
}
function ilsToUsd(num) {
    return num * 0.28;
}