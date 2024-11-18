# Cartographic Point Measurement and Unit Conversion Arcade Script

## Overview

This repository contains an Arcade script designed to determine **cartographic point measures** and convert **distance units**. The script is intended for use in geographic information systems (GIS) environments, particularly for calculating point-based distances and transforming these values between different units.

## Features

- **Cartographic Point Measurement**: Calculate distance from a specified point along a given geometry.
- **Unit Conversion**: Convert values between units such as meters, feet, miles, kilometers, and nautical miles.
- **Flexible Usage**: Easily customize or extend unit conversions and measurements.

## How It Works

This script performs two main functions:

1. **Unit Conversion Function (`unitConversion`)**:
    - Converts distances between common units of measure, allowing for easy transformation between various cartographic scales.
    - Supported units include:
        - Meters, Feet, Miles, Kilometers, Nautical Miles.

2. **Cartographic Point-Based Measurement**:
    - Calculates distance from a specific point (`$userInput`) along a given feature.
    - Converts the distance into a desired unit (e.g., from feet to miles) and returns a well-formatted result for further analysis or display.

## Supported Unit Conversions

The script includes the following unit conversions:

| Conversion Type           | Factor        |
|---------------------------|---------------|
| Meters to Feet            | 3.28084       |
| Feet to Meters            | 1 / 3.28084   |
| Miles to Kilometers       | 1.60934       |
| Kilometers to Miles       | 1 / 1.60934   |
| Nautical Miles to Kilometers | 1.852     |
| Kilometers to Nautical Miles | 1 / 1.852 |
| Feet to Miles             | 1 / 5280      |
| Miles to Feet             | 5280          |

## Usage

### Unit Conversion

The `unitConversion` function takes the following parameters:
- **`value`**: The numeric value to convert.
- **`unitFrom`**: The source unit of the value.
- **`unitTo`**: The target unit for conversion.

#### Example
```arcade
var convertedValue = unitConversion(1000, "feet", "miles"); 
// This converts 1000 feet to miles.
```

### Point-Based Measurement

If the input is a point (`TypeOf($userInput) == "Point"`), the script calculates the distance from the point to the nearest part of the given feature using `PointToCoordinate`.

#### Example Workflow
- After calculating the distance, the script converts it from feet to miles, rounds it to 12 decimal places, and formats the result:

```arcade
var formattedDistance = Round(unitConversion(result.distanceAlong, 'feet', 'miles'), 12);
return `${formattedDistance}`; // Outputs formatted distance.
```

## Error Handling

- **Unsupported Conversions**: If the user attempts an unsupported conversion, the script returns `"Unsupported conversion: Ensure the units are valid."`.
- **Identical Units**: If the source and target units are identical, the script simply returns the original value with no conversion.

## Customization

- To **add additional units**, simply extend the `conversionFactors` dictionary.
- To **adjust output formats**, modify the `Text` formatting as per your requirements.

## Dependencies

- This script is written in **Arcade**, commonly used in environments like **ArcGIS Online** and **ArcGIS Pro** for dynamic calculations, labeling, and symbology customization.

## Limitations

- The script only works in GIS systems that support Arcade.
- Conversion is limited to the factors defined in the script.

## Example Use Case

If you are a cartographer or GIS analyst needing to present distance information for both **local contexts** (e.g., feet and meters) and **global contexts** (e.g., kilometers and miles), this script will allow you to convert distances dynamically. Whether it is **road distances**, **flight paths**, or **hiking trails**, the script facilitates the easy presentation of this information in formats suitable for diverse audiences.

## Getting Started

1. **Copy and Paste the Code**: Add the code to your desired environment within ArcGIS (e.g., pop-up, label expressions).
2. **Adjust Units and Parameters**: Modify units or the rounding options to match your specific use case.
3. **Deploy and View**: Utilize the script to dynamically display and convert point measurements within your ArcGIS applications.

## Contribution

We welcome contributions that help to expand the scope of the unit conversions or optimize the cartographic point-based calculations. Please feel free to submit a pull request or open an issue for discussion.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.
