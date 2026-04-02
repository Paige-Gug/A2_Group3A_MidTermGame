// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawSleep() → what the sleep screen looks like
// 2) input handlers → how the player returns to the start screen

// ------------------------------
// Main draw function for instructions screen
// ------------------------------
// drawSleep() is called from main.js
// only when currentScreen === "sleep"
let sleepTimer = 400; // timer to show the sleep screen for a few seconds before going back to home

function drawSleep() {
  game = false;
  background(29, 24, 74);
  fill(255);
  textAlign(CENTER);
  textSize(40);
  imageMode(CENTER);

  if (day >= 10) {
    background(29, 24, 74);
    text("You've reached the final day and", width / 2, height / 2);
    text(
      "unfortunately, you didn't make enough money.",
      width / 2,
      height / 2 + 60,
    );
    text("Work on balance next time!", width / 2, height / 2 + 120);
  } else if (money >= 400) {
    background(29, 24, 74);
    text("Congratulations! You've earned enough", width / 2, height / 2);
    text("money to get into culinary school.", width / 2, height / 2 + 60);
    text("You've mastered the art of balance!", width / 2, height / 2 + 120);
  } else if (energy > 4 && sleepTimer > 0) {
    image(nightvid, width / 2, height / 2, width, height);
    text("One day closer to culinary school!", width / 2, height / 2);
    sleepTimer--;
  } else if (energy <= 4 && sleepTimer > 0) {
    image(nightvid, width / 2, height / 2, width, height);
    text(
      "You are too tired to continue, you'll have to take tomorrow off.",
      width / 2,
      height / 2,
    );
    text(
      "Remember, rest is just as important as working!",
      width / 2,
      height / 2 + 60,
    );
    sleepTimer--;
  } else {
    nightvid.stop();
    currentScreen = "home";
    if (energy <= 4) {
      day = day + 2;
    } else {
      day++;
    }
    energy = int(random(85, 100));
    sleepTimer = 400;
    daytimer = 250;
    openday.play();
  }
}

// ------------------------------
// Mouse input for recipe screen
// ------------------------------
function sleepMousePressed() {}
