'use strict';

renderProjs();

function renderProjs() {
    var projs = getProj();
    var strHTMLs = projs.map(function (proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item" data-item="${proj.id}">
                    <a onclick="renderModal(${proj.id})" class="portfolio-link" data-toggle="modal" href="#portfolioModal">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src=${proj.img} alt="">
                    </a>
                    <div class="portfolio-caption">
                    <h4>${proj.name}</h4>
                    <p class="text-muted">${proj.title}</p>
                    </div>
                </div>`
    })
    var elContainer = document.querySelector('.port-container');
    elContainer.innerHTML += strHTMLs.join('');
}

function renderModal(itemId) {
    var projs = getProj();
    var proj = projs.find(function (proj) {
        return proj.id === itemId;
    })
    $('.offcanvas-btn').hide();
    var strHTML = `<h2>${proj.name}</h2>
                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                    <img class="img-fluid d-block mx-auto" src=${proj.img} alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                    <li>Date: ${proj.publishedAt}</li>
                    <li>Client: Threads</li>
                    <li>Category: Illustration</li>
                    </ul>
                    <a href="${proj.url}/index.html" target="_blank" class="button">Check it out</a>
                    <button onclick="showContact()" class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>`;

    var elContainer = document.querySelector('.modal-body');
    elContainer.innerHTML = strHTML;
}

function showContact(){
    $('.offcanvas-btn').show();
}