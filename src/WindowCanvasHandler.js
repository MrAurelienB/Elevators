import {WindowElevatorsHandler} from './WindowElevatorsHandler.js';

export class WindowCanvasHandler {
    constructor(canvas, ctx, parameterHandler){
        this.canvas = canvas;
        this.ctx = ctx;

        this.mouseX = canvas.width / 2;
        this.mouseY = canvas.height / 2;

        this.windowElevatorsHandler = new WindowElevatorsHandler(parameterHandler);

        this.initialize();
    }

    initialize(){
        window.addEventListener("click", e => this.onMouseClick(e));
        window.addEventListener("mousemove", e => this.onMouseMove(e));
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();

        this.windowElevatorsHandler.initialize();
    } // initialize()

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // draw canvas border
        this.ctx.lineWidth = 1; // Border thickness
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height); // Draw border around edges

        /*
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(500, 500, 100, 100);

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, 20, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(100, 100, 100, 100);
        */

        this.windowElevatorsHandler.draw(this.canvas, this.ctx);

        requestAnimationFrame(() => this.draw());
    } // draw()

    onMouseClick(e){

    } // onMouseClick()

    onMouseMove(e){
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    } // onMouseMove()

    resizeCanvas() {
        // Set CSS size (visual size)
        this.canvas.style.width = "80vw"; // 80% of viewport width
        this.canvas.style.height = "80vh"; // 60% of viewport height
    
        // Adjust internal resolution to avoid blurriness
        this.canvas.width = this.canvas.clientWidth; 
        this.canvas.height = this.canvas.clientHeight;
    } // resizeCanvas()

}; // WindowCanvasHandler