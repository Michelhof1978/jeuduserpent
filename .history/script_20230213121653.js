//Création de l'Emplacement du jeu sur la page html
window.onload = function() //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
{
    var canvas = document.createElement("canvas");//Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
    canvas.width = 900;//taille du canvas
    canvas.height = 600;//taille du canvas
    canvas.style.border = "1px solid";//taille du canvas
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255,255,255,0.";
    ctx.fillRect(30 , 30 , 100, 50).
}