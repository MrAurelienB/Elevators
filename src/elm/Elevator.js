import {ELEVATOR_DIRECTION, ELEVATOR_STATE} from './Enums.js';

export class Elevator {
    constructor(parameterHandler, uidx, overwriteOptions = {}){

        this.parameterHandler = parameterHandler;

        this.uidx = uidx;

        // this.lowest_accessible_floor = 0;
        // this.highest_accessible_floor = 0;

        // initial state
        this.initial_floor = 0; // not an index
        this.initial_load = 0;
        this.initial_state = ELEVATOR_STATE.WAITING;
        this.initial_direction = ELEVATOR_DIRECTION.NONE;

        Object.assign(this, overwriteOptions);

        // current state
        this.current_floor = this.initial_floor; // not an index
        this.current_load = this.initial_load;
        this.current_state = this.initial_state;
        this.current_direction = this.initial_direction;
        this.current_idle_time_remaining = this.parameterHandler.getIdleTime(this.initial_state);

        // moving information
        this.destination_floor = this.initial_floor; // not an index
        this.floor_position = this.parameterHandler.getPositionFromFloor(this.current_floor);
        this.next_destination_floors = [];
    }

    currentState(){
        return this.current_state;
    }

    directionSpeed(){
        if (this.current_direction == ELEVATOR_DIRECTION.UP)
            return 1;
        if (this.current_direction == ELEVATOR_DIRECTION.DOWN)
            return -1;
        return 0;
    }

    hasReachedDestFloor(){
        if (this.current_state != ELEVATOR_STATE.MOVING)
            return true; // loading or waiting
        if (this.current_direction == ELEVATOR_DIRECTION.NONE)
            return true;
        if (this.current_direction == ELEVATOR_DIRECTION.DOWN)
            return this.floor_position <= this.parameterHandler.getPositionFromFloor(this.destination_floor);
        if (this.current_direction == ELEVATOR_DIRECTION.UP)
            return this.floor_position >= this.parameterHandler.getPositionFromFloor(this.destination_floor);

        const msg = `Error occured in hasReachedDestFloor() ${this.current_direction}`;
        alert(msg);
    }

    setCurrentState(state){
        this.current_state = state;
        if (state == ELEVATOR_STATE.MOVING)
            this.current_direction = this.current_floor > this.destination_floor ? ELEVATOR_DIRECTION.DOWN : ELEVATOR_DIRECTION.UP;
        this.current_idle_time_remaining = this.parameterHandler.getIdleTime(state);
    }

    setNextDestinationFloor(floor){
        if (this.next_destination_floors.length > 0 && this.next_destination_floors[this.next_destination_floors.length - 1] === floor)
            return;

        this.next_destination_floors.push(floor);
    }
}; // class Elevator