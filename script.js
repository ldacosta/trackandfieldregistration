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
		HTMLGenerator.fillGlobalRegistrationFlagsArea();
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
                        tableAsStr += "<tr>";
                        for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
                            tableAsStr += "<th><h3><a href=\"http://www.limestone.on.ca/lesaa/General/age_categories%20for%2020052006.htm\">" + ageGroups[ageGroupIdx] + "</a> " + genders[genderIdx] + "</h3></th>";
						}
                        tableAsStr += "</tr>";
						// ask: not entering?
                        tableAsStr += "<tr>";
                        for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
							var checkboxId = meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx];
                            tableAsStr += "<td align=\"center\"><strong>NOT</strong> entering athletes? Un-check this: <input type=\"checkbox\" id=\"" + checkboxId + "\"</td>";
						}
                        tableAsStr += "</tr>";
						tableAsStr += "<tr>";
						for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
							tableAsStr += "<td width=\"50%\" align=\"center\" bgcolor=\"#4D4D4D\">";
							var registrationTableId = "registration_" + meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx];
							tableAsStr += "<table width=\"100%\" id=\"" + registrationTableId + "\">";
							tableAsStr += "<tr><th align=\"left\">Last Name, First Name</th></tr>";
							for (var i = 0; i < meetEvents[eventIdx]["numEntriesPerGender"]; i++) {
								var inputTextId = meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx] + i;
								tableAsStr += "<tr><td><input type=\"text\" id=\"" + inputTextId + "\" size=\"100%\" maxlength=\"50\" placeholder=\"Last Name, First Name\" class=\"goodinput\"/></td></tr>";
							}
							tableAsStr += "</table>";
							tableAsStr += "</td>";
						}
						tableAsStr += "</tr>";
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

	fillGlobalRegistrationFlagsArea: function()
	{
		var globalRegistrationCell = document.getElementById("globalRegistrationFlagsCell");
		if (globalRegistrationCell == null)
			alert("Area for Global Flags does not exist!");
		else {
			var htmlStr = "<table width=\"100%\">";
			htmlStr += "<tr>";
			for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
				htmlStr += "<td align=\"left\" valign=\"top\">";
				htmlStr += ageGroups[ageIdx] + ": ";
				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
					htmlStr += "<input type=\"checkbox\" id=\"" + (ageGroups[ageIdx] + genders[genderIdx]) + "\">" + genders[genderIdx];
				}
				htmlStr += "</td>";
			}
			htmlStr += "</tr>";
			htmlStr += "</table>";
			globalRegistrationCell.innerHTML = htmlStr;
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
            // control of checkboxes showing 'tables' to enter athletes (the checkbox for event 'X' is called 'showX').
            var elt = document.getElementById("show" + eventId);
            elt.onclick = (function(currentEventName) { return function() { MeetEventRegistrationHandler.toggleEventTable(currentEventName); } })(eventId);
			// 
			if (meetEvents[eventIdx]["byCategories"]) {
				for (ageGroupIdx = 0; ageGroupIdx <  ageGroups.length; ageGroupIdx++) {
					for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
						var checkboxId = meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx];
						var elt = document.getElementById(checkboxId);
						elt.onclick = (function (eventId, ageGroup, gender) { return function() { MeetEventRegistrationHandler.registeringEvent(eventId, ageGroup, gender, this.checked); } })(eventId, ageGroups[ageGroupIdx], genders[genderIdx]);
						// 
						for (var i = 0; i < meetEvents[eventIdx]["numEntriesPerGender"]; i++) {
							var inputTextId = meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx] + i;
							var elt = document.getElementById(inputTextId);
							elt.ondeactivate = (function (eventId, ageGroup, gender, pos) { return function() { MeetEventRegistrationHandler.updateEntry(eventId, ageGroup, gender, pos, this.value); } })(meetEvents[eventIdx]["id"], ageGroups[ageGroupIdx], genders[genderIdx], i); 
						}
					}
				}
			}
		}
		//
		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
			for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
				var checkboxId = ageGroups[ageIdx] + genders[genderIdx];
				var elt = document.getElementById(checkboxId);
				elt.onclick = (function (ageGroup, gender) { return function() { MeetEventRegistrationHandler.registeringAgeGroupAndGender(ageGroup, gender, this.checked); } })(ageGroups[ageIdx], genders[genderIdx]);
			}
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
            for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
				var cellIdx = ageIdx + 1; // because (0) is the name of the event.
				var regByGender = [];
				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
					if (registeringEvents[eventId][ageGroups[ageIdx]][genders[genderIdx]])
						regByGender[genderIdx] = registration[eventId][ageGroups[ageIdx]][genders[genderIdx]].length;
					else
						regByGender[genderIdx] = -1;
				}
				var allZero = true, allMAX = true, allNotRegistering = true;
				for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
					if (regByGender[genderIdx] != -1) allNotRegistering = false;
					if (regByGender[genderIdx] != 4) allMAX = false;
					if (regByGender[genderIdx] != 0) allZero = false;
				}
				// set style
				if (allNotRegistering) {
					eventRow.cells[cellIdx].setAttribute("class", "completeEvent");
				}
				else if (allMAX) {
					eventRow.cells[cellIdx].setAttribute("class", "completeEvent");
				}
				else if (allZero) {
					eventRow.cells[cellIdx].setAttribute("class", "emptyEvent");
				}
				else {
					eventRow.cells[cellIdx].setAttribute("class", "incompleteEvent");
				}
				// set message
				var str = "";
				if (allNotRegistering) {
					str = "NOT REGISTERING"; 
				}
				else {
					for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
						if (genderIdx > 0) str += ",";
						if (regByGender[genderIdx] == -1) str += "not registering " + genders[genderIdx];
						else str += regByGender[genderIdx] + " " + genders[genderIdx];
					}
				}
				eventRow.cells[cellIdx].innerHTML = str;
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
	
	updateEntry: function(eventId, ageGroup, gender, pos, value)
	{
		// alert("eventId: " + eventId + ", ageGroup: " + ageGroup + ", gender: " + gender + ", pos: " + pos + "==>" + value);
		if (registration[eventId][ageGroup][gender].length <= pos)
			registration[eventId][ageGroup][gender].push(value);
		else
			registration[eventId][ageGroup][gender].splice(pos, 1, value);	
		// alert(registration[eventId][ageGroup][gender]);
		MeetEventRegistrationHandler.fillEventRegistration(eventId);
		MeetEventSummaryHandler.fillEventSummary(eventId);
	},
	
	// Manages the change of status in the registration or not of athletes of a certain category + gender
	registeringAgeGroupAndGender: function(ageGroup, gender, registering)
	{
		// alert("registeringAgeGroupAndGender ==> ageGroup = " + ageGroup + "gender = " + gender + "registering = " + registering);
		for (var eventIdx = 0; eventIdx < meetEvents.length; eventIdx++) {
			var eventId = meetEvents[eventIdx]["id"];
			registeringEvents[eventId][ageGroup][gender] = registering;
			MeetEventRegistrationHandler.fillEventRegistration(eventId);
			MeetEventSummaryHandler.fillEventSummary(eventId);
		}		
	}, 

	// Fills up the global registration flags, using the information of the data structures
	fillGlobalRegistrationFlags: function()
	{
		for (var ageIdx = 0; ageIdx < ageGroups.length; ageIdx++) {
			for (var genderIdx = 0; genderIdx < genders.length; genderIdx++) {
				for (var eventIdx = 0, registering = false; !registering && (eventIdx < meetEvents.length); eventIdx++) {
					var eventId = meetEvents[eventIdx]["id"];
					registering = registeringEvents[eventId][ageGroups[ageIdx]][genders[genderIdx]];
				}
				var eventRegisteringCheckbox = document.getElementById(ageGroups[ageIdx] + genders[genderIdx]);
				eventRegisteringCheckbox.checked = registering;
			}
		}
    }, 
	
	registeringEvent: function(eventId, ageGroup, gender, registering)
	{
		// alert("salut; registering = eventId = " + eventId + ", ageGroup = " + ageGroup + ", gender = " + gender + ", registering? => " + registering);
		registeringEvents[eventId][ageGroup][gender] = registering;
		
		MeetEventRegistrationHandler.fillEventRegistration(eventId);
		MeetEventSummaryHandler.fillEventSummary(eventId);
	},
	
	//
	fillEventRegistration: function(eventId)
	{
		var eventTable = document.getElementById(eventId);
		if (eventTable == null)
			alert("I have no clue what is table for event [" + eventId + "]");
		else {
			var eventIdx = EventsStructures.findEventIdx(eventId);
			if (meetEvents[eventIdx]["byCategories"]) {
				for (ageGroupIdx = 0; ageGroupIdx <  ageGroups.length; ageGroupIdx++) {
					for (genderIdx = 0; genderIdx < genders.length; genderIdx++) {
						var checkboxId = meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx];
						// first, fill the "registering" flag
						var registeringCheckbox = document.getElementById(checkboxId);
						if (registeringCheckbox == null)
							alert("No checkbox with id [" + checkboxId + "]!!");
						else {
							var registering = registeringEvents[eventId][ageGroups[ageGroupIdx]][genders[genderIdx]];
							registeringCheckbox.checked = registering;
							//
							for (var i = 0; i < meetEvents[eventIdx]["numEntriesPerGender"]; i++) {
								var inputTextId = eventId + ageGroups[ageGroupIdx] + genders[genderIdx] + i;
								var inputText = document.getElementById(inputTextId);
								if (registration[eventId][ageGroups[ageGroupIdx]][genders[genderIdx]].length >= i + 1)
									inputText.value = registration[eventId][ageGroups[ageGroupIdx]][genders[genderIdx]][i];
								else
									inputText.value = "";
							}
							// show/hide athletes table
							var registrationTableId = "registration_" + meetEvents[eventIdx]["id"] + ageGroups[ageGroupIdx] + genders[genderIdx];
							var lTable = document.getElementById(registrationTableId);
							if (lTable == null)
								alert("There is no registration table with id [" + registrationTableId + "]");
							else {
								lTable.style.display = (!registering) ? "none" : "table";
							}
						}
					}
				}
			}
		}
		
	},
	
	// shows/hide table of a specific event, to enter athletes
	toggleEventTable: function(eventId) 
	{
		var lTable = document.getElementById(eventId);
		if (lTable == null)
			alert("I have no clue what is table for event [" + eventId + "]");
		else {
			lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
			if (lTable.style.display == "table")
				MeetEventRegistrationHandler.fillEventRegistration(eventId);
		}
	} 

}; 

// Create interface:
Core.start(HTMLGenerator);
// register stuff with 'Core' library:
Core.start(EventHandlers);
Core.start(LocalInfoLoader);
Core.start(MeetEventSummaryHandler);
Core.start(MeetEventRegistrationHandler);


