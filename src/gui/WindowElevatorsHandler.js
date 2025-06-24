import {ElevatorImage} from './ElevatorImage.js';

export class WindowElevatorsHandler {
    constructor(componentFactory){
        this.componentFactory = componentFactory;

        this.elevatorImage = new ElevatorImage('./resources/images/elevator_doors_3.jpg');
    }

    initialize(){
        // nothing to do for now
    }

    updateAndDraw(canvas, ctx){
        this.update();
        this.draw(canvas, ctx);
    }

    update(){
        this.componentFactory.eventHandler.update();
    }

    draw(canvas, ctx){

        // 1 - draw floors
        const floorHeight = 45;
        const interFloorSpace = 2; // apply to each floor
        const floorSideSpace = 100;

        let floorCount = 0;
        for (let floor = this.componentFactory.parameterHandler.lowestFloor; floor <= this.componentFactory.parameterHandler.highestFloor; floor++){
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

        // 2 - draw elevators
        const interElevatorSpace = 10;
        const elevatorWidth = 50;
        const elevatorBorderWidth = 1;

        for (let elevatorIdx = 0; elevatorIdx < this.componentFactory.elevatorsHandler.elevators.length; elevatorIdx++){

            const elevator = this.componentFactory.elevatorsHandler.elevators[elevatorIdx];

            const elevatorX = floorSideSpace + interElevatorSpace * (elevatorIdx + 1) + elevatorWidth * elevatorIdx;
            const elevatorY = canvas.height - floorHeight * (elevator.floor_position / 100 + 1) + interFloorSpace;
            const elevatorH = floorHeight - 2 * interFloorSpace;

            // first show the elevator destination (with a red dot for now)
            if (this.componentFactory.parameterHandler.showElevatorDestination){
                const dest_y = canvas.height - floorHeight * this.componentFactory.parameterHandler.getFloorIdx(elevator.destination_floor) - 0.5 * floorHeight;

                ctx.fillStyle = 'red';
                ctx.strokeStyle = 'red';

                ctx.beginPath();
                ctx.arc(elevatorX + 0.5 * elevatorWidth, dest_y, 10, 0, Math.PI * 2); // (x, y, radius, startAngle, endAngle)
                ctx.fill(); // Fill the circle

                ctx.lineWidth = elevatorBorderWidth;
                ctx.moveTo(elevatorX + 0.5 * elevatorWidth, elevatorY + 0.5 * floorHeight);
                ctx.lineTo(elevatorX + 0.5 * elevatorWidth, dest_y);
                ctx.stroke();
            }

            ctx.fillStyle = 'rgb(255 229 204)';
            ctx.strokeStyle = 'rgb(102 0 204)';
            ctx.lineWidth = elevatorBorderWidth;

            const IsMoreThanHalfIdle = elevator.current_idle_time_remaining < 0.5 * this.componentFactory.parameterHandler.getIdleTime(elevator.currentState());
            this.elevatorImage.draw(ctx, elevatorX, elevatorY, elevatorWidth, elevatorH, elevator.currentState(), IsMoreThanHalfIdle);
        }

        // 3 - draw passengers
        for (let floor = this.componentFactory.parameterHandler.minLowestFloor; floor <= this.componentFactory.parameterHandler.maxHighestFloor; floor++){
            // print the number of passengers waiting
            ctx.font = "15px Arial";
            ctx.fillStyle = 'black';

            const floorIdx = this.componentFactory.parameterHandler.getFloorIdx(floor);
            const y = canvas.height - floorHeight * floorIdx - 0.5 * floorHeight + 1;
            const paxCount = this.componentFactory.passengersHandler.getPassengersCount(floorIdx);

            if (paxCount !== null && paxCount !== undefined)
                ctx.fillText(paxCount.toString(), 50, y);
        }
    } // updateAndDraw()

} // class WindowElevatorsHandler