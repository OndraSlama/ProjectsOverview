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
let gifReady = 0;
let wideScreen = true
let screenWidthChange = false

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
    canvasHeight = windowHeight - 185;
    backgroundColor = [37, 37, 37];
    // backgroundColor = [0,0,0];
    frameRate(60);
    // backgroundColor = 100;
    
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch-holder');    
    canvas.mouseClicked(function(){
        if(gifReady == 1){
            gifReady = 0;
            showGif = 1;
            gifPos = createVector(width*0.5 - 215, height*0.3 - 200);
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
    if(width > 1200){
        createDividedText(texts, "Welcome to my web.",   width*0.5, height*.5, width * .07, "gold")
        wideScreen = true
    }else{
        createDividedText(texts, "Welcome",   width*0.5, height*.3, width * .09, "gold")
        createDividedText(texts, "to",   width*0.5, height*.4, width * .09, "gold")
        createDividedText(texts, "my",   width*0.5, height*.5, width * .09, "gold")
        createDividedText(texts, "web.",   width*0.5, height*.6, width * .09, "gold")
        wideScreen = false
    }
    createDividedText(texts, "Feel free to *click* around.", width/2, height*.8, width * 0.025);
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
        gif_createImg.position(0, -500);
        showGif = 0;
        gifTime = 0;
        gifReady = 1;
    }
}

function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight - 185);
    if(width > 1200 && wideScreen == false){
        wideScreen = true;
        texts = [];
        createDividedText(texts, "Welcome to my web.",   width*0.5, height*.5, width * .07, "gold")
        createDividedText(texts, "Feel free to *click* around.", width/2, height*.8, width * 0.025);
    }else if(width < 1200 && wideScreen == true){
        wideScreen = false
        texts = [];
        createDividedText(texts, "Welcome",   width*0.5, height*.3, width * .07, "gold")
        createDividedText(texts, "to",   width*0.5, height*.4, width * .07, "gold")
        createDividedText(texts, "my",   width*0.5, height*.5, width * .07, "gold")
        createDividedText(texts, "web.",   width*0.5, height*.6, width * .07, "gold")
        createDividedText(texts, "Feel free to *click* around.", width/2, height*.8, width * 0.025);
    }
}

function mouseClicked(){    
    texts.forEach(t =>{
        t.clickFunction();
    });
}

function createDividedText(texts, string, x, y, size, color){
    // let stringArray = string.split(" ");
    let stringArray = string;
    var sizeOfText = 0
    let spacing = 0.006
    let interval = 50
    for(var i = 0; i < stringArray.length; i++){
        let temp = new NewText(stringArray[i], x, y, size);
        sizeOfText += temp.bounds.w/width + spacing
    }
    let temp = new NewText(stringArray[0], x, y, size);
    let sizeOfWord = temp.bounds.w/width + spacing

    let currentPos = x/width - sizeOfText/2 + sizeOfWord/2

    for(var i = 0; i < stringArray.length-1; i++){       
        let temp1 = new NewText(stringArray[i], currentPos * width, y, size, color);

        setTimeout(function() {
            texts.push(temp1)
        }, interval*i);
        

        let temp2 = new NewText(stringArray[i+1], currentPos * width, y, size);
        let sizeOfWord1 = temp1.bounds.w/width + spacing
        let sizeOfWord2 = temp2.bounds.w/width + spacing

        currentPos += sizeOfWord1/2 + sizeOfWord2/2
    }    
    setTimeout(function() {
        texts.push(new NewText(stringArray[i], currentPos * width, y, size, color));
    }, interval*i);
}