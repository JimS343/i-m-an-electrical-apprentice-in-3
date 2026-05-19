const filterButtons = document.querySelectorAll(".filter-button");
const topicCards = document.querySelectorAll(".topic-card");
const searchInput = document.getElementById("searchInput");
const savedTheme = localStorage.getItem("site-theme");
const initialTheme = savedTheme || "light";

document.body.dataset.theme = initialTheme;

const topNav = document.querySelector(".top-nav");

if (topNav) {
  const utilityWrap = document.createElement("div");
  utilityWrap.className = "nav-utility";

  const themeToggle = document.createElement("button");
  themeToggle.type = "button";
  themeToggle.className = "theme-toggle";

  function updateThemeButton() {
    const isDark = document.body.dataset.theme === "dark";
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  themeToggle.addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("site-theme", document.body.dataset.theme);
    updateThemeButton();
  });

  updateThemeButton();
  utilityWrap.appendChild(themeToggle);
  topNav.appendChild(utilityWrap);
}

if (filterButtons.length && topicCards.length && searchInput) {
  let activeFilter = "all";

  function updateCards() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    topicCards.forEach((card) => {
      const category = card.dataset.category;
      const searchText = card.dataset.search;
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesSearch = searchText.includes(searchTerm);

      card.classList.toggle("hidden", !(matchesFilter && matchesSearch));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      updateCards();
    });
  });

  searchInput.addEventListener("input", updateCards);
}
