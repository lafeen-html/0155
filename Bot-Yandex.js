// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kalita Natalia
// @match        https://ya.ru/*
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let input = document.getElementsByName("text")[0];
let searchButton = document.getElementsByClassName("search3__button mini-suggest__button")[0];
let keywords = ["как использовать devtools браузера", "10 популярных шрифтов от Google", "редакция и ревизий в вордпресс", "Вывод произвольных типов записей"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;


if (searchButton !== undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    input.value += keyword[i];
    i++;
    if (i === keyword.length) {
      clearInterval(timerId);
      searchButton.click();
    }
  }, 400);
} else if (location.hostname === "napli.ru") {
  console.log("Мы на целевом сайте");
  setInterval(() => {
    let index = getRandom(0, links.length);
    if (getRandom(0, 101) >= 80) location.href = "https://ya.ru/";
    if (links[index].href.indexOf("napli.ru") != -1) links[index].click();
  }, getRandom(2000, 5000));
} else {
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") !== -1) {
      let link = links[i];
      nextPage = false;
      console.log(`Нашел строку ${link}`);
      setTimeout(() => link.click(), getRandom(2500, 5000));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let element = document.getElementsByClassName("Pager-Item Pager-Item_type_page Pager-Item_current")[0];
    if (element !== null) {
      if (element.innerText === "5") {
        nextPage = false;
        location.href = "https://ya.ru/";
      }
      clearInterval(elementExist);
    }
  }, 100)

  if (nextPage) {
    let nextButton = document.getElementsByClassName("VanillaReact Pager-Item Pager-Item_type_next")[0];
    setTimeout(() => nextButton.click(), getRandom(3000, 8000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
