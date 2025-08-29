# Arcade Random Date/Time Generator

Generate a **random date/time** within a user-defined range using **ArcGIS Arcade**.  
This snippet can be used in pop-ups, symbology, field calculations, and attribute rules.

---

## Example Expression

```js
// --- User Input Section (could be fields or constants) ---
var startDate = Date(2025, 7, 20, 0, 0, 0);   // July 20, 2025, 00:00
var endDate   = Date(2025, 7, 31, 23, 59, 59); // July 31, 2025, 23:59

// Or replace with fields if you have them:
// var startDate = $feature.StartDateField;
// var endDate   = $feature.EndDateField;

// --- Random Date/Time Calculation ---
var diffMillis = DateDiff(endDate, startDate, "milliseconds"); 
var randMillis = Round(Random() * diffMillis); 
var randomDate = DateAdd(startDate, randMillis, "milliseconds");

// --- Return Result ---
return randomDate;

# Notes & Gotchas

A few important details when working with random date/time values in Arcade:

---js

## Dynamic vs Fixed Behavior
- **Dynamic (Pop-ups, Symbology, Dashboards)**  
  Every evaluation generates a new random date. The value is not stored anywhere — it’s recomputed each time the expression runs.  

- **Fixed (Field Calculations, Attribute Rules)**  
  When used in a field calculation or attribute rule, the random date is written into the field and persists.  
  - Field Calculation: one-time assignment per run.  
  - Attribute Rule: auto-assigns at insert (or update) according to the rule.  

---

## Time Zones
- Arcade `Date` values are stored in **UTC**.  
- ArcGIS clients (Pro, Online, Field Maps, Dashboards) typically auto-localize when displaying.  
- If you want to explicitly localize in an expression (e.g. popup):  
  ```arcade
  ToLocal(randomDate)
