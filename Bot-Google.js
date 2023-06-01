// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       Kalita Natalia
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let sites = {
  "napli.ru": ["как использовать devtools браузера", "10 популярных шрифтов от Google", "редакции и ревизии в вордпресс", "Вывод произвольных типов записей"],
  "kiteuniverse.ru": ["Шоу воздушных змеев", "Kite Universe", " наземные ветровые арт инсталляции"],
  "motoreforma.com": ["прошивки для CAN-AM", "тюнинг для BRP", "тюнинг Maverick X3"]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
//let keyword = "Работа с инструментом разработчика chrome";
let links = document.links;
let btnK = document.getElementsByName("btnK")[0];
let googleInput = document.getElementsByName("q")[0];

if (btnK !== undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.google.com" ) {
  site = getCookie("site");
} else {
  site = location.hostname;
}

if (btnK !== undefined) {
  //Работаем на главной странице
  let i = 0;
  let timerId = setInterval(() => {
    googleInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnK.click();
    }
  }, 500);
} else if (location.hostname == site) {
  //Работаем на целевом сайте
  console.log("Мы на целевом сайте");
  setInterval(() => {
    let index = getRandom(0, links.length); 
    //С долей вероятности 30% уйдем обратно искать
    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.google.com/";
    }
    //Перебираем ссылки и проверяем, что по ним можно кликнуть
    if (links[index].href.indexOf(site) != -1) links[index].click();
  }, getRandom(2000, 5000))
} else {
  let nextGooglePage = true;
  //Работаем в поисковой выдаче
  for(let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) != -1) {
      let link = links[i];
      nextGooglePage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(2500, 5000))
      break;
    }
  }
  //Если не нашли на первой странице выдачи
  let elementExist = setInterval(() => {
    let element = document.querySelector(".YyVfkd");
    if (element != null) {
      if (element.innerText == "5") {
        nextGooglePage = false;
        location.href = "https://www.google.com/";
      }
      clearInterval(elementExist);
    }
  }, 100)

  if (nextGooglePage) {
    setTimeout(() => {
      pnnext.click();
    }, getRandom(3000, 8000))
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
