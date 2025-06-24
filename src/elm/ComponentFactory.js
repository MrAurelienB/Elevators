import {DebugParameterHandler} from './DebugParameterHandler.js';
import {ElevatorsHandler} from './ElevatorsHandler.js';
import {EventHandler} from './EventHandler.js';
import {ParameterHandler} from './ParameterHandler.js';
import {PassengersGenerator, PassengersHandler} from '../pax/pax.js';
import {DEBUG_MODE} from './Constants.js';

export class ComponentFactory {
    constructor(){
        this.parameterHandler = DEBUG_MODE ? new DebugParameterHandler() : new ParameterHandler();

        this.passengersGenerator = new PassengersGenerator(this.parameterHandler);
        this.passengersHandler = new PassengersHandler(this);
        
        this.elevatorsHandler = new ElevatorsHandler(this);
        
        this.eventHandler = new EventHandler(this);
    }
}; // class ComponentFactory