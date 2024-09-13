// Get the Start Point of the feature
var BpointX = First(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).x
var BpointY = First(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).y
var BpointJSON = { "x": BpointX, "y": BpointY, "spatialReference": { "wkid": 6318 }};
var pointA = Point(BpointJSON)
 
// Get the end point of the feature
var EpointX = Back(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).x
var EpointY = Back(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).y
var EpointJSON = { "x": EpointX, "y": EpointY, "spatialReference": { "wkid": 6318 }};
var pointB = Point(EpointJSON)
 
// Calculate the chord length
var chordLength =  Distance(pointA, pointB)
 
// Calculate the mid coordinate for the arc
var pathHalf = Floor(Count(Geometry($feature).paths[Count(Geometry($feature).paths)-1])/2)
 
var ArcPointX = Geometry($feature).paths[Count(Geometry($feature).paths)-1][pathHalf].x
var ArcPointY = Geometry($feature).paths[Count(Geometry($feature).paths)-1][pathHalf].y
var ArcPointJSON = { "x": ArcPointX, "y": ArcPointY, "spatialReference": { "wkid": 6318 }};
var ArcPoint = Point(ArcPointJSON)
 
// Calculate the midpoint of the chord
var MpointX = (BpointX + EpointX) / 2;
var MpointY = (BpointY + EpointY) / 2;
var MpointJSON = { "x": MpointX, "y": MpointY, "spatialReference": { "wkid": 6318 }};
var Mpoint = Point(MpointJSON)
 
// Calculate chord height
var chordHeight = Distance(Mpoint, ArcPoint)
 
// Ensure chordHeight is not zero
if (chordHeight == 0) {
    return null; // Prevent division by zero
}
 
// r = d^2/8h + h/2
return ((chordLength * chordLength) / (8 * chordHeight) + chordHeight / 2)
