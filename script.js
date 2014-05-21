/*

		General JS library for application. Uses core.js (downloaded library form 
		book 'Simply Javascript')

*/

var meetEvents = [
    {"id": "100m", "display": "100 m.", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "200m", "display": "200 m.", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "400m", "display": "400 m.", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "800m", "display": "800 m.", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "1500m", "display": "1500 m.", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "3000m", "display": "3000 m.", "byCategories": false, "numEntriesPerGender": 4}, 
    {"id": "HighJump", "display": "High Jump", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "LongJump", "display": "Long Jump", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "TripleJump", "display": "Triple Jump", "byCategories": true, "numEntriesPerGender": 4}, 
    {"id": "ShotPut", "display": "Shot Put", "byCategories": true, "numEntriesPerGender": 4} 
];

var ageGroups = ["midget", "atom", "bantam"];
var genders = ["boys", "girls"];
// hashtable containing all registrations. 
var registration = {}; 
// Hashtable containing information of is this event being filled or not:
var registeringEvents = {}; 
for (var eventIdx = 0; eventIdx < meetEvents.length; eventIdx++) {
    var eventId = meetEvents[eventIdx]["id"];
    registration[eventId] = [];
    registeringEvents[eventId] = [];
    for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
        registration[eventId][ageGroups[ageIdx]] = [];
        registeringEvents[eventId][ageGroups[ageIdx]] = [];
        for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
            registration[eventId][ageGroups[ageIdx]][genders[genderIdx]] = [];
            registeringEvents[eventId][ageGroups[ageIdx]][genders[genderIdx]] = true;
        }
    } 
};

/**
 * Loads saved information (from local source).
*/
var LocalInfoLoader = 
{

    init: function() 
    {
        // Reading saved information (locally). 
        LocalInfoLoader.readSavedRegistration();
    }, 

    // 
		
		// 
		enteringEvent: function(eventName, entering) 
		{
				 // puts appropriate style on event's summary row
				 // I assume the row for an event X is called 'summaryX'
		 		 var rowName = "summary" + eventName;
		 		 if (entering) {				 
						document.getElementById("enter" + eventName + "Yes").checked = true;
						document.getElementById(rowName).setAttribute("class", "incompleteEvent")
						
						var howManyAthletesEntered = 0;
						var str = "<ul>";
        		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
        				str += "<li>" + ageGroups[ageIdx] + "=>"; 
        				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
										var athletesInAgeGroup = registration[eventName][ageGroups[ageIdx]][genders[genderIdx]].length; 
										str +=  athletesInAgeGroup + " " + genders[genderIdx] + ",";
										howManyAthletesEntered += athletesInAgeGroup;
        				}
								str += "</li>"
        		} 
						str += "</ul>"
						document.getElementById(rowName + "Athletes").innerHTML = str;
						// 
						if (howManyAthletesEntered == 0)
							 document.getElementById(rowName).setAttribute("class", "emptyEvent")
						else if (howManyAthletesEntered == ageGroups.length * genders.length * 4) // 4 athletes per gender per age-group 
							 document.getElementById(rowName).setAttribute("class", "completeEvent")
						else
							 document.getElementById(rowName).setAttribute("class", "incompleteEvent")

							 
							 
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
		
};



var EventsStructures = 
{
    // very poor 'find' for events.
    findEventIdx: function(eventId)
    {
        for (var idx = 0, found = false; !found && (idx < meetEvents.length); idx++) {
            found = (meetEvents[idx]["id"] == eventId);
        }
    if (found) return (idx - 1);
    else { alert("Event with id = [" + eventId + "] not registered"); return -1;}
}, 

}; 

/**
 * We generate the part of the HTML that is repetitive.
*/
var HTMLGenerator = 
{
    init: function()
    {
        for (var eventIdx = 0; eventIdx < meetEvents.length; eventIdx++) {
            var eventId = meetEvents[eventIdx]["id"];
            // Create summary tables
            HTMLGenerator.fillEventDetail(eventId);
            HTMLGenerator.createTablesForEventEntries(eventId);
        };
    },

	
    // 
    createTablesForEventEntries: function(eventId)
    {
        var eventIdx = EventsStructures.findEventIdx(eventId);
        if (eventIdx != -1) {
            var eventEntryRowName = "rowEntry" + eventId;
            var eventEntryRow = document.getElementById(eventEntryRowName);
            // if it doesn't exist, I create it. 
            if (eventEntryRow == null) {
                var mainTable = document.getElementById("mainTable");
                eventEntryRow = mainTable.insertRow(mainTable.rows.length);
                eventEntryRow.setAttribute("id", eventEntryRowName);
                // I will fill up the cell with a table:
                var tableAsStr = "<table id=\"" + eventId + "\" width=\"100%\" style=\"display:none\">";
                // this table has 2 cells, one for each gender:
                tableAsStr += "<tr><td width=\"100%\" align=\"center\" bgcolor=\"#4D4D4D\" colspan=2><h2>" + meetEvents[eventIdx]["display"] + "</h2></td></tr>";
                // do I go by categories, or is it OPEN?
                if (meetEvents[eventIdx]["byCategories"]) {
                    for (ageGroupIdx = 0; ageGroupIdx <  ageGroups.length; ageGroupIdx++) {
                        // headers
                        tableAsStr += "<tr width=\"100%\">";
                        for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
                            tableAsStr += "<th><a href=\"http://www.limestone.on.ca/lesaa/General/age_categories%20for%2020052006.htm\">" + ageGroups[ageGroupIdx] + "</a> " + genders[genderIdx] + "</th>";
                            tableAsStr += "</tr>";
                            //
                            tableAsStr += "<tr width=\"100%\">";
                            for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
                                tableAsStr += "<td width=\"50%\" align=\"center\" bgcolor=\"#4D4D4D\">";
                                tableAsStr += "<table width=\"100%\">";
                                tableAsStr += "<tr><th align=\"left\">Last Name, First Name</th></tr>";
                                for (var i = 0; i < meetEvents[eventIdx]["numEntriesPerGender"]; i++) {
                                    tableAsStr += "<tr><td><input type=\"text\" name=\"name\" size=\"100%\" maxlength=\"50\" placeholder=\"Last Name, First Name\" class=\"goodinput\"/></td></tr>";
                                }
                                tableAsStr += "</table>";
                                tableAsStr += "</td>";
                            }
                            tableAsStr += "</tr>";
                        }
                    }
                }
                else { // this event is OPEN
                }
                var c = eventEntryRow.insertCell(0)	
                c.innerHTML = tableAsStr;
            }
        }
    },

    /**
     * 
    */
    fillEventDetail: function(eventId)
    {     
        var rowName = "summary" + eventId;
        // Has summary row for the event been displayed?
        var eventRow = document.getElementById(rowName); 
        if (eventRow == null) {
            // event's summary has not been displayed. Let's do it
            var table = document.getElementById("eventsSummary");
            eventRow = table.insertRow(table.rows.length);
            eventRow.setAttribute("id", rowName);
            // Cells expected: one for the Event, one for each age group:
            var eventNameCol = eventRow.insertCell(0); // Event
            var eventName = meetEvents[EventsStructures.findEventIdx(eventId)]["display"];
            eventNameCol.innerHTML = "<td><input type=\"checkbox\" name=\"showEvents\" id=\"show" + eventId + "\"><strong>" + eventName + "</strong><br></td>";
            for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
                eventRow.insertCell(ageIdx + 1);
            }
        }
    }, 

}; 

var EventHandlers = 
{

    init: function() 
    {
        // Initialization of handlers for controls
        // NB: EVERYWHERE, I use closures to encapsulate with the callback function the current environment 
        for (var eventIdx = 0; eventIdx < meetEvents.length; eventIdx++) {
            var eventId = meetEvents[eventIdx]["id"];
            // control of summary rows for different events	
            // Assumes that, for each event X, there is a radio button
            //   (*) with options called 'enterXYes' and 'enterXNo'  	 
            /*
                var elt = document.getElementById("enter" + eventId + "Yes");
                elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.enteringEvent(currentEventName, true); } })(eventId); 
                var elt = document.getElementById("enter" + eventId + "No");
                elt.onclick = (function(currentEventName) { return function() { EventSummaryHandler.enteringEvent(currentEventName, false); } })(eventId);
            */ 
            // control of checkboxes showing 'tables' to enter athletes
            // Assumption: the checkbox for event 'X' is called 'showX'
            var elt = document.getElementById("show" + eventId);
            elt.onclick = (function(currentEventName) { return function() { MeetEventRegistrationHandler.toggleEventTable(currentEventName); } })(eventId);
        }
    },
}


var MeetEventSummaryHandler = 
{
    init: function() 
    {
        for (var eventIdx = 0; eventIdx < meetEvents.length; eventIdx++) {
            MeetEventSummaryHandler.fillEventSummary(meetEvents[eventIdx]["id"]);
        };
    }, 

    fillEventSummary: function(eventId)
    {
        var rowName = "summary" + eventId;
        // Has summary row for the event been displayed?
        var eventRow = document.getElementById(rowName); 
        if (eventRow == null) {
            alert("No summary row found for event [" + eventId + "]; row expected = [" + rowName + "]");
        }
        else {
            // OK. by this point we know the row of the event exists. Let's
            // fill up the information
            var howManyAthletesEntered = 0;
            for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
                var str = "";
                var athletesInAgeGroup = 0;
                for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
                    if (registeringEvents[eventId][ageGroups[ageIdx]][genders[genderIdx]]) {
                        athletesInAgeGroup = registration[eventId][ageGroups[ageIdx]][genders[genderIdx]].length; 
                        str +=  athletesInAgeGroup + " " + genders[genderIdx] + ",";
                        howManyAthletesEntered += athletesInAgeGroup;
                        if (athletesInAgeGroup == 0) {
                            str = "No Entries";
                            eventRow.cells[ageIdx + 1].setAttribute("class", "emptyEvent");
                        }
                        else if (athletesInAgeGroup >= genders.length * 4) {
                            eventRow.cells[ageIdx + 1].setAttribute("class", "completeEvent");
                        }
                        else {
                            eventRow.cells[ageIdx + 1].setAttribute("class", "incompleteEvent");
                        }
                    }
                    else {
                        eventRow.cells[ageIdx + 1].setAttribute("class", "completeEvent");
                        str = "NOT ENTERING";
                    }
                }
                 eventRow.cells[ageIdx + 1].innerHTML = str;
            }
        }
    }, 
}

var MeetEventRegistrationHandler = 
{

	init: function()
	{
		MeetEventRegistrationHandler.fillGlobalRegistrationFlags()
	},
	
	fillGlobalRegistrationFlags: function()
	{
		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
			for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
				for (var eventIdx = 0, registering = false; !registering && (eventIdx < meetEvents.length); eventIdx++) {
					registering = registeringEvents[eventId][ageGroups[ageIdx]][genders[genderIdx]];
				}
				alert(ageGroups[ageIdx] + genders[genderIdx]);
				var eventRegisteringCheckbox = document.getElementById(ageGroups[ageIdx] + genders[genderIdx]);
				eventRegisteringCheckbox.checked = registering;
			}
		}
    }, 
	

	// shows/hide table of a specific event, to enter athletes
	toggleEventTable: function(eventName) 
	{
		var lTable = document.getElementById(eventName);
		if (lTable == null)
			alert("I have no clue what is table for event [" + eventName + "]");
		else
			lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
	} 

}; 

// Create interface:
Core.start(HTMLGenerator);
// register stuff with 'Core' library:
Core.start(EventHandlers);
Core.start(LocalInfoLoader);
Core.start(MeetEventSummaryHandler);
Core.start(MeetEventRegistrationHandler);


