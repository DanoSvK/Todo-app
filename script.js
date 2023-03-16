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

// input switch
// checkbox.addEventListener("change", (cb) => {
//   document.documentElement.setAttribute(
//     "data-theme",
//     cb.target.checked ? "dark" : "light"
//   );
//   console.log(cb.target);
// });

// button switch
const btn = document.querySelector(".btn");
document.documentElement.setAttribute("data-theme", "dark");
let switcher = 1;
btn.addEventListener("click", function (e) {
  if (switcher === 0) {
    document.documentElement.setAttribute("data-theme", "dark");
    btn.classList.remove("light");
    btn.classList.add("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    btn.classList.remove("dark");
    btn.classList.add("light");
  }
  switcher = switcher === 0 ? 1 : 0;
  console.log(switcher);
});
