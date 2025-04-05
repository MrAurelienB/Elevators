
import {WindowBaseHandler} from './src/WindowBaseHandler.js';

const windowBaseHandler = new WindowBaseHandler();
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
 *      - restriction d'étages
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
 */