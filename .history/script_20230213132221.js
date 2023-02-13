//Création de l'Emplacement du jeu sur la page html

window.onload = function() //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
{
    var canvas;
    var ctx;
    var delay = 1000; //le temps de fait en millisecond donc 1 seconde

    function init()//la fonction init est un standar pour initialiser les choses
    {
        canvas = document.createElement('canvas');//Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = 900;//taille du canvas
        canvas.height = 600;//taille du canvas
        canvas.style.border = "1px solid";//bordure du canvas
        document.body.appendChild(canvas);// Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
        ctx = canvas.getContext('2d');//attacher le canvas de notre context et on dessinera en 2d
        refreshCanvas// appeler la fonction canvas
       
    }

    //création du mouvement du rectangle, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger le rectangle
    function refreshCanvas() 
    {
        ctx.fillStyle = "rgba(255,255,255,0.";//choisir la couleur ds lequel je souhaite dessiner 
        ctx.fillRect(xCoord , yCoord , 100, 50).// création d'un petit rectangle, les 2 premiers paramètres sont les coordonnée du recta x (horizontale) et y (verticale) du canvas, les 2 dérniers param sont la H et l. Le rectangle crée sera donc déplacé à 3à px du canvas
    }
}
    