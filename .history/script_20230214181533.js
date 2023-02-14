//Création de l'Emplacement du jeu sur la page html

window.onload = function(){      //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
   var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;     // chaque bloque que le serpent va circuler mesurera 30 px, le canvas sera diviser en plusieurs block de 30px
    var ctx;
    var delay = 300;        //le temps est fait en millisecond,le serpent bougera en fonction du temps (plus on rajoute du temps, moins le serpent ira vite) à chaque fois que le canvas sera rafraichi pour que le serpent puisse bouger
    var xCoord = 0;
    var yCoord = 0;
    var snakee;      // on crée la variable serpent
    var applee;         // on crée la variable pomme
    var widthInBlocks = canvasWidth/blockSize;      // on crée la variable pour délimiter le canvas, 900/30 = 30, en honrizontale, il y aura 30 blocs
    var heightInBlocks = canvasHeight/blockSize;        // on crée la variable pour délimiter le canvas, 600/30 = 30, en verticale, il y aura 20 blocs, on compte les blocs à partir de 0
    var score;
    var timeOut;

    init();         //on appelle la fonction pour afficher la page

    function init(){     //la fonction init est un standard pour initialiser les choses
    
        var canvas = document.createElement('canvas');      //Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = canvasWidth;     //taille du canvas
        canvas.height = canvasHeight;       //taille du canvas
        canvas.style.border = "30px solid gray";      //bordure du canvas
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);      // Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
        ctx = canvas.getContext('2d');      //attacher le canvas de notre context et on dessinera en 2d
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");// Longueur du serpent et ira vers la droite      //création du serpent du début. le serpent est relié au body et sera placé par rapport aux paramètres du body d'où les coordonnées ds le []
        //le body est un array
        applee = new Apple([10,10]);        //fonction constructeur qui prends un bloc, la pomme sera en position 10 (X) et 10(Y)
        score = 0;
        refreshCanvas();        // appeler la fonction refreshCanvas
       
    }

    //création du mouvement du rectangle, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger le rectangle
    function refreshCanvas() {      //Chaque fois que le canvas est rafraichi, il faudra redessiner les éléments(serpent, pomme...)
        snakee.advance();
        if (snakee.checkCollision()){       //Si le faite de le faire avancer, il y a une colision, ça sera perdu
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)){ //Si le serpent à manger une pomme, quel pomme je veux vérifier et je vérifie la pomme (applee)
                score++;
                snakee.ateApple = true;
                do {   //Dans le cas où le serpent à manger la pomme, donner une nouvelle position
                    applee.setNewPosition();    //demander à la pomme (applee) de changer de position lorsqu'elle est mangé
                } while(applee.isOnSnake(snakee));  //Vérifie que la nouvelle position de la pomme est sur le serpent. Si c'est vrai, On retourne à applee.setNewPosition(); 
            }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);     //effacer le contenu du canvas
        drawScore();
        snakee.draw();
        applee.draw();
        timeOut = setTimeout(refreshCanvas, delay);       //setTimeout = appeler la fonction refreshCanvas à chaque fois que le délais 1 seconde (delay) est passé
         }
        }
    function gameOver(){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText("Game Over", centreX, centreY - 180);
        ctx.fillText("Game Over", centreX, centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY - 120);
        ctx.restore();
    }

    

    function restart(){
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        applee = new Apple([10,10]);
        score = 0;
        clearTimeout(timeOut);
        refreshCanvas();
    }

    function drawScore(){
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }

    function drawBlock(ctx, position) {       // position = position d'un block, on parle de block par facilité mais ce sont plutôt des pixels
   
        var x = this.position[0] * blockSize;        //position du bloc * taille du bloc = total pixel
        var y = this.position[1] * blockSize;        //position du bloc * taille du bloc = total pixel
        ctx.fillRect(x, y, blockSize, blockSize);       //remplir le rectangle et prendra la taille du bloc qui  fait 30px
    }// 1 block = 30px

    //création de l'objet serpent, le corps du serpent sera défini en petit bloques
    function Snake(body, direction) {        //toujours mettre une majuscule au début d'une fonction objet, body = création du corps du serpent
    
        this.body = body;       //qui sera égale au body que je fourni au constructeur
        this.direction = direction;
        this.ateApple = false;
        
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
                    if (!this.ateApple)
                        this.body.pop()   //Maintenant que l'on à la nouvelle valeur qui est [7,4] [6,4], [5,4],[4,4] nous voulons supprimer la dernière position qui est [4,4] : on utilisera la fonction POP qui permet de supprimer le dérnier élément d un tableau
                        else
                    this.ateApple = false;
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
                    for (var i=0 ; i < snakeToCheck.body.length ; i++){ //Va aller sur tout le corps du serpent, à chaque bloc de notre corps du serpent
                        if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){       //On va verifié si la pomme est sur chacun des blocs de notre serpent. [i] est = 0 et va passer sur chacun des blocs jusqu'à la fin du corps du serpent et on veut vérifier si le X de la pomme est sur le X de notre serpent [1]. Il faut donc vérifier si le X ou le Y de la pomme est sur le X ou Y du serpent
                            isOnSnake = true;     
                        }
                    }
                    return isOnSnake;       //quand nous sommes retourné sur tout le corps de notre serpent, on retourne isOnSnake
                };
        
            }
            
            document.onkeydown = function handleKeyDown(e){     //Touche clavier
                var key = e.key;         //Donner le code de la touche appuyée
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
                    case 32:
                        restart();
                        return;
                    default:
                        return;
                }
                snakee.setDirection(newDirection); //Dire au serpent d'appeler la nouvelle direction
            };
        }
        
        
        
     



    