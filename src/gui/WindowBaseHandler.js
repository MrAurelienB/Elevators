import {WindowCanvasHandler} from './WindowCanvasHandler.js';
import {WindowParameterSectionHandler} from './WindowParameterSectionHandler.js';

export class WindowBaseHandler {
    constructor(componentFactory){
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Window handlers
        this.canvasHandler = new WindowCanvasHandler(canvas, ctx, componentFactory);
        this.windowParameterSectionHandler = new WindowParameterSectionHandler(componentFactory);

        this.initialize();
    }

    initialize(){
        this.windowParameterSectionHandler.initialize();
        this.canvasHandler.updateAndDraw();
    } // initialize
} // class WindowBaseHandler