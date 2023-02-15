//Création de l'Emplacement du jeu sur la page html

window.onload = function(){      //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
   var canvasWidth = 900;       //Dimension du canvas largeur
    var canvasHeight = 500;     //Dimension du canvas hauteur
    var blockSize = 30;     // chaque bloque que le serpent va circuler mesurera 30 px, le canvas sera diviser en plusieurs block de 30px
    var ctx;        //Context
    var delay = 300;        //le temps est fait en millisecond,le serpent bougera en fonction du temps (plus on rajoute du temps, moins le serpent ira vite) à chaque fois que le canvas sera rafraichi pour que le serpent puisse bouger
    var xCoord = 0;
    var yCoord = 0;
    var snakee;      // on crée la variable serpent
    var applee;         // on crée la variable pomme
    var widthInBlocks = canvasWidth/blockSize;      // on crée la variable pour délimiter le canvas, 900/30 = 30, en honrizontale, il y aura 30 blocs
    var heightInBlocks = canvasHeight/blockSize;        // on crée la variable pour délimiter le canvas, 600/30 = 30, en verticale, il y aura 20 blocs, on compte les blocs à partir de 0
    var score;      //qui sera initialisé ds la fonction init
    var timeOut;

    init();         //on appelle la fonction pour afficher la page

    function init(){     //la fonction init est un standard pour initialiser les choses
        var canvas = document.createElement('canvas');      //Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = canvasWidth;     //taille du canvas
        canvas.height = canvasHeight;       //taille du canvas
        canvas.style.border = "30px solid gray";      //bordure du canvas
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);      // Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
        ctx = canvas.getContext('2d');      //attacher le canvas de notre context et on dessinera en 2d
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");// Longueur du serpent et ira vers la droite      //création du serpent du début. le serpent est relié au body et sera placé par rapport aux paramètres du body d'où les coordonnées ds le []
        //le body est un array
        applee = new Apple([10,10]);        //fonction constructeur qui prends un bloc, la pomme sera en position 10 (X) et 10(Y)
        score = 0; //On initilise le score à 0 pour le début du jeu
        refreshCanvas();        // appeler la fonction refreshCanvas
       
    }

    //création du mouvement du serpent, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger par la suite le serpent
    function refreshCanvas() {      //Chaque fois que le canvas est rafraichi, il faudra redessiner les éléments(serpent, pomme...)
        snakee.advance();
        if (snakee.checkCollision()){       //Si le faite de le faire avancer, il y a une colision, ça sera perdu
            
            gameOver();

        } else {
            if (snakee.isEatingApple(applee)){ //Si le serpent à manger une pomme, quel pomme je veux vérifier et je vérifie la pomme (applee)
               
                score++;  //Quand il mange une pomme, on incrémente de 1 le score

                snakee.ateApple = true;     //oui, le serpent vient de manger une pomme

                do {   //Dans le cas où le serpent à manger la pomme, donner une nouvelle position
                    applee.setNewPosition();    //demander à la pomme (applee) de changer de position lorsqu'elle est mangé
                } while(applee.isOnSnake(snakee));  //Vérifie que la nouvelle position de la pomme est sur le serpent. Si c'est vrai, On retourne à applee.setNewPosition() pour qu'il lui donne une nouvelle position
            }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);     //effacer le contenu du canvas
        drawScore();        //On appelle la fonction pour l affichage, bien mettre drawScore(); avant snakee.draw(); et applee.draw(); sinon, le serpend passera sous le score et visuelement, c'est pas beau
        snakee.draw();
        applee.draw();
        timeOut = setTimeout(refreshCanvas, delay);       //setTimeout = appeler la fonction refreshCanvas à chaque fois que le délais 1 seconde (delay) est passé
         }
        }

 //Ecrire à l'écran Game Over lorsque perdu
    function gameOver(){       
        ctx.save();     //Enregistrer les paramétres de configuration du contexte du canvas 
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white"; //contour texte en blanc
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText("Game Over", centreX, centreY - 180);  // -180 =pour qu'il soit situé au dessus du score
        ctx.fillText("Game Over", centreX, centreY - 180);  //Affichage du Game over à l'écran avec les coordonnées où on souhaite l afficher sur le canvas
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);      //Instruction après le game over pour rejouer
        ctx.restore();      //Remettre les mêmes paramètres comme c'était avant après le game over
    }

    

    function restart(){     //Fonction pour commencer le jeu, nous devons à chaque partie du jeu recréer à un endroit précis où le serpent commencera le jeu
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        applee = new Apple([10,10]);
        score = 0;      //Quand on relance le jeu, on veut que le score se remette à 0
        clearTimeout(timeOut); // La fonction clearTimeout où on a mis en paramétre la variable timeOut permettra de corriger un bug lorsque l'on apuie sur espace plusieurs fois pour recommencer à jouer. S'il n'y avait pas cette fonction, à chaque fois que l'on appuie sur espace, le serpent serait aller de plus en plus vite, donc ici, nous avons corrigé ce problème
        refreshCanvas();        //On relance les boucles
    }

    function drawScore(){       //Afficher le score à l'écran
        ctx.save();     //Enregistrer les paramétres de configuration du contexte du canvas 
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; //permettra de bien mettre l 'affichage du score au milieu car avec centreX, centreY, il sera pas assez bien situé au milieu
        
        var centreX = canvasWidth / 2;      // Largeur/2  Déclaration d une variable pour le centrage du score par rapport à X
        var centreY = canvasHeight / 2;     // Hauteur/2 Déclaration d une variable pour le centrage du score par rapport à Y
        ctx.fillText(score.toString(), centreX, centreY);       //Avec fillText, il faudra que le score qui est number soit en string. centreX, centreY sont l'emplacement où sera affiché le score 
        
        ctx.restore();      //Remettre les mêmes paramètres comme c'était avant après le game over
    }


    function drawBlock(ctx, position) {       // position = position d'un block, on parle de block par facilité mais ce sont plutôt des pixels
   
        var x = position[0] * blockSize;        //position du bloc * taille du bloc = total pixel
        var y = position[1] * blockSize;        //position du bloc * taille du bloc = total pixel
        ctx.fillRect(x, y, blockSize, blockSize);       //remplir le rectangle et prendra la taille du bloc qui  fait 30px
    }// 1 block = 30px


    //création de l'objet serpent, le corps du serpent sera défini en petit bloques
    function Snake(body, direction) {        //toujours mettre une majuscule au début d'une fonction objet, body = création du corps du serpent
    
        this.body = body;       //qui sera égale au body que je fourni au constructeur
        this.direction = direction;
        this.ateApple = false;      //Si le sepent à manger une pomme, le serpent grandira au fur et à mesure qu'il en mange
        
        this.draw = function() {      //dessiner le corps du serpent ds notre canvas
       
            ctx.save();     //sauvegarder le contexte du canvas comme il étatit avant
            ctx.fillStyle = "xff0000";      //couleur du serpent
            for(var i = 0; i < this.body.length; i++);      // on crée une boucle pour pouvoir déssiner notre serpent et pouvoir se déplacer par la suite ds le body
               {
                drawBlock(ctx, this.body[i]);   //la fonction drawBlock permettra de dessiner un bloc, donner ds le context (ctx) ds lequel le canvas où on veut dessiner.
                                                //On veut pouvoir passer ds chacuns des blocks du body (this.body)
               } 
               ctx.restore();       //Permet de dessiner le contexte du canvas et de le remettre comme avant
            };  

              this.advance = function() {     //Pour faire avancer le serpent, le but ici pour le faire avancer, c'est d éffacer au fur et à mesure le dernier élément qui 
                                            //suite... est une cellule du tableau et de le faire avancer en rajoutant une céllule tout cela avec une vitessse de rafraichissement du canvas en 100 milisecondes
             
                    var nextPosition = this.body[0].slice();        //va créer un nouvel élément [6,4] en format copie (slice qui est une fonction)
                        switch(this.direction){     //la direction peut aller soit à gauche, droite, bas et haut
                            case "left":
                                nextPosition[0] -= 1;   //[0]  = position x Si la position est ajouté de 1, on doit enlever 1 qui est la dernière cellule pour pouvoir avancer
                                break;
                            case "right":
                                nextPosition[0] += 1;
                                break;
                            case "down":
                                nextPosition[1] += 1;
                                break;
                            case "up":
                                nextPosition[1] -= 1;
                                break;
                            default:
                                throw("invalid direction");
                        }

                    this.body.unshift(nextPosition);        //unshift est une fonction   //on récupére donc la nouvelle valeur qui devient [7,4] et nous voulons maintenant l ajouter à notre body, nous avons maintenan 4 éléments [7,4],[6,4], [5,4], [4,4]]
                    if (!this.ateApple)     // ! = not /Si le serpent n'a pas manger de pomme donc = false, on ne souhaite pas aller à this.body.pop()
                        this.body.pop();   //On utilisera la fonction POP qui permet de supprimer le dérnier élément du corps de notre serpent
                    else
                    this.ateApple = false;      //on doit éteindre la propriété Apple s'il n'a pas mangé de pomme
                    };
                //on doit créer un tableau et ds ce tableau il y a X cellules. 
               //Nous allons donc positionner et mettre la longueur du serpent suivant les valeurs: 6 = x et 4 = y. 
                //Le serpent sera donc crée avec un ensemble de petits blocs.
                
                this.setDirection = function(newDirection){     //Passer la nouvelle direction au serpent
                    var allowedDirections;
                    switch(this.direction){
                        case "left":        //Si mes directions sont à gauche ou à droite, mes directions autorisées seront en haut ou en bas
                        case "right":
                            allowedDirections=["up","down"];
                            break;
                        case "down":         //Si mes directions sont en haut ou en bas, mes directions autorisées seront en gauche ou droite
                        case "up":
                            allowedDirections=["left","right"];
                            break;  
                       default:
                            throw("invalid direction");     //throw = fonction pour envoyer un message d erreur
                    }
                    if (allowedDirections.indexOf(newDirection) > -1){      //Si l'index (newDirection) est supérieur à -1 alors cela veut dire qu'elle est pérmise. indexOf = parcours le tableau ["up","down"] et ["left","right"] en s'arrétant à l'index -1 
                        this.direction = newDirection;  //Si direction est permise, on avance
                    }
                };
                
                this.checkCollision = function(){       //fonction lorsqu'il y a colision (prendre un mur ou il se touche la queue)
                    
                    var wallCollision = false;      //colision avec un mur
                    var snakeCollision = false;     //colision avec la queue
                    var head = this.body[0];        //ça sera toujours la tête, le premier élément qui rentrera en premier en collision et non le corps
                    var rest = this.body.slice(1);      //tout le corps du serpent sauf la tête en utilisant la fonction slice, il va copier donc tout le reste ds la variable rest
                    var snakeX = head[0];       //Détailler le x et y de la tête du serpent, un head est un array de 2 valeurs
                    var snakeY = head[1];       //Détailler le x et y de la tête du serpent, un head est un array de 2 valeurs
                    var minX = 0;       //les cellules commencent à 0
                    var minY = 0;       //les cellules commencent à 0
                    var maxX = widthInBlocks - 1;       //comme il y a 30 cases horizontales et que l'on commence à 0, il faudra mettre -1. On délimite ici le canvas horizontal qui est X
                    var maxY = heightInBlocks - 1;      //comme il y a 20 cases verticales et que l'on commence à 0, il faudra mettre -1. On délimite ici le canvas vertical qui est Y
                    var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;       //Si la tête à pris le mur de gauche ou bien le mur de droite
                    var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;     //Si la tête à pris le mur du haut ou bien le mur du bas
                    
                    if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)       //Si l'on rentre ds cette condition donc d'être pris un mur, on rentre ds la condition. Ici, c'est true car on a initiliasé (var wallCollision = false);
                       
                            wallCollision = true;
                    
                    for (var i=0 ; i<rest.length ; i++){        //Indiquer que tant que le reste du corps du serpent
                        
                        if (snakeX === rest[i][0] && snakeY === rest[i][1])     //Vérifier Si la tête et le corps ont le même X [0] ou le même Y [1] donc se touchent
                            snakeCollision = true;      //Si condition vrai, il y a colision de serpent. On a assigner ci dessus à   var snakeCollision = false; donc mettre à true la condition
                    }
                    
                    return wallCollision || snakeCollision;   //Si colision mur ou corps = true donc perdu     
                };
                
                this.isEatingApple = function(appleToEat)
                {
                    var head = this.body[0];        //il y a uniquement la tête qui mange la pomme ou qu 'il y a colision d un mur. la tête est au premier élément du corps donc [0]
                   
                    if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])       //si le X [0] de la tête est égal au X de la pomme ET pareil pour la position Y
                        return true;        //Si c'est true, il est sur la pomme
                    else
                        return false;       //Sinon, il n'est pas sur la pomme
                }
                
            }
            
            function Apple(position){       //Création de la pomme, 
                
                this.position = position; //création de la position de la pomme
                
                this.draw = function(){     //fonction pour dessiner la pomme
                  ctx.save();
                  ctx.fillStyle = "#33cc33";
/*Constructeur*/  ctx.beginPath();
 /* De La*/       var radius = blockSize/2;     //rayon, taille d'un bloc /2
/*Pomme*/         var x = this.position[0]*blockSize + radius;      //position
                  var y = this.position[1]*blockSize + radius;
                  ctx.arc(x, y, radius, 0, Math.PI*2, true);        //rayon du cercle
                  ctx.fill();
                  ctx.restore();
                };
                
                this.setNewPosition = function(){       //Donner une nouvelle position à la pomme lorsque le serpent l'à manger
                    var newX = Math.round(Math.random()*(widthInBlocks-1));     //Va donner un autre endroit aléatoire (Math.random()) à la pomme lorsque qu'elle sera mangé entre la case 0 et 29. On va multiplier le nombre de blocs qui est ds la largeur -1. Ceci ne suffit pas car le nombre alétoir peut être un chiffre à virgule, nous aurons besoins de Math.round pour arrondir le chiffre
                    var newY = Math.round(Math.random()*(heightInBlocks-1));    // Idem ci-dessus mais en hauteur
                    this.position = [newX,newY];        //Donner sa nouvelle position
                }; 
                
                //Pour savoir si la pomme alétoire est sur notre serpent
                this.isOnSnake = function(snakeToCheck){   //Comme la pomme est aléatoire, elle pourrait se positionner sur le serpent, nous allons faire en sorte qu'elle évite la position du serpent
                    var isOnSnake = false;      //Non, je ne suis pas sur le serpent
                    for (var i = 0 ; i < snakeToCheck.body.length ; i++){ //Va aller sur tout le corps du serpent, à chaque bloc de notre corps du serpent
                        if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){       //On va verifié si la pomme est sur chacun des blocs de notre serpent. [i] est = 0 et va passer sur chacun des blocs jusqu'à la fin du corps du serpent et on veut vérifier si le X de la pomme est sur le X de notre serpent [1]. Il faut donc vérifier si le X ou le Y de la pomme est sur le X ou Y du serpent
                            isOnSnake = true;     
                        }
                    }
                    return isOnSnake;       //quand nous sommes retourné sur tout le corps de notre serpent, on retourne isOnSnake
                };
        
            }
            
            document.onkeydown = function handleKeyDown(e){     //Touche clavier
                var key = e.key.;         //Donner le code de la touche appuyée
                var newDirection;       //Créer la nouvelle direction en fonction de la touche appuyée
                switch(key){        //switch sur la touche appuyée
                    case 37: //37 correspond à la touche du clavier qui va à gauche
                        newDirection = "left";
                        break;
                    case 38:
                        newDirection = "up";
                        break;
                    case 39:
                        newDirection = "right";
                        break;
                    case 40:
                        newDirection = "down";
                        break;
                    case 32:    //32 est le code du clavier pour la touche espace 
                        restart();  //On appelle la Fonction pour pouvoir commencer le jeu
                        return;  //Arrête l execusion de la fonction et on retourne directement
                    default:
                        return;
                }
                snakee.setDirection(newDirection); //Dire au serpent d'appeler la nouvelle direction
            }
        }
    
        
        
        
     



    