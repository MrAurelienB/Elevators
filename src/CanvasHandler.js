
export class CanvasHandler {
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;

        this.mouseX = canvas.width / 2;
        this.mouseY = canvas.height / 2;

        window.addEventListener("mousemove", e => this.OnMouseMove(e));
        window.addEventListener("resize", () => this.ResizeCanvas());
        this.ResizeCanvas();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // draw canvas border
        this.ctx.lineWidth = 4; // Border thickness
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height); // Draw border around edges

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(500, 500, 100, 100);

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, 20, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(100, 100, 100, 100);

        requestAnimationFrame(() => this.draw());
    }

    OnMouseMove(e){
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    ResizeCanvas() {
        // Set CSS size (visual size)
        this.canvas.style.width = "80vw"; // 80% of viewport width
        this.canvas.style.height = "80vh"; // 60% of viewport height
    
        // Adjust internal resolution to avoid blurriness
        this.canvas.width = this.canvas.clientWidth; 
        this.canvas.height = this.canvas.clientHeight;
    } // ResizeCanvas
}; // CanvasHandler