import autoExpand from "./modules/utilities";
import * as config from "./modules/config";
import { get } from "./modules/rest";

autoExpand();

get(config.endpoint, showHeroes);

function post(data) {
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      form.elements.submit.disabled = false;
      get(data);
    });
}
function deleteIt(id) {
  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
  })
    .then((d) => d.json())
    .then((t) => get());
}

function put(id) {
  let data = {
    real_name: "Dannie Vinther",
    hero_name: "El Puritan",
    age: 18,
  };
  let postData = JSON.stringify(data);

  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then((t) => get());
}
function showHeroes(list) {
  console.log(list);
  const main = document.querySelector("main");
  main.innerHTML = "";
  const template = document.querySelector("template").content;
  list.forEach((hero) => {
    const clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = hero.hero_name;
    clone.querySelector("h2").textContent = hero.real_name;
    clone.querySelector("span").textContent = hero.age;
    clone.querySelector("button").addEventListener("click", () => {
      deleteIt(hero._id);
    });
    main.appendChild(clone);
  });
}

const form = document.querySelector("form");
//form.setAttribute("novalidate", true);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.elements.submit.disabled = true;
  const filtered = Array.from(form.elements.team).filter((cb) => cb.checked);
  const mapped = filtered.map((cb) => cb.value);

  const myData = {
    real_name: form.elements.real_name.value,
    hero_name: form.elements.hero_name.value,
    home_planet: form.elements.home_planet.value,
    age: form.elements.age.value,
    gender: form.elements.gender.value,
    sworn_villains: form.elements.sworn_villains.value.split("\n"),
    team: mapped,
  };
  /*

*/
  post(myData);
});
