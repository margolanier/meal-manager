
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
    
    addToDOW();
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

function addToDOW(){
    var onClick = false;
    varMon = 0;
    varTues = 0;
    varWed = 0;
    varThurs = 0;
    varFri = 0;
    
    //make new Firebase list? for each user?
    var recipeListRef = new Firebase('https://my-cookbook.firebaseio.com///recipes');
    
    recipeListRef.once('value', function(addToDOW) {
	// store dataSnapshot for use in below examples.
	varMon = onClick.val();
	console.log(varMon);
	//length of an object.
	//console.log(Object.keys(recipeListView).length)
	var listItems = "";
	var list = "";
	
	
	//idk.....
	$.each(varMon, function(key, val) {
	    var recipes = [];
	    
	    //console.log('Key: ' + key + '  Val: ' + val)
	    recipes.push(key);
	    $.each(val, function(key, val) {
		recipes.push(val); 
	    });
	    
	    
	    listItems += '<li><img src=" '+ varMon[3] +' ">'
	    listItems += '<h2>' + varMon[0] + '</h2>';
	    listItems += '<p><strong>Ready in: </strong>' + varMon[4] + '</p>';
	    listItems += '<p><strong>Serving Size: </strong>' + varMon[5] + '</p>';
	    listItems += '<p><strong>Ingredients: </strong><br>' + varMon[2] + '</p>';
	    listItems += '<p><strong>Directions: </strong><br>' + varMon[1] + '</p></li>'
            
	    
	    list += '<li><a href="#"><img src=" '+ varMon[3] +' ">'
	    list += '<h2>' + varMon[0] + '</h2>';
	    list += '<p><strong>Ready in: </strong>' + varMon[4] + '</p>';
	    list += '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a></a></li>'
	    
	});
	
	console.log(list);
	$("#monMenu").html(list);
	$("#monMenu").listview("refresh");
	
    });
    
}



