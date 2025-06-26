
export class Engine {
    constructor(componentFactory){
        this.componentFactory = componentFactory;

        this.isPaused = false;
    }

    update(){
        if (this.isPaused)
            return;
        
        this.onUpdateBefore();
        this.onUpdate();
        this.onUpdateAfter();

    } // update()

    onUpdateBefore(){
        this.componentFactory.elevatorsHandler.onUpdateBefore();
        for (let elevator of this.componentFactory.elevatorsHandler.elevators)
            this.componentFactory.eventHandler.onUpdateBefore(elevator);

        this.componentFactory.passengersHandler.onUpdateBefore();
    } // onUpdateBefore()

    onUpdate(){
        this.componentFactory.passengersHandler.onUpdate();
        for (let elevator of this.componentFactory.elevatorsHandler.elevators)
            this.componentFactory.eventHandler.onUpdate(elevator);
    } // onUpdate()

    onUpdateAfter(){
        for (let elevator of this.componentFactory.elevatorsHandler.elevators)
            this.componentFactory.eventHandler.onUpdateAfter(elevator);
    } // onUpdateAfter()
} // class Engine
