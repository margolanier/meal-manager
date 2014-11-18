
//place functions for database-connect here...


function onDeviceReady() {
    //needed only for mobile deployment
    console.log("onDeviceReady()");   
}

$( document ).ready(function() {
    //for browser use only
    console.log( "document ready!" );
    
    //function to populate menu
    loadRecipes();
    
    //pop up modal and add recipes to day of week
    whatDay();
    addToDay();
    
});


function loadRecipes(){
    // Create our Firebase reference
    var recipesToDisplay = 3;	
    var recipeListRef = new Firebase('https://my-cookbook.firebaseio.com///recipes');
    var recipeListView = recipeListRef.limit(recipesToDisplay);
    
    recipeListRef.once('value', function(dataSnapshot) {
	// store dataSnapshot for use in below examples.
	recipeListView = dataSnapshot.val();
	console.log(recipeListView);
	//length of an object.
	//console.log(Object.keys(recipeListView).length)
	var listItems = "";
	var list = "";
	
	$.each(recipeListView, function(key, val) {
	    var recipes = [];
	    
	    //console.log('Key: ' + key + '  Val: ' + val)
	    recipes.push(key);
	    $.each(val, function(key, val) {
		recipes.push(val); 
	    });
	    
	    
	    listItems += '<li><img src=" '+ recipes[3] +' ">'
	    listItems += '<h2>' + recipes[0] + '</h2>';
	    listItems += '<p><strong>Ready in: </strong>' + recipes[4] + '</p>';
	    listItems += '<p><strong>Serving Size: </strong>' + recipes[5] + '</p>';
	    listItems += '<p><strong>Ingredients: </strong><br>' + recipes[2] + '</p>';
	    listItems += '<p><strong>Directions: </strong><br>' + recipes[1] + '</p></li>'
            
	    
	    list += '<li><a href="#"><img src=" '+ recipes[3] +' ">'
	    list += '<h2>' + recipes[0] + '</h2>';
	    list += '<p><strong>Ready in: </strong>' + recipes[4] + '</p>';
	    list += '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a></a></li>'
	    
	});
	
	//console.log(listItems);
	//$("#recipe-list").html(listItems);
	//$("#recipe-list").listview("refresh");
	
	 console.log(list);
	$("#recipe-list").html(list);
	$("#recipe-list").listview("refresh");
	
    });
    
}

/************************
//specify onClick
function whatDay(){
    $
}

// opens 'What Day?' modal
  $("#open_modal").click(function(){
    $("#whatDayModal").css("display", "block");
  });

  $("#close_modal").click(function(){
    $("#whatDayModal").css("display", "none");
  }); 

************************/