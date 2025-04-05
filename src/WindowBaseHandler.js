import {WindowCanvasHandler} from './WindowCanvasHandler.js';
import {WindowParameterSectionHandler} from './WindowParameterSectionHandler.js';

export class WindowBaseHandler {
    constructor(parameterHandler){
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.canvasHandler = new WindowCanvasHandler(canvas, ctx, parameterHandler);
        this.windowParameterSectionHandler = new WindowParameterSectionHandler(parameterHandler);

        this.initialize();
    }

    initialize(){
        this.windowParameterSectionHandler.initialize();
        this.canvasHandler.draw();
    } // initialize
} // class WindowBaseHandler