// == UserScript ==
// @name "Только персонал"
// @ пространство имен http://tampermonkey.net/
// @ версия 0.2
// @описание !
// @author You
// @ матч https://www.rusprofile.ru/*
// @grant none
// == / UserScript ==

let inpSerch = document.getElementsByName ("запрос") [0];
пусть btnSerh = document.querySelector (". search-btn");
let kWords = ["Антонова Галина Николаевна", "Аткельтирова Гузель Булатовна", "Антохин Александр Николаевич"];
let capcha = document.querySelector ('. recaptcha-checkbox-border');
пусть i = 0;
пусть num = 2;
пусть совпадение = 0;


function getCookie (name) {
    let match = document.cookie
    .расколоть(';')
    .find (row => row.startsWith (`$ {name} =`));
    ответный матч? match.split ('=') [1]: не определено;
}
if (btnSerh! = null && num == getCookie (nameCoo)) {
    число = + (getCookie (nameCoo)) + 1;
}

пусть kWord = kWords [число];

if (btnSerh! = null) {
    let timerId = setInterval (() => {
        inpSerch.value + = kWord [i ++];
        if (i == kWord.length) {
            clearInterval (timerId);
            document.querySelector (". search-btn"). click ();
        }
    }, 200);
} еще {
    пусть dataTags = document.getElementsByTagName ("а");
    for (i = 0; i <dataTags.length; i ++) {
        if (dataTags [i] .outerText == 'ИП' + kWord) {
            dataTags [i] [0] .click ();
            document.cookie = `nameCoo = $ {число}`;
            console.log (кВторд);
            location.href = "https://www.rusprofile.ru/";
            перемена;
        } if (document.querySelector (". warning-text"). outerText == "ИП ликвидирован") {
            location.href = "https://www.rusprofile.ru/";
        if (document.querySelector ('. emptyresult'). outerText.startsWith ("Только действующие") == true) {
            location.href = "https://www.rusprofile.ru/";
        } if (capcha == true) {
            document.querySelector ('. recaptcha-checkbox-border'). click ();
        }
    }
}