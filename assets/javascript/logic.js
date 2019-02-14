the_players = {
	obi_wan: {
		health: 150,
		attack: 25,
		counter_attack: 5
	},
	luke: {
		health: 145,
		attack: 25,
		counter_attack: 10
	},
	vader: {
		health: 160,
		attack: 25,
		counter_attack: 15
	},
	maul: {
		health: 155,
		attack: 25,
		counter_attack: 20
	}
}

var opponents_set = false;
var opponent_selected = false;

function restart(){
	alert("testing restart button");
}

function statistics(){
	console.log("User health: " + user_health);
	$("#obi_wan_hp").text("HP: " + the_players.obi_wan.health);
	$("#luke_hp").text("HP: " + the_players.luke.health);
	$("#vader_hp").text("HP: " + the_players.vader.health);
	$("#maul_hp").text("HP: " + the_players.maul.health);
}

function player_validation(){
	//This is if you kill the current enemy
	if (enemy_health <= 0){
		enemy_div.attr("data-player","dead");
	}
	//This is if the game has been lost
	else if(user_health <= 0){
		$(".content").empty();
		$(".arena").empty();

		//This will create a game over label that displays when the game is lost
		game_over_label = $("<div>");
		game_over_label.addClass("game_over_banner");
		game_over_label.text("Game Over");
		$(".arena").append(game_over_label);
		$(".arena").toggleClass("visible");

		//This will create a div to store the restart button inside of
		restart_div = $("<div>");
		restart_div.addClass("restart");

		//This will create the restart button
		restart_button = $("<button>");
		restart_button.addClass ("restart_button");
		restart_button.text("Restart");
		restart_button.attr("onclick","restart()");

		restart_div.append(restart_button);
		$(".arena").append(restart_div);
	}
}

//This finds the id of the user and the enemy
//This will let us reference the object using the id of the players
function fight(){


	user_div = $("[data-player='user']");
	user_div_id = user_div.attr('id');
	user_in_object = the_players[user_div_id];
	user_health = user_in_object.health;
	user_attack = user_in_object.attack;

	enemy_div = $("[data-player='opponent_in_arena']");
	enemy_div_id = enemy_div.attr('id');
	enemy_in_object = the_players[enemy_div_id];
	enemy_health = enemy_in_object.health;
	enemy_counter_attack = enemy_in_object.counter_attack;

	//This will subtract the user's health by the counter attack of the enemy
	user_health = user_health - enemy_counter_attack;
	user_in_object.health = user_health;

	enemy_health = enemy_health - user_attack;
	enemy_in_object.health = enemy_health;

	user_in_object.attack += 4;

	player_validation();
	statistics();
}

//This will wait for the user to choose a player
function prepare_fight(){
	all_opponents = $("[data-player='opponent']");
	all_opponents.on("click", function(){
		//If the user isn't fighting a player, but chooses one to fight
		if(! opponent_selected === true){
			opponent_selected = true;
			this_opponent = $(this);
			this_opponent.appendTo(".arena_opponent");
			this_opponent.toggleClass("in_arena");
			this_opponent.attr("data-player","opponent_in_arena");
			$("[data-player='user']").appendTo(".arena_user");
			$("[data-player='user']").toggleClass("in_arena");
			$(".arena").toggleClass("visible");
			$(".fight_button").toggleClass("button_visible");
		}
		//If the user is already fighting a player, but chooses another one
		else{
			current_opponent = $("[data-player='opponent_in_arena']");
			current_opponent.toggleClass("in_arena");
			current_opponent.attr("data-player", "opponent");
			current_opponent.appendTo(".game_bottom_row");
			new_opponent = $(this);
			new_opponent.toggleClass("in_arena");
			new_opponent.attr("data-player","opponent_in_arena");
			new_opponent.appendTo(".arena_opponent");
		}
	});
}

//This will set all players that were not chosen to opponents
function set_game(){
	opponents_set = true;
	var all_players = $("[data-player='null']");
	all_players.attr("data-player","opponent");
	all_players.appendTo(".game_bottom_row");
	$(".game_top_row_label").text("Your player:")
	$(".game_bottom_row_label").text("Your opponents:")
	$(".label").addClass("label_on");
	prepare_fight();
}

//This is how the user chooses a player at the beginning of the game
$(".player").on("click", function(){
	if (! opponents_set === true){
		$(this).attr("data-player","user");
		set_game();
	}
});