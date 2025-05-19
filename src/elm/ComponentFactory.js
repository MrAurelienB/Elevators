import {ElevatorsEventHandler} from './ElevatorsEventHandler.js';
import {ElevatorsHandler} from './ElevatorsHandler.js';
import {ParameterHandler} from './ParameterHandler.js';

export class ComponentFactory {
    constructor(){
        this.parameterHandler = new ParameterHandler();
        this.elevatorsEventHandler = new ElevatorsEventHandler(this.parameterHandler);
        this.elevatorsHandler = new ElevatorsHandler(this.parameterHandler, this.elevatorsEventHandler);
    }
}; // class ComponentFactory