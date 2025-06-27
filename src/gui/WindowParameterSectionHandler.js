
export class WindowParameterSectionHandler {
    constructor(componentFactory){
        this.componentFactory = componentFactory;
    }

    initialize(){
        this.addControlSection();
        this.addElevatorParameterSection();
        this.addFloorsParameterSection();
        this.addPassengersParameterSection();
    } // initialize

    addAccordionSection(title) {
        // Create button
        let button = document.createElement('button');
        button.classList.add('accordion');
        button.textContent = title;

        let arrow = document.createElement('i');
        arrow.classList.add('fas');
        arrow.classList.add('fa-chevron-down');
        arrow.classList.add('icon');
        button.appendChild(arrow);
    
        // Create panel
        let panel = document.createElement('div');
        panel.classList.add('panel');
        panel.classList.add('form-container');
        panel.style.display = 'none'; // Start hidden
        
        // Append to container
        let accContainer = document.getElementById('rightPanel');
        accContainer.appendChild(button);
        accContainer.appendChild(panel);
    
        // Attach event listener for toggle functionality
        button.addEventListener('click', function() {
            let acc = document.getElementsByClassName("accordion");
            for (let j = 0; j < acc.length; j++) {
                let panel = acc[j].nextElementSibling;
                if (acc[j] === this){
                    const isAlreadyActive = panel.style.display === 'block';
                    acc[j].classList.toggle('active', !isAlreadyActive);
                    panel.style.display = isAlreadyActive ? 'none' : 'block';
                }
            }
        });

        return panel;
    } // addAccordionSection()

    addCheckBox(panel, labelTxt, defaultValue){
        const label = document.createElement('label');
        label.textContent = labelTxt;
        label.htmlFor = "enableCheckbox";
        label.classList.add('parameter');
      
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "enableCheckbox";
        checkbox.checked = defaultValue;

        const paramDiv = document.createElement('div');
        paramDiv.classList.add('parameter');
        paramDiv.classList.add('form-field');
        paramDiv.appendChild(label);
        paramDiv.appendChild(checkbox);
        panel.appendChild(paramDiv);
        return checkbox;
    } // addCheckBox()

    addControlSection(){
        let rightTopPanel = document.getElementById('rightTopPanel');
        rightTopPanel.classList.add('right-top')

        // Create Start/Pause button
        const pauseStartButton = document.createElement('button');
        rightTopPanel.appendChild(pauseStartButton);
        pauseStartButton.classList.add('control-button');

        const pauseStartIcon = document.createElement('i');
        pauseStartButton.appendChild(pauseStartIcon);
        pauseStartIcon.className = this.componentFactory.engine.isPaused ? 'fas fa-play' : 'fas fa-pause'; // Start with pause icon (from cloudflare library)

        let isPaused = this.componentFactory.engine.isPaused;
        pauseStartButton.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseStartIcon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
            this.componentFactory.engine.isPaused = isPaused;
        });

        // Create Reset button
        const resetButton = document.createElement('button');
        rightTopPanel.appendChild(resetButton);
        resetButton.classList.add('control-button');

        const resetIcon = document.createElement('i');
        resetButton.appendChild(resetIcon);
        resetIcon.className = 'fas fa-arrows-rotate'; // (from cloudflare library)

        resetButton.addEventListener('click', () => {
            this.componentFactory.reset();
            pauseStartIcon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
            this.componentFactory.engine.isPaused = isPaused;
        });
    } // addControlSection()

    addIntInputFieldParam(panel, labelTxt, min, max, defaultValue){
        const label = document.createElement('label');
        label.textContent = labelTxt;
        label.htmlFor = labelTxt.replace(' ', '-');
        label.classList.add('parameter');
      
        const input = document.createElement('input');
        input.type = 'number';
        input.id = labelTxt.replace(' ', '-');
        input.value = defaultValue;
    
        input.addEventListener('input', () => {
            const value = input.value;
            if (!Number.isInteger(+value)) {
                input.value = min;
            } else if (+value < min){
                input.value = min;
            } else if (+value > max){
                input.value = max;
            }
        });

        const paramDiv = document.createElement('div');
        paramDiv.classList.add('parameter');
        paramDiv.classList.add('form-field');
        paramDiv.appendChild(label);
        paramDiv.appendChild(input);
        panel.appendChild(paramDiv);
        return input;
    } // addIntInputFieldParam()

    addElevatorParameterSection(){
        let panel = this.addAccordionSection('Elevators');

        let elevatorCountInput = this.addIntInputFieldParam(panel, 'Elevator Count',
                                                            this.componentFactory.parameterHandler.minElevatorCount,
                                                            this.componentFactory.parameterHandler.maxElevatorCount,
                                                            this.componentFactory.parameterHandler.elevatorCount);

        elevatorCountInput.addEventListener('input', () => {
            this.componentFactory.parameterHandler.elevatorCount = +elevatorCountInput.value;
        });

        let elevatorSpeedInput = this.addIntInputFieldParam(panel, 'Elevator Speed',
                                                            this.componentFactory.parameterHandler.minElevatorSpeed,
                                                            this.componentFactory.parameterHandler.maxElevatorSpeed,
                                                            this.componentFactory.parameterHandler.elevatorSpeed);

        elevatorSpeedInput.addEventListener('input', () => {
            this.componentFactory.parameterHandler.elevatorSpeed = +elevatorSpeedInput.value;
        });

        let showElevatorDestinationCheckBox = this.addCheckBox(panel, 'Passenger know elevator direction',
                                                               this.componentFactory.parameterHandler.showElevatorDestination);
        showElevatorDestinationCheckBox.addEventListener("change", () => {
            this.componentFactory.parameterHandler.showElevatorDestination = showElevatorDestinationCheckBox.checked;
        });
    } // addElevatorParameterSection()

    addFloorsParameterSection(){
        let panel = this.addAccordionSection('Floors');

        let highestFloorInput = this.addIntInputFieldParam(panel, 'Highest Floor',
                                                           this.componentFactory.parameterHandler.minHighestFloor,
                                                           this.componentFactory.parameterHandler.maxHighestFloor,
                                                           this.componentFactory.parameterHandler.highestFloor);
        highestFloorInput.addEventListener('input', () => {
            this.componentFactory.parameterHandler.highestFloor = +highestFloorInput.value;
        });

        let lowestFloorInput = this.addIntInputFieldParam(panel, 'Lowest Floor',
                                                          this.componentFactory.parameterHandler.minLowestFloor,
                                                          this.componentFactory.parameterHandler.maxLowestFloor,
                                                          this.componentFactory.parameterHandler.lowestFloor);
        lowestFloorInput.addEventListener('input', () => {
            this.componentFactory.parameterHandler.lowestFloor = +lowestFloorInput.value;
        });
    } // addFloorsParameterSection()

    addPassengersParameterSection(){
        let panel = this.addAccordionSection('Passengers');

        let passengerFlowInput = this.addIntInputFieldParam(panel, 'Passenger Flow',
                                                            this.componentFactory.parameterHandler.minPassengerFlow,
                                                            this.componentFactory.parameterHandler.maxPassengerFlow,
                                                            this.componentFactory.parameterHandler.passengerFlow);
        passengerFlowInput.addEventListener('input', () => {
            this.componentFactory.parameterHandler.passengerFlow = +passengerFlowInput.value;
        });

        let elevatorCapacityInput = this.addIntInputFieldParam(panel, 'Elevator Max. Capacity',
                                                          this.componentFactory.parameterHandler.minElevatorCapacity,
                                                          this.componentFactory.parameterHandler.maxElevatorCapacity,
                                                          this.componentFactory.parameterHandler.elevatorCapacity);
        elevatorCapacityInput.addEventListener('input', () => {
            this.componentFactory.parameterHandler.elevatorCapacity = +elevatorCapacityInput.value;
        });
    }
}; // class WindowParameterSectionHandler