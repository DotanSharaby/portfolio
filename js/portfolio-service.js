'use strict';

var gNextId = 101;
var gProjs = createProjs();

function createProjs(){
    return [
        createProj('Site-no-grid','Pixel Perfect Site','site desc','10/2019',['three','four'],'https://i.imgur.com/JSs4m7e.jpg'),
        createProj('Guess-Me','Guess Me Game','guess me game desc','10/2019',['one','two'],'https://i.imgur.com/KbtwT3A.jpg'),
        createProj('Book-Shop','Book Shop Site','book shop site desc','10/2019',['four','five'],'https://i.imgur.com/xxErK2B.jpg')
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