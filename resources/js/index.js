// Settings

let colorMode = true;
let currentColor = "black";
const colorPicker = document.querySelector("#colorPicker");
const colorButton = document.querySelector("#colorButton");
const eraserButton = document.querySelector("#eraserButton");

let currentSize = 32;
const sizeSlider = document.querySelector("#sizeSlider");
const sizeDisplay = document.querySelector("#sizeDisplay");

const clearButton = document.querySelector("#clearButton");

// Guess Mode

let guessMode = false;
const guessModeButton = document.querySelector("#guessModeButton");
const computerGuess = document.querySelector("#computerGuess");
const guessList = document.querySelector("#guessList");

// Grid

const grid = document.querySelector("#grid");

// Event Listeners

let mousedown = false;
document.body.onmousedown = () => {
  mousedown = true;
};
document.body.onmouseup = () => {
  mousedown = false;
};

colorPicker.addEventListener("change", () => {
  currentColor = colorPicker.value;
  enterColorMode();
});
colorButton.addEventListener("click", enterColorMode);
eraserButton.addEventListener("click", enterEraserMode);
clearButton.addEventListener("click", () => {
  enterColorMode();
  resetGrid();
});
sizeSlider.addEventListener("input", () => {
  currentSize = sizeSlider.value;
  resetGrid();
  updateSizeDisplay();
});
guessModeButton.addEventListener("click", toggleGuessMode);

// Settings functions

function enterColorMode() {
  colorMode = true;
  colorButton.classList.add("active");
  eraserButton.classList.remove("active");
}

function enterEraserMode() {
  colorMode = false;
  colorButton.classList.remove("active");
  eraserButton.classList.add("active");
}

function updateSizeDisplay() {
  sizeDisplay.innerHTML = `${currentSize} x ${currentSize}`;
}

// Guess Mode functions

function toggleGuessMode() {
  guessMode = !guessMode;
  if (guessMode) {
    guessModeButton.classList.add("active");
    colorPicker.classList.add("disabled");
    colorPicker.disabled = true;
    sizeSlider.classList.add("disabled");
    sizeSlider.disabled = true;
    currentColor = "black";
    colorPicker.value = currentColor;
    currentSize = 64;
    sizeSlider.value = currentSize;
    updateSizeDisplay();
    resetGrid();
  } else {
    guessModeButton.classList.remove("active");
    colorPicker.classList.remove("disabled");
    colorPicker.disabled = false;
    sizeSlider.classList.remove("disabled");
    sizeSlider.disabled = false;
  }
}

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
  if (!colorMode) {
    event.target.style.backgroundColor = "white";
  } else {
    event.target.style.backgroundColor = currentColor;
  }
}

window.onload = () => {
  setupGrid(currentSize);
};
