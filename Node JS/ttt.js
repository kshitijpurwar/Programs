//Tic-Tac-Toe game 
//dependencies


//Main tic-tac-toe array (1-D)      0|  1| 2    
var ttt = new Array(9); //          3|  4| 5 // array is designed as such 
//           6|  7| 8
for (var i = 0; i < 9; i++) { // filler loop 
	ttt[i] = i; // fills the array with itsreepective index acc. to array
}
//game stats
var selected = false;
var chance = 1;
var human;
var dcomp;
clear();
console.log('Welcome to ' + 'Tic-Tac-Toe ' + ' made by ' + 'Nightwalker \n');
console.log('Choose  "X" or "O" , X goes first and if you  choose X , \n' +
	'leave a space after X and your first position! ,eg:X 7 \n');
show();

// this makes the input for the game posibble
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(text) {
	if (!selected) {
		if (text[0] == 'X' || text[0] == 'x') {
			human = 'X';
			dcomp = 'O';
		} else {
			human = 'O';
			dcomp = 'X';
		}
		selected = true;
		//console.log(human,dcomp);
	}
	if (selected) {
		if (human == 'X') {
			if (chance % 2 == 0) {
				comp();
			} else {
				if (chance == 1) {
					human_input(text[2]);
				} else {
					human_input(text);
				}
			}
		} else if (human == 'O') {
			if (chance % 2 == 0) {
				human_input(text);
			} else {
				comp();
			}
		}
	}
	if (chance == 10 && winCheck(ttt) == false) {
		console.log('The  match is tied ');
		done();

	}

});

//input and process function
function human_input(text) {
	clear();
	console.log('after move ');

	console.log('______________________________________________________');
	//console.log('before move'.red);
	//show();
	ttt[Number(text)] = human;
	win(ttt);

	show();
	console.log('______________________________________________________');
	console.log("Press Enter for Computer's move");
	win(ttt);
	chance++;
}

function comp() {
	clear();

	//console.log('Enter index you want to place your '+p+"'s");
	ttt[dumb(ttt)] = dcomp;
	console.log("Computer's Move: ");

	console.log('_______________________________________________________');
	console.log('  ');
	win(ttt);
	show();
	console.log('_______________________________________________________');
	console.log('Enter index you want to place your ' + human + "'s");


	chance++;
}


function done() {
	//console.log('_______________________________________________________');
	show();
	console.log('_______________________________________________________');
	//console.log('Now that process.stdin is paused,\n ' +
	//	'there is nothing more to do.',entered);
	process.exit();
}

function win(ttt) {

	if (winCheck(ttt)) {
		done();
	}
}

function winCheck(arr) { // this function takes and ttt
	for (var i = 0; i < 9; i = i + 3) {
		if (arr[i] == arr[i + 1] && arr[i + 1] == arr[i + 2] && arr[i] != ' ') {
			if (arr[i] == 'X') {
				console.log('X wins the game');
			} else if (arr[i] == 'O') { //checks horizontally
				console.log('O wins the game');
			}

			return true;
		}
	}
	for (var i = 0; i < 3; i++) {
		if (arr[i] == arr[i + 3] && arr[i + 3] == arr[i + 6] && arr[i] != ' ') {
			if (arr[i] == 'X') {
				console.log('X wins the game');
			} else if (arr[i] == 'O') { //checks vertically
				console.log('O wins the game');
			} // 0/	1/ 2
			return true; // 3/	4/ 5
		} // 6/	7/ 8
	}
	if (arr[0] == arr[4] && arr[4] == arr[8] && arr[0] != ' ') {
		if (arr[0] == 'X') {
			console.log('X wins the game');
		} else if (arr[0] == 'O') { //checks diagonally(top-left =>>bottom right)
			console.log('O wins the game');
		}
		return true;
	}
	if (arr[2] == arr[4] && arr[4] == arr[6] && arr[2] != ' ') {
		if (arr[2] == 'X') {
			console.log('X wins the game');
		} else if (arr[2] == 'O') { //checks diagonally(top-right =>>bottom-left)
			console.log('O wins the game');
		}
		return true;
	}

	return false;
}



function show() {

	// console.log(winCheck(ttt));
	console.log('   ');
	console.log("                " + ttt[0] + " || " + ttt[1] + " || " + ttt[2]);
	console.log('             ----------------');
	console.log('                ' + ttt[3] + " || " + ttt[4] + " || " + ttt[5]);
	console.log('             ----------------');
	console.log('                ' + ttt[6] + " || " + ttt[7] + " || " + ttt[8]);
	console.log('                                           ', chance);

}


//module.exports=winCheck;
// artificial intelligence for computer
function dumb(array) { // gives me a random
	var m = mewin(ttt, dcomp);
	var h = mewin(ttt, human);
	if (h) {
		return h;
	} else if (m) {
		return m;
	} else {
		//console.log('random', m);
		var c = Math.floor(Math.random() * 9);
		if (!isNaN(array[c])) {
			return c;
		} else {
			return dumb(array);
		}
	}
}


function clear() {
	process.stdout.write('\u001B[2J\u001B[0;0f');
}

function mewin(ttt, p) {
	for (var i = 0; i < 9; i++) {
		if (!isNaN(ttt[i])) {
			ttt[i] = p;
			//console.log(winCheck(ttt), i);
			if (winCheck(ttt)) {
				clear();
				return i;
				//console.log('smart');
			}
			ttt[i] = i;
		}
	}
	return false;
}