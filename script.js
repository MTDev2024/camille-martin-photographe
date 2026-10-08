const header = document.querySelector("#header");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", scrollY > 25),
  { passive: true },
);
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
  menu.textContent = open ? "Fermer ×" : "Menu +";
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "Menu +";
  }),
);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
const projects = [...document.querySelectorAll(".project")];
function filter(cat) {
  document
    .querySelectorAll(".filters button")
    .forEach((b) => b.classList.toggle("active", b.dataset.filter === cat));
  projects.forEach((p) =>
    p.classList.toggle("hide", cat !== "tout" && p.dataset.category !== cat),
  );
}
document
  .querySelectorAll(".filters button")
  .forEach((b) => b.addEventListener("click", () => filter(b.dataset.filter)));
document
  .querySelectorAll("[data-filter-link]")
  .forEach((a) =>
    a.addEventListener("click", () => filter(a.dataset.filterLink)),
  );
const box = document.querySelector(".lightbox"),
  boxImg = box.querySelector("img"),
  caption = box.querySelector(".lightbox-caption");
let current = 0;
function show(i) {
  current = (i + projects.length) % projects.length;
  const p = projects[current];
  boxImg.src = p.querySelector("img").src;
  boxImg.alt = p.querySelector("img").alt;
  caption.textContent = p.dataset.caption;
}
function open(i) {
  show(i);
  box.classList.add("open");
  document.body.classList.add("no-scroll");
  box.querySelector(".lightbox-close").focus();
}
function close() {
  box.classList.remove("open");
  document.body.classList.remove("no-scroll");
}
projects.forEach((p, i) => p.addEventListener("click", () => open(i)));
box.querySelector(".lightbox-close").addEventListener("click", close);
box
  .querySelector(".lightbox-prev")
  .addEventListener("click", () => show(current - 1));
box
  .querySelector(".lightbox-next")
  .addEventListener("click", () => show(current + 1));
box.addEventListener("click", (e) => {
  if (e.target === box) close();
});
document.addEventListener("keydown", (e) => {
  if (!box.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});
