var p = Portal("https://arcgis.com");
var featuresDR = FeatureSetByPortalItem(p, "4a822dfc652642868586a846b73be00e", 5);
var featuresReg = FeatureSetByPortalItem(p, "09923d7dcd5e4fc4912713e53cb787e0", 5, ['CALL_ID']);

var len = Count(Geometry(First(featuresDR)).paths[0])
var vertices = First(Geometry(First(featuresDR)).paths)
var parrantArray = []
var counter = {}
for (var i in vertices) {
    var v = vertices[i]
    var spRf = v.spatialReference['wkid']
    var iPoint = Point({x: v.x, 
                       y:v.y, 
                       spatialReference: { wkid: spRf }})
    var callId = Within(iPoint,featuresReg)
    
    
    if (HasKey(counter, First(callId)['CALL_ID'])) {
        counter[First(callId)['CALL_ID']] += 1
    } else {
        counter[First(callId)['CALL_ID']] =1
    }
}
console(counter)
return counter
