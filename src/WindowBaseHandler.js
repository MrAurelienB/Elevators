import {WindowCanvasHandler} from './WindowCanvasHandler.js';
import {WindowParameterSectionHandler} from './WindowParameterSectionHandler.js';

export class WindowBaseHandler {
    constructor(){
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.canvasHandler = new WindowCanvasHandler(canvas, ctx);
        this.canvasHandler.draw();

        this.windowParameterSectionHandler = new WindowParameterSectionHandler();

        this.initialize();
    }

    initialize(){
        this.windowParameterSectionHandler.initialize();
    } // initialize
} // class WindowBaseHandler