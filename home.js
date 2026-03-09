// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawHome() → what the home/menu screen looks like
// 2) input handlers → what happens on click / key press on this screen
// 3) a helper function to draw menu buttons

// ------------------------------------------------------------
// Home screen visuals
// ------------------------------------------------------------
// drawHome() is called from main.js only when:
// currentScreen === "home"
function drawHome() {
  // Background colour for the home screen
  image(allimg[0], width / 2, height / 2, width, height); // background image

  // ---- Title text ----
  fill(30, 50, 60);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Pantry", 315, 200);

  fill(30, 50, 60);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Workbench", 710, 300);

  fill(30, 50, 60);
  textSize(36);
  textAlign(CENTER, CENTER);
  text("Oven", 1075, 200);

  // ---- Buttons (data only) ----
  // These objects store the position/size/label for each button.
  // Using objects makes it easy to pass them into drawButton()
  // and also reuse the same information for hover checks.
  const pantryBtn = {
    x: 315,
    y: 475,
    w: 240,
    h: 420,
    label: "",
  };

  const workBtn = {
    x: 710,
    y: 600,
    w: 340,
    h: 240,
    label: "",
  };

  const ovenBtn = {
    x: 1075,
    y: 565,
    w: 240,
    h: 280,
    label: "",
  };

  // Draw all buttons
  drawButton(pantryBtn);
  drawButton(workBtn);
  drawButton(ovenBtn);

  // show pantry image when hovered
  imageMode(CENTER);
  if (isHover(pantryBtn)) {
    image(allimg[1], 325, 485, 420, 550);
  } else if (isHover(ovenBtn)) {
    image(allimg[2], 1070, 580, 325, 380);
  }

  // ---- Cursor feedback ----
  // If the mouse is over the buttons, show a hand cursor so the player knows it is clickable.
  const over = isHover(workBtn) || isHover(pantryBtn) || isHover(ovenBtn);
  cursor(over ? HAND : ARROW);
}

// ------------------------------------------------------------
// Mouse input for the home screen
// ------------------------------------------------------------
// Called from main.js only when currentScreen === "home"
function homeMousePressed() {
  // For input checks, we only need x,y,w,h (label is optional)
  const pantryBtn = { x: 315, y: 475, w: 240, h: 420 };
  const workBtn = { x: 710, y: 600, w: 340, h: 240 };
  const ovenBtn = { x: 1075, y: 565, w: 240, h: 280 };

  // If workbench is clicked, go to the workbench screen
  if (isHover(workBtn)) {
    currentScreen = "workbench";
  }
  // If pantry is clicked, go to the pantry screen
  else if (isHover(pantryBtn)) {
    currentScreen = "pantry";
  }
  // If OVEN is clicked, go to the oven screen
  else if (isHover(ovenBtn)) {
    currentScreen = "oven";
  }
}

// ------------------------------------------------------------
// Helper: drawButton()
// ------------------------------------------------------------
// This function draws a button and changes its appearance on hover.
// It does NOT decide what happens when you click the button.
// That logic lives in homeMousePressed() above.
//
// Keeping drawing separate from input/logic makes code easier to read.
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check if the mouse is over the button rectangle
  const hover = isHover({ x, y, w, h });

  noStroke();

  // ---- Visual feedback (hover vs not hover) ----
  // This is a common UI idea:
  // - normal state is calmer
  // - hover state is brighter + more “active”
  //
  // We also add a shadow using drawingContext (p5 lets you access the
  // underlying canvas context for effects like shadows).
  if (hover) {
    fill(255, 200, 150, 0); // warm coral on hover

    // Shadow settings (only when hovered)
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 180, 120);
  } else {
    fill(255, 240, 210, 0); // soft cream base

    // Softer shadow when not hovered
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }

  // Draw the rounded rectangle button
  rect(x, y, w, h, 14);

  // Important: reset shadow so it does not affect other drawings
  drawingContext.shadowBlur = 0;

  // Draw the label text on top of the button
  fill(40, 60, 70);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
