class NewText {
    constructor(string, x, y, size = height * 0.11, color = "gray") { 

        textAlign(CENTER, CENTER);

        // Determine hitbox
        this.bounds = font.textBounds(string, x, y + size*0.4, size);

        // Save parameters
        this.string = string;
        this.horizontalAlign = CENTER;
        this.verticalAlign = CENTER;
        this.color = color;    
        this.baseSize = size/width;
        this.basePosition = createVector(x/width, y/height);

        //State properties
        this.velocity = createVector();
        this.sizeVel = 0;
        this.position = createVector(x, y+50);
        this.size = 0;
        this.desiredPosition = createVector(x/width, y/height);
        this.desiredSize = this.baseSize;

        // Others       
        this.interactive = 1;
    }

    show() {
        fill(this.color);
        textFont(font);
        textSize(this.size);
        textAlign(this.horizontalAlign, this.verticalAlign);
        text(this.string, this.position.x, this.position.y);
    }

    update() {
        this.sizeVel = 0.15* (this.desiredSize - this.size/width);
        this.velocity = p5.Vector.sub(this.desiredPosition, createVector(this.position.x/width, this.position.y/height));
        this.velocity.mult(0.1);
        if(this.interactive){
            if(this.inArea()){
                this.desiredSize = this.baseSize * 0.9
                this.desiredPosition.x = this.basePosition.x + (mouseX/width - this.basePosition.x)/10;
                this.desiredPosition.y = this.basePosition.y + (mouseY/height - this.basePosition.y)/10;
            }else{
                this.desiredSize = this.baseSize;
                let dist = this.basePosition.dist(createVector(mouseX/width,mouseY/height));
                this.desiredPosition.x = this.basePosition.x - (mouseX/width - this.basePosition.x)/(1 + max(1, dist*60));
                this.desiredPosition.y = this.basePosition.y - (mouseY/height - this.basePosition.y)/(1 + max(1, dist*60));
            }
        }   

        this.position.x += this.velocity.x*width;
        this.position.y += this.velocity.y*height;
        this.size += this.sizeVel * width;    
        this.bounds = font.textBounds(this.string, this.position.x, this.position.y, this.size); 
    }

    changeText(newString) {
    }

    clicked() {
        if (this.inArea() && this.interactive) {
            for(let t of menu.texts){
                t.clickedFlag = 0;
            }
            this.clickedFlag = 1;
            this.clickFunction();
        }
    }

    pressed() {
        if (this.inArea()) {
            this.pressedFunction();
        }
    }

    inArea() {
        if (mouseX < this.bounds.x || mouseX > this.bounds.x + this.bounds.w) return false;
        if (mouseY < this.bounds.y || mouseY > this.bounds.y + this.bounds.h) return false;
        return true;
    }

    clickFunction() {
        if(this.inArea()){
            this.baseSize = this.baseSize * 1.5;
            setTimeout(function(text){
                text.baseSize = text.baseSize * 0.66;
            },200, this)
        }
    }

    pressedFunction() {  
    }
}



