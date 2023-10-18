class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const root = this.shadowRoot;
    root.appendChild(this.#template());
    const removeBtn = root.querySelector(".remove-button") 
    removeBtn.addEventListener("click", (e) => {
        root.removeChild(e.target.parentNode);
    })
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    .todo-item {
        display: flex;
        align-items: center;
    }

    .remove-button {
        background-color: crimson;
    }
    </style>
    <div class="todo-item">
        <p></p>
        <button class="remove-button" type="click">X</button>
    </div>
    `;
    return template.content.cloneNode(true);
  }
}

window.customElements.define("todo-list", TodoList);

const listInput = document.getElementById("list-input");
const addingForm = document.getElementById("adding-form");
const todoContainer = document.getElementById("todo-container");


addingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItemText = listInput.value;
  if (newItemText.trim() !== "") {
    const newTodoItem = document.createElement("todo-list");
    newTodoItem.shadowRoot.querySelector("p").textContent = newItemText;
    todoContainer.appendChild(newTodoItem);
    listInput.value = "";
  }
});


