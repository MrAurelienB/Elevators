import {CanvasHandler} from './CanvasHandler.js';

export class WindowHandler {
    constructor(){
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.canvasHandler = new CanvasHandler(canvas, ctx);
        this.canvasHandler.draw();

        this.initialize();
    }

    initialize(){
        for (let i = 1; i < 8; i++)
            this.addParameterAccordionSection('rightPanel', `Section ${i}`, 'Salut');
    } // initialize

    addParameterAccordionSection(panelName, title, textContent) {
        // Create button
        let button = document.createElement('button');
        button.classList.add('accordion');
        button.textContent = title;
    
        // Create panel
        let panel = document.createElement('div');
        panel.classList.add('panel');
        panel.style.display = 'none'; // Start hidden
    
        let para = document.createElement('p');
        para.textContent = textContent;
        panel.appendChild(para);
    
        // Append to container
        let accContainer = document.getElementById(panelName);
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
    }
}