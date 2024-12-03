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
    // Convert the measure (M value) from meters to feet
    var measureInFeet = Round(result.coordinate.M, 6);
    
    // Convert the measure from feet to miles
    var measureInMiles = Round(measureInFeet / 5280, 6);
    
    // Return the measure in both feet and miles
    return measureInMiles
}

// If no measure could be calculated, return a fallback value
return -999;
