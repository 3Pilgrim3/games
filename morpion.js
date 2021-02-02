
/* MORPION version 1 */

var readline = require("readline-sync");

var round = 1;
var endGame = false;
var fullGrid = 9;

var line1 = [0,0,0];
var line2 = [0,0,0];
var line3 = [0,0,0];

var tab = [line1,line2,line3];

displayGrid(tab);

var player1 = (readline.question("Player 1, please, enter your name ? : "));
var player2 = (readline.question("Player 1, please, enter your name ? : "));

while(!endGame && fullGrid > 0){

    var position = false;

    while(!position)
    {
        if(round = 1){
            console.log("%s, it's your turn", player1);
        }else{
            console.log("%s, it's your turn", player2);
        }
        
        console.log("--------------------------------");
        console.log("Choose a position : ");

        var lineChoice = parseInt(readline.question("Line ? : "));
        var columnChoice =parseInt(readline.question("Column ? : "));
        position = checkPosition(lineChoice, columnChoice, tab);
        if(!position) console.log("***** Please, choose an available position !!! *****");
    }

    tab[lineChoice - 1][columnChoice - 1] = round;

    fullGrid -- ;

    if(round === 1) round = 2; // ou avec une ternaire :    (round === 1) ? round = 2 : round = 1;
    else round = 1;

    displayGrid(tab);

    endGame = checkEndGame(tab);

    if(endGame)
    {               
        console.log("********* Player %d wins *********\n", round);
    }

}

if(fullGrid === 0 && !endGame){
    console.log("*** Full grid ! Restart game ... ***\n");
}


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


/* EXPLICATION DE LA FONCTION DISPLAYGRID

A chaque tour de boucle (for i) on va dans la boucle (for j), on instancie grid à "" (vide), et on concatène les éléments de la ligne sur laquelle on est 
positionné (en fonction de tab[i][j]). Les éléments prennent la valeur (string) en réponse à la condition qui les précède. A chaque tour, grid prend la valeur 
de l'élément qu'on est en train de traiter + la ou les valeurs précédemment déterminées. Une fois la ligne finie (boucle (for j) arrivée au bout du tableau à parcourir),
on l'affiche grace à console.log et on sort de la boucle, on déplace le curseur de la boucle primaire (for i) en se postionnant sur l'index suivant, on réinitialise 
grid ("" vide), et on recommence le bouclage (for j) sur le 2e tableau (line2) du tableau principal (tab). On concatène les éléments déterminés par la condition, on affiche...
jusqu'à terminer la 3e ligne (tableau line3 de tab). A noter que console.log fait automatiquement le retour à la ligne ; ainsi nos 3 lignes s'affichent les unes en dessous 
des autres dessinant ainsi la grille. La variable grid n'existe que dans la boucle (for j) et permet seulement de concaténer les éléments de ligne afin de les afficher par
la suite. Elle est réinitialisée à chaque changement d'index de la boucle (for i), donc pour chaque ligne. Chaque ligne n'est donc qu'une chaine de caractères. */
