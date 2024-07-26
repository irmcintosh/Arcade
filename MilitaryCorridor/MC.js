var coo =FeatureSetByName($datastore, "COO")
// Calculate the mid coordinate for the arc
var pathHalf = Count(Geometry($feature).paths[Count(Geometry($feature).paths)-1])/2


var ArcPointX = Geometry($feature).paths[Count(Geometry($feature).paths)-1][Round(pathHalf)].x
var ArcPointY = Geometry($feature).paths[Count(Geometry($feature).paths)-1][Round(pathHalf)].y
var ArcPointJSON = { "x": ArcPointX, "y": ArcPointY, "spatialReference": { "wkid": 32614 }};
var Mpoint = Point(ArcPointJSON)

var myArray = [500, 1500, 3000];
for (var i in myArray) {
    var buff = Buffer(Mpoint, myArray[i], 'meters')
    var intersect = First(Intersects(buff, coo))
    if (IsEmpty(intersect)) {
        continue}
    else{
         if (myArray[i] == 500) {
             return 'CO' 
             break}
         if (myArray[i] == 1500) {
             return 'BTN' 
             break}
         if (myArray[i] == 3000) {
             return 'BDE' 
             break}
}
};
   
   
arcpy.management.CalculateField(
    in_table="MC",
    field="MC",
    expression="""var coo =FeatureSetByName($datastore, "COO")
// Calculate the mid coordinate for the arc
var pathHalf = Count(Geometry($feature).paths[Count(Geometry($feature).paths)-1])/2


var ArcPointX = Geometry($feature).paths[Count(Geometry($feature).paths)-1][Round(pathHalf)].x
var ArcPointY = Geometry($feature).paths[Count(Geometry($feature).paths)-1][Round(pathHalf)].y
var ArcPointJSON = { "x": ArcPointX, "y": ArcPointY, "spatialReference": { "wkid": 32614 }};
var Mpoint = Point(ArcPointJSON)

var myArray = [500, 1500, 3000];
for (var i in myArray) {
    var buff = Buffer(Mpoint, myArray[i], 'meters')
    var intersect = First(Intersects(buff, coo))
    if (IsEmpty(intersect)) {
        continue}
    else{
         if (myArray[i] == 500) {
             return 'CO' 
             break}
         if (myArray[i] == 1500) {
             return 'BTN' 
             break}
         if (myArray[i] == 3000) {
             return 'BDE' 
             break}
}
};
   """,
    expression_type="ARCADE",
    code_block="",
    field_type="TEXT",
    enforce_domains="NO_ENFORCE_DOMAINS"
)
