let checkbox = document.querySelector("input[name=theme_switch]");
const btn = document.querySelector(".btn");
const form = document.querySelector(".input-form");
const list = document.querySelector(".middle-list");
const addItem = document.querySelector(".top-list_textarea");
const topBtn = document.querySelector(".top-list_checkbox");
const counter = document.querySelector(".footer_counter");
const deleteAllCompleted = document.querySelector(".footer_counter-text");
const all = document.querySelector(".bottom-list_all");
const active = document.querySelector(".bottom-list_active");
const completed = document.querySelector(".bottom-list_completed");

// Dark/light mode switcher
// Recognize default mode
// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//   document.documentElement.setAttribute("data-theme", "dark");
//   checkbox.checked = true;
// } else {
//   document.documentElement.setAttribute("data-theme", "light");
//   checkbox.checked = false;
// }

// document.documentElement.setAttribute("data-theme", "dark");
// checkbox.checked = true;

// Input switch
// checkbox.addEventListener("change", (cb) => {
//   document.documentElement.setAttribute(
//     "data-theme",
//     cb.target.checked ? "dark" : "light"
//   );
//   console.log(cb.target);
// });

// Button switch

document.documentElement.setAttribute("data-theme", "dark");
let switcher = 1;
btn.addEventListener("click", function (e) {
  if (switcher === 0) {
    document.documentElement.setAttribute("data-theme", "dark");
    btn.classList.remove("light");
    btn.classList.add("dark");
    document.body.classList.remove("body-light");
    document.body.classList.add("body-dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    btn.classList.remove("dark");
    btn.classList.add("light");
    document.body.classList.remove("body-dark");
    document.body.classList.add("body-light");
  }
  switcher = switcher === 0 ? 1 : 0;
});

// n represents list item left number that is displayed dynamically
let n = 0;
counter.textContent = n;

// Generate list items
function generateItem(e) {
  e.preventDefault();
  const html = `
  <div id="draggableElement" class="middle-list_item active" draggable="true">
    <div class="middle-list_item_text">
      <input class="checkbox" type="checkbox" />
      <p class="list-text">${addItem.value}</p>
    </div>
    <img class="cross" src="/images/icon-cross.svg" alt="" />
  </div>`;
  if (addItem.value != "") {
    list.insertAdjacentHTML("beforeend", html);
    addItem.value = "";
    n++;
    counter.textContent = n;
  }
  if (n > 0) {
    document.querySelector(".middle-list_empty").style.display = "none";
  }
}
form.addEventListener("submit", generateItem);
topBtn.addEventListener("click", generateItem);
// Remove list item
list.addEventListener("click", function (e) {
  // if clicked el is a cross and is checked as completed, remove but do not count n - 1
  if (
    e.target.classList.contains("cross") &&
    e.target.closest(".middle-list_item").classList.contains("completed")
  ) {
    e.target.closest(".middle-list_item").remove();
  }
  // if clicked el is a cross and is not checked as completed, remove and do count n - 1
  else if (
    e.target.classList.contains("cross") &&
    !e.target.closest(".middle-list_item").classList.contains("completed")
  ) {
    e.target.closest(".middle-list_item").remove();
    n--;
    counter.textContent = n;
  }
  if (n === 0) {
    document.querySelector(".middle-list_empty").style.display = "block";
  }
});

// Delegation to look for checkboxes containing checkbox class and checking wheter they are checked or not.
// If both are true, add line-through style to the text and add completed class to the parent
// if checkbox is false, remove both classes
list.addEventListener("change", function (e) {
  document.querySelector(".middle-list_empty").style.display = "none";
  console.log(e.target.checked);
  if (e.target.classList.contains("checkbox") && e.target.checked) {
    e.target.nextElementSibling.classList.add("deco");
    e.target.nextElementSibling
      .closest(".middle-list_item")
      .classList.add("completed");
    e.target.nextElementSibling
      .closest(".middle-list_item")
      .classList.remove("active");
    n--;
    counter.textContent = n;
  } else if (e.target.classList.contains("checkbox") && !e.target.checked) {
    e.target.nextElementSibling.classList.remove("deco");
    e.target.nextElementSibling
      .closest(".middle-list_item")
      .classList.remove("completed");
    e.target.nextElementSibling
      .closest(".middle-list_item")
      .classList.add("active");
    n++;
    counter.textContent = n;
  }
});

// Delete items marked as completed, which also updated items left based on node list of items with class completed
deleteAllCompleted.addEventListener("click", function () {
  document.querySelectorAll(".completed").forEach((e) => e.remove());
  if (n === 0) {
    document.querySelector(".middle-list_empty").style.display = "block";
  }
});

// All, active, compelted categories
all.addEventListener("click", function () {
  document
    .querySelectorAll(".middle-list_item")
    .forEach((e) => (e.style.display = "flex"));
  all.classList.add("active-btn");
  active.classList.remove("active-btn");
  completed.classList.remove("active-btn");
});

active.addEventListener("click", function () {
  document
    .querySelectorAll(".completed")
    .forEach((e) => (e.style.display = "none"));
  document
    .querySelectorAll(".active")
    .forEach((e) => (e.style.display = "flex"));
  active.classList.add("active-btn");
  all.classList.remove("active-btn");
  completed.classList.remove("active-btn");
});

completed.addEventListener("click", function () {
  document
    .querySelectorAll(".middle-list_item")
    .forEach((e) => (e.style.display = "none"));
  document
    .querySelectorAll(".completed")
    .forEach((e) => (e.style.display = "flex"));
  completed.classList.add("active-btn");
  active.classList.remove("active-btn");
  all.classList.remove("active-btn");
});

// Drag and drop API

// let dragStart;
// let dragEnd;

// list.addEventListener("dragstart", function (e) {
//   if (e.target.classList.contains("middle-list_item")) {
//     e.dataTransfer.setData("text/plain", e.target.id);
//     dragStart = e.target;
//   }
// });

// list.addEventListener("dragover", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("middle-list_item")) {
//     e.target.style.opacity = "0.5";
//   }
// });

// list.addEventListener("dragleave", function (e) {
//   e.target.style.opacity = "1";
// });

// list.addEventListener("drop", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("middle-list_item")) {
//     //const droppedElementId = e.dataTransfer.getData("text/plain");
//     //const droppedElement = document.getElementById(droppedElementId);

//     e.target.style.opacity = "1";
//     dragEnd = e.target;
//     list.insertBefore(dragStart, dragEnd);
//     console.log(dragEnd, dragStart);
//   }
// });

//  SortableJS library - my point was learning Drag and Drop API, but SortableJS is way better both code-wise and visual-wise, so I sticked with that in my final code
new Sortable(list, {
  animation: 350,
});
