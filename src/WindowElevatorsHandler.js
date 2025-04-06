

export class WindowElevatorsHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    initialize(){

    }

    draw(canvas, ctx){
        let floorCount = 0;
        for (let floor = this.parameterHandler.lowestFloor; floor <= this.parameterHandler.highestFloor; floor++){
            if (floor === 0)
                ctx.fillStyle = 'rgb(0 128 255)';
            else if (floor < 0)
                ctx.fillStyle = 'rgb(192 192 192)';
            else
                ctx.fillStyle = 'rgb(255 178 102)';
            ctx.fillRect(100, canvas.height - 50 * (floorCount + 1) + 2, canvas.width - 100 * 2, 46);
            floorCount += 1;
        }
    }
} // class WindowElevatorsHandler