class Bird {
  constructor() {
    this.size = 30;
    this.color = 'yellow';
    this.posy = 185;
    this.vel = 0;
    this.dead = false;
  }
  
  render() {
    fill(255,255,0);
    rect(185, this.posy, this.size, this.size);
  }
  
  move() {
    this.posy += this.vel
    if(this.posy < 0)
      this.posy = 0;
    if(this.posy > 370)
      this.posy = 370;
    if(this.vel < 4)
       this.vel += 0.5;
  }
}

class Pipe {
  constructor(gaptop, posx) {
    this.width = 60   
    this.gapsize = 100
    this.gaptop = gaptop
    this.posx = posx
    this.passed = false;
  }
  
  render() {
    fill('green')
    rect(this.posx, 0, this.width, this.gaptop)
    rect(this.posx, this.gaptop+this.gapsize, this.width, 400-this.gaptop-this.gapsize)
  }
  
  move() {
    this.posx--;
  }
 
  killBird() {
    if(215 > this.posx && 185 < this.posx+this.width && (bird.posy < this.gaptop || bird.posy+bird.size > this.gaptop+this.gapsize)) { 
      bird.posy = 185;
      bird.vel = 0;
      pipes = [];
      score = 0;
    }
  }
    
  increaseScore() {
    if(185 > this.posx+this.width && !this.passed) {
      this.passed = true;
      score++;
    }
  }
}

function displayScore() {
  textSize(50)
  fill(255)
  stroke(0)
  strokeWeight(2)
  text(score, 200, 50)
}

let score = 0;
let pipes = [];
let bird = new Bird();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,255,255);
  strokeWeight(1)
  if(!bird.dead) {
    bird.render();
    bird.move();
  }
  for(let i = 0; i < pipes.length; i++) {

    pipes[i].render();
    pipes[i].move()
    pipes[i].increaseScore();
    pipes[i].killBird();
  }
  if(pipes.length == 0 || pipes[pipes.length-1].posx < 200)
    pipes.push  (new Pipe(random(0, 300), 450))
  if(pipes[0].posx < -pipes[0].width)
    pipes.shift()
    displayScore()
}

function keyPressed() {
  if(keyCode == 32)
    bird.vel = -5;
}