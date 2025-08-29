// --- User Input Section (could be fields or constants) ---
var startDate = Date(2025, 7, 20, 0, 0, 0);   // Jan 1, 2025, 00:00
var endDate   = Date(2025, 7, 31, 23, 59, 59); // Dec 31, 2025, 23:59

// Or replace with fields if you have them:
// var startDate = $feature.StartDateField;
// var endDate   = $feature.EndDateField;

// --- Random Date/Time Calculation ---
var diffMillis = DateDiff(endDate, startDate, "milliseconds"); 
var randMillis = Round(Random() * diffMillis); 
var randomDate = DateAdd(startDate, randMillis, "milliseconds");

// --- Return Result ---
return randomDate;
