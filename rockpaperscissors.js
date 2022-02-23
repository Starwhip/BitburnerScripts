/** @param {NS} ns **/
export async function main(ns) {
	let rock = "rock";
	let scissors = "scissors";
	let paper = "paper";
	let player1Hand = ns.args[0];
	let player2Hand = ns.args[1];

	player1Hand = player1Hand.toLocaleLowerCase();
	player2Hand = player2Hand.toLocaleLowerCase();

	if(player1Hand == player2Hand){
		tie(ns);
	}
	if(player1Hand == rock){
		if(player2Hand == paper){
			player2Wins(ns);
		}
		else{
			player1Wins(ns);
		}
	}
	else if(player1Hand == paper){
		if(player2Hand == rock){
			player1Wins(ns);
		}
		else{
			player2Wins(ns);
		}
	}
	else{ //Scissors
		if(player2Hand == rock){
			player2Wins(ns);
		}
		else{
			player1Wins(ns);
		}
	}
	ns.tprint("Bad data?")
	ns.exit();
}

function tie(ns){
	ns.tprint("TIE");
	ns.exit();
}
	
function player1Wins(ns){
	ns.tprint("Player 1 Wins");
	ns.exit();
}
function player2Wins(ns){
	ns.tprint("Player 2 Wins");
	ns.exit();
}