import {Passenger} from './Passenger.js';

export class PassengersGenerator {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;

        this.nextUid = 0;
    }

    generatePassengersIfNeeded(){
        if (!this.mustGeneratePassengers())
            return null;

        let newPassengers = [];

        const passengerCount = this.getRandomInt(1, 3);

        for (let i = 0; i < passengerCount; i++){
            const originFloor = this.getRandomInt(this.parameterHandler.minLowestFloor, this.parameterHandler.maxHighestFloor);

            let destinationFloor = null;
            while (destinationFloor === null || destinationFloor === originFloor)
                destinationFloor = this.getRandomInt(this.parameterHandler.minLowestFloor, this.parameterHandler.maxHighestFloor);

            newPassengers.push(new Passenger(
                this.nextUid,
                this.parameterHandler.getFloorIdx(originFloor),
                this.parameterHandler.getFloorIdx(destinationFloor)
            ));
            this.nextUid += 1;
        }

        return newPassengers;
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max + 1);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    mustGeneratePassengers(){
        return Math.random() < this.parameterHandler.getPassengerFlow();
    }
}
