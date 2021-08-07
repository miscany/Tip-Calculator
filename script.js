window.addEventListener("DOMContentLoaded", () => {
  // Getting inputs, and buttons by their ids
  const bill = document.getElementById("bill");
  const people = document.getElementById("people");
  const tipBoxes = document.querySelectorAll(".tip-box");
  const enterElements = [bill, people];

  //functions
  //removes selected class from each tipBox
  function removeSelected() {
    tipBoxes.forEach((box) => {
      box.classList.remove("selected");
    });
  }
  // adds selected classList
  function checked(event) {
    removeSelected();
    event.target.classList.add("selected");
  }

  function checkInputEmpty() {
    enterElements.forEach((item) => {
      item.classList.remove("orange-border");
      item.previousElementSibling.setAttribute("hidden", true);
      if (item.value == 0) {
        item.classList.add("orange-border");

        item.previousElementSibling.removeAttribute("hidden");
      }
    });
    let inputsFilled = enterElements.every((item) => {
      return item.value > 0;
    });
    console.log(inputsFilled);
  }

  // event listeners
  //adds checked function to each tipBox
  tipBoxes.forEach((box) => {
    box.addEventListener("click", checked);
  });

  enterElements.forEach((item) => {
    item.addEventListener("keyup", () => {
      if (event.keyCode === 13) {
        checkInputEmpty();
      }
    });
  });
});
