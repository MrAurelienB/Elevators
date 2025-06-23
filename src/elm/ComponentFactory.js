import {DebugParameterHandler} from './DebugParameterHandler.js';
import {ElevatorsEventHandler} from './ElevatorsEventHandler.js';
import {ElevatorsHandler} from './ElevatorsHandler.js';
import {ParameterHandler} from './ParameterHandler.js';
import {PassengersGenerator} from './PassengersGenerator.js';
import {PassengersHandler} from './PassengersHandler.js';
import {DEBUG_MODE} from './Constants.js';

export class ComponentFactory {
    constructor(){
        this.parameterHandler = DEBUG_MODE ? new DebugParameterHandler() : new ParameterHandler();

        this.elevatorsEventHandler = new ElevatorsEventHandler(this.parameterHandler);
        this.elevatorsHandler = new ElevatorsHandler(this.parameterHandler, this.elevatorsEventHandler);

        this.passengersGenerator = new PassengersGenerator(this.parameterHandler);
        this.passengersHandler = new PassengersHandler(this.parameterHandler, this.passengersGenerator);
    }
}; // class ComponentFactory