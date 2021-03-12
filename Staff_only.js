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
let match;
let empty = document.querySelector(".emptyresult");

function getCookie(name) {
    let match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
    return match ? match.split('=')[1] : undefined;
}
function setCookie(name, value) {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
}

let kWord=kWords[getCookie('nameCoo')];

if (btnSerh != null) {
    console.log(getCookie('nameCoo'))
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
            setCookie('nameCoo', +getCookie('nameCoo')+1);
            dataTags[i].click();
            location.href = "https://www.rusprofile.ru/"; // здесь будет fetch в MySQL
            break;
        } else {
            setCookie('nameCoo', +getCookie('nameCoo')+1);
            location.href = "https://www.rusprofile.ru/";
            break;
        }if (capcha == true) {
            document.querySelector('.recaptcha-checkbox-border').click();
        }
    }
}
