const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = canvas.width / 2, mouseY = canvas.height / 2;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2);
    ctx.fill();
    requestAnimationFrame(draw);
}

draw();


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
 * 
 *  Population:
 *  on modélise une population infinie qui peut venir de n'importe quel étage
 *  le poids n'est pas modélisé
 * 
 *    Pour une personne:
 *      - étage de départ
 *      - étage de destination
 * 
 * 
 * 
 * 
 */