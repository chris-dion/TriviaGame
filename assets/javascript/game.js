var game = {
	
	//array to hold each questions
	questions:[
	{
		question: "1: Who directed Citizen Kane?", 
		choice1: "Orson Welles", 
		choice2: "Stephen Speilberg",
		choice3: "Peter Jackson",
		choice4: "Charlie Chaplin",
		correctAnswer: "Orson Welles"
	},
	{
		question: "2: which one of these films is considered to be a neo noir film?", 
		choice1: "You Only live twice", 
		choice2: "Hot Fuzz",
		choice3: "Blade Runner",
		choice4: "Wreck it Ralph",
		correctAnswer: "Blade Runner"
	},
	{
		question: "3: This director is famous for their dialogue?", 
		choice1: "Martin Scorsese", 
		choice2: "Stanley Kubrick",
		choice3: "Alfred Hitchcock",
		choice4: "Quinton Tarentino",
		correctAnswer: "Quinton Tarentino"
	},
	{
		question: "4: What movie is this from? \"Frankly my dear I don't give a damn.\"", 
		choice1: "Cassablanca", 
		choice2: "The Third Man",
		choice3: "Vertigo",
		choice4: "Gone With The Wind",
		correctAnswer: "Gone With The Wind"
	},
	{
		question: "5: This Actor was in The Godfather, Apocalypse Now, and The Third Man", 
		choice1: "Humphrey Bogart", 
		choice2: "Marlon Brando",
		choice3: "James Dean",
		choice4: "Ricky Ricardo",
		correctAnswer: "Marlon Brando"
	}
	],

	//variables to navigate the question array and to save the players answer
	question_num: 1,
	player_choice: "",

	//variables to tally up the score
	correct: 0,
	score: 0,
    //function to show the current question
	show_question: function(){
		//index through the game object for the current question
		$("#question").html(game.questions[game.question_num - 1].question);
		$("#a").html(game.questions[game.question_num - 1].choice1);
		$("#b").html(game.questions[game.question_num - 1].choice2);
		$("#c").html(game.questions[game.question_num - 1].choice3);
		$("#d").html(game.questions[game.question_num - 1].choice4);

		//if a choice is made then run this function
		$(".btn-info").on("click", function(){
			//save the players choice
			game.player_choice = this.innerHTML;

			//if the player's choice equals the saved answer then increment the correct answer and display that they were correct
			if(game.player_choice === game.questions[game.question_num - 1].correctAnswer){
				$('#right_or_wrong').html("Correct");
				game.correct++;
			} 
			//else display if the player is incorrect
			else{
				$('#right_or_wrong').html("Incorrect");			
			}
			//calculate the game score 
			game.score = Math.floor((game.correct / game.question_num) * 100);
			//display new score
			$("#score").html(game.score);
			//increment to the next question
			game.question_num++;
			//reset the buttons
			$(".btn-info").unbind( "click" );
			//check if there's another question
			if(game.question_num < 6){
				game.show_question();
			}
			//calulate if the player has won or loss
			if(game.question_num >= 6 && game.score >= 70){
				$("#game_over").html("Congrats! You Passed!");
				$( ".btn-info").unbind( "click" );


			}else if(game.question_num >= 6 && game.score < 70){
				$("#game_over").html("GAME OVER");
				$(".btn-info").unbind( "click" );
			}

		})

	},
	countdown: function(duration, display) {
		var timer = duration, seconds;
		var set_inter = setInterval(function () {

			seconds = parseInt(timer % 60, 10);
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.textContent = ":" + seconds;

			if (--timer < 0) {
				timer = 0;
			}
			if(timer === 0){

				//save the players choice
				game.player_choice = "";
				//display the user that the answer is incorrect
				$('#right_or_wrong').html("Incorrect");

				//calculate the game score 
				game.score = Math.floor((game.correct / game.question_num) * 100);
				//display new score
				$("#score").html(game.score);
				//increment to the next question
				game.question_num++;
				//reset the buttons
				$(".btn-info").unbind( "click" );
				//check if there's another question
				if(game.question_num < 6){
					game.show_question();
				}
				//calulate if the player has won or loss
				if(game.question_num >= 6 && game.score >= 70){
					clearInterval(set_inter);
					$("#game_over").html("Congrats! You Passed!");
					$( ".btn-info").unbind( "click" );
				}else if(game.question_num >= 6 && game.score < 70){
					clearInterval(set_inter);
					$("#game_over").html("GAME OVER");
					$(".btn-info").unbind( "click" );
				}


				clearInterval(set_inter);
				if (game.question_num <6){
					game.countdown(10,document.querySelector("#countdown"));
				}
			}
		}, 1000);
	}
}


$( document ).ready(function() {
	var max_time = 10;
	show_time = document.querySelector("#countdown");
	game.countdown(max_time, show_time);
	game.show_question();
	
});