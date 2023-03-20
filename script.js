let checkbox = document.querySelector("input[name=theme_switch]");
const btn = document.querySelector(".btn");
const form = document.querySelector(".form");
const list = document.querySelector(".middle-list");
const addItem = document.querySelector(".form__top-list__textarea");
const topBtn = document.querySelector(".form__top-list__checkbox");
const counter = document.querySelector(".footer__counter");
const deleteAllCompleted = document.querySelector(".footer__text");
const all = document.querySelector(".bottom-list__all");
const active = document.querySelector(".bottom-list__active");
const completed = document.querySelector(".bottom-list__completed");

// Dark/light mode switcher
// Recognize default mode
let switcher;
function colorThemeRecognizer() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    btn.classList.add("dark");
    switcher = 0;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    btn.classList.add("light");
    switcher = 1;
  }
}
colorThemeRecognizer();

// Input switch version
// document.documentElement.setAttribute("data-theme", "dark");
// checkbox.checked = true;

// checkbox.addEventListener("change", (cb) => {
//   document.documentElement.setAttribute(
//     "data-theme",
//     cb.target.checked ? "dark" : "light"
//   );
// });

// Button switch version
// document.documentElement.setAttribute("data-theme", "dark");
btn.addEventListener("click", function (e) {
  if (switcher === 1) {
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

// Generate list items on submit
function generateItem(e) {
  e.preventDefault();
  const html = `
  <div id="draggableElement" class="middle-list__item active" draggable="true">
    <div class="middle-list__item--text">
      <input class="checkbox" type="checkbox" />
      <p class="list-text">${addItem.value}</p>
    </div>
    <img class="cross" src="./images/icon-cross.svg" alt="" />
  </div>`;
  if (addItem.value != "") {
    list.insertAdjacentHTML("beforeend", html);
    addItem.value = "";
    n++;
    counter.textContent = n;
  }
  if (n > 0) {
    document.querySelector(".middle-list__empty").style.display = "none";
  }
}
form.addEventListener("submit", generateItem);
topBtn.addEventListener("click", generateItem);

// Remove individual list item when cross icon is clicked
list.addEventListener("click", function (e) {
  // if clicked el is a cross and input is checked as completed, remove but do not count n - 1
  if (
    e.target.classList.contains("cross") &&
    e.target.closest(".middle-list__item").classList.contains("completed")
  ) {
    e.target.closest(".middle-list__item").remove();
  }
  // if clicked el is a cross and input is not checked as completed, remove and do count n - 1
  else if (
    e.target.classList.contains("cross") &&
    !e.target.closest(".middle-list__item").classList.contains("completed")
  ) {
    e.target.closest(".middle-list__item").remove();
    n--;
    counter.textContent = n;
  }
  if (n === 0 && document.querySelectorAll(".completed").length === 0) {
    document.querySelector(".middle-list__empty").style.display = "block";
  }
});

// Delegation to look for checkboxes containing checkbox class and checking whether they are checked or not.
// If both are true, add line-through style to the text and add completed class to the parent
// if checkbox is false, remove both classes
list.addEventListener("change", function (e) {
  document.querySelector(".middle-list__empty").style.display = "none";
  if (e.target.classList.contains("checkbox") && e.target.checked) {
    e.target.nextElementSibling.classList.add("deco");
    e.target.nextElementSibling
      .closest(".middle-list__item")
      .classList.add("completed");
    e.target.nextElementSibling
      .closest(".middle-list__item")
      .classList.remove("active");
    n--;
    counter.textContent = n;
  } else if (e.target.classList.contains("checkbox") && !e.target.checked) {
    e.target.nextElementSibling.classList.remove("deco");
    e.target.nextElementSibling
      .closest(".middle-list__item")
      .classList.remove("completed");
    e.target.nextElementSibling
      .closest(".middle-list__item")
      .classList.add("active");
    n++;
    counter.textContent = n;
  }
});

// Delete items marked as completed and if n (number of list items) is 0, message saying Task list is empty will appear
deleteAllCompleted.addEventListener("click", function () {
  document.querySelectorAll(".completed").forEach((e) => e.remove());
  if (n === 0) {
    document.querySelector(".middle-list__empty").style.display = "block";
  }
});

// All, active, completed categories gets their classes added and removed based on which button is clicked and which items should be visible
all.addEventListener("click", function () {
  document
    .querySelectorAll(".middle-list__item")
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
    .querySelectorAll(".middle-list__item")
    .forEach((e) => (e.style.display = "none"));
  document
    .querySelectorAll(".completed")
    .forEach((e) => (e.style.display = "flex"));
  completed.classList.add("active-btn");
  active.classList.remove("active-btn");
  all.classList.remove("active-btn");
});

// Drag and drop API

let dragStart;
let dragEnd;

list.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("middle-list__item")) {
    e.dataTransfer.setData("text/plain", e.target.id);
    dragStart = e.target;
  }
});

list.addEventListener("dragover", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("middle-list__item")) {
    e.target.style.opacity = "0.5";
  }
});

list.addEventListener("dragleave", function (e) {
  e.target.style.opacity = "1";
});

list.addEventListener("drop", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("middle-list__item")) {
    //const droppedElementId = e.dataTransfer.getData("text/plain");
    //const droppedElement = document.getElementById(droppedElementId);

    e.target.style.opacity = "1";
    dragEnd = e.target;
    list.insertBefore(dragStart, dragEnd);
  }
});

// SortableJS library - my point was learning Drag and Drop API, but I also found SortableJS, which is way better both code-wise and visual-wise, so I sticked with that in my final code
// Edit: sortableJS is not working well on mobile devices - enabled Drag and Drop API
// new Sortable(list, {
//   animation: 350,
// });
