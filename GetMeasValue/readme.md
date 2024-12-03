# LRS Measure Calculation Script

This repository contains an ArcGIS Arcade script for calculating linear reference system (LRS) measures along a route. The script retrieves the nearest route geometry to a given input feature, calculates the measure in meters, converts it to feet, and finally to miles. If no route or measure is found, a fallback value is returned.

---

## Features
- **Identify Nearest Route**: The script identifies the nearest route geometry to the input feature within a specified buffer distance.
- **Measure Calculation**: Calculates the measure (M value) along the identified route.
- **Unit Conversion**: Converts the measure:
  - From feet to miles.
- **Fallback Handling**: Returns `-999` if no route or measure can be calculated.

---

## Usage

### Pre-requisites
- **ArcGIS Environment**: This script is designed to be used in an ArcGIS environment (e.g., Attribute Rules, Popups, Calculated Fields).
- **Data Source**: Ensure the feature layer `Public_Roads_In_CreateRoutes_Subset` exists in your datastore.

### Script Overview
Copy and paste the script into an Arcade editor in your ArcGIS application.

```javascript
// Reference the LRS feature set
var lrs = FeatureSetByName($datastore, "Public_Roads_In_CreateRoutes_Subset");

// Find the LRS route intersecting or nearest to the input point
var nearestRoute = First(Intersects(lrs, Buffer($feature, 2))); // Adjust buffer distance if necessary

// Check if a route was found
if (IsEmpty(nearestRoute)) {
    return -999; // Return a fallback value if no route is found
}

// Get the geometry of the nearest route
var routeGeom = Geometry(nearestRoute);

// Calculate the measure for the input point along this route
var result = PointToCoordinate(routeGeom, $feature);

// Check if the calculation returned a valid measure
if (!IsEmpty(result)) {
    // Gets the measure value with current measure unit
    var measureInFeet = Round(result.coordinate.M, 6);
    
    // Convert the measure from feet to miles
    var measureInMiles = Round(measureInFeet / 5280, 6);
    
    // Return the measure in miles
    return measureInMiles;
}

// If no measure could be calculated, return a fallback value
return -999;
```

---

## Script Details

### Variables
- **`lrs`**: References the `Public_Roads_In_CreateRoutes_Subset` feature set.
- **`nearestRoute`**: Identifies the nearest route geometry to the input feature using a spatial query with a 2-meter buffer.
- **`routeGeom`**: Retrieves the geometry of the identified route.
- **`result`**: Stores the output of the `PointToCoordinate` function, which calculates the measure.

### Conversion Functions
- **Feet to Miles**:
  ```javascript
  var measureInMiles = Round(measureInFeet / 5280, 6);
  ```

---

## Output
- **Measure in Miles**: Returns the measure value in miles, rounded to six decimal places.
- **Fallback Value**: Returns `-999` if no valid measure is found.

---

## Customization
- **Buffer Distance**: Adjust the buffer distance in the following line to fine-tune spatial queries:
  ```javascript
  var nearestRoute = First(Intersects(lrs, Buffer($feature, 2)));
  ```
- **Fallback Value**: Modify the fallback value (`-999`) to suit your needs.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contributions
Contributions are welcome! Please fork the repository and create a pull request for any improvements or bug fixes.
