
birds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 255);
      console.log(this.birds.length)

  for (const bird of birds) {
    bird.update(birds);
    bird.draw();
  }
}

function mouseDragged() {
  birds.push(new Bird(mouseX, mouseY));
}