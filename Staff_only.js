// ==UserScript==
// @name         "General variant"
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  !
// @author       You
// @match        https://www.rusprofile.ru/*
// @grant        none
// ==/UserScript==

let inpSerch = document.getElementsByName("query")[0];
let btnSerh = document.querySelector(".search-btn");
let kWords = ["Антонова Галина Николаевна","Аткельтирова Гузель Булатовна"]
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
            let links = dataTags[i].href;
            console.log("ССЫЛКИ НА ЭТОГО ЧЕЛОВЕКА  "+dataTags[i].href);
            //setCookie('nameCoo', +getCookie('nameCoo')+1);
            let id_product = kWord;
            let qty_product = links;
            let data_body = "id_product=" + id_product + "&qty_product="+ qty_product;
            fetch("https://onlinbar.ru/php/test.php", {
                method: "POST",
                body: data_body,
                headers:{"content-type": "application/x-www-form-urlencoded"}
            })

                .then( (response) => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.text()
            })
                .then(i => console.log(i))
                .catch(() => console.log('ошибка'));
        }else {
            //setCookie('nameCoo', +getCookie('nameCoo')+1);
            //location.href = "https://www.rusprofile.ru/";
            break;
        }if (capcha == true){
            document.querySelector('.recaptcha-checkbox-border').click();
        }
    }
}
