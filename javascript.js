let countCZ = 0;
let countEN = 0;
let countFive = -5;
let insideCounter = 1;
let swapCard = false;
let numbeOfCard = 20;
if (!localStorage.getItem("inputCZ-0")) {
  for (let i = 0; i < numbeOfCard; i++) {
    localStorage.setItem(`inputCZ-${i}`, `ceske${i + 1}`);
    localStorage.setItem(`inputEN-${i}`, `cizi${i + 1}`);
  }
}

for (let i = 0; i < numbeOfCard; i++) {
  const div = document.createElement("div");
  const inputCZ = document.createElement("input");
  const inputEN = document.createElement("input");
  div.setAttribute("class", "oneRow");
  document.querySelector(".container").appendChild(div);
  createInput(inputCZ, div, `inputCZ-${i}`);
  createLabel(`inputCZ-${i}`, div, i);

  createInput(inputEN, div, `inputEN-${i}`);

  listenerAdd(inputCZ);
  listenerAdd(inputEN);

  fillInputCZ(inputCZ);
  fillInputEN(inputEN);
}

document.querySelector(".btn-next-five").addEventListener("click", function () {
   countFive = countFive + 5;
  document.querySelector(".card").classList.remove("hidden");
  document.querySelector(".card").style.borderColor = "red";
  document.querySelector(".overlay").classList.remove("hidden");
  if (countFive > numbeOfCard - 1) countFive = 0;
  console.log(`five ${countFive}`);
  countCZ = countFive;
  // countEN = countFive;
 
  document.querySelector(".card").textContent = localStorage.getItem(
    `inputCZ-${countCZ}`
  );
  insideCounter = 1;
  // countCZ++;
  swapCard = false;
});

document.querySelector(".card").addEventListener("click", function () {
  if (swapCard) {
    countCZ=countFive+Math.trunc(Math.random()*5);
    document.querySelector(".card").textContent = localStorage.getItem(
      `inputCZ-${countCZ}`
    );
    document.querySelector(".card").style.borderColor = "red";
    console.log(Math.trunc(Math.random()*5)+1+"/"+countCZ+"/"+countFive);
    
    swapCard = !swapCard;
    insideCounter++;
  } else {
    document.querySelector(".card").textContent = localStorage.getItem(
      `inputEN-${countCZ}`
    );
    document.querySelector(".card").style.borderColor = "green";
    // countEN++;
    swapCard = !swapCard;
    if (insideCounter > 4) {
      insideCounter = 0;
      // countCZ = countCZ - 5;
      // countEN = countEN - 5;
 
    }
  }
});

document.querySelector(".overlay").addEventListener("click", function () {
  document.querySelector(".card").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

function fillInputCZ(inputCZ) {
  inputCZ.value = localStorage.getItem(inputCZ.className);
}

function fillInputEN(inputEN) {
  inputEN.value = localStorage.getItem(inputEN.className);
}
function createLabel(nameFor, div, i) {
  let label = document.createElement("label");

  label.textContent = `${i < 9 ? "0" : ""}${i + 1}`;
  label.setAttribute("for", nameFor);
  div.appendChild(label);
}
function createInput(inputName, div, nameOfClass) {
  inputName.setAttribute("name", nameOfClass);

  inputName.setAttribute("value", "neco");
  inputName.setAttribute("class", nameOfClass);
  div.appendChild(inputName);
}

function listenerAdd(inputName) {
  inputName.addEventListener("input", function () {
    localStorage.setItem(this.className, this.value);
  });
}
