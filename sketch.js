// Ideas: http://www.mathematische-basteleien.de/hypercube.htm

// Interesting Configs
//  shift1 50, shift2 100, sqStroke 2, sqL 100
//  shift1 50, shift2 50, sqStroke 2, sqL 100
//  shift1 50, shift2 60, sqStroke 3, sqL 200
//  50, 50, 3, 150
// 150, 150, 3, 250


let v1 = {x: -100, y: -100};
let v2 = {x: 100, y: -100};
let sqStroke = 3;
let sq1L = 110;
let sq2L = 110;
let fira;
let fillIntensity = 0;
let fillOpacity = 10;

let L1slider;
let v1slider;
let v2slider;

function preload() { 
  fira = loadFont('./fonts/FiraSans-Regular.otf');
} 

function setup() {
    createCanvas(windowWidth-100, windowHeight-10);
    textFont(fira);

    sliderWidth = '600px';
    halfSliderWidth = '300px';
    
    // slider min, max, default, step
    L1slider = createSlider(10, 200, 100, 10);
    L1slider.position(50,10);
    L1slider.style('width', sliderWidth);

    v1sliderx = createSlider(-200, 200, 100, 10);
    v1sliderx.position(50,50);
    v1sliderx.style('width', halfSliderWidth);

    v1slidery = createSlider(-200, 200, 100, 10);
    v1slidery.position(400,50);
    v1slidery.style('width', halfSliderWidth);

    
    v2sliderx = createSlider(-200, 200, 100, 10);
    v2sliderx.position(50,90);
    v2sliderx.style('width', halfSliderWidth);

    v2slidery = createSlider(-200, 200, 100, 10);
    v2slidery.position(400,90);
    v2slidery.style('width', halfSliderWidth);


    dropdown = createSelect(); 
    // Position the dropdown menu 
    dropdown.position(50,130); 
    // Set options 
    dropdown.option(1); 
    dropdown.option(0.5); 
    dropdown.option(2); 

}
   

function draw() {

    let sqR = {x: width/2, y: height/2};
    let sq1L = L1slider.value();
    lengthFactor = dropdown.value()
    let sq2L = lengthFactor*L1slider.value();
    let v1 = {x: -v1sliderx.value(), y: -v1slidery.value()}
    let v2 = {x: -v2sliderx.value(), y: v2slidery.value()}

    background(255);
    strokeWeight(sqStroke);

    // red cube
    stroke(255,116,92);
    fill(fillIntensity, 0, 0, fillOpacity);
    drawCube(sqR.x, sqR.y, sq1L, v1);

    // blue cube
    stroke(138, 145, 233);
    fill(0, 0, fillIntensity, fillOpacity);
    push();
    translate(v2.x, v2.y);
    drawCube(sqR.x, sqR.y, sq2L, v1);
    pop();

    // green lines
    stroke(203, 255, 179);
    stroke(100,255,100);
    stroke(77, 153, 77);
    stroke(97, 189, 148);

    joinCubes(sqR.x, sqR.y, sq1L, sq2L, v1, v2);

    stroke(255);
    fill(0)
    textSize(16);
    textFont('Times New Roman');
    let sliderLabelx = 720
    text("CUBE Size", sliderLabelx , 20);
    text("L = " + sq1L, sliderLabelx/2 , 15);
    text("CUBE 3D Translation", sliderLabelx, 60);
    text("x = " + v1.x, sliderLabelx/4, 58);
    text("y = " + v1.y, 3*sliderLabelx/4, 58);
    text("CUBE 4D Translation", sliderLabelx, 100);
    text("x = " + v2.x, sliderLabelx/4, 96);
    text("y = " + v2.y, 3*sliderLabelx/4, 96);
    text("Ratio of cube sizes", 120, 150)
    // strategy:
    // try to determine left-most point
    // and right most point of tesseract and use that
    // for size & positionning
    textFont(fira);
    stroke(0);
    fill(0);
    textSize(abs(v1.x/4) + sq1L/2);
    text("Tesseract", sqR.x - sq1L/1.8 ,
	 sqR.y + 2*sq1L + abs(v1.y/2) + abs(v2.y/2));

    
}

function drawCube(x,y,L,v1){
    // first square
    rect(x, y, L, L)
    // translated 2nd square
    push();
    translate(v1.x, v1.y);
    rect(x, y, L, L)
    pop();

    // join the lines
    line(x, y, x + v1.x, y + v1.y)
    line(x + L, y,
	 x + v1.x + L, y + v1.y)
    line(x, y + L,
	 x + v1.x, y + v1.y + L)
    line(x + L, y + L,
	 x + v1.x + L, y + v1.y + L)
}

function joinCubes(x,y, L1, L2, v1, v2){
// Draw the 8 lines between cubes
    var lTrans = [0, L1]; // translation along square
    let cTrans = [[0, v1.x], [0, v1.y]]; // translation to other square in cube
    var iP = []; // initial points (red cube)
    
    for (var i = 0; i < lTrans.length; i++) {
	for (var k = 0; k < lTrans.length; k++) {
	    for (var j = 0; j < cTrans.length; j++) {
		iP.push({x: x+ lTrans[i] + cTrans[0][j],
			 y:  y + lTrans[k] + cTrans[1][j]})			   	    }
	}	
    }

    // final points (blue cube)
    var lTrans = [0, L2];
    var fP = [];

    for (var i = 0; i < lTrans.length; i++) {
	for (var k = 0; k < lTrans.length; k++) {
	    for (var j = 0; j < cTrans.length; j++) {
		fP.push({x: x+ lTrans[i] + cTrans[0][j] + v2.x,
			 y:  y + lTrans[k] + cTrans[1][j] + v2.y})			   	    }
	}	
    }

// join red cube points and blue cube points
    for (var i = 0; i < iP.length; i++) {
	line(iP[i].x, iP[i].y, fP[i].x, fP[i].y);
    }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('mytesseract', 'png')
  }

}
