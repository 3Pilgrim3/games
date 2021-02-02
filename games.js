
/* MORPION amélioré + JEU DE DES */

var readline = require("readline-sync");

var winGame1 = 0;
var winGame2 = 0;

var player1 = (readline.question("PLAYER 1, PLEASE ENTER YOU NAME : \n")); 
var player2 = (readline.question("PLAYER 2, PLEASE ENTER YOU NAME : \n")); 

console.log("WELCOME %s AND %s \n", player1, player2);


while (saisie !== "q" && saisie !== "Q"){

    menu();

    var saisie = readline.question("YOUR CHOICE ? \n");

    switch (saisie){
        case "p" :
        case "P" : playTicTacToe();
        break;
        case "d" :
        case "D" : playDices();
        break;
        case "s" :
        case "S" : scoresDisplay();
        break;
        case "q" :
        case "Q" : console.log("SEE YOU LATER !");
        break;
        default : console.log("DON'T UNDERSTAND YOUR CHOICE... \n");
    }

}

function playTicTacToe(){

    var line1 = [0,0,0];
    var line2 = [0,0,0];
    var line3 = [0,0,0];

    var tab = [line1,line2,line3];

    var round = (Math.floor(Math.random()*2))+1; 
    var endGame = false;
    var counterGrid = 9;

    displayGrid(tab);

    while(!endGame && counterGrid > 0){

        var position = false;
    
        while(!position)
        {
            if(round === 1){  
                console.log("%s, IT'S YOUR TURN (X)", player1); 
            }else{
                console.log("%s, IT'S YOUR TURN (O)", player2); 
            }
    
            console.log("--------------------------------");
            console.log("CHOOSE A POSITION : ");
    
            var lineChoice = parseInt(readline.question("LINE ? (1,2,3): "));
            var columnChoice =parseInt(readline.question("COLUMN ? (1,2,3): "));
            position = checkPosition(lineChoice, columnChoice, tab);
            if(!position) console.log("***** PLEASE, CHOOSE AN AVAILABLE POSITION *****");
        }
    
        tab[lineChoice - 1][columnChoice - 1] = round;  
    
        counterGrid -- ;
    
        displayGrid(tab);
    
        endGame = checkEndGame(tab);
    
        if(endGame)
        {       
            if(round === 1){
                console.log("============> %s WINS \n", player1);
                winGame1++;
            } 
            else
            {
                console.log("============> %s WINS \n", player2);
                winGame2++;
            }       
        }

        if(round === 1) round = 2; // ou avec une ternaire :    (round === 1) ? round = 2 : round = 1;
        else round = 1;
    
    }
    
    if(counterGrid === 0 && !endGame){
        console.log("*** FULL GRID ! NO ONE WINS => RESTART GAME ... ***\n");
    }

}



function menu(){
    var txt = "";
    txt += "P/ PLAY TIC-TAC-TOE \n";
    txt += "D/ PLAY DICES \n";
    txt += "S/ SCORES \n";
    txt += "Q/ QUITTER \n";
    console.log(txt);
};

function displayGrid(tab)
{
    for(var i = 0 ; i < tab.length ; i++)
    {
        var grid = "";
        for(var j = 0 ; j < tab[i].length ; j++)
        {
            if(tab[i][j] === 0) grid += "| |";
            if(tab[i][j] === 1) grid += "|X|";
            if(tab[i][j] === 2) grid += "|O|";
        }
        console.log(grid);
    }
}

function checkPosition(lineChoice, columnChoice, tab)
{
    return( (lineChoice >= 1 && lineChoice <= 3) && (columnChoice >= 1 && columnChoice <= 3) && (tab[lineChoice - 1][columnChoice - 1] === 0) );
}

function checkEndGame(tab)
{
    for(var i = 0 ; i < tab.length ; i++)
    {
        if( (tab[i][0] === tab[i][1] && tab[i][0] === tab[i][2] && tab[i][0] !== 0) || 
            (tab[0][i] === tab[1][i] && tab[0][i] === tab[2][i] && tab[0][i] !== 0) ||
            (tab[0][0] === tab[1][1] && tab[0][0] === tab[2][2] && tab[0][0] !== 0) ||
            (tab[0][2] === tab[1][1] && tab[0][2] === tab[2][0] && tab[0][2] !== 0) ) return true;
    }
}

function scoresDisplay(){
    console.log("*******SCORES*******\n");
    console.log("%s : %d | %s : %d \n", player1, winGame1, player2, winGame2);
    console.log("********************\n");
}


/* EXPLICATION DE LA FONCTION DISPLAYGRID

A chaque tour de boucle (for i) on va dans la boucle (for j), on instancie grid à "" (vide), et on concatène les éléments de la ligne sur laquelle on est 
positionné (en fonction de tab[i][j]). Les éléments prennent la valeur (string) en réponse à la condition qui les précède. A chaque tour, grid prend la valeur 
de l'élément qu'on est en train de traiter + la ou les valeurs précédemment déterminées. Une fois la ligne finie (boucle (for j) arrivée au bout du tableau à parcourir),
on l'affiche grace à console.log et on sort de la boucle, on déplace le curseur de la boucle primaire (for i) en se postionnant sur l'index suivant, on réinitialise 
grid ("" vide), et on recommence le bouclage (for j) sur le 2e tableau (line2) du tableau principal (tab). On concatène les éléments déterminés par la condition, on affiche...
jusqu'à terminer la 3e ligne (tableau line3 de tab). A noter que console.log fait automatiquement le retour à la ligne ; ainsi nos 3 lignes s'affichent les unes en dessous 
des autres dessinant ainsi la grille. La variable grid n'existe que dans la boucle (for j) et permet seulement de concaténer les éléments de ligne afin de les afficher par
la suite. Elle est réinitialisée à chaque changement d'index de la boucle (for i), donc pour chaque ligne. Chaque ligne n'est donc qu'une chaine de caractères. */


function playDices(){

    console.log("You have to guess the number which will be returned by dices")

    var round = (Math.floor(Math.random()*2))+1; 
    var endGame2 = false;

    while(!endGame2){

        if(round === 1){  
            console.log("%s, IT'S YOUR TURN", player1); 
        }else{
            console.log("%s, IT'S YOUR TURN", player2); 
        }

        console.log("--------------------------------");

        numberChoice = 0;

        while(numberChoice < 1 || numberChoice > 12){
            var numberChoice = parseInt(readline.question("CHOOSE NUMBER BETWEEN 2 AND 12) ? : "));
        }
        
        var dices = (Math.floor(Math.random()*12))+1;

        console.log("You choose number %d", numberChoice);
        console.log("Dices returned %d", dices);

        endGame2 = checkEndGame2(dices, numberChoice);
    
        if(endGame2)
        {       
            if(round === 1){
                console.log("============> %s WINS \n", player1);
                winGame1++;
            } 
            else
            {
                console.log("============> %s WINS \n", player2);
                winGame2++;
            }       
        }

        if(round === 1) round = 2; // ou avec une ternaire :    (round === 1) ? round = 2 : round = 1;
        else round = 1;
    
    }

}


function checkEndGame2(dices, numberChoice){

    if(dices === numberChoice) return true;

}