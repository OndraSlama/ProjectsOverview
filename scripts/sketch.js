// Global / p5 js specific variables
let canvasWidth;
let canvasHeight;
let backgroundColor;
let mouse;
let font;
let gif_loadImg, gif_createImg;
let showGif = 0;
let gifPos;
let gifTime;
let gifPauseTime = 0;

// Arrays
let texts = [];

function preload(){
    font = loadFont('arial.ttf');
    gif_loadImg = loadImage("https://media.giphy.com/media/yJFeycRK2DB4c/giphy.gif");
    gif_createImg = createImg("https://media.giphy.com/media/yJFeycRK2DB4c/giphy.gif");
}

function setup() {
    // Create canvas
    canvasWidth = windowWidth-20;
    canvasHeight = windowHeight - 170;
    backgroundColor = [37, 37, 37];
    frameRate(60);
    // backgroundColor = 100;
    
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');    
    canvas.mouseClicked(function(){
        if(gifPauseTime > 60){
            gifPauseTime = 0;
            showGif = 1;
            gifPos = createVector(mouseX, mouseY);
            gif_createImg = createImg("https://media.giphy.com/media/yJFeycRK2DB4c/giphy.gif");
        }
    })

    // p5 settings
    angleMode(DEGREES);
    frameRate(60);
    textFont('Arial');
    textAlign(CENTER);    

    // Others
    mouse = createVector(mouseX, mouseY);        
    
    texts.push(new NewText("Hi!", width/2, height*.3, height * 0.2))    
    texts.push(new NewText("Welcome to my web.", width/2, height*.5)) 
    texts.push(new NewText("Feel free to *click* around.", width/2, height*.8, height * 0.05))
}

function draw() {
    background(backgroundColor);    

    // Loop through texts  
    texts.forEach(t =>{
        t.show();
        t.update();
    });     
    
    if(showGif == 1 && gifTime < 60){
        gifTime++;
        gif_createImg.position(gifPos.x, gifPos.y);     
        
    }else{
        gif_createImg.position(10000, 0);
        showGif = 0;
        gifTime = 0;
        gifPauseTime++;
    }
}

function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight - 170);
}

function mouseClicked(){    
    texts.forEach(t =>{
        t.clickFunction();
    });
}