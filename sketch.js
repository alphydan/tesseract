// Ideas: http://www.mathematische-basteleien.de/hypercube.htm


// Interesting Configs
//  shift1 50, shift2 100, sqStroke 2, sqL 100
//  shift1 50, shift2 50, sqStroke 2, sqL 100
//  shift1 50, shift2 60, sqStroke 3, sqL 200
//  50, 50, 3, 150
// 150, 150, 3, 250

let shift1 = 150;
let shift2 = 150;
let sqStroke = 2;
let sqL = 120;
let fira;
let fillIntensity = 20;
let fillOpacity = 20;

function preload() { 
  fira = loadFont('./fonts/FiraSans-Regular.otf');
} 



function setup() {
    createCanvas(windowWidth-100, windowHeight-10);
//    textFont('Helvetica'); 
//    textFont('Georgia'); 
    textFont(fira); 
}
   

function draw() {
  let sqR = {x: width/2, y: height/2, L: sqL};        
  background(255);
  strokeWeight(sqStroke);

  // red square
  stroke(230,0,0);
//  stroke(0)
  fill(fillIntensity, 0, 0, fillOpacity);
  drawCube(sqR.x, sqR.y, sqR.L, shift1)
  
  
  stroke(225, 125, 0, 205);
  stroke(0, 225, 0, 205);
//  stroke(0)
  connectCubes(sqR.x, sqR.y, sqR.L, shift1, shift2);
  
  // blue square
  stroke(0,0,100);
//  stroke(0)
  fill(0, 0, fillIntensity, fillOpacity);
  drawCube(sqR.x + shift2, sqR.y - shift2, sqR.L, shift1)

  
  
  stroke(0);
  fill(0);
  textSize(sqR.L/2);
  text("Tesseract", sqR.x - sqR.L/1.8 , sqR.y + 1.4*sqR.L);
  }


function drawCube(x, y, L, shift) {
   // cube 1 back
  rect(x - shift, y - shift, L, L)
  // cube 1 front
  rect(x , y, L, L)
  // join cube 1 front - cube 1 bac
  line(x , y, x - shift, y - shift)
  line(x , y + L, x - shift, y - shift + L)
  line(x  + L, y, x - shift + L, y - shift)
  line(x  + L, y + L, x - shift + L, y - shift + L)
 
}


function connectCubes(x, y, L, shift1a, shift2) {
  //top: back L cube 1 -> back L cube 2
  line(x - shift1, y - shift1, 
    x - shift1 + shift2, y - shift1 - shift2)  
  //top: back R cube 1 -> back R cube 2
   line(x - shift1 + L, y - shift1, 
        x - shift1 + L + shift2, y - shift1 - shift2)   
  //bottom: back L cube 1 -> back L cube 2
  line(x - shift1, y - shift1 + L, 
    x - shift1 + shift2, y - shift1 + L - shift2)  
  //bottom: back R cube 1 -> back R cube 2
   line(x - shift1 + L, y - shift1 + L, 
        x - shift1 + L + shift2, y - shift1 + L - shift2)   

  //top: front L cube 1 -> front L cube 2
  line(x , y, x + shift2, y - shift2)  
  //top: front R cube 1 -> front R cube 2
  line(x + L , y, x + L + shift2, y - shift2)  
  //bottom: front L cube 1 -> front L cube 2
  line(x , y + L, x + shift2, y + L - shift2)  
  //bottom: front R cube 1 -> front R cube 2
  line(x + L , y + L, x + L + shift2, y + L - shift2)  
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('mytesseract', 'png')
  }
}
