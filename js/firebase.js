
//place functions for database-connect here...


function onDeviceReady() {
    //needed only for mobile deployment
    console.log("onDeviceReady()");   
}

$( document ).ready(function() {
    //for browser use only
    console.log( "document ready!" );
    
    //function to populate menu
    loadTrips();
});


function loadTrips(){
    // Create our Firebase reference
    var tripsToDisplay = 3;	
    var tripListRef = new Firebase('https://my-cookbook.firebaseio.com///recipes');
    var tripListView = tripListRef.limit(tripsToDisplay);
    
    tripListRef.once('value', function(dataSnapshot) {
	// store dataSnapshot for use in below examples.
	tripListView = dataSnapshot.val();
	console.log(tripListView);
	//length of an object.
	//console.log(Object.keys(tripListView).length)
	var listItems = "";
	
	$.each(tripListView, function(key, val) {
	    var location = [];
	    
	    console.log('Key: ' + key + '  Val: ' + val)
	    location.push(key);
	    $.each(val, function(key, val) {
		location.push(val); 
	    });
	    
	    
	    listItems += '<li"><img src=" '+ location[3] +' ">'
	    listItems += '<h2>' + location[0] + '</h2>';
	    listItems += '<p><strong>Ready in: </strong>' + location[4] + '</p>';
	    listItems += '<p><strong>Serving Size: </strong>' + location[5] + '</p>';
	    listItems += '<p><strong>Ingredients: </strong><br>' + location[2] + '</p>';
	    listItems += '<p><strong>Directions: </strong><br>' + location[1] + '</p></li>'
            
            
	});
	
	console.log(listItems);
	$("#trip-list").html(listItems);
	
    });
    
}




