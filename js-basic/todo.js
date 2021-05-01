// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoinput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDoListFin = document.querySelector(".js-toDoListFin");

const Pending_LS = 'Pending';

const Finished_LS = 'Finished';

let Pendings = [];

let Finisheds = [];


function backToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  const todo = li.children[0].innerText;
  paintToDo(todo);
  toDoListFin.removeChild(li);
  const cleanFinisheds = Finisheds.filter(function(Finished){
    return Finished.id !== parseInt(li.id);
  });
  Finisheds = cleanFinisheds;
  saveTotal();
}

function finishedToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[0].innerText;
  paintToDo2(text);
  toDoList.removeChild(li);
  const cleanPendings = Pendings.filter(function(Pending){
    return Pending.id !== parseInt(li.id);
  });
  Pendings = cleanPendings;
  saveTotal();
}

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanPendings = Pendings.filter(function(Pending){
    return Pending.id !== parseInt(li.id);
  });
  Pendings = cleanPendings;
  saveTotal();
}

function deleteFinToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoListFin.removeChild(li);
  const cleanFinisheds = Finisheds.filter(function(Finished){
    return Finished.id !== parseInt(li.id);
  });
  Finisheds = cleanFinisheds;
  saveTotal();
}

function saveTotal(){
  localStorage.setItem(Pending_LS, JSON.stringify(Pendings));
  localStorage.setItem(Finished_LS, JSON.stringify(Finisheds));
}

/*
function saveToDos2(){
  localStorage.setItem(Finished_LS, JSON.stringify(Finisheds));
}
function saveToDos(){
  localStorage.setItem(Pending_LS, JSON.stringify(Pendings));
}
*/

function paintToDo2(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = Finisheds.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌‍";
  delBtn.addEventListener("click", deleteFinToDo);
  backBtn.innerText = "🔄";
  backBtn.addEventListener("click", backToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  toDoListFin.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  Finisheds.push(toDoObj);
  saveTotal();
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = Pendings.length+1;
  span.innerText = text;
  delBtn.innerText = "❌‍";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerText = "✅";
  finBtn.addEventListener("click", finishedToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  Pendings.push(toDoObj);
  saveTotal();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintToDo(currentValue);
  toDoinput.value = "";
}

function loadToDos(){
  const loadedtoDos = localStorage.getItem(Pending_LS);
  const loadedFintoDos = localStorage.getItem(Finished_LS);
  if(loadedtoDos !== null){
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
  if(loadedFintoDos !== null){
    const parsedFinToDos = JSON.parse(loadedFintoDos);
    parsedFinToDos.forEach(function(fintoDo) {
      paintToDo2(fintoDo.text);
    });
  }
}


function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();




