const cards = document.querySelectorAll(".card");
const overlay = document.getElementById("overlay");
const popupMessage = document.getElementById("popupMessage");
const closeBtn = document.querySelector(".close");
const page = document.getElementById("page");

let selectedCards = 0;
let popupOpen = false;

function showPopup(message) {
  popupMessage.innerHTML = message;

  overlay.classList.remove("hidden");
  page.classList.add("dim");

  popupOpen = true;
}

function closePopup() {
  overlay.classList.add("hidden");
  page.classList.remove("dim");

  popupOpen = false;
}

closeBtn.addEventListener("click", closePopup);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closePopup();
  }
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (popupOpen) return;

    if (card.classList.contains("opened")) {
      showPopup(card.dataset.message);
      return;
    }

    if (selectedCards >= 2) {
      showPopup("You can only choose 2 cards.");
      return;
    }

    selectedCards++;

    card.classList.add("opened");

    showPopup(card.dataset.message);

    if (selectedCards === 2) {
      cards.forEach((c) => {
        if (!c.classList.contains("opened")) {
          c.classList.add("disabled");

          c.addEventListener(
            "click",
            (e) => {
              e.stopImmediatePropagation();

              showPopup("You have already selected 2 cards.");
            },
            { once: false },
          );
        }
      });
    }
  });
});
