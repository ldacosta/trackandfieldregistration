/*

		General JS library for application. Uses core.js (downloaded library form 
		book 'Simply Javascript')

*/

<!--  -->
var eventNames = ["100m","200m","400m","800m","1500m","3000m","HighJump","LongJump","TripleJump","ShotPut"];
var ageGroups = ["midget", "atom", "bantam"];
var genders = ["boys", "girls"];
// hashtable containing all registrations. 
// Let's initialize the whole thing.
var registration = {}; 
for (var eventIdx = 0; eventIdx < eventNames.length; eventIdx++) {
		registration[eventNames[eventIdx]] = {};
		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
				registration[eventNames[eventIdx]][ageGroups[ageIdx]] = {};
				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
						registration[eventNames[eventIdx]][ageGroups[ageIdx]][genders[genderIdx]] = {};
				}
		} 
};
 
var EventSummaryHandler = 
{
		 

 		init: function() 
		{
		 // control of summary rows for different events	
		 // Assumes that, for each event X, there is a radio button
		 //   (*) with options called 'enterXYes' and 'enterXNo'  	 
		 for (var eventIdx = 0; eventIdx < eventNames.length; eventIdx++) {
		 		 var eventName = eventNames[eventIdx];
				 var elt = document.getElementById("enter" + eventName + "Yes");
				 // I use closures to encapsulate with the callback function the current environment 
		 		 elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.setProperClassOnEventSummary(currentEventName, true); } })(eventName); 
				 var elt = document.getElementById("enter" + eventName + "No");
		 		 elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.setProperClassOnEventSummary(currentEventName, false); } })(eventName); 
		 }
		 // CHANGE STYLE OF 'summaryShotPut'
		 // control of checkboxes showing 'tables' to enter athletes
		 document.getElementById("show100m").onclick = (function() { EventSummaryHandler.toggleEventTable('100m'); })
		 document.getElementById("show200m").onclick = (function() { EventSummaryHandler.toggleEventTable('200m'); })
		 document.getElementById("show400m").onclick = (function() { EventSummaryHandler.toggleEventTable('400m'); })
		 document.getElementById("show800m").onclick = (function() { EventSummaryHandler.toggleEventTable('800m'); })
		 document.getElementById("show1500m").onclick = (function() { EventSummaryHandler.toggleEventTable('1500m'); })
		 document.getElementById("show3000m").onclick = (function() { EventSummaryHandler.toggleEventTable('3000m'); })
		 document.getElementById("showHighJump").onclick = (function() { EventSummaryHandler.toggleEventTable('HighJump'); })
		 document.getElementById("showLongJump").onclick = (function() { EventSummaryHandler.toggleEventTable('LongJump'); })
		 document.getElementById("showTripleJump").onclick = (function() { EventSummaryHandler.toggleEventTable('TripleJump'); })
		 document.getElementById("showShotPut").onclick = (function() { EventSummaryHandler.toggleEventTable('ShotPut'); })
		}, 


		// puts appropriate style on event's summary row
		// I assume the row for an event X is called 'summaryX'
		setProperClassOnEventSummary: function(eventName, entering)
		{
		 var rowName = "summary" + eventName;
		 if (entering) 
		 		document.getElementById(rowName).setAttribute("class", "incompleteEvent")
		 else
		 		document.getElementById(rowName).setAttribute("class", "toIgnoreEvent")
		},
		
		// shows/hide table of a specific event, to enter athletes
		toggleEventTable: function(eventName) 
		{
		 var lTable = document.getElementById(eventName);
		 if (lTable == null)
		 		alert("I have no clue what is table for event " + eventName);
		 else
     		 lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
		} 

};

Core.start(EventSummaryHandler);
