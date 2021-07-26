//create store
const reducer = (state, action) => {
  if (state === undefined){
    return {color : "white"}
  }
  switch (action.type){
    case "CHANGE_COLOR":
      newState = {
        ...state,
        color : action.color
      };
      console.log(action.type, action, state, newState);
      return newState;
  }
}
const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const red = document.querySelector(".red");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const orange = document.querySelector(".orange");

//store.dispatch
const eventHandler = (e) => {
  store.dispatch({type:"CHANGE_COLOR", color:e.target.parentNode.className});
}
red.querySelector("button").addEventListener("click", eventHandler);
green.querySelector("button").addEventListener("click", eventHandler);
blue.querySelector("button").addEventListener("click", eventHandler);
orange.querySelector("button").addEventListener("click", eventHandler);

//store.getState()
const subscribeHandler = () => {
  console.log("hi");
  red.style.backgroundColor = store.getState().color;
  green.style.backgroundColor = store.getState().color;
  blue.style.backgroundColor = store.getState().color;
  orange.style.backgroundColor = store.getState().color;  
}
//store.subscribe()
store.subscribe(subscribeHandler);