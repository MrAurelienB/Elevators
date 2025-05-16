
export class Elevator {
    constructor(overwriteOptions = {}){

        // parameter
        this.capacity = 10;
        this.velocity = 0;

        this.lowest_accessible_floor = 0;
        this.highest_accessible_floor = 0;

        // initial state
        this.initial_floor = 0;
        this.initial_load = 0;

        Object.assign(this, overwriteOptions);

        // current state
        this.current_floor = this.initial_floor;
        this.current_load = this.initial_load;

        // moving information
        this.destination_floor = this.initial_floor;
        this.travelPercentage = 0;
    }

    goToFloor(floor){
        this.destination_floor = floor;
        this.travelPercentage = 0;
    }
}; // class Elevator