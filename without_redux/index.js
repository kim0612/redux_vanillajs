const red = document.querySelector(".red");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const orange = document.querySelector(".orange");

const eventHandler = (e) => {
  document.querySelectorAll("div").forEach((item)=>{
    item.style.backgroundColor = e.target.parentNode.className;
  })
}

red.querySelector("button").addEventListener("click", eventHandler);
green.querySelector("button").addEventListener("click", eventHandler);
blue.querySelector("button").addEventListener("click", eventHandler);
orange.querySelector("button").addEventListener("click", eventHandler);
