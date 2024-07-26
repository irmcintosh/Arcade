# MGRS Coordinate Conversion

This repository contains an ArcGIS Arcade script to convert latitude and longitude coordinates to Military Grid Reference System (MGRS) coordinates. The script performs necessary calculations to transform geographic coordinates into UTM (Universal Transverse Mercator) coordinates and then encodes these into MGRS format.

## Table of Contents

- [Overview](#overview)
- [Functions](#functions)
  - [degToRad](#degToRad)
  - [radToDeg](#radToDeg)
  - [getLetterDesignator](#getLetterDesignator)
  - [LLtoUTM](#LLtoUTM)
  - [encode](#encode)
  - [get100kID](#get100kID)
  - [get100kSetForZone](#get100kSetForZone)
  - [getLetter100kID](#getLetter100kID)
  - [LLtoMGRS](#LLtoMGRS)
- [Usage](#usage)
- [Example](#example)
- [License](#license)

## Overview

The script performs the following tasks:
1. Converts latitude and longitude to UTM coordinates.
2. Encodes UTM coordinates into MGRS format.
3. Determines the 100k grid square identifier based on the UTM zone.

The Military Grid Reference System (MGRS) is used by NATO militaries for locating points on the earth. MGRS coordinates are alphanumeric and represent an area on the ground.

## Functions

### degToRad

Converts degrees to radians.

```javascript
function degToRad(deg) {
  return deg * (Pi/180.0)
}
```

### radToDeg

Converts radians to degrees.

```javascript
function radToDeg(rad) {
  return 180.0 * (rad /Pi)
}
```

### getLetterDesignator

Determines the MGRS letter designator for a given latitude.

```javascript
function getLetterDesignator(lat) {
    var LetterDesignator = 'Z'
    // Logic to determine the letter designator based on latitude
    return LetterDesignator
}
```

### LLtoUTM

Converts latitude and longitude to UTM coordinates.

```javascript
function LLtoUTM(lat, lon){
  var Lat = lat
  var Long = lon
  // UTM conversion logic
  return {
    'northing': Number(Floor(UTMNorthing + 0.5)),
    'easting': Number(Floor(UTMEasting + 0.5)),
    'zoneNumber': Number(ZoneNumber),
    'zoneLetter': getLetterDesignator(Lat)
  }
}
```

### encode

Encodes UTM coordinates into MGRS format.

```javascript
function encode(utm, accuracy) {
    var seasting = Text(utm['easting'], "00000")
    var snorthing = Text(utm['northing'], "00000")
    get100kID(utm['easting'], utm['northing'], utm['zoneNumber'])
    return Text(utm['zoneNumber']) + utm['zoneLetter'] + text(get100kID(utm['easting'], utm['northing'], utm['zoneNumber'])) + right(seasting, 5) + right(snorthing, 5)
}
```

### get100kID

Determines the 100k grid square identifier.

```javascript
function get100kID(easting, northing, zoneNumber) {
    var setParm = get100kSetForZone(zoneNumber)
    var setColumn = Floor(easting / 100000)
    var setRow = Floor(northing / 100000) % 20
    return getLetter100kID(setColumn, setRow, setParm)
}
```

### get100kSetForZone

Gets the 100k set parameter for a given UTM zone.

```javascript
function get100kSetForZone(i) {
    var setParm = i % NUM_100K_SETS
    if (setParm == 0) {
        setParm = NUM_100K_SETS
    }
    return setParm
}
```

### getLetter100kID

Gets the 100k grid square letter identifier.

```javascript
function getLetter100kID(column, row, parm) {
    var index = parm - 1
    var colOrigin = ToCodePoint(SET_ORIGIN_COLUMN_LETTERS[index])
    var rowOrigin = ToCodePoint(SET_ORIGIN_ROW_LETTERS[index])
    // Logic to determine the letter identifier
    return FromCodePoint(colInt) + FromCodePoint(rowInt)
}
```

### LLtoMGRS

Main function to convert latitude and longitude to MGRS.

```javascript
function LLtoMGRS(lat, lon){
    var accuracy =  5  // Example accuracy
    return encode(LLtoUTM(lat, lon), accuracy)
}
```

## Usage

To use this script, include it in your ArcGIS Arcade environment and call the `LLtoMGRS` function with the desired latitude and longitude.

```javascript
var lat = 31.2861341  // Example latitude
var lon = -97.8840317  // Example longitude
var mgrs = LLtoMGRS(lat, lon)
Console(mgrs)  // Outputs the MGRS coordinate
```

## Example

The example latitude and longitude coordinates (31.2861341, -97.8840317) will be converted to their corresponding MGRS coordinate.

## License

This code is licensed under the MIT License. See the LICENSE file for more details.
