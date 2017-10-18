//create an array of strings related to interesting topic in variable called topics
var query;
var sportsString = [
	"basketball",
	"baseball",
	"football",
	"hockey",
	"volleyball",
	"soccer"
];


$("#addSport").on("click", function(event){
	event.preventDefault();
//add a form to your page taking the value from a user input box and adds it into your topics array
	var input = $("#userInput").val().trim();
	sportsString.push(input);
	var newButtons = $("<input type='button' value='" + input + "'/>").addClass("yourButtons");
		$("#sports").append(newButtons);	
	console.log(input);


	//renderButtons();
});

//take topics in the array and create buttons using a loop that appends a button for each string
for(var i = 0; i < sportsString.length; i++){
	$("<div>");

		var oldButtons = $("<input type='button' value='" + sportsString[i] + "'/>").addClass("yourButtons");
		$("#sports").append(oldButtons);	
	
	$("</div>");
}



$(document).on("click", ".yourButtons", function() {
	query = $(this).attr("value");

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jT3mi6SRVxST95jP0O3N5Y562dF7srtJ&q=" + query + "&limit=10&offset=0&rating=PG&lang=en";
	$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
  	//renderButtons();
 
//when user clicks on a button, page should grab 10 static, non-animaed gif images from giphy api and display them
  	
  	for(var i = 0; i < response.data.length; i++){
  		 var newimg = $('<img>').addClass("gifClass");
  		 	newimg.attr('src', response.data[i].images.original_still.url);
  		 	newimg.attr('data-still', response.data[i].images.original_still.url);
  		 	newimg.attr('data-animate', response.data[i].images.original.url);
  		 	newimg.attr('data-state', 'data-still');
  		 
  		 $("#giphy").prepend(newimg);

//when the user clicks on one of the still giphy images, the gif should animate
//if the user clikcs the gif again, it should stop
  		 $(".gifClass").on("click", function() {
  		 	
  		 	var state = $(this).attr("data-state");
  		 	
  		 	if(state === "still"){
  		 		$(this).attr("src", $(this).attr("data-animate"));
  		 		$(this).attr("data-state", "animate");
  		 	} else{
  		 		$(this).attr("src", $(this).attr("data-still"));
  		 		$(this).attr("data-state", "still");
  		 	}
  		 });

  		 
  		console.log(response);


//under every gif, display its rating (data provided by giphy api)
  		$("#giphy").prepend("<p>Rating: " + response.data[i].rating + "</p>");
  
  }
  });




});

//then make a function call that takes each topic in the array and remakes the buttons on the page
      
//       function renderButtons() {

//         // Deleting the buttons prior to adding new movies
//         // (this is necessary otherwise you will have repeat buttons)
//         $("#sports").empty();

//         // Looping through the array of movies
//         for(var i = 0; i < sportsString.length; i++){
// 			$("<div>");

// 				var oldButtons = $("<input type='button' value='" + sportsString[i] + "'/>").addClass("yourButtons");
// 				$("#sports").append(oldButtons);	
	
// 			$("</div>");
// 		}
// }


//deploy your assignment to github