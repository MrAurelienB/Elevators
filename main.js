const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import {CanvasHandler} from './src/CanvasHandler.js';
const canvasHandler = new CanvasHandler(canvas, ctx);

//import { Elevator } from './src/Elevator.js';
//console.log(new Elevator({capacity: 44}));

canvasHandler.draw();


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