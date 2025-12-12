function playCraps() {
    /* this is a fucntion to play craps in the game.html 
    for craps, sum of 7 or 11 loses, even doubles wins, everything else is a push
    Nicholas M James
    njames86877@uta.edu
    19Oct2023*/

    console.log("playCraps() started");
    //calculate die 1
    var die1 = Math.ceil(Math.random() * 6);
    console.log("die1 result = " + die1);
    document.getElementById("die1Res").innerHTML = "die1 result = " + die1;
    //calculate die 2
    var die2 = Math.ceil(Math.random() * 6);
    console.log("die2 result = " + die2);
    document.getElementById("die2Res").innerHTML = "die2 result = " + die2;
    // adds the two die together with a sum
    var sum = die1 + die2;
    console.log("sum result = " + sum);
    document.getElementById("sumRes").innerHTML = "sum result = " + sum;

    //check for 7 or 11 meaning loss
    if (sum == 7 || sum == 11) {
        document.getElementById("gameRes").innerHTML = "You lost to the Frog Prince!";
    } //check for doubles and even for the win
    else if (die1 == die2 && die1 % 2 == 0) {
        document.getElementById("gameRes").innerHTML = "You Beat the Frog Prince! Please try again for more wins!";
    } //did not win, did not lose so a push
    else {
        document.getElementById("gameRes").innerHTML = "You did not win or lose, but who really wins anyway!";
    }

}