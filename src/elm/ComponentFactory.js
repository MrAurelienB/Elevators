import {DebugParameterHandler} from './DebugParameterHandler.js';
import {ElevatorsHandler} from './ElevatorsHandler.js';
import {Engine} from './Engine.js';
import {EventHandler} from './EventHandler.js';
import {ParameterHandler} from './ParameterHandler.js';
import {PassengersGenerator, PassengersHandler} from '../pax/pax.js';
import {StatsHandler} from './StatsHandler.js';
import {DEBUG_MODE} from './Constants.js';

export class ComponentFactory {
    constructor(){
        this.reset();
    }

    reset(){
        this.parameterHandler = DEBUG_MODE ? new DebugParameterHandler() : new ParameterHandler();

        this.elevatorsHandler = new ElevatorsHandler(this);
        this.engine = new Engine(this);
        this.eventHandler = new EventHandler(this);
        this.passengersGenerator = new PassengersGenerator(this.parameterHandler);
        this.passengersHandler = new PassengersHandler(this);
        this.statsHandler = new StatsHandler();
    }
}; // class ComponentFactory