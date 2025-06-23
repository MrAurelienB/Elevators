
export class PassengersGenerator {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    generatePassengersIfNeeded(){
        if (!this.mustGeneratePassengers())
            return null;

        let newPassengers = [];

        const passengerCount = this.getRandomInt(1, 3);

        for (let i = 0; i < passengerCount; i++){
            const originFloor = this.getRandomInt(this.parameterHandler.minLowestFloor, this.parameterHandler.maxHighestFloor);
            newPassengers.push({
                floor: this.parameterHandler.getFloorIdx(originFloor),
                count: 1
            });
        }

        return newPassengers;
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max + 1);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    mustGeneratePassengers(){
        return Math.random() < 0.05;
    }
}
