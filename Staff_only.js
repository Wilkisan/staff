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
let kWords = ["Антонова Галина Николаевна","Аткельтирова Гузель Булатовна"];
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

let kWord=kWords[0];

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
            let links = dataTags[i].href;
            sendForm(kWord, links);
            async function sendForm(name1, name2){
                let formData = new FormData(kWord, links)
                let response = await fetch("http://rabota0f.beget.tech/work.php",{
                    method: "POST",
                    body: formData
                });
                let result = await response.text();
                if(result == "success"){
                    console.log('success');
                }
            }
            break;
        } else {
            setCookie('nameCoo', +getCookie('nameCoo')+1);
            //location.href = "https://www.rusprofile.ru/";
            break;
        }if (capcha == true) {
            document.querySelector('.recaptcha-checkbox-border').click();
        }
    }
}
