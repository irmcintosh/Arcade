// --- Enhanced Arcade Code for Calculating Arc Radius ---

// Validate that the feature has geometry and at least one path
if (IsEmpty($feature) || IsEmpty(Geometry($feature).paths)) {
    return null;
}

// Use the last path (assumed to be the arc of interest)
var paths = Geometry($feature).paths;
var lastPathIndex = Count(paths) - 1;
var arcPath = paths[lastPathIndex];

// Ensure there are at least two vertices to form a chord
if (Count(arcPath) < 2) {
    return null;
}

// Get the start (A) and end (B) points of the arc (defining the chord)
var startCoords = First(arcPath);
var endCoords = Back(arcPath);

// Construct point objects for A and B
var A = Point({ "x": startCoords.x, "y": startCoords.y, "spatialReference": { "wkid": 6318 }});
var B = Point({ "x": endCoords.x, "y": endCoords.y, "spatialReference": { "wkid": 6318 }});

// Calculate chord length (d)
var chordLength = Distance(A, B);

// Prevent division by zero if chord length is zero
if (chordLength == 0) {
    return null;
}

// Helper function to calculate perpendicular distance from a point P to line AB
function perpendicularDistance(P, A, B, chordLength) {
    // Formula: |(B.x-A.x)*(A.y-P.y) - (A.x-P.x)*(B.y-A.y)| / chordLength
    return Abs((B.x - A.x) * (A.y - P.y) - (A.x - P.x) * (B.y - A.y)) / chordLength;
}

// Initialize maximum perpendicular distance (this will be our arc height, h)
var maxPerpDistance = 0;

// Loop through each vertex in the arc path to find the maximum perpendicular distance from the chord
for (var i = 0; i < Count(arcPath); i++) {
    var ptCoords = arcPath[i];
    var pt = Point({ "x": ptCoords.x, "y": ptCoords.y, "spatialReference": { "wkid": 6318 }});
    var perpDist = perpendicularDistance(pt, A, B, chordLength);
    if (perpDist > maxPerpDistance) {
        maxPerpDistance = perpDist;
    }
}

// Ensure the maximum perpendicular distance is not zero
if (maxPerpDistance == 0) {
    return null;
}

// Use maxPerpDistance as the chord height (h)
var h = maxPerpDistance;

// Calculate the radius using the formula: r = d^2/(8*h) + h/2
var r = (Pow(chordLength, 2) / (8 * h)) + (h / 2);

// Return the calculated radius
return r;
