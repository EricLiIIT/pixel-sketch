const initalGridSize = 16;
const pixelSketch = document.getElementById("pixel-sketch");
const gridSizeLabel = document.getElementById("pixel-count");
const selectGridSizeSlider = document.getElementById("grid-size");
const colorPicker = document.getElementById("color-input");
const toggleButton = document.getElementById("toggle-button");
const clearButton = document.getElementById("clear-button");
const resetButton = document.getElementById("reset-button");

let gridLinesVisible = true;
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

selectGridSizeSlider.addEventListener("input", () => {
  changeGridSize();
});

toggleButton.addEventListener("click", () => {
  let gridCells = document.querySelectorAll(".grid-cell");
  toggleGrid(gridCells);
});

clearButton.addEventListener("click", () => {
  let gridCells = document.querySelectorAll(".grid-cell");
  clearGrid(gridCells);
});

resetButton.addEventListener("click", () => {
  renderGrid(16);
  gridSizeLabel.textContent = "16 x 16";
  selectGridSizeSlider.value = 16;
});

function changeGridSize() {
  let gridSize = selectGridSizeSlider.value;
  gridSizeLabel.textContent = `${gridSize} x ${gridSize}`;
  renderGrid(gridSize);
  // console.log("Grid Size: ", gridSize, "px ct");
}

function renderGrid(gridSize) {
  removeLastGrid();

  // Add new grid
  const newGridContainer = document.createElement("div");
  newGridContainer.id = "grid-container";
  pixelSketch.appendChild(newGridContainer);

  // Size grid to fit new cell count
  const gridContainer = document.getElementById("grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, auto)`;

  let gridCellCount = gridSize * gridSize;

  // Fill grid with grid cells
  for (let i = 0; i < gridCellCount; i++) {
    let cell = document.createElement("div");
    cell.className = "grid-cell";
    cell.style.backgroundColor = "white";
    cell.style.boxSizing = "border-box";
    cell.addEventListener("dragstart", (e) => e.preventDefault());
    cell.addEventListener("mouseover", fillCellColor);
    cell.addEventListener("mousedown", fillCellColor);
    if (gridLinesVisible === true) {
      cell.style.borderStyle = "solid";
      cell.style.borderWidth = "0.001em";
    } else if (gridLinesVisible === false) {
      cell.style.borderStyle = "none";
    }
    gridContainer.appendChild(cell);
  }
}

function clearGrid(gridCells) {
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
}

function fillCellColor(event) {
  let selectedColor = colorPicker.value;
  if (event.type === "mouseover" && mouseDown) {
    event.target.style.backgroundColor = selectedColor;
  }
  if (event.type === "mousedown") {
    event.target.style.backgroundColor = selectedColor;
  }
}

function removeLastGrid() {
  let grid = document.getElementById("grid-container");
  grid.remove();
}

function toggleGrid(gridCells) {
  // console.log(gridLinesVisible);
  gridCells.forEach((cell) => {
    if (cell.style.borderStyle == "" || cell.style.borderStyle == "solid") {
      cell.style.border = "none";
      gridLinesVisible = false;
    } else if (cell.style.borderStyle == "none") {
      cell.style.borderStyle = "solid";
      cell.style.borderWidth = "0.001em";
      gridLinesVisible = true;
    }
  });
}

window.onload = () => {
  renderGrid(initalGridSize);
};

// export func (maybe with canvas?)
// add manual number input to specify grid size
