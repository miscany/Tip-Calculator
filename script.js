window.addEventListener("DOMContentLoaded", () => {
  // Getting inputs, and buttons by their ids
  const bill = document.getElementById("bill");
  const people = document.getElementById("people");
  const tipBoxes = document.querySelectorAll(".tip-box");
  const enterElements = [bill, people];
  const tipPerPerson = document.getElementById("tip-per-person");
  const totalTip = document.getElementById("total-tip");
  const resetButton = document.getElementById("reset");

  //functions
  function calculateTips() {
    let bill = enterElements[0];
    let tipBoxArr = [...tipBoxes];
    // iteratoes through tipBoxes to find selected box
    let found = tipBoxArr.find((item) => {
      return item.classList.contains("selected");
    });
    // tip percent is inputBox or selectBox value
    let tipPercent =
      found.value || parseFloat(found.innerText.replace("%", ""));

    let tipWhole = bill.value * (tipPercent / 100);
    let tipEach = tipWhole / people.value;
    tipPerPerson.lastChild.previousElementSibling.innerText = tipEach;
    totalTip.lastChild.previousElementSibling.innerText = tipWhole;
  }
  //removes selected class from each tipBox
  function removeSelected() {
    tipBoxes.forEach((box) => {
      box.classList.remove("selected");
    });
    tipBoxes[5].value = 0;
  }
  // adds selected classList
  function checked(event) {
    removeSelected();
    event.target.classList.add("selected");
  }

  function checkInputEmpty() {
    enterElements.forEach((item) => {
      //remove borders and set tooltip to hidden
      item.classList.remove("orange-border");
      item.previousElementSibling.setAttribute("hidden", true);
      if (item.value == 0) {
        // if input empty add orange border and display tooltip
        item.classList.add("orange-border");
        item.previousElementSibling.removeAttribute("hidden");
      }
    });
    // check if all input fields are filled
    let inputsFilled = enterElements.every((item) => {
      return item.value > 0;
    });

    if (inputsFilled) {
      calculateTips();
    }
  }

  function reset() {
    bill.value = 0;
    people.value = 0;

    tipPerPerson.lastChild.previousElementSibling.innerText = 0;
    totalTip.lastChild.previousElementSibling.innerText = 0;
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

  resetButton.addEventListener("click", reset);
});
