const textNodes = document.querySelectorAll("[data-ja][data-en]");
const toggleButtons = document.querySelectorAll(".lang-toggle button");
const profileImage = document.querySelector("#profile-image");

if (profileImage) {
  const images = (profileImage.dataset.images || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    profileImage.src = images[randomIndex];
  }
}

const setLanguage = (lang) => {
  document.documentElement.lang = lang;
  document.body.classList.toggle("lang-ja", lang === "ja");

  textNodes.forEach((node) => {
    const value = node.dataset[lang];
    if (value) {
      node.textContent = value;
    }
  });

  toggleButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("cvLang", lang);
};

const stored = localStorage.getItem("cvLang") || "ja";
setLanguage(stored);

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));
