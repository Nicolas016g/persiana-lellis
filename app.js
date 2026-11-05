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

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const stages = document.querySelectorAll("main > section:not(.hero), .foot");

const paintStage = (stage) => {
  stage.classList.add("is-in");
  stage.querySelectorAll("img[data-src]").forEach((img) => {
    if (!img.getAttribute("src")) img.src = img.dataset.src;
  });
  stage.querySelectorAll("iframe[data-src]").forEach((frame) => {
    if (!frame.getAttribute("src")) frame.src = frame.dataset.src;
  });
};

stages.forEach((stage) => {
  stage.classList.add("reveal");
  stage.querySelectorAll("img[src]").forEach((img) => {
    img.dataset.src = img.getAttribute("src");
    img.removeAttribute("src");
  });
  stage.querySelectorAll("iframe[src]").forEach((frame) => {
    frame.dataset.src = frame.getAttribute("src");
    frame.removeAttribute("src");
  });
});

if (reduceMotion) {
  stages.forEach(paintStage);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        paintStage(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "12% 0px", threshold: 0.08 },
  );
  stages.forEach((stage) => observer.observe(stage));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    const stage = target?.closest(".reveal");
    if (stage) paintStage(stage);
  });
});
