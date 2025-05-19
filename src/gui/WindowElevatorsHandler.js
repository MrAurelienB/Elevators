import {ElevatorImage} from './ElevatorImage.js';

export class WindowElevatorsHandler {
    constructor(parameterHandler, elevatorsHandler){
        this.parameterHandler = parameterHandler;
        this.elevatorsHandler = elevatorsHandler;

        this.elevatorImage = new ElevatorImage('./resources/images/elevator_doors_3.jpg');
    }

    initialize(){

    }

    draw(canvas, ctx){

        // draw floors

        const floorHeight = 45;
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


        this.elevatorsHandler.update();
        for (let elevatorIdx = 0; elevatorIdx < this.elevatorsHandler.elevators.length; elevatorIdx++){
            const elevator = this.elevatorsHandler.elevators[elevatorIdx];

            const elevatorX = floorSideSpace + interElevatorSpace * (elevatorIdx + 1) + elevatorWidth * elevatorIdx;
            const elevatorY = canvas.height - floorHeight * (elevator.floor_position / 100 + 1) + interFloorSpace; // TODO: constante
            const elevatorH = floorHeight - 2 * interFloorSpace;
            //ctx.fillRect(elevatorX, elevatorY, elevatorWidth, elevatorH);
            //ctx.strokeRect(elevatorX + elevatorBorderWidth, elevatorY + elevatorBorderWidth, elevatorWidth - 2 * elevatorBorderWidth, elevatorH - 2 * elevatorBorderWidth);

            const IsMoreThanHalfIdle = elevator.current_idle_time_remaining < 0.5 * this.parameterHandler.getIdleTime(elevator.currentState());
            this.elevatorImage.draw(ctx, elevatorX, elevatorY, elevatorWidth, elevatorH, elevator.currentState(), IsMoreThanHalfIdle);
        }
    }
} // class WindowElevatorsHandler