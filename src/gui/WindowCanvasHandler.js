import {WindowElevatorsHandler} from './WindowElevatorsHandler.js';

export class WindowCanvasHandler {
    constructor(canvas, ctx, componentFactory){
        this.canvas = canvas;
        this.ctx = ctx;

        this.mouseX = canvas.width / 2;
        this.mouseY = canvas.height / 2;

        this.windowElevatorsHandler = new WindowElevatorsHandler(componentFactory);

        this.initialize();
    }

    initialize(){
        window.addEventListener("click", e => this.onMouseClick(e));
        window.addEventListener("mousemove", e => this.onMouseMove(e));
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeCanvas();

        this.windowElevatorsHandler.initialize();
    } // initialize()

    updateAndDraw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // draw canvas border
        this.ctx.lineWidth = 1; // Border thickness
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height); // Draw border around edges

        this.windowElevatorsHandler.updateAndDraw(this.canvas, this.ctx);

        requestAnimationFrame(() => this.updateAndDraw());
    } // updateAndDraw()

    onMouseClick(e){
        // nothing for now
    } // onMouseClick()

    onMouseMove(e){
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    } // onMouseMove()

    resizeCanvas() {
        // Set CSS size (visual size)
        this.canvas.style.width = "80vw"; // 80% of viewport width
        this.canvas.style.height = "90vh"; // 90% of viewport height
    
        // Adjust internal resolution to avoid blurriness
        this.canvas.width = this.canvas.clientWidth; 
        this.canvas.height = this.canvas.clientHeight;
    } // resizeCanvas()

}; // WindowCanvasHandler