//Création de l'Emplacement du jeu sur la page html

window.onload = function(){      //fonction js onload, va permettre de lancer la fenêtre créee lorque la page s'affiche
   var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;     // chaque bloque que le serpent va circuler mesurera 30 px, le canvas sera diviser en plusieurs block de 30px
    var ctx;
    var delay = 100;        //le temps est fait en millisecond,le rectangle bougera en fonction du temps à chaque fois que le canvas sera rafraichi
    var xCoord = 0;
    var yCoord = 0;
    var snakee;      // on crée la variable serpent
    var applee; 
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;
    var score;
    var timeOut;

    init();         //on appelle la fonction pour afficher la page

    function init()     //la fonction init est un standard pour initialiser les choses
    
        var canvas = document.createElement('canvas');      //Création de l'Emplacement du jeu sur la page, canvas est un élément graphique pour la page html
        canvas.width = canvasWidth;     //taille du canvas
        canvas.height = canvasHeight;       //taille du canvas
        canvas.style.border = "30px solid gray";      //bordure du canvas
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);      // Comme le canvas a été crée, maintenant, il faut l'attacher à la page html (attacher le tag de canvas que l'on a crée)
        ctx = canvas.getContext('2d');      //attacher le canvas de notre context et on dessinera en 2d
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");      //création du serpent du début. le serpent est relié au body et sera placé par rapport aux paramètres du body d'où les coordonnées ds le []
        //le body est un array
        applee = new Apple([10,10]);
        score = 0;
        refreshCanvas();        // appeler la fonction refreshCanvas
       
    }

    //création du mouvement du rectangle, le mouvement sera fera en rafraichissant la fenêtre qui est le canvas ce qui fera bouger le rectangle
    function refreshCanvas() 
    {
        snakee.advance();
        if (snakee.checkCollision()){
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)){
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition(); 
                } while(applee.isOnSnake(snakee));
            }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);     //effacer le contenu du canvas
        drawScore();
        snakee.draw();
        applee.draw();
        timeOut = setTimeout(refreshCanvas, delay);       //setTimeout = appeler la fonction refreshCanvas à chaque fois que le délais 1 seconde (delay) est passé
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

    function drawBlock(ctx, position)       // position = position d'un block, on parle de block par facilité mais ce sont plutôt des pixels
    {
        var x = position[0] * blockSize;        //position du bloc * taille du bloc = total pixel
        var y = position[1] * blockSize;        //position du bloc * taille du bloc = total pixel
        ctx.fillRect(x, y, blockSize, blockSize);       //remplir le rectangle et prendra la taille du bloc qui  fait 30px
    }// 1 block = 30px

    //création de l'objet serpent, le corps du serpent sera défini en petit bloques
    function Snake(body, direction)        //toujours mettre une majuscule au début d'une fonction objet, body = création du corps du serpent
     {
        this.body = body;       //qui sera égale au body que je fourni au constructeur
        this.direction = direction;
        this.ateApple = false;
        
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
            };  

              this.advance = function()     //Pour faire avancer le serpent, le but ici pour le faire avancer, c'est d éffacer au fur et à mesure le dernier élément qui 
                                            //suite... est une cellule du tableau et de le faire avancer en rajoutant une céllule tout cela avec une vitessse de rafraichissement du canvas en 100 milisecondes
              {
                    var nextPosition = this.body[0].slice();        //va créer un nouvel élément [6,4] en format copie (slice qui est une fonction)
                        switch(this.direction){
                            case "left":
                                nextPosition[0] -= 1;
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
                this.setDirection = function(newDirection){
                    var allowedDirections;
                    switch(this.direction){
                        case "left":
                        case "right":
                            allowedDirections=["up","down"];
                            break;
                        case "down":
                        case "up":
                            allowedDirections=["left","right"];
                            break;  
                       default:
                            throw("invalid direction");
                    }
                    if (allowedDirections.indexOf(newDirection) > -1){
                        this.direction = newDirection;
                    }
                };
                
                this.checkCollision = function(){
                    var wallCollision = false;
                    var snakeCollision = false;
                    var head = this.body[0];
                    var rest = this.body.slice(1);
                    var snakeX = head[0];
                    var snakeY = head[1];
                    var minX = 0;
                    var minY = 0;
                    var maxX = widthInBlocks - 1;
                    var maxY = heightInBlocks - 1;
                    var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
                    var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
                    
                    if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
                        wallCollision = true;
                    
                    for (var i=0 ; i<rest.length ; i++){
                        if (snakeX === rest[i][0] && snakeY === rest[i][1])
                            snakeCollision = true;
                    }
                    
                    return wallCollision || snakeCollision;        
                };
                
                this.isEatingApple = function(appleToEat){
                    var head = this.body[0];
                    if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                        return true;
                    else
                        return false;
                }
                
            }
            
            function Apple(position){
                this.position = position;
                
                this.draw = function(){
                  ctx.save();
                  ctx.fillStyle = "#33cc33";
                  ctx.beginPath();
                  var radius = blockSize/2;
                  var x = this.position[0]*blockSize + radius;
                  var y = this.position[1]*blockSize + radius;
                  ctx.arc(x, y, radius, 0, Math.PI*2, true);
                  ctx.fill();
                  ctx.restore();
                };
                
                this.setNewPosition = function(){
                    var newX = Math.round(Math.random()*(widthInBlocks-1));
                    var newY = Math.round(Math.random()*(heightInBlocks-1));
                    this.position = [newX,newY];
                }; 
                
                this.isOnSnake = function(snakeToCheck){
                    var isOnSnake = false;
                    for (var i=0 ; i < snakeToCheck.body.length ; i++){
                        if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                            isOnSnake = true;     
                        }
                    }
                    return isOnSnake;
                };
        
            }
            
            document.onkeydown = function handleKeyDown(e){
                var key = e.keyCode;
                var newDirection;
                switch(key){
                    case 37:
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
                snakee.setDirection(newDirection);
            };
        }
        
        
        
     



    