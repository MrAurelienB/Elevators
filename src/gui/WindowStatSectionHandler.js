
export class WindowStatSectionHandler {
    constructor(componentFactory){
        this.componentFactory = componentFactory;
    }

    initialize(){
        this.addElevatorStatsPanel();
    }

    update(){
        let floorTraveledStat = document.getElementById('floor_traveled');
        if (floorTraveledStat)
            floorTraveledStat.textContent = this.componentFactory.statsHandler.floorTraveled;

        let paxTransportedStat = document.getElementById('pax_transported');
        if (paxTransportedStat)
            paxTransportedStat.textContent = this.componentFactory.statsHandler.passengerTransported;

        requestAnimationFrame(() => this.update());
    } // updateAndDraw()

    addKeyValueLabel(panel, labelTxt, id){
        const label = document.createElement('label');
        label.textContent = labelTxt;
        label.htmlFor = labelTxt.replace(' ', '-');

        const value = document.createElement('label');
        value.textContent = "";
        value.id = id;

        const paramDiv = document.createElement('div');
        paramDiv.appendChild(label);
        paramDiv.appendChild(value);
        panel.appendChild(paramDiv);
        return paramDiv;
    }

    addElevatorStatsPanel(){
        let statContainer = document.getElementById('bottomPanel');

        this.addKeyValueLabel(statContainer, 'Floor traveled: ', 'floor_traveled');
        this.addKeyValueLabel(statContainer, 'Pax transported: ', 'pax_transported');
    }
} // class WindowStatSectionHandler
