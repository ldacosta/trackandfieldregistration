/*

		General JS library for application. Uses core.js (downloaded library form 
		book 'Simply Javascript')

*/

<!--  -->
var EventSummaryHandler = 
{
 		init: function() 
		{
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
