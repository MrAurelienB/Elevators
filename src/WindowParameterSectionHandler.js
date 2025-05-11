
export class WindowParameterSectionHandler {
    constructor(parameterHandler){
        this.parameterHandler = parameterHandler;
    }

    initialize(){
        this.addElevatorParameterSection();
        this.addFloorsParameterSection();
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
                }/* else {
                    // untoggle every other panels
                    acc[j].classList.toggle('active', false);
                    panel.style.display = 'none';
                }*/
            }
        });

        return panel;
    } // addAccordionSection

    addIntInputFieldParam(panel, labelTxt, min, max, initialValue){
        const paramDiv = document.createElement('div');
        paramDiv.classList.add('parameter');
        paramDiv.classList.add('form-field');

        const label = document.createElement('label');
        label.textContent = labelTxt;
        label.htmlFor = labelTxt.replace(' ', '-');
        label.classList.add('parameter');
      
        const input = document.createElement('input');
        input.type = 'number';
        input.id = labelTxt.replace(' ', '-');
        input.value = initialValue;
    
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

        paramDiv.appendChild(label);
        paramDiv.appendChild(input);
        panel.appendChild(paramDiv);
        return input;
    } // addIntInputFieldParam()

    addElevatorParameterSection(){
        let panel = this.addAccordionSection('Elevators');

        let elevatorCountInput = this.addIntInputFieldParam(panel, 'Elevator Count',
                                                            this.parameterHandler.minElevatorCount,
                                                            this.parameterHandler.maxElevatorCount,
                                                            this.parameterHandler.elevatorCount);

        elevatorCountInput.addEventListener('input', () => {
            this.parameterHandler.elevatorCount = +elevatorCountInput.value;
        });
    } // addElevatorParameterSection()

    addFloorsParameterSection(){
        let panel = this.addAccordionSection('Floors');

        let lowestFloorInput = this.addIntInputFieldParam(panel, 'Lowest Floor',
                                                          this.parameterHandler.minLowestFloor,
                                                          this.parameterHandler.maxLowestFloor,
                                                          this.parameterHandler.lowestFloor);
        lowestFloorInput.addEventListener('input', () => {
            this.parameterHandler.lowestFloor = +lowestFloorInput.value;
        });

        let highestFloorInput = this.addIntInputFieldParam(panel, 'Highest Floor',
                                                           this.parameterHandler.minHighestFloor,
                                                           this.parameterHandler.maxHighestFloor,
                                                           this.parameterHandler.highestFloor);
        highestFloorInput.addEventListener('input', () => {
            this.parameterHandler.highestFloor = +highestFloorInput.value;
        });
    } // addFloorsParameterSection()

}; // class WindowParameterSectionHandler