const filterButtons = document.querySelectorAll(".filter-button");
const topicCards = document.querySelectorAll(".topic-card");
const searchInput = document.getElementById("searchInput");

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
