import {ELEVATOR_DIRECTION, ELEVATOR_STATE} from './Enums.js';

export class ElevatorsEventHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    goToFloor(elevator, floorIdx){
        elevator.destination_floor = floorIdx;
        if (elevator.destination_floor != elevator.current_floor){
            elevator.current_state = ELEVATOR_STATE.MOVING;
            elevator.current_direction = elevator.destination_floor < elevator.current_floor ? ELEVATOR_DIRECTION.DOWN : ELEVATOR_DIRECTION.UP;
        }
    }

    // basically to give orders to elevators
    onUpdateBefore(elevator){
        // default behavior is to go up and down.
        if (elevator.current_state == ELEVATOR_STATE.WAITING){
            if (elevator.current_floor == this.parameterHandler.getLowestFloor())
                this.goToFloor(elevator, this.parameterHandler.getHighestFloor());
            else if (elevator.current_floor == this.parameterHandler.getHighestFloor())
                this.goToFloor(elevator, this.parameterHandler.getLowestFloor());
            else
                this.goToFloor(elevator, this.parameterHandler.getLowestFloor());
        }
    }

    // basically to update numbers
    onUpdate(elevator){
        if (elevator.current_state == ELEVATOR_STATE.MOVING){
            elevator.floor_position += this.parameterHandler.getElevatorSpeed() * elevator.directionSpeed();
        } else if (elevator.current_state == ELEVATOR_STATE.WAITING){
            if (elevator.destination_floor != elevator.current_floor)
                elevator.floor_position += this.parameterHandler.getElevatorSpeed() * elevator.directionSpeed();
        } else if (elevator.current_state == ELEVATOR_STATE.LOADING){
            // TODO: do nothing for now
        }
    }

    // basically to update state
    onUpdateAfter(elevator){
        if (elevator.current_state == ELEVATOR_STATE.MOVING){
            if (elevator.hasReachedDestFloor()){
                elevator.floor_position = this.parameterHandler.getPositionFromFloor(elevator.destination_floor);
                elevator.current_floor = elevator.destination_floor;
                elevator.current_state = ELEVATOR_STATE.WAITING;
                elevator.current_direction = ELEVATOR_DIRECTION.NONE;
            }
        } else if (elevator.current_state == ELEVATOR_STATE.WAITING){
            // TODO: 
        } else if (elevator.current_state == ELEVATOR_STATE.LOADING){
            // TODO: do nothing for now
        }
    }
}; // class ElevatorsEventHandler