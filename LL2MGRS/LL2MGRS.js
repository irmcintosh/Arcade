var NUM_100K_SETS = 6
var SET_ORIGIN_COLUMN_LETTERS = ['A','J','S','A','J','S']
var SET_ORIGIN_ROW_LETTERS = ['A','F','A','F','A','F']

var A = 65  //# A
var I = 73  //# I
var O = 79  //# O
var V = 86  //# V
var Z = 90  //# Z

function degToRad(deg) {
  return deg * (Pi/180.0)
}

function radToDeg(rad) {
  return 180.0 * (rad /Pi)
}

function getLetterDesignator(lat) {
    var LetterDesignator = 'Z'

    if (84 >= lat && lat >= 72) {
        LetterDesignator = 'X'
    } else if (72 > lat && lat >= 64) {
        LetterDesignator = 'W'
    } else if (64 > lat && lat >= 56) {
        LetterDesignator = 'V'
    } else if (56 > lat && lat >= 48) {
        LetterDesignator = 'U'
    } else if (48 > lat && lat >= 40) {
        LetterDesignator = 'T'
    } else if (40 > lat && lat >= 32) {
        LetterDesignator = 'S'
    } else if (32 > lat && lat >= 24) {
        LetterDesignator = 'R'
    } else if (24 > lat && lat >= 16) {
        LetterDesignator = 'Q'
    } else if (16 > lat && lat >= 8) {
        LetterDesignator = 'P'
    } else if (8 > lat && lat >= 0) {
        LetterDesignator = 'N'
    } else if (0 > lat && lat >= -8) {
        LetterDesignator = 'M'
    } else if (-8 > lat && lat >= -16) {
        LetterDesignator = 'L'
    } else if (-16 > lat && lat >= -24) {
        LetterDesignator = 'K'
    } else if (-24 > lat && lat >= -32) {
        LetterDesignator = 'J'
    } else if (-32 > lat && lat >= -40) {
        LetterDesignator = 'H'
    } else if (-40 > lat && lat >= -48) {
        LetterDesignator = 'G'
    } else if (-48 > lat && lat >= -56) {
        LetterDesignator = 'F'
    } else if (-56 > lat && lat >= -64) {
        LetterDesignator = 'E'
    } else if (-64 > lat && lat >= -72) {
        LetterDesignator = 'D'
    } else if (-72 > lat && lat >= -80) {
        LetterDesignator = 'C'
    }

    return LetterDesignator
}

function LLtoUTM(lat,lon){
  var Lat = lat
  var Long = lon
  var a = 6378137.0
  var eccSquared = 0.00669438
  var k0 = 0.9996

  var LatRad = degToRad(Lat)
  var LongRad = degToRad(Long)

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
  
  return {'northing': Number(Floor(UTMNorthing + 0.5)), 'easting': Number(Floor(UTMEasting + 0.5)),
            'zoneNumber': Number(ZoneNumber), 'zoneLetter': getLetterDesignator(Lat)}
}

function encode(utm, accuracy) {
    var seasting = Text(utm['easting'], "00000")
    var snorthing = Text(utm['northing'], "00000")
    get100kID(utm['easting'], utm['northing'], utm['zoneNumber'])
    return Text(utm['zoneNumber']) + utm['zoneLetter']+ text(
        get100kID(utm['easting'], utm['northing'], utm['zoneNumber'])) + right(seasting, 5) + right(snorthing, 5)
}

function get100kID(easting, northing, zoneNumber) {
    var setParm = get100kSetForZone(zoneNumber)
    Console(setParm)
    var setColumn = Floor(easting / 100000)
    var setRow = Floor(northing / 100000) % 20
    return getLetter100kID(setColumn, setRow, setParm)
}

function get100kSetForZone(i) {
    var setParm = i % NUM_100K_SETS
    if (setParm == 0) {
        setParm = NUM_100K_SETS
    }
    return setParm
}

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

function LLtoMGRS(lat, lon){
	var accuracy =  5  // Example accuracy
    return encode(LLtoUTM(lat, lon), accuracy)
}

var lat = 31.2861341  // Example latitude
var lon = -97.8840317  // Example longitude
var mgrs = LLtoMGRS(lat, lon)
mgrs
