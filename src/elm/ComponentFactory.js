import {DebugParameterHandler} from './DebugParameterHandler.js';
import {ElevatorsEventHandler} from './ElevatorsEventHandler.js';
import {ElevatorsHandler} from './ElevatorsHandler.js';
import {ParameterHandler} from './ParameterHandler.js';
import {DEBUG_MODE} from './Constants.js';

export class ComponentFactory {
    constructor(){
        this.parameterHandler = DEBUG_MODE ? new DebugParameterHandler() : new ParameterHandler();
        this.elevatorsEventHandler = new ElevatorsEventHandler(this.parameterHandler);
        this.elevatorsHandler = new ElevatorsHandler(this.parameterHandler, this.elevatorsEventHandler);
    }
}; // class ComponentFactory