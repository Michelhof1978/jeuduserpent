//Création de l'Emplacement du jeu sur la page html

window.onload = function() //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
{
    function init()
    {}
    var canvas = document.createElement("canvas");//Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
    canvas.width = 900;//taille du canvas
    canvas.height = 600;//taille du canvas
    canvas.style.border = "1px solid";//bordure du canvas
    document.body.appendChild(canvas);// Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)

    var ctx = canvas.getContext("2d");//attacher le canvas de notre context et on dessinera en 2d
    ctx.fillStyle = "rgba(255,255,255,0.";//choisir la couleur ds lequel je souhaite dessiner 
    ctx.fillRect(30 , 30 , 100, 50).// création d'un petit rectangle, les 2 premiers paramètres sont x (30)(horizontale) et y(30) (verticale) du canvas, les 2 dérniers param sont la H et l. Le rectangle crée sera donc déplacé à 3à px du canvas
}