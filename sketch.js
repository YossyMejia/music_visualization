let mySound;
let amp;
let amv;
let fft;
let path = "MusicDB/Podington Bear - Starling";
let song_name = "Podington Bear - Starling";
var particles = []
var img;

const fileSelector = document.getElementById('file_selector');

fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  path = "MusicDB/"+fileList[0].name
  song_name = fileList[0].name
  console.log(path);
});


function preload() {
  //Music format admitted to be loaded and the song loaded from the system 
  var button =  createButton("Cargar cancion");
  button.mousePressed(preload)
  button.size(200,50);
  button.style("margin-top","50px");
  soundFormats('mp3', 'ogg'); 
  mySound = loadSound("MusicDB/y2mate.com - RhapsodyEmerald Sword.mp3");
  img = loadImage("img.jpeg")
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
  angleMode(DEGREES)
  // imageMode(CENTER)
  amp = new p5.Amplitude();
  fft = new p5.FFT();

  img.filter(BLUR, 3)
}

function drawSubWoofersCase() {
  //Function to draw the subwoofers case
  fill(85,135,180)
  rect(width/1.67,height/6.5,300,600)
  rect(width/5.5,height/6.5,300,600)
}

function drawSpeakerCase() {
  //Function to draw the speaker case
  fill(85,135,180)
  rect(width/4,height/1.3,1000,125)
}

function drawSubWoofers(level, color){
  //Function to draw the subwoofers circles and make the bass animation
  let size = map(level, 0, 1, 0, 400);
  fill(color,color,color)
  //Two principal subwoofers
  circle(width/4, height/4, size*2, size);
  circle(width/1.5, height/4, size*2, size);
  //Two sub Subwoofers 
  circle(width/4, height/1.8, size, size);
  circle(width/1.5, height/1.8, size, size);
  //Four inner circles
  circle(width/4, height/4, size, size);
  circle(width/1.5, height/4, size, size);
  circle(width/4, height/1.8, size/2, size);
  circle(width/1.5, height/1.8, size/2, size);
}

function drawSpeakers(level, color){
  //Function to draw the subwoofers circles and make the bass animation
  let size = map(level, 0, 1, 0, 400);
  fill(color,color,color)
  //Two principal speakers
  circle(width/3.6, height/1.225, size, size);
  circle(width/1.55, height/1.225, size, size);
  //Two sub Subwoofers 
  circle(width/2.5, height/1.225, size, size);
  circle(width/1.9, height/1.225, size, size);
  //Four inner circles
  circle(width/3.6, height/1.225, size/2.5, size);
  circle(width/1.55, height/1.225, size/2.5, size);
  circle(width/2.5, height/1.225, size/2.5, size);
  circle(width/1.9, height/1.225, size/2.5, size);
}



function draw() {
  background(0)
  text("Nombre de la cancion: "+song_name, 10, 15);
  text('Mantener presionado el clic aqui para reproducir  -  Soltar clic para detener', 25, 55);
  textSize(20)

  stroke(255)
  strokeWeight(3)
  noFill()

  // Nueva funcionalidad
  // translate(width/2, height/2)

  fft.analyze()
  amv = fft.getEnergy(20,200)
  
  push()
  if(amv >= 220){
    rotate(-0.5, 0.5)
  }

  image(img, 0,0, width, height)
  pop()



  var wave = fft.waveform();

  for(var t = -1; t <= 1; t+=2) {
    beginShape()
    for (var i = 0; i <= 180; i++){
      var index = floor(map(i, 0, 180, 0, wave.length-1))
      var r = map(wave[index], -1, 1, 25, 200)
      var x = r * sin(i) * t
      var y = r * cos(i)
      vertex(x+width/2, y+height/2)
    }
    endShape()
  }
  var p = new Particle()
  particles.push(p)

  for (var i = particles.length - 1 ; i >=0; i--) {
    if(!particles[i].edges()){
      particles[i].update(amv > 100)
      particles[i].show()
    }else{
      particles.splice(i, 1)
    }
  }

  // Nueva funcionalidad
  

  drawSubWoofersCase();
  drawSpeakerCase();
  drawSubWoofers(0.2, 80);
  drawSpeakers(0.2, 80);

  let level = amp.getLevel();
  if(level > 0.3){
    drawSubWoofers(level/2, 125);
  }
  else if(level <=  0.3){
    drawSpeakers(level/1.2, 125);
  }

  

  // requestAnimationFrame(draw);

  // if (running) {
  //   update(dt);
  // }

  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawLine(pointsUp);
  // drawLine(pointsDown);
  // connectPoints(pointsUp, pointsDown);

}

function canvasPressed() {
  // playing a sound file on a user gesture (clic)
  mySound.loop();
}


function mouseReleased() {
  //Pause the song when the mouse leave the canvas
  mySound.pause();
  background(220);
}

class Particle{
  constructor(){
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(width/2,height/2)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

    this.w = random(3,5)
  }

  update(cond){
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if(cond){
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }

  edges(){
    if(this.pos.x < -width/1.2 || this.pos.x > width/1.2 || this.pos.y < -height/1.2 || this.pos.y > height/1.2){
      return true
    }else{
      return false
    }
  }

  show() {
    noStroke()
    fill(0)
    ellipse(this.pos.x/2, this.pos.y/2, this.w)
  }

}
