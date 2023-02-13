//Création de l'Emplacement du jeu sur la page html

window.onload = function() //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
{
    var canvas;
    var ctx;
    var delay = 1000; //le temps de fait en millisecond donc 1 seconde

    function init()//la fonction init est un standar pour initialiser les choses
    {
        var canvas = document.createElement("canvas");//Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = 900;//taille du canvas
        canvas.height = 600;//taille du canvas
        canvas.style.border = "1px solid";//bordure du canvas
        document.body.appendChild(canvas);// Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
    
       
    }

    //création du mouvement du rectangle, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger le rectangle
    function refreshCanvas() 
    {

    }
}
    