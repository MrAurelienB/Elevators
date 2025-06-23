import {ComponentFactory} from './src/elm/elm.js';
import {WindowBaseHandler} from './src/gui/gui.js';

const componentFactory = new ComponentFactory();
const windowBaseHandler = new WindowBaseHandler(componentFactory.parameterHandler,
                                                componentFactory.elevatorsHandler,
                                                componentFactory.passengersHandler);
window.windowBaseHandler = windowBaseHandler;

/**
 * 
 * Paramètres:
 * 
 *  Immeuble:
 *      - nombre d'ascenseur
 *      - nombre d'étages en hauteur
 *      - nombre d'étages en sous-sol
 * 
 *  Ascenseur:
 *      *- restriction d'étages
 *      - capacité (en nombre de personnes uniquement)
 *      - vitesse
 *      - position
 * 
 *  Population:
 *  on modélise une population infinie qui peut venir de n'importe quel étage
 *  le poids n'est pas modélisé
 * 
 *    Pour une personne:
 *      - étage de départ
 *      - étage de destination
 *      - vitesse pour monter/descendre (selon le rangement dans la cabine ?)
 * 
 * 
 * La demande:
 *  La demande en passager de chaque test doit être déterministe selon le type d'ascenseur.
 *  
 * L'efficacité:
 *    pax / h
 *    power de chaque ascenceur
 *    nombre d'étages parcourus
 *    taux de remplissage
 * 
 * 
 * 
 * 
 * Regle de fonctionnement de base d'un ascenseur
 *  - un ascenceur doit aller dans une seule direction si des passagers montent dedans   <<--- peut amener un gain dans une V2
 *  - on considère que les passagers montent dans l'ascenseur seulement si ils savent qu'il va dans leur direction <<-- à tester (en faire un paramètre)
 * 
 * 
 * 
 */