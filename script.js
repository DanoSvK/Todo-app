let checkbox = document.querySelector("input[name=theme_switch]");

// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//   document.documentElement.setAttribute("data-theme", "dark");
//   checkbox.checked = true;
// } else {
//   document.documentElement.setAttribute("data-theme", "light");
//   checkbox.checked = false;
// }

// document.documentElement.setAttribute("data-theme", "dark");
// checkbox.checked = true;

// // switch theme if checkbox is engaged
// checkbox.addEventListener("change", (cb) => {
//   document.documentElement.setAttribute(
//     "data-theme",
//     cb.target.checked ? "dark" : "light"
//   );
//   console.log(cb.target);
// });
document.documentElement.setAttribute("data-theme", "dark");
let switcher = 1;
document.querySelector(".ok").addEventListener("click", function (e) {
  switcher === 0
    ? document.documentElement.setAttribute("data-theme", "dark")
    : document.documentElement.setAttribute("data-theme", "light");
  switcher = switcher === 0 ? 1 : 0;
  console.log(switcher);
});
