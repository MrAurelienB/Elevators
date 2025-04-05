

export class WindowElevatorsHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    initialize(){

    }

    draw(canvas, ctx){
        let floorCount = this.parameterHandler.highestFloor - this.parameterHandler.lowestFloor + 1;
        if (floorCount < 0)
            floorCount = 0;

        for (let i = 0; i < floorCount; i++){
            ctx.fillStyle = "black";
            ctx.fillRect(100, canvas.height - 50 * (i + 1) + 2, canvas.width - 100 * 2, 46);
        }
    }
} // class WindowElevatorsHandler