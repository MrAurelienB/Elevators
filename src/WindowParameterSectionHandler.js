
export class WindowParameterSectionHandler {
    constructor(){

    }

    initialize(){
        this.addAccordionSection('Elevators', 'parameters of elevators');
        for (let i = 1; i < 8; i++)
            this.addAccordionSection(`Section ${i}`, 'Salut');
    } // initialize

    addAccordionSection(title, textContent) {
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
        panel.style.display = 'none'; // Start hidden
    
        let para = document.createElement('p');
        para.textContent = textContent;
        panel.appendChild(para);
    
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
                } else {
                    acc[j].classList.toggle('active', false);
                    panel.style.display = 'none';
                }
            }
        });
    } // addAccordionSection

}; // class WindowParameterSectionHandler