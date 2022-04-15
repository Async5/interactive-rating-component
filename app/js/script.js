class useState {
  constructor(initialState) {
    this.state = {
      ...initialState,
    };
  }

  getState() {
    return this.state;
  }

  updateState(newState, debug = false, callback) {
    this.state = { ...this.state, ...newState };
    if (debug) {
      console.clear();
      console.table(this.state);
    }
    callback();
  }
}

const state = new useState({ activeIndex: null, isSubmitted: false });

const ratingBtns = document.querySelectorAll(".card__ratings button");
const submitBtn = document.querySelector(".card__submit");

ratingBtns.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    state.updateState({ activeIndex: index }, true, updateDom);
  });
});

submitBtn.addEventListener("click", () => {
  const { activeIndex } = state.getState();

  if (activeIndex !== null) {
    state.updateState({ isSubmitted: true }, true, updateDom);
  }
});

function updateDom() {
  const card = document.querySelector(".card");
  const thankYou = document.querySelector(".thank-you");

  const { activeIndex, isSubmitted } = state.getState();

  if (activeIndex !== null) {
    ratingBtns.forEach((button, index) => {
      if (activeIndex === index) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  if (isSubmitted === true) {
    card.innerHTML = thankYou.innerHTML;
    const rating = document.querySelector(".count");
    rating.innerText = activeIndex + 1;
  }
}
updateDom();
