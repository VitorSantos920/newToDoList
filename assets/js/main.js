let tasks = [];
let finishedTasks = [];

const list = document.querySelector(".list-task");
const template = document.querySelector(".tasks");

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

// ADD
function addTask(task, taskDesc) {
  let items = template.content.cloneNode(true);

  let li = items.querySelector("li");
  let cb = items.querySelector("[type='checkbox']");
  let p = items.querySelector(".desc-item");
  let btn = items.querySelector(".btn");

  p.innerText = taskDesc;

  tasks.push({ taskName: taskDesc, isConcluded: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.append(cb, p, btn);
  list.append(li);

  cardStyles(
    "#94ff94",
    "assets/img/added.png",
    `Tarefa: <i>"${p.innerText}"</i><br>Adicionada com Sucesso!`
  );

  // User Interaction
  task.value = "";
  task.focus();
}

// ERROR
function errorInsertTask() {
  // CardNotify Styles
  cardNotify.style.background = "#eb7979";
  imgCardNotify.src = "assets/img/error.png";
  h3CardNotify.innerText = `O nome da tarefa não pode estar vazio!`;

  cardStyles(
    "#eb7979",
    "assets/img/error.png",
    `O nome da tarefa não pode estar vazio!`
  );
}

// REMOVE
function removeTask(item) {
  let indexTaskRemoved = tasks.findIndex(
    (task) => task.taskName === item.children[1].innerHTML
  );

  list.removeChild(item); // Tela

  tasks.splice(indexTaskRemoved, 1);

  finishedTasks.splice(finishedTasks.indexOf(item.children[1].innerHTML), 1);

  cardStyles(
    "#eb7979",
    "assets/img/removed.png",
    `Tarefa: <i>"${item.children[1].innerHTML}"</i></br>Removida com Sucesso!`
  );

  setLocalStorage(tasks);
}

function cardStyles(backgroundCard, imgCard, h3Card) {
  cardNotify.style.background = backgroundCard;
  imgCardNotify.src = imgCard;
  h3CardNotify.innerHTML = h3Card;
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

function storedTasks() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    for (let i = 0; i < tasks.length; i++) {
      let items = template.content.cloneNode(true);
      let li = items.querySelector("li");

      let cb = items.querySelector("[type='checkbox']");

      let p = items.querySelector(".desc-item");
      let btn = items.querySelector("button");

      p.innerText = tasks[i].taskName;
      cb.checked = tasks[i].isConcluded;

      tasks[i].isConcluded
        ? taskDescStyles(i, p, "line-through", "gray", true)
        : taskDescStyles(i, p, "none", "black", false);

      li.append(cb, p, btn);
      list.append(li);
    }
  }
}

storedTasks();

// ==================================================
// Modal
const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

let listFinishedTasks = document.querySelector(".list-finished-tasks");

function finishTask(li) {
  let checkbox = li.children[0];
  let taskDesc = li.children[1];

  let completedTaskIndex = tasks.findIndex(
    (task) => task.taskName === taskDesc.innerHTML
  );

  // Verifando quando a checkbox está sendo marcada/desmarcada.
  if (checkbox.checked) {
    taskDescStyles(completedTaskIndex, taskDesc, "line-through", "gray", true);
    setLocalStorage(tasks);

    // Array
    finishedTasks.push(taskDesc.innerText);
  } else {
    taskDescStyles(completedTaskIndex, taskDesc, "none", "black", false);

    setLocalStorage(tasks);

    // Removendo do Array pelo conteúdo do index
    finishedTasks.splice(finishedTasks.indexOf(li.children[1].innerHTML), 1);
  }
}

function taskDescStyles(index, taskDesc, decoration, color, conclusionStatus) {
  taskDesc.style.textDecoration = decoration;
  taskDesc.style.color = color;
  tasks[index].isConcluded = conclusionStatus;
}

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});

[closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => resetList());
});

openModalButton.addEventListener("click", () => {
  if (finishedTasks.length > 0) {
    for (let i = 0; i < finishedTasks.length; i++) {
      let li = document.createElement("li");
      let p = document.createElement("p");
      p.classList.add("desc-item");
      p.innerHTML = finishedTasks[i];
      li.appendChild(p);
      listFinishedTasks.appendChild(li);
    }
  } else {
    let h1 = document.createElement("h1");
    h1.textContent = "Você ainda não possui tarefas concluídas";
    listFinishedTasks.append(h1);
  }
});

let resetList = () => {
  listFinishedTasks.innerHTML = "";
};
