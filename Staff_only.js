// ==UserScript==
// @name         "Staff only"
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  !
// @author       You
// @match        https://www.rusprofile.ru/*
// @grant        none
// ==/UserScript==

let inpSerch = document.getElementsByName("query")[0];
let btnSerh = document.querySelector(".search-btn");
let kWords = ["Антонова Галина Николаевна","Аткельтирова Гузель Булатовна","Антохин Александр Николаевич"];

let capcha = document.querySelector('.recaptcha-checkbox-border');
let i = 0;
let num = 1;
let match = 0;
let nameCoo = 0;
let empty = document.querySelector(".emptyresult");

function getCookie(name) {
    let match = document.cookie
    .split(';')
    .find(row => row.startsWith(`${name}=`));
    return match ? match.split('=')[1] : undefined;
}
if(btnSerh != null && num == getCookie(nameCoo)) {
    num = (getCookie(nameCoo)) + 1;
}

let kWord=kWords[num];

if (btnSerh != null) {
    let timerId = setInterval(()=> {
        inpSerch.value += kWord[i++];
        if (i == kWord.length) {
            clearInterval(timerId);
            document.querySelector(".search-btn").click();
        }
    }, 200);
} else {
    let dataTags = document.getElementsByTagName("a");
    for (i = 0; i < dataTags.length; i++) {
        if (dataTags[i].outerText == 'ИП '+ kWord) {
            dataTags[i].click();
            document.cookie = `nameCoo=${num}`;
            console.log(kWord);
            location.href = "https://www.rusprofile.ru/";
            break;
        } else {
            location.href = "https://www.rusprofile.ru/";
        }if (capcha == true) {
            document.querySelector('.recaptcha-checkbox-border').click();
        }
    }
}
