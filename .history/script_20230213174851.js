//Création de l'Emplacement du jeu sur la page html

window.onload = function()      //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
{   var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;     // chaque bloque que le serpent va circuler mesurera 30 px, le canvas sera diviser en plusieurs block de 30px
    var canvas;
    var ctx;
    var delay = 100;        //le temps est fait en millisecond,le rectangle bougera en fonction du temps à chaque fois que le canvas sera rafraichi
    var xCoord = 0;
    var yCoord = 0;
    var snakee;      // on crée la variable serpent

    init();         //on appelle la fonction pour afficher la page

    function init()     //la fonction init est un standar pour initialiser les choses
    {
        var canvas = document.createElement('canvas');      //Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = canvasWidth;     //taille du canvas
        canvas.height = canvasHeight;       //taille du canvas
        canvas.style.border = "1px solid";      //bordure du canvas
        document.body.appendChild(canvas);      // Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
        ctx = canvas.getContext('2d');      //attacher le canvas de notre context et on dessinera en 2d
        snakee = new Snake([[6,4], [5,4], [4,4]]);      //création du serpent du début. le serpent est relié au body et sera placé par rapport aux paramètres du body d'où les coordonnées ds le []
        //le body est un array
        refreshCanvas();        // appeler la fonction refreshCanvas
       
    }

    //création du mouvement du rectangle, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger le rectangle
    function refreshCanvas() 
    {
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);     //effacer le contenu du canvas
        snakee.draw();
        setTimeout(refreshCanvas, delay);       //setTimeout = appeler la fonction refreshCanvas à chaque fois que le délais 1 seconde (delay) est passé
    }

    function drawBlock(ctx, position)       // position = position d'un block, on parle de block par facilité mais ce sont plutôt des pixels
    {
        var x = position[0] * blockSize;        //position du bloc * taille du bloc = total pixel
        var y = position[1] * blockSize;        //position du bloc * taille du bloc = total pixel
        ctx.fillRect(x, y, blockSize, blockSize);       //remplir le rectangle et prendra la taille du bloc qui  fait 30px
    }// 1 block = 30px


    //création de l'objet serpent, le corps du serpent sera défini en petit bloques
    function Snake(body)        //toujours mettre une majuscule au début d'une fonction objet, body = création du corps du serpent
     {
        this.body = body;       //qui sera égale au body que je fourni au constructeur
        this.draw = function()      //dessiner le corps du serpent ds notre canvas
        {
            ctx.save();     //sauvegarder le contexte du canvas comme il étatit avant
            ctx.fillStyle = "xff0000";      //couleur du serpent
            for(var i = 0; i < this.body.length; i++);      // on crée une boucle pour pouvoir déssiner notre serpent et pouvoir se déplacer par la suite ds le body
               {
                drawBlock(ctx, this.body[i]);   //la fonction drawBlock permettra de dessiner un bloc, donner ds le context (ctx) ds lequel le canvas où on veut dessiner.
                                                //On veut pouvoir passer ds chacuns des blocks du body (this.body)
               } 
               ctx.restore();       //Permet de dessiner le contexte du canvas et de le remettre comme avant
            }  

              this.advance = function()     //Pour faire avancer le serpent, le but ici pour le faire avancer, c'est d éffacer au fur et à mesure le dernier élément qui est une cellule du tableau et de le faire avancer en rajoutant une céllule
              {

              }
            
            
            
            
            
                //on doit créer un tableau et ds ce tableau il y a X cellules. 
               //Nous allons donc positionner et mettre la longueur du serpent suivant les valeurs: 6 = x et 4 = y. 
                //Le serpent sera donc crée avec un ensemble de petits blocs.

        
     }


}
    