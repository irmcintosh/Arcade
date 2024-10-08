# MGRS Coordinate Conversion

This repository contains an ArcGIS Arcade script to convert latitude and longitude coordinates to Military Grid Reference System (MGRS) coordinates. The script performs necessary calculations to transform geographic coordinates into UTM (Universal Transverse Mercator) coordinates and then encodes these into MGRS format.

## Table of Contents

- [Overview](#overview)
- [Functions](#functions)
  - [MetersToLatLon](#meterstolatlon)
  - [degToRad](#degtorad)
  - [radToDeg](#radtodeg)
  - [getLetterDesignator](#getletterdesignator)
  - [getZoneNumber](#getzonenumber)
  - [LLtoUTM](#lltoutm)
  - [get100kID](#get100kid)
  - [getLetter100kID](#getletter100kid)
  - [encode](#encode)
  - [main](#main)
- [Usage](#usage)
- [Example](#example)
- [License](#license)

## Overview

The script performs the following tasks:
1. Converts coordinates from meters to latitude and longitude.
2. Determines the UTM zone number.
3. Converts latitude and longitude to UTM coordinates.
4. Determines the 100k grid square identifier based on the UTM zone.
5. Encodes UTM coordinates into MGRS format.

The Military Grid Reference System (MGRS) is used by NATO militaries for locating points on the earth. MGRS coordinates are alphanumeric and represent an area on the ground.

## Functions

### MetersToLatLon

Converts coordinates from meters to latitude and longitude.

```javascript
function MetersToLatLon(x, y) {
    var originShift = 2.0 * PI * 6378137.0 / 2.0;

    var lon = (x / originShift) * 180.0;
    var lat = (y / originShift) * 180.0;

    lat = 180.0 / PI * (2.0 * Atan(Exp(lat * PI / 180.0)) - PI / 2.0);
    return {'lat': lat, 'lon': lon}
}
```

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
    var LetterDesignator = 'Z';
    var lookupTable = [
        { min: 84, max: 72, value: 'X' },
        { min: 72, max: 64, value: 'W' },
        { min: 64, max: 56, value: 'V' },
        { min: 56, max: 48, value: 'U' },
        { min: 48, max: 40, value: 'T' },
        { min: 40, max: 32, value: 'S' },
        { min: 32, max: 24, value: 'R' },
        { min: 24, max: 16, value: 'Q' },
        { min: 16, max: 8, value: 'P' },
        { min: 8, max: 0, value: 'N' },
        { min: 0, max: -8, value: 'M' },
        { min: -8, max: -16, value: 'L' },
        { min: -16, max: -24, value: 'K' },
        { min: -24, max: -32, value: 'J' },
        { min: -32, max: -40, value: 'H' },
        { min: -40, max: -48, value: 'G' },
        { min: -48, max: -56, value: 'F' },
        { min: -56, max: -64, value: 'E' },
        { min: -64, max: -72, value: 'D' },
        { min: -72, max: -80, value: 'C' }
    ];

    for (var i = 0; i < Count(lookupTable); i++) {
        if (lat >= lookupTable[i].max && lat < lookupTable[i].min) {
            LetterDesignator = lookupTable[i].value;
            break;
        }
    }

    return LetterDesignator;
}
```

### getZoneNumber

Determines the UTM zone number based on latitude and longitude.

```javascript
function getZoneNumber(Lat, Long) {
    var ZoneNumber = Floor((Long + 180) / 6) + 1

    if (Long == 180) {ZoneNumber = 60}
  
    if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {ZoneNumber = 32}
  
    if (Lat >= 72.0 && Lat < 84.0 ) {
      if (Long >= 0.0 && Long < 9.0) {
              ZoneNumber = 31
          } else if (Long >= 9.0 && Long < 21.0) {
              ZoneNumber = 33
          } else if (Long >= 21.0 && Long < 33.0) {
              ZoneNumber = 35
          } else if (Long >= 33.0 && Long < 42.0) {
              ZoneNumber = 37
          }
    }
    return ZoneNumber
}
```

### LLtoUTM

Converts latitude and longitude to UTM coordinates.

```javascript
function LLtoUTM(Lat, Long, ZoneNumber){
    var a = 6378137.0
    var eccSquared = 0.00669438
    var k0 = 0.9996

    var LatRad = degToRad(Lat)
    var LongRad = degToRad(Long)

    var LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3
    var LongOriginRad = degToRad(LongOrigin)
    var eccPrimeSquared = (eccSquared) / (1 - eccSquared)

    var N = a / sqrt(1 - eccSquared * sin(LatRad) * sin(LatRad))
    var T = tan(LatRad) * tan(LatRad)
    var C = eccPrimeSquared * cos(LatRad) * cos(LatRad)
    var A_ = cos(LatRad) * (LongRad - LongOriginRad)

    var M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (
                3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * sin(
                2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * sin(
                4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * sin(6 * LatRad))
  
    var UTMEasting = (k0 * N * (A_ + (1 - T + C) * A_ * A_ * A_ / 6.0 + (
                    5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A_ * A_ * A_ * A_ * A_ / 120.0) + 500000.0)

    var  UTMNorthing = (k0 * (M + N * tan(LatRad) * (A_ * A_ / 2 + (5 - T + 9 * C + 4 * C * C) * A_ * A_ * A_ * A_ / 24.0 + (
        61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A_ * A_ * A_ * A_ * A_ * A_ / 720.0)))

    if (Lat < 0.0) {UTMNorthing += 10000000.0}
    
    var utm = {'northing': Number(Floor(UTMNorthing + 0.5)), 'easting': Number(Floor(UTMEasting + 0.5))}
    return utm;
}
```

### get100kID

Determines the 100k grid square identifier.

```javascript
function get100kID(easting, northing, zoneNumber) {
    var setParm = zoneNumber % NUM_100K_SETS
    if (setParm == 0) {
        setParm = NUM_100K_SETS
    }
    var setColumn = Floor(easting / 100000)
    var setRow = Floor(northing / 100000) % 20
    return {'col': setColumn, 'row': setRow, 'parm': setParm}
}
``

`

### getLetter100kID

Gets the 100k grid square letter identifier.

```javascript
function getLetter100kID(column, row, parm) {
    var index = parm - 1
    var colOrigin = ToCodePoint(SET_ORIGIN_COLUMN_LETTERS[index])
    var rowOrigin = ToCodePoint(SET_ORIGIN_ROW_LETTERS[index])

    var colInt = colOrigin + column - 1
    var rowInt = rowOrigin + row
    var rollover = False
    Console(colOrigin)
    if (colInt > Z) {
        colInt = colInt - Z + A - 1
        rollover = True
    }

    if (colInt == I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
        colInt += 1
    }

    if (colInt == O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
        colInt += 1
    }

    if (colInt == I) {
        colInt += 1
    }

    if (colInt > Z) {
        colInt = colInt - Z + A - 1
    }

    if (rowInt > V) {
        rowInt = rowInt - V + A - 1
        rollover = True
    } else {
        rollover = False
    }

    if ((rowInt == I || (rowOrigin < I && rowInt > I)) || ((rowInt > I || rowOrigin < I) && rollover)) {
        rowInt += 1
    }

    if ((rowInt == O || (rowOrigin < O && rowInt > O)) || ((rowInt > O || rowOrigin < O) && rollover)) {
        rowInt += 1
    }

    if (rowInt > V) {
        rowInt = rowInt - V + A - 1
    }

    return FromCodePoint(colInt) + FromCodePoint(rowInt)
}
```

### encode

Encodes UTM coordinates into MGRS format.

```javascript
function encode(utm, zoneNumber, zoneLetter, kID) {
    var strEasting = Text(utm['easting'], "00000")
    var strNorthing = Text(utm['northing'], "00000")
    var encodedmgrs = Text(zoneNumber) + zoneLetter + Text(kID) + " " + right(strEasting, 5) + " " + right(strNorthing, 5)
    return encodedmgrs
}
```

### main

Main function to convert coordinates to MGRS.

```javascript
function main() {
    var coords = MetersToLatLon(Geometry($feature).X, Geometry($feature).Y)
    var zoneNumber = getZoneNumber(coords['lat'], coords['lon'])
    var zoneLetter = getLetterDesignator(coords['lat'])
    var utm = LLtoUTM(coords['lat'], coords['lon'], zoneNumber)
    var returns = get100kID(utm['easting'], utm['northing'], zoneNumber)
    var lkID = getLetter100kID(returns['col'], returns['row'], returns['parm'])
    var mgrs = encode(utm, zoneNumber, zoneLetter, lkID)
    return mgrs
}
```

## Usage

To use this script, include it in your ArcGIS Arcade environment and call the `main` function, which processes the geometry of the feature and returns the MGRS coordinate.

## Example

The `main` function will convert the coordinates of the feature to their corresponding MGRS coordinate.

## License

This code is licensed under the MIT License. See the LICENSE file for more details.
