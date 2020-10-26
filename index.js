const key ="5f96a7f34b77c1637d147dd0";
const endpoint = "https://fe2020autumn-8542.restdb.io/rest/superheroes";

document.querySelector("button.addHero").addEventListener("click", post)
function get(){
    fetch(endpoint, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": key,
          "cache-control": "no-cache"
        }
      })
        .then(e => e.json())
        .then(
            showHeroes
        );
}
function post(){
    const data = {
        real_name: "Peter Parkwer",
        hero_name: "Spiderman",
        age: 20
      };
      
      const postData = JSON.stringify(data);
      fetch(endpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": key,
          "cache-control": "no-cache"
        },
        body: postData
      })
        .then(res => res.json())
        .then(get);
}
function deleteIt(id){
    fetch(`${endpoint}/${id}`, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-apikey': key,
            "cache-control": "no-cache"
        }
    })
    .then(d => d.json())
    .then(t => get());


}

function put(id){
    let data = {
        real_name: "Dannie Vinther",
        hero_name: "El Puritan",
        age: 18
    };
    let postData = JSON.stringify(data);
    
    fetch(`${endpoint}/${id}`, {
        method: "put",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-apikey': key,
            "cache-control": "no-cache"
        },
        body: postData
    }).then(d => d.json()).then(t => get());
}
function showHeroes(list){
    console.log(list)
    const main = document.querySelector("main");
    main.innerHTML=""
    const template=document.querySelector("template").content;
    list.forEach(hero=>{
        const clone = template.cloneNode(true);
        clone.querySelector("h1").textContent=hero.hero_name;
        clone.querySelector("h2").textContent=hero.real_name;
        clone.querySelector("span").textContent=hero.age;
        clone.querySelector("button").addEventListener("click",()=>{
            deleteIt(hero._id)
        });
        main.appendChild(clone)
    })
}
get();



