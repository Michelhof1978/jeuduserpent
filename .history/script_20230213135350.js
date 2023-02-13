//Création de l'Emplacement du jeu sur la page html

window.onload = function() //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
{   var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;// chaque bloque que le serpent va circuler mesurera 30 px, le canvas sera diviser en plusieurs block de 30px
    var canvas;
    var ctx;
    var delay = 100; //le temps est fait en millisecond,le rectangle bougera en fonction du temps à chaque fois que le canvas sera rafraichi
    var xCoord = 0;
    var yCoord = 0;

    init(); //on appelle la fonction pour afficher la page

    function init()//la fonction init est un standar pour initialiser les choses
    {
        var canvas = document.createElement('canvas');//Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = canvasWidth;//taille du canvas
        canvas.height = canvasHeight;//taille du canvas
        canvas.style.border = "1px solid";//bordure du canvas
        document.body.appendChild(canvas);// Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
        ctx = canvas.getContext('2d');//attacher le canvas de notre context et on dessinera en 2d
        refreshCanvas();// appeler la fonction refreshCanvas
       
    }

    //création du mouvement du rectangle, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger le rectangle
    function refreshCanvas() 
    {
        xCoord += 5;//création des coordonnées
        yCoord =+ 5;//création des coordonnées
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);//effacer le contenu du canvas
        ctx.fillStyle = "rgba(255,255,255,0.";//choisir la couleur ds lequel je souhaite dessiner 
        ctx.fillRect(xCoord , yCoord , 100, 50).// création d'un petit rectangle, les 2 premiers paramètres sont les coordonnée du rectangle x (horizontale) et y (verticale) du canvas, les 2 dérniers param sont la H et l. Le rectangle crée sera donc déplacé à 3à px du canvas
        setTimeout(refreshCanvas, delay);//setTimeout = appeler la fonction refreshCanvas à chaque fois que le délais 1 seconde (delay) est passé
    }
    //création de l'objet serpent
    function Snake(body) //toujours mettre une majuscule au début d'une fonction objet, body = là où sera 


}
    