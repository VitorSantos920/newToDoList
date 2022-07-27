const btnSubmit = document.querySelector("[type='submit']");
const cardNotify = document.querySelector(".card-notify");
let tasks = [];

const template = document.querySelector("template");
const list = document.querySelector(".list-task");

btnSubmit.addEventListener("click", () => {
  const task = document.querySelector(".task-input");
  let taskDesc = task.value.trim();
  taskDesc
    ? addTask(task, taskDesc)
    : alert("O nome da tarefa não pode ser vazio.");
});

function addTask(task, taskDesc) {
  let items = template.content.cloneNode(true);
  let li = items.querySelector("li");

  let cb = items.querySelector("[type='checkbox']");
  let p = items.querySelector(".desc-item");
  let btn = items.querySelector("button");

  p.innerText = taskDesc;
  tasks.push(taskDesc);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.append(cb, p, btn);
  list.append(li);

  // Card Notify
  cardNotify.style.background = "#94ff94"
  cardNotify.children[1].innerText = `Tarefa: "${p.innerText}" Adicionada com Sucesso!`
  cardNotify.children[0].src = "assets/img/added.png"
  cardNotify.animate(
    [
      { opacity: "0" },
      { opacity: "1" },
      {opacity: "0"}
    ], 
    {
      duration: 3000,
    }
  );

  // User Interaction
  task.value = "";
  task.focus();
}

function removeTask(item) {
  let remoteIndex = tasks.indexOf(item.children[1].innerHTML); // Índice do elemento removido
  item.remove(item); // Tela
  tasks.splice(remoteIndex, 1); // Array
  

  cardNotify.style.background = "#eb7979"
  cardNotify.children[1].innerText = `Tarefa: "${item.children[1].innerText}" Removida com Sucesso!`
  cardNotify.children[0].src = "assets/img/removed.png"
  cardNotify.animate(
    [
      { opacity: "0" },
      { opacity: "1" },
      {opacity: "0"}
    ], 
    {
      duration: 3000,
    }
  );

  setLocalStorage(tasks);
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
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      p.style.textDecoration = "line-through";
      p.style.color = "gray";
    } else {
      p.style.textDecoration = "none";
      p.style.color = "black";
    }
  });
}

storageTasks();
