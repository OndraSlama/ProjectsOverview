// Global / p5 js specific variables
let canvasWidth;
let canvasHeight;
let backgroundColor;
let mouse;
let font;

// Arrays
let texts = [];

function preload(){
    font = loadFont('segoeuil.ttf');
}

function setup() {

    

    // Create canvas
    canvasWidth = windowWidth-20;
    canvasHeight = windowHeight - 170;
    backgroundColor = [37, 37, 37];
    // backgroundColor = 100;
    
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');    

    // p5 settings
    angleMode(DEGREES);
    frameRate(60);
    textFont('Arial');
    textAlign(CENTER);    

    // Others
    mouse = createVector(mouseX, mouseY);        
    
    texts.push(new NewText("*click* nice", width/2, height/2))
    
}

function draw() {
    background(backgroundColor);    

    // Loop through texts  
    texts.forEach(t =>{
        t.show();
        t.update();
    });       
}

function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight - 170);
}