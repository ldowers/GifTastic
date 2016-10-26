// Variables
var topics = ['Finding Nemo', 'The Aristocats', 'Jungle Book', 'The Lion King', '101 Dalmatians', 'Mary Poppins', 'The Little Mermaid', 'Star Wars', 'Alice in Wonderland', 'Toy Story'];

var myPage = {
	renderButtons: function() {
		$('#movieButtons').empty();

		for (var i = 0; i < topics.length; i++) {
			var a = $('<button>');
			a.addClass('movieButton');
			a.attr('data-name', topics[i]);
			a.text(topics[i]);
			$('#movieButtons').append(a);
		}
	},
	displayMovieInfo: function() {
		var movie = $(this).data("name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

		$('#movieView').empty();
		
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			console.log(response);

			for (var i = 0; i < response.data.length; i++) {
				var movieDiv = $('<div>');
				movieDiv.addClass('movieInfo');
				
				var image = $('<img>');
				image.addClass('movieImage');
				image.data("still", response.data[i].images.fixed_height_small_still.url);
				image.data("animated", response.data[i].images.fixed_height_small.url);
				image.data("isAnimated", false);
				image.attr("src", response.data[i].images.fixed_height_small_still.url);
				
				movieDiv.append(image);
				
				var rating = $('<p>');
				rating.addClass("movieRating");
				rating.text("Rating: " + response.data[i].rating.toUpperCase());

				movieDiv.append(rating);
				
				$('#movieView').append(movieDiv);
			}
		});
	},
	imageClicked: function() {
		if ($(this).data("isAnimated")) {
			$(this).data("isAnimated", false);
			$(this).attr("src", $(this).data("still"));
		} else {
			$(this).data("isAnimated", true);
			$(this).attr("src", $(this).data("animated"));
		}
	}
};

//Event Handlers
$('#addMovie').on('click', function() {
	var movie = $('#movie-input').val().trim();
	topics.push(movie);
	$("form").trigger("reset");
	myPage.renderButtons();
});

$(document).on('click', '.movieButton', myPage.displayMovieInfo);

$(document).on('click', '.movieImage', myPage.imageClicked);

$(document).ready(function(){
	myPage.renderButtons();
});