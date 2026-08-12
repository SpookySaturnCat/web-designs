const items = [
  "🌿", "🍵", "🌱", "🍃", "🌳", "🌙", "⭐", "🍀", "🌙",
  "🔮", "❀", "𓍊", "𓋼", "🍄", "🎑", "✨", "꩜", "🧉", "🌲", "🎍"
];

function getRandomItem() {
  return items[Math.floor(Math.random() * items.length)];
}

function fillStarCard() {
  const card = document.querySelector(".star-card");
  const gridContainer = document.getElementById("grid");

  gridContainer.innerHTML = "";

  const charWidth = 20; 
  const charHeight = 22; 

  const cardWidth = card.clientWidth - 30; 
  const cardHeight = card.clientHeight - 30;

  const cols = Math.floor(cardWidth / charWidth);
  const rows = Math.floor(cardHeight / charHeight);
  const totalStars = cols * rows;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalStars; i++) {
    const span = document.createElement("span");
    span.className = "star";
    span.textContent = "☆";

    span.addEventListener("mouseover", () => {
      span.textContent = getRandomItem();
    });

    fragment.appendChild(span);

    if ((i + 1) % cols === 0) {
      fragment.appendChild(document.createElement("br"));
    }
  }

  gridContainer.appendChild(fragment);
}

document.getElementById("reset-btn").addEventListener("click", () => {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.textContent = "☆";
  });
});

fillStarCard();
window.addEventListener("resize", fillStarCard);