// Store the feature’s geometry for reuse
var geom = Geometry($feature);
var paths = geom.paths;
var lastPath = paths[Count(paths) - 1]; // Use the last path if there are multiple

// Get the start point (first vertex) and end point (last vertex) of the chord
var start = lastPath[0];
var end = lastPath[Count(lastPath) - 1];

var pointA = Point({ "x": start.x, "y": start.y, "spatialReference": { "wkid": 6318 }});
var pointB = Point({ "x": end.x, "y": end.y, "spatialReference": { "wkid": 6318 }});

// Calculate the chord length
var chordLength = Distance(pointA, pointB);

// Determine the arc point using the vertex in the middle of the lastPath array
var midIndex = Floor(Count(lastPath) / 2);
var arcCoord = lastPath[midIndex];
var ArcPoint = Point({ "x": arcCoord.x, "y": arcCoord.y, "spatialReference": { "wkid": 6318 }});

// Compute the projection of ArcPoint onto the chord line defined by pointA and pointB
// First, get the vector components of the chord.
var dx = end.x - start.x;
var dy = end.y - start.y;

// Calculate the parameter t for the projection (dot product over the chord length squared)
var t = ((ArcPoint.x - start.x) * dx + (ArcPoint.y - start.y) * dy) / (chordLength * chordLength);

// Compute the coordinates of the projection point on the chord
var projX = start.x + t * dx;
var projY = start.y + t * dy;
var projection = Point({ "x": projX, "y": projY, "spatialReference": { "wkid": 6318 }});

// Now, chord height is defined as the perpendicular distance from the ArcPoint to the chord line
var chordHeight = Distance(ArcPoint, projection);

// Prevent division by zero in case chordHeight is 0
if (chordHeight == 0) {
    return null;
}

// Use the formula to calculate the circle’s radius given the chord length (d) and chord height (h):
//    r = (d^2) / (8 * h) + h / 2
var cRadius = ((chordLength * chordLength) / (8 * chordHeight)) + (chordHeight / 2);

return cRadius;
