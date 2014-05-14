/*

		General JS library for application. Uses core.js (downloaded library form 
		book 'Simply Javascript')

*/

<!--  -->
var EventSummaryHandler = 
{
 		init: function() 
		{
		 // control of summary rows for different events		 
		 // 100 m
		 document.getElementById("enter100mYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('100m', true); })
		 document.getElementById("enter100mNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('100m', false); })
		 // 200 m
		 document.getElementById("enter200mYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('200m', true); })
		 document.getElementById("enter200mNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('200m', false); })
		 // 400 m
		 document.getElementById("enter400mYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('400m', true); })
		 document.getElementById("enter400mNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('400m', false); })
		 // 800 m
		 document.getElementById("enter800mYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('800m', true); })
		 document.getElementById("enter800mNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('800m', false); })
		 // 1500 m
		 document.getElementById("enter1500mYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('1500m', true); })
		 document.getElementById("enter1500mNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('1500m', false); })
		 // 3000 m
		 document.getElementById("enter3000mYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('3000m', true); })
		 document.getElementById("enter3000mNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('3000m', false); })
		 // High Jump
		 document.getElementById("enterHighJumpYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('HighJump', true); })
		 document.getElementById("enterHighJumpNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('HighJump', false); })
		 // Long Jump
		 document.getElementById("enterLongJumpYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('LongJump', true); })
		 document.getElementById("enterLongJumpNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('LongJump', false); })
		 // Triple Jump
		 document.getElementById("enterTripleJumpYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('TripleJump', true); })
		 document.getElementById("enterTripleJumpNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('TripleJump', false); })
		 // Shot Put 
		 document.getElementById("enterShotPutYes").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('ShotPut', true); })
		 document.getElementById("enterShotPutNo").onclick = (function() { EventSummaryHandler.setProperClassOnEventSummary('ShotPut', false); })
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
		setProperClassOnEventSummary: function(eventName, entering)
		{
		 var rowName = "summary" + eventName
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
