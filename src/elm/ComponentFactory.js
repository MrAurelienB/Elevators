import {ElevatorsHandler} from './ElevatorsHandler.js';
import {ParameterHandler} from './ParameterHandler.js';

export class ComponentFactory {
    constructor(){
        this.parameterHandler = new ParameterHandler();
        this.elevatorsHandler = new ElevatorsHandler(this.parameterHandler);
    }
}; // class ComponentFactory