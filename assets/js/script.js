const btnSubmit = document.querySelector("[type='submit']");
let tasks = [];

const template = document.querySelector("template");
const list = document.querySelector(".list-task");

btnSubmit.addEventListener("click", () => {
  const task = document.querySelector(".task-input");

  task.value === "" || task.value === " "
    ? alert("O nome da tarefa não pode ser vazio.")
    : addTask(task);
});

function addTask(task) {
  let items = template.content.cloneNode(true);
  let li = items.querySelector("li");

  let cb = items.querySelector("[type='checkbox']");
  let p = items.querySelector(".desc-item");
  let btn = items.querySelector("button");

  p.innerText = task.value;
  tasks.push(task.value);
  console.log(tasks);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.append(cb, p, btn);
  list.append(li);

  task.value = "";
  task.focus();
}

function removeTask(item) {
  let remoteIndex = tasks.indexOf(item.children[1].innerHTML); // Índice do elemento removido
  item.remove(item); // Tela
  tasks.splice(remoteIndex, 1); // Array
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
  } else {
    alert("teste");
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
