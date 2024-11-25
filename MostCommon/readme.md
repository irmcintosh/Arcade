# Calculate Most Common

This repository contains an ArcGIS Arcade script designed to identify the most common occurrences of features based on their spatial relationships. The script uses features from two data sources, calculates the spatial relationships, and counts the occurrences for each feature. 

## Features

- **Spatial Analysis**: Uses spatial relationships to calculate intersections or containment.
- **Feature Counting**: Counts occurrences of specific attributes from one dataset within the geometries of another.
- **Customizable**: Replace IDs and dataset URLs to adapt to your data.

## How It Works

The script:

1. Fetches two datasets (referred to as `DatasetA` and `DatasetB`).
2. Iterates through the vertices of the geometry in `DatasetA`.
3. Determines whether each vertex intersects with any feature in `DatasetB`.
4. Counts occurrences of a specific attribute (`AttributeX`) from `DatasetB` whenever a spatial relationship exists.

### Prerequisites

- Access to the ArcGIS Portal where your datasets are hosted.
- Two datasets:
  - `DatasetA`: A dataset with a geometry used for spatial analysis.
  - `DatasetB`: A dataset with an attribute (`AttributeX`) to count occurrences.

### Code

```arcade
var portal = Portal("https://arcgis.com");
var datasetA = FeatureSetByPortalItem(portal, "DatasetA_ID", 5);
var datasetB = FeatureSetByPortalItem(portal, "DatasetB_ID", 5, ['AttributeX']);

var pathLength = Count(Geometry(First(datasetA)).paths[0]);
var vertices = First(Geometry(First(datasetA)).paths);
var attributeCounts = {};
for (var i in vertices) {
    var vertex = vertices[i];
    var spatialRef = vertex.spatialReference['wkid'];
    var point = Point({x: vertex.x, 
                       y: vertex.y, 
                       spatialReference: { wkid: spatialRef }});
    var relatedFeature = Within(point, datasetB);
    
    if (HasKey(attributeCounts, First(relatedFeature)['AttributeX'])) {
        attributeCounts[First(relatedFeature)['AttributeX']] += 1;
    } else {
        attributeCounts[First(relatedFeature)['AttributeX']] = 1;
    }
}
console(attributeCounts);
return attributeCounts;
```

### Replace the following placeholders:

- `DatasetA_ID`: The ID of the first dataset.
- `DatasetB_ID`: The ID of the second dataset.
- `AttributeX`: The attribute to count in `DatasetB`.

### Output

The script returns a dictionary (`attributeCounts`) where the keys are unique values of `AttributeX` from `DatasetB`, and the values are the number of times each attribute occurs within the geometry of `DatasetA`.

### Example Usage

This script can be used in scenarios such as:

- Counting the most common types of incidents within a specified route.
- Analyzing intersections of a polyline with another dataset.
- Summarizing spatial relationships for geospatial datasets.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
