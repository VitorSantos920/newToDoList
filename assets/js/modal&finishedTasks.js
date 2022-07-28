let finishedTasks = [];

// Modal
const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

let listFinishedTasks = document.querySelector(".list-finished-tasks");

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
