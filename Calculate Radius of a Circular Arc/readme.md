# Arcade Script to Calculate Radius of a Circular Arc

This repository contains an **Arcade** script designed to calculate the radius of a circular arc based on the geometric properties of a polyline. The script takes as input the geometry of an arc, determines the chord length, the arc midpoint, and the perpendicular height from the chord to the arc (sagitta), and then computes the radius using these values.

## Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [Usage](#usage)
- [Formula Used](#formula-used)
- [Arcade Code](#arcade-code)
- [License](#license)

## Overview

This Arcade script is used within an ArcGIS environment (such as ArcGIS Online or ArcGIS Pro) to calculate the radius of an arc or circular segment. It can be applied in scenarios where geometric relationships need to be analyzed or visualized dynamically.

## How It Works

The script performs the following steps:
1. Extracts the **start** and **end points** of the arc from the geometry.
2. Computes the **chord length**, which is the straight-line distance between the start and end points.
3. Finds the **midpoint of the arc** by selecting the middle vertex of the arc.
4. Calculates the **midpoint of the chord** (line between the start and end points).
5. Determines the **chord height** (also known as the sagitta), which is the perpendicular distance from the chord midpoint to the arc midpoint.
6. Uses a geometric formula to compute the **radius** based on the chord length and height.

## Usage

To use this script in your ArcGIS environment:

1. Open your web map or ArcGIS Pro project.
2. Select the layer that contains the arc geometry (polylines).
3. Add this Arcade expression to a new **Calculated Field**, **Pop-Up**, or **Label**.
4. Ensure that the geometry type is a circular arc or similar polyline.

This script assumes that your data includes valid arc geometries with identifiable start, end, and midpoints.

## Formula Used

The script uses the following formula to calculate the radius of the arc:

\[
R = \frac{C^2}{8h} + \frac{h}{2}
\]

Where:
- \(R\) is the radius of the circular arc.
- \(C\) is the chord length (distance between the start and end points).
- \(h\) is the chord height (sagitta, the perpendicular distance from the midpoint of the chord to the arc).

## Arcade Code

```javascript
// Get the Start Point of the feature
var BpointX = First(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).x;
var BpointY = First(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).y;
var BpointJSON = { "x": BpointX, "y": BpointY, "spatialReference": { "wkid": 6318 }};
var pointA = Point(BpointJSON);
 
// Get the end point of the feature
var EpointX = Back(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).x;
var EpointY = Back(Geometry($feature).paths[Count(Geometry($feature).paths)-1]).y;
var EpointJSON = { "x": EpointX, "y": EpointY, "spatialReference": { "wkid": 6318 }};
var pointB = Point(EpointJSON);
 
// Calculate the chord length
var chordLength = Distance(pointA, pointB);
 
// Calculate the mid coordinate for the arc
var pathHalf = Floor(Count(Geometry($feature).paths[Count(Geometry($feature).paths)-1])/2);
 
var ArcPointX = Geometry($feature).paths[Count(Geometry($feature).paths)-1][pathHalf].x;
var ArcPointY = Geometry($feature).paths[Count(Geometry($feature).paths)-1][pathHalf].y;
var ArcPointJSON = { "x": ArcPointX, "y": ArcPointY, "spatialReference": { "wkid": 6318 }};
var ArcPoint = Point(ArcPointJSON);
 
// Calculate the midpoint of the chord
var MpointX = (BpointX + EpointX) / 2;
var MpointY = (BpointY + EpointY) / 2;
var MpointJSON = { "x": MpointX, "y": MpointY, "spatialReference": { "wkid": 6318 }};
var Mpoint = Point(MpointJSON);
 
// Calculate chord height
var chordHeight = Distance(Mpoint, ArcPoint);
 
// Ensure chordHeight is not zero
if (chordHeight == 0) {
    return null; // Prevent division by zero
}
 
// r = d^2/8h + h/2
return ((chordLength * chordLength) / (8 * chordHeight) + chordHeight / 2);