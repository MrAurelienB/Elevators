import {WindowCanvasHandler} from './WindowCanvasHandler.js';
import {WindowParameterSectionHandler} from './WindowParameterSectionHandler.js';
import {WindowStatSectionHandler} from './WindowStatSectionHandler.js';

export class WindowBaseHandler {
    constructor(componentFactory){
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Window handlers
        this.canvasHandler = new WindowCanvasHandler(canvas, ctx, componentFactory);
        this.windowParameterSectionHandler = new WindowParameterSectionHandler(componentFactory);
        this.windowStatSectionHandler = new WindowStatSectionHandler(componentFactory);

        this.initialize();
    }

    initialize(){
        this.windowParameterSectionHandler.initialize();
        this.windowStatSectionHandler.initialize();

        this.canvasHandler.updateAndDraw();
        this.windowStatSectionHandler.update();
    } // initialize
} // class WindowBaseHandler