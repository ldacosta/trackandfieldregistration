/*

		General JS library for application. Uses core.js (downloaded library form 
		book 'Simply Javascript')

*/

<!--  -->
var eventNames = ["100m","200m","400m","800m","1500m","3000m","HighJump","LongJump","TripleJump","ShotPut"];
var ageGroups = ["midget", "atom", "bantam"];
var genders = ["boys", "girls"];
// hashtable containing all registrations. 
var registration = {}; 
for (var eventIdx = 0; eventIdx < eventNames.length; eventIdx++) {
		registration[eventNames[eventIdx]] = [];
		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
				registration[eventNames[eventIdx]][ageGroups[ageIdx]] = [];
				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
						registration[eventNames[eventIdx]][ageGroups[ageIdx]][genders[genderIdx]] = [];
				}
		} 
};
 
// Hashtable containing information of is this event being filled or not:
var registeringEvents = {}; 
for (var eventIdx = 0; eventIdx < eventNames.length; eventIdx++) {
		registeringEvents[eventNames[eventIdx]] = true;
};

var EventSummaryHandler = 
{

 		init: function() 
		{
		 // Initialization of handlers for controls
 	   // NB: EVERYWHERE, I use closures to encapsulate with the callback function the current environment 
		 for (var eventIdx = 0; eventIdx < eventNames.length; eventIdx++) {
		 		 var eventName = eventNames[eventIdx];
		 		 // control of summary rows for different events	
		 		 // Assumes that, for each event X, there is a radio button
		 		 //   (*) with options called 'enterXYes' and 'enterXNo'  	 
				 var elt = document.getElementById("enter" + eventName + "Yes");
		 		 elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.enteringEvent(currentEventName, true); } })(eventName); 
				 var elt = document.getElementById("enter" + eventName + "No");
		 		 elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.enteringEvent(currentEventName, false); } })(eventName); 
				 // control of checkboxes showing 'tables' to enter athletes
				 // Assumption: the checkbox for event 'X' is called 'showX'
				 var elt = document.getElementById("show" + eventName);
				 elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.toggleEventTable(currentEventName); } })(eventName);
		 }
		 // Reading saved information (locally). Fills up 'registration' structure
		 EventSummaryHandler.readSavedRegistration();
		 // Once I have the info, fill up the summary table accordingly
		 for (var eventIdx = 0; eventIdx < eventNames.length; eventIdx++) {
		 		 var eventName = eventNames[eventIdx];
		 		 EventSummaryHandler.enteringEvent(eventName, registeringEvents[eventName]);
		 };
		 
		 
		}, 


		// 
		enteringEvent: function(eventName, entering) 
		{
				 // puts appropriate style on event's summary row
				 // I assume the row for an event X is called 'summaryX'
		 		 var rowName = "summary" + eventName;
		 		 if (entering) {				 
						document.getElementById("enter" + eventName + "Yes").checked = true;
						document.getElementById(rowName).setAttribute("class", "incompleteEvent")
						
						var str = "";
        		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
        				str += ageGroups[ageIdx] + "=>"; 
        				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
										str += registration[eventName][ageGroups[ageIdx]][genders[genderIdx]].length + " " + genders[genderIdx] + ",";
        				}
        		} 
						document.getElementById(rowName + "Athletes").innerHTML = str;
				 }
				 else {
						document.getElementById("enter" + eventName + "No").checked = true;
		 				document.getElementById(rowName).setAttribute("class", "toIgnoreEvent");
						document.getElementById(rowName + "Athletes").innerHTML = "NOT ENTERING"
				 		if (document.getElementById("show" + eventName).checked) {
							 document.getElementById("show" + eventName).checked = false;
							 EventSummaryHandler.toggleEventTable(eventName);
						}
				 }
				 document.getElementById("show" + eventName).disabled = !entering;
		}, 
		 
		// Reads locally available registration
		readSavedRegistration: function()
		{
		 // for now, nothing
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

// register stuff with 'Core' library:
Core.start(EventSummaryHandler);
