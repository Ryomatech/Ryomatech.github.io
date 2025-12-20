const textNodes = document.querySelectorAll("[data-ja][data-en]");
const toggleButtons = document.querySelectorAll(".lang-toggle button");
const profileImage = document.querySelector("#profile-image");
const snowfield = document.querySelector(".snowfield");

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

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

if (snowfield) {
  const minFlakes = 32;
  const maxFlakes = 50;
  const extraFlakes = randomInt(12, 20);
  const totalFlakes = randomInt(minFlakes, maxFlakes) + extraFlakes;

  for (let i = 0; i < totalFlakes; i += 1) {
    const flake = document.createElement("span");
    const size = randomInt(3, 9);
    const duration = randomInt(14, 26);
    const delay = -Math.random() * 20;
    const drift = randomInt(-22, 22);

    flake.style.left = `${Math.random() * 100}%`;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.setProperty("--duration", `${duration}s`);
    flake.style.setProperty("--delay", `${delay}s`);
    flake.style.setProperty("--drift", `${drift}px`);

    snowfield.appendChild(flake);
  }
}
