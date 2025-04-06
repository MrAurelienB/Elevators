

export class WindowElevatorsHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    initialize(){

    }

    draw(canvas, ctx){

        // draw floors

        const floorHeight = 50;
        const interFloorSpace = 2; // apply to each floor
        const floorSideSpace = 100;

        let floorCount = 0;
        for (let floor = this.parameterHandler.lowestFloor; floor <= this.parameterHandler.highestFloor; floor++){
            if (floor === 0)
                ctx.fillStyle = 'rgb(0 128 255)'; // blue
            else if (floor < 0)
                ctx.fillStyle = 'rgb(192 192 192)'; // grey
            else
                ctx.fillStyle = 'rgb(255 178 102)'; // gold
            const floorX = floorSideSpace;
            const floorY = canvas.height - floorHeight * (floorCount + 1) + interFloorSpace;
            const floorW = canvas.width - 2 * floorSideSpace;
            const floorH = floorHeight - 2 * interFloorSpace;
            ctx.fillRect(floorX, floorY, floorW, floorH);
            floorCount += 1;
        }

        // draw elevators

        const interElevatorSpace = 10;
        const elevatorWidth = 50;
        const elevatorBorderWidth = 1;

        ctx.fillStyle = 'rgb(255 229 204)';
        ctx.strokeStyle = 'rgb(102 0 204)';
        ctx.lineWidth = elevatorBorderWidth;
        for (let elevator = 0; elevator < this.parameterHandler.elevatorCount; elevator++){
            const floorIdx = this.parameterHandler.getFloorIdx(0);

            const elevatorX = floorSideSpace + interElevatorSpace * (elevator + 1) + elevatorWidth * elevator;
            const elevatorY = canvas.height - floorHeight * (floorIdx + 1) + interFloorSpace;
            const elevatorH = floorHeight - 2 * interFloorSpace;
            ctx.fillRect(elevatorX, elevatorY, elevatorWidth, elevatorH);
            ctx.strokeRect(elevatorX + elevatorBorderWidth, elevatorY + elevatorBorderWidth, elevatorWidth - 2 * elevatorBorderWidth, elevatorH - 2 * elevatorBorderWidth);
        }
    }
} // class WindowElevatorsHandler