let currentSize = 32;
let currentColor = "black";

const grid = document.querySelector("#grid");

const colorButton = document.querySelector("#colorButton");
const eraseButton = document.querySelector("#eraseButton");
const clearButton = document.querySelector("#clearButton");
const guessButton = document.querySelector("#guessButton");

const sizeSlider = document.querySelector("#sizeSlider");
const sizeDisplay = document.querySelector("#sizeDisplay");

let mousedown = false;
document.body.onmousedown = () => {
  mousedown = true;
};
document.body.onmouseup = () => {
  mousedown = false;
};

// Event Listeners
colorButton.addEventListener("click", () => {
  currentColor = "black";
});
eraseButton.addEventListener("click", () => {
  currentColor = "white";
});
clearButton.addEventListener("click", resetGrid);
sizeSlider.addEventListener("input", () => {
  currentSize = sizeSlider.value;
  resetGrid();
  sizeDisplay.innerHTML = `${currentSize} x ${currentSize}`;
});

// Grid functions

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", colorCell);
    cell.addEventListener("mousedown", colorCell);
    grid.appendChild(cell);
  }
}

function resetGrid() {
  grid.innerHTML = "";
  setupGrid(currentSize);
}

// Cell functions

function colorCell(event) {
  if (event.type === "mouseover" && !mousedown) return;
  event.target.style.backgroundColor = currentColor;
}

window.onload = () => {
  setupGrid(currentSize);
};
