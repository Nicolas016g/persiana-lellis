const menuBtn = document.querySelector("[data-menu-btn]");
const menu = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");
const dialog = document.querySelector("[data-lightbox-dialog]");
const dialogImg = document.querySelector("[data-lightbox-img]");
const dialogCaption = document.querySelector("[data-lightbox-caption]");
const toTop = document.querySelector("[data-top]");

menuBtn?.addEventListener("click", () => {
  const open = menu?.hidden === false;
  if (menu) menu.hidden = open;
  menuBtn.setAttribute("aria-expanded", String(!open));
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 960px)").matches && menu) {
      menu.hidden = true;
      menuBtn?.setAttribute("aria-expanded", "false");
    }
  });
});

window.addEventListener("scroll", () => {
  nav?.classList.toggle("is-scrolled", window.scrollY > 12);
  toTop?.classList.toggle("is-on", window.scrollY > 480);
}, { passive: true });

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll("[data-lightbox]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!dialog || !dialogImg) return;
    dialogImg.src = btn.getAttribute("data-lightbox") || "";
    dialogImg.alt = btn.querySelector("img")?.alt || "";
    if (dialogCaption) dialogCaption.textContent = btn.getAttribute("data-caption") || "";
    dialog.showModal();
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
