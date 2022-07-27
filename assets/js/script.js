let tasks = [];
let finishedTasks = [];

const list = document.querySelector(".list-task");
const template = document.querySelector("template");

// CardNotify & Children's
const cardNotify = document.querySelector(".card-notify");
let imgCardNotify = cardNotify.children[0];
let h3CardNotify = cardNotify.children[1];

// btn
const btnSubmit = document.querySelector("[type='submit']");
btnSubmit.addEventListener("click", () => {
  const task = document.querySelector(".task-input");
  let taskDesc = task.value.trim();

  taskDesc ? addTask(task, taskDesc) : errorInsertTask();
});

// add
function addTask(task, taskDesc) {
  let items = template.content.cloneNode(true);

  let li = items.querySelector("li");
  let cb = items.querySelector("[type='checkbox']");
  let p = items.querySelector(".desc-item");
  let btn = items.querySelector(".btn");

  p.innerText = taskDesc;

  tasks.push(taskDesc);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.append(cb, p, btn);
  list.append(li);

  // CardNotify Styles
  cardNotify.style.background = "#94ff94";
  imgCardNotify.src = "assets/img/added.png";
  h3CardNotify.innerText = `Tarefa: "${p.innerText}" Adicionada com Sucesso!`;

  cardAnimate();

  // User Interaction
  task.value = "";
  task.focus();
}

function errorInsertTask() {
  // CardNotify Styles
  cardNotify.style.background = "#eb7979";
  imgCardNotify.src = "assets/img/error.png";
  h3CardNotify.innerText = `O nome da tarefa não pode ser vazio!`;

  cardAnimate();
}

function removeTask(item) {
  let remoteIndex = tasks.indexOf(item.children[1].innerHTML); // Índice do elemento removido
  list.removeChild(item); // Tela
  tasks.splice(remoteIndex, 1); // Array

  // CardNotify Styles
  cardNotify.style.background = "#eb7979";
  imgCardNotify.src = "assets/img/removed.png";
  h3CardNotify.innerText = `Tarefa: "${item.children[1].innerText}" Removida com Sucesso!`;

  cardAnimate();
  setLocalStorage(tasks);
}

function cardAnimate() {
  cardNotify.animate(
    [{ opacity: "0" }, { opacity: "1" }, { opacity: "0.5" }, { opacity: "0" }],
    {
      duration: 5900,
      fill: "forwards",
    }
  );
}

function setLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Atualizando LS
}

function storageTasks() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
      let items = template.content.cloneNode(true);
      let li = items.querySelector("li");

      let cb = items.querySelector("[type='checkbox']");
      let p = items.querySelector(".desc-item");
      let btn = items.querySelector("button");

      p.innerText = tasks[i];

      li.append(cb, p, btn);
      list.append(li);
    }
  }
}

function finishTask(li) {
  let checkbox = li.children[0];
  let p = li.children[1];

  // Verifando quando a checkbox está sendo marcada/desmarcada.
  if (checkbox.checked) {
    // Styles
    p.style.textDecoration = "line-through";
    p.style.color = "gray";

    // Array
    finishedTasks.push(p.innerText);
  } else {
    // Styles
    p.style.textDecoration = "none";
    p.style.color = "black";

    // Removendo do Array pelo conteúdo do index
    finishedTasks.splice(finishedTasks.indexOf(li.children[1].innerHTML), 1);
  }
}

storageTasks();
