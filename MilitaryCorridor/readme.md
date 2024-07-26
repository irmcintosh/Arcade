# Military Corridor

This project utilizes Arcade scripting language within the ArcGIS environment to perform spatial analysis and update a field in a feature class. The script calculates a mid-coordinate point for a given feature, creates buffer zones, and intersects these buffers with another feature class to classify the feature based on the intersection.

## Code Explanation

### Script Breakdown

1. **Feature Set Initialization:**
   ```javascript
   var coo = FeatureSetByName($datastore, "COO");
   ```
   This line initializes a feature set named `coo` from the datastore, which is used for intersection operations later in the script.

2. **Calculate Mid-Coordinate:**
   ```javascript
   var pathHalf = Count(Geometry($feature).paths[Count(Geometry($feature).paths)-1])/2;

   var ArcPointX = Geometry($feature).paths[Count(Geometry($feature).paths)-1][Round(pathHalf)].x;
   var ArcPointY = Geometry($feature).paths[Count(Geometry($feature).paths)-1][Round(pathHalf)].y;
   var ArcPointJSON = { "x": ArcPointX, "y": ArcPointY, "spatialReference": { "wkid": 32614 }};
   var Mpoint = Point(ArcPointJSON);
   ```
   These lines calculate the mid-point of the last path in the feature geometry and create a point geometry at that mid-point.

3. **Buffer and Intersection Operations:**
   ```javascript
   var myArray = [500, 1500, 3000];
   for (var i in myArray) {
       var buff = Buffer(Mpoint, myArray[i], 'meters');
       var intersect = First(Intersects(buff, coo));
       if (IsEmpty(intersect)) {
           continue;
       } else {
           if (myArray[i] == 500) {
               return 'CO';
               break;
           }
           if (myArray[i] == 1500) {
               return 'BTN';
               break;
           }
           if (myArray[i] == 3000) {
               return 'BDE';
               break;
           }
       }
   }
   ```
   This part of the script creates buffers of 500, 1500, and 3000 meters around the mid-point and checks for intersections with the `coo` feature set. Based on the intersection distance, it returns a classification ('CO', 'BTN', or 'BDE').

### Field Calculation in ArcGIS

The script is then utilized within an ArcGIS Python script to calculate and update a field in a feature class:

```python
arcpy.management.CalculateField(
    in_table="MC",
    field="MC",
    expression="""
    // Arcade code here
    """,
    expression_type="ARCADE",
    code_block="",
    field_type="TEXT",
    enforce_domains="NO_ENFORCE_DOMAINS"
)
```
This ArcPy function call uses the Arcade script to update the `MC` field in the `MC` feature class based on the buffer intersection logic.

### Usage

To use this script within your ArcGIS environment:

1. Ensure that the `COO` feature set is available in your datastore.
2. Copy the Arcade script into the `expression` parameter of the `CalculateField` function.
3. Run the script to classify features in the `MC` feature class based on the specified buffer intersections.

## Conclusion

This Arcade script project demonstrates how to perform spatial analysis using buffer zones and intersections to classify features within ArcGIS. The script is embedded within an ArcPy `CalculateField` function to automate the classification process in a feature class.

For further customization and enhancement, modify the buffer distances and classification logic as per your spatial analysis requirements.
