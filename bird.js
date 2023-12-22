class Bird {
  constructor(x, y) {

    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);

    this.size = 3;

    this.maxSpeed = 3;
    this.maxForce = 0.05;
  }

  applyForce = (force) => {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force)
  }

  update(birds) {

    // calculate the acceleration
    let sep = this.separation(birds);
    let ali = this.align(birds);
    let coh = this.cohesion(birds);

    sep.mult(1.4);
    ali.mult(1.0);
    coh.mult(1.0);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    
    // calculate velocity
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);

    // update position
    this.position.add(this.velocity);
    if (this.position.x < -this.size) {
      this.position.x = width + this.size;
    }
    if (this.position.y < -this.size) {
      this.position.y = height + this.size;
    }
    if (this.position.x > width + this.size) {
      this.position.x = -this.size;
    }
    if (this.position.y > height + this.size) {
      this.position.y = -this.size;
    }
  }

  draw() {

    let theta = this.velocity.heading() + radians(90)      // rotated in the direction of velocity

    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.size * 2);
    vertex(-this.size, this.size);
    vertex(this.size, this.size);
    endShape(CLOSE);
    pop();
  }

    // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek = (target) => {
    let desired = p5.Vector.sub(target, this.position)  // A vector pointing from the location to the target
    desired.normalize()                                 // Normalize desired and scale to maximum speed
    desired.mult(this.maxSpeed)
    let steer = p5.Vector.sub(desired, this.velocity)   // Steering = Desired minus Velocity
    steer.limit(this.maxForce)
    return steer
  }

  separation = (birds) => {
        let distance = 25.0
    let steer = createVector(0, 0)
    let count = 0
    for (const bird of birds) {
      let d = p5.Vector.dist(this.position, bird.position)
      if (d > 0 && d < distance) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, bird.position)
        diff.normalize()
        diff.div(d)      // Weight by distance
        steer.add(diff)
        count ++
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count)
    }
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);      // does it need to sub v i here 
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align = (birds) => {
    let scope = 50;
    let sum = createVector(0,0);
    let count = 0;
    for (let i = 0; i < birds.length; i++) {
      let d = p5.Vector.dist(this.position,birds[i].position);
      if ((d > 0) && (d < scope)) {
        sum.add(birds[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion = (birds) => {
    let scope = 50
    let sum = createVector(0, 0)
    let count = 0
    for (const bird of birds) {
      let d = p5.Vector.dist(this.position, bird.position)
      if (d > 0 && d < scope) {
        sum.add(bird.position)
        count ++
      }
    }
    if (count > 0) {
      sum.div(count)
      return this.seek(sum)
    } else {
      return createVector(0, 0)
    }
  }


}

