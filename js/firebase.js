
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
	
	$.each(recipeListView, function(key, val) {
	    var recipes = [];
	    
	    console.log('Key: ' + key + '  Val: ' + val)
	    recipes.push(key);
	    $.each(val, function(key, val) {
		recipes.push(val); 
	    });
	    
	    
	    listItems += '<li"><img src=" '+ recipes[3] +' ">'
	    listItems += '<h2>' + recipes[0] + '</h2>';
	    listItems += '<p><strong>Ready in: </strong>' + recipes[4] + '</p>';
	    listItems += '<p><strong>Serving Size: </strong>' + recipes[5] + '</p>';
	    listItems += '<p><strong>Ingredients: </strong><br>' + recipes[2] + '</p>';
	    listItems += '<p><strong>Directions: </strong><br>' + recipes[1] + '</p></li>'
            
            
	});
	
	console.log(listItems);
	$("#recipe-list").html(listItems);
	
    });
    
}





