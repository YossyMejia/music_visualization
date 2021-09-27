let mySound;
let amp;
let fft;
let path;

function preload() {
  //Music format admitted to be loaded and the song loaded from the system 
  soundFormats('mp3', 'ogg'); 
  mySound = loadSound('musicDB/Podington Bear - Starling.mp3');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
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
  background(800, 10)
  text('Mantener presionado el clic aqui para reproducir  -  Soltar clic para detener', 25, 25);
  textSize(20)
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