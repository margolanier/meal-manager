
function onDeviceReady() {
    console.log("onDeviceReady()");   
}

$( document ).ready(function() {
    console.log( "document ready!" );
    
});


var rootRef, highestPriority, $entries;
rootRef = new Firebase("https://ingredients.firebaseio.com/");

rootRef.on("child_added", function (snapshot) {
    var entry = snapshot.name();
    var priority = snapshot.getPriority();
    
    highestPriority = Math.max(priority, highestPriority);
    
    $entry = $(".entry.template").clone();
    $entry.removeClass("template");
    $entry.show();
    $entry.attr('id', entry);
    $entry.children(".text").html(entry);
    $entry.data('priority', priority);
    $entry.data('name', entry);
    
    $(".up", $entry).click(function () {
        var $entry = $(this).parents(".entry");
        var $prevEntry = $entry.prev();
        
        if (!$prevEntry.length) return;
        
        var entryRef = rootRef.child($entry.data('name'));
        var prevEntryRef = rootRef.child($prevEntry.data('name'));
        
        var entryPriority = $entry.data('priority');
        var prevEntryPriority = $prevEntry.data('priority');
        
        console.log(entryPriority, prevEntryPriority);
        
        entryRef.setPriority(prevEntryPriority);
        prevEntryRef.setPriority(entryPriority);

        entryRef.data('priority', prevEntryPriority);
        prevEntryRef.data('priority', entryPriority);
    });
    
    $(".down", $entry).click(function () {
        var $entry = $(this).parents(".entry");
        var $nextEntry = $entry.next();
        
        if (!$nextEntry.length) return;
        
        var entryRef = rootRef.child($entry.data('name'));
        var nextEntryRef = rootRef.child($nextEntry.data('name'));
        
        var entryPriority = $entry.data('priority');
        var nextEntryPriority = $nextEntry.data('priority');
        
        console.log(entryPriority, nextEntryPriority);
        
        entryRef.setPriority(nextEntryPriority);
        nextEntryRef.setPriority(entryPriority);

        entryRef.data('priority', nextEntryPriority);
        nextEntryRef.data('priority', entryPriority);
    });
    
     $(".remove", $entry).click(function () {
        snapshot.ref().remove();
    });
    
    $entries.append($entry);
});

rootRef.on("child_moved", function (snapshot, prevChildName) {
    console.log('moved?');
    var $prevEntry = $(".entry#"+ prevChildName);
    var $entry = $(".entry#" + snapshot.name());
    
    $entry.data('priority', snapshot.getPriority());
    
    // $entry.children(".text").html(snapshot.name() + " Priority(" + snapshot.getPriority() + ")");
    // took out priority number/order
    $entry.children(".text").html(snapshot.name() );
    
    if ($prevEntry.length) {
        $entry.insertAfter($prevEntry);
    }else{
        $entry.prependTo($entries); 
    }
});

rootRef.on("child_removed", function (snapshot) {
    $(".entry#" + snapshot.name()).remove(); 
});

highestPriority = 0;

$(function () { 
    $(".template").hide();
    $entries = $("#entries");
    
 
    $("#submit").click(function (e) {
        e.preventDefault()
        var $newEntry = $("#newEntry");
        var entry = $newEntry.val();
        $newEntry.val("");
    
        rootRef.child(entry).setWithPriority(true, highestPriority+1000);
    });
});