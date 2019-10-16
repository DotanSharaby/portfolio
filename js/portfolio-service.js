'use strict';

var gNextId = 101;
var gProjs = createProjs();

function createProjs(){
    return [
        createProj('Site-no-grid','pixel perfect site','site desc','10/2019',['three','four'],'https://i.imgur.com/JSs4m7e.jpg'),
        createProj('Guess-Me','guess me game','guess me game desc','10/2019',['one','two'])
    ]
}

function createProj(name,title,desc,publishedAt,labels,img) {
    return {
        id: gNextId++,
        name,
        title,
        desc,
        url: `../projs/${name}`,
        publishedAt,
        labels,
        img,
    }
}

function getProj() {
    return gProjs;
}