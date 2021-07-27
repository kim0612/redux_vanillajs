//create Store, state, reducer
const reducer = (state, action) => {
  if (state === undefined){
    return {
      selected_id : 0,
      mode : "read",
      contents : [
        {id: 1, title:"HTML", desc:"HTML is ..."},
        {id: 2, title:"CSS", desc:"CSS is ..."}
      ]
    }
  }
  else{
    switch (action.type){
      case "CHANGE_SELECTED_ID":
        newState = {
          ...state,
          selected_id : action.selected_id,
          mode : "read"
        }
        console.log(action.type, action, state, newState);
        return newState;
      case "CHANGE_MODE":
        newState = {
          ...state,
          mode : action.mode
        }
        console.log(action.type, action, state, newState);
        return newState;
      case "CREATE_CONTENTS":
        newState = {
          ...state,
          selected_id : state.contents[state.contents.length - 1].id + 1,
          mode : "read",
          contents: [...state.contents, {id:state.contents[state.contents.length - 1].id + 1, title:action.title, desc:action.desc}]
        }
        console.log(action.type, action, state, newState);
        return newState;
      case "DELETE":
        newState = {
          ...state,
          contents : action.contents
        }
        console.log(action.type, action, state, newState);
        return newState;
    }
  }
}
const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());





//render func..
const renderHeader = () => {
  const header = document.querySelector('#header');
  header.innerHTML = `
  <h1>WEB</h1>
  <h4>hello web!</h4>
  `
}
renderHeader();

const renderTOC = () => {
  const state = store.getState();
  const toc = document.querySelector('#toc');
  let li = ``;
  for (let i =0 ; i < state.contents.length ; i++){
    li += `<li><a id="${state.contents[i].title}" onclick="
    event.preventDefault();
    store.dispatch({type:'CHANGE_SELECTED_ID', selected_id: ${state.contents[i].id}});
    " href="#">
        ${state.contents[i].title}
      </a></li>`
  }
  toc.innerHTML = `
  <ol>
    ${li}  
  </ol>
  `
}
renderTOC();

const renderMode = () => {
  const mode = document.querySelector('#mode');
  mode.innerHTML = `
  <ul>
    <li><a onclick="
    event.preventDefault();
    store.dispatch({type:'CHANGE_MODE', mode:'create'});
    " href="#">create</a></li>
    <li><button id="deletebtn">delete</button></li>
  </ul>
  `
}
renderMode();

const renderContents = () => {
  const contents = document.querySelector('#contents');
  const state = store.getState();
  let content = null;

  if (state.mode === "read"){
    for(let i=0; i<state.contents.length; i++){
      if (state.contents[i].id === state.selected_id){
        content = state.contents[i];
      }
    }
    if(content === null){
      contents.innerHTML = `
      <h2>Welcome</h2>
      <h5>Hello, Redux!!</h5>
      `
    }
    else{
      contents.innerHTML = `
      <h2>${content.title}</h2>
      <h5>${content.desc}</h5>
      `
    }
  }
  else if(state.mode === "create"){
    contents.innerHTML = `
    <form onsubmit="
    event.preventDefault(); 
    console.log(event.target.title.value, event.target.desc.value);
    store.dispatch({type:'CREATE_CONTENTS', title:event.target.title.value, desc:event.target.desc.value});
    ">
      <input type="text" name="title" placeholder="title"/> <br/>
      <textarea name="desc" placeholder="description"></textarea> <br/>
      <input type="submit" value="제출"/>
    </form>
    `
  }
}
renderContents();


function deleteFunc() {
  console.log('start deleteFunc');
  const state = store.getState();
  let newContents = [...state.contents];
  for(let i=0; i<newContents.length; i++){
    console.log('in For loop')
    if(state.selected_id === newContents[i].id){
      newContents.splice(i,1);
      return (store.dispatch({type:'DELETE', contents:newContents}))
    }
  };
}
const btn = document.querySelector('#deletebtn');
btn.addEventListener("click", deleteFunc)



store.subscribe(renderContents);
store.subscribe(renderTOC)
