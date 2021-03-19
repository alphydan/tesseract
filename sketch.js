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

let tesseractList = [];
let buttonList = [];

function preload() {
    fira = loadFont('./fonts/FiraSans-Regular.otf');
}


function drawTesseract(position, len, trans3d, trans4d) {
    const normalizedLen = 1 * len;

    strokeWeight(sqStroke);

    // red cube
    stroke(255,116,92);
    fill(fillIntensity, 0, 0, fillOpacity);
    drawCube(position.x, position.y, len, trans3d);

    // blue cube
    stroke(138, 145, 233);
    fill(0, 0, fillIntensity, fillOpacity);
    push();
    translate(trans4d.x, trans4d.y);
    drawCube(position.x, position.y, normalizedLen, trans3d);
    pop();

    // green lines
    stroke(203, 255, 179);
    stroke(100,255,100);
    stroke(77, 153, 77);
    stroke(97, 189, 148);


    joinCubes(position.x, position.y, len, normalizedLen, trans3d, trans4d);
    stroke(255);
    fill(0)
    textSize(16);
    textFont('Times New Roman');

    // strategy:
    // try to determine left-most point
    // and right most point of tesseract and use that
    // for size & positionning
    textFont(fira);
    stroke(0);
    fill(0);
    textSize(abs(trans3d.x/4) + len/2);
}

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function saveFile(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

function rand() {
    return (Math.random() * 200) - 200;
}

const rows = 40;
const cols = 5;

function drawGrid() {
    let start = {x: 600, y: 410};

    const size = width / cols;
    console.log("size: " + size);

    scale(0.3);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const len = Math.random() * 200 + 10;
            const t1 = {x: rand(), y: rand()};
            const t2 = {x: rand(), y: rand()};
            drawTesseract(start, len, t1,  t2);
            tesseractList.push({'L': len, 'v1x': t1.x, 'v1y': t1.y, 'v2x': t2.x, 'v2y': t2.y});
            drawRatingButtons({x: start.x - 100, y: start.y + 250}, tesseractList.length - 1);

            start.x += 470;
        }
        start.y += 720;
        start.x = 600;
    }
    drawSaveButton({x: start.x + 300, y: start.y + 300});
}

function drawRatingButtons(pos, tesseractId) {
    const btns = [];
    for (const rating of [1, 2, 3]) {
        const btn = createButton(rating);
        btns.push(btn);
        btn.position(pos.x * 0.3, pos.y * 0.3);
        btn.mousePressed(() => {
            tesseractList[tesseractId]['rating'] = rating;
            for (const tesseractButton of buttonList[tesseractId])
                tesseractButton.removeAttribute('disabled');

            btn.attribute('disabled', '');

        });
        pos.x += 100;
    }
    buttonList.push(btns);
}

function drawSaveButton(pos) {
    const btn = createButton('Save');
    btn.position(pos.x * 0.3, pos.y * 0.3);
    btn.mousePressed(() => {
        // https://stackoverflow.com/questions/63481185/javascript-list-of-dictionariesjson-to-csv
        const dictionaryKeys = Object.keys(tesseractList[0]);

        const dictValuesAsCsv = tesseractList.map(dict => (
            dictionaryKeys.map(key => dict[key]).join(',')
        ));

        const result = [dictionaryKeys.join(','), ...dictValuesAsCsv].join('\n');
        saveFile('tesseracts.csv', result);
    });
}

function draw() {
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

function setup() {
    createCanvas(windowWidth-100, windowHeight+7000);
    textFont(fira);

    drawGrid();
}