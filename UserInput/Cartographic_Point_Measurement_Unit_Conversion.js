function unitConversion(value, unitFrom, unitTo) {
    // Conversion factors map
    var conversionFactors = {
        "meters_feet": 3.28084,
        "feet_meters": 1 / 3.28084,
        "miles_kilometers": 1.60934,
        "kilometers_miles": 1 / 1.60934,
        "nautical_miles_kilometers": 1.852,
        "kilometers_nautical_miles": 1 / 1.852,
        "feet_miles": 1 / 5280,
        "miles_feet": 5280
    };

    // Normalize input to lowercase
    unitFrom = lower(unitFrom);
    unitTo = lower(unitTo);

    // Check if the units are the same
    if (unitFrom == unitTo) {
        return value; // No conversion needed
    }

    // Construct the key for conversion
    var key = `${unitFrom}_${unitTo}`;

    // Perform conversion if key exists
    if (HasKey(conversionFactors, key)) {
        return value * conversionFactors[key];
    }

    // If no valid conversion is found, throw an error
    return "Unsupported conversion: Ensure the units are valid.";
}

// Main block for point-based measurement
var result;

if (TypeOf($userInput) == "Point") {
    result = PointToCoordinate(Geometry($feature), $userInput);
}

// Safely perform conversion and rounding
if (!IsEmpty(result)) {
    var convertedDistance = Round(unitConversion(result.distanceAlong, 'feet', 'miles'), 12);
    var formattedDistance = Text(convertedDistance, '#,###.00');
    return `${formattedDistance}`;
} else {
    return `result`;
}
