console.log('Demos loaded from subClassOfDemo.js')

// noEvalFun:
// showing how lexical scoping allows you to repeatedly write graffiti onto the domain object

noEvalFun = function(x){
    // do something to the domain variable every 2 seconds, for 10 seconds
    var i = 0
    var t=setInterval(function(){
            x.domain.graffiti="noEvalFun was here at "+Date()
            console.log(JSON.stringify(x.domain)) // display uggly domain graffiti in the console
            i++;if(i==10){clearInterval(t)} // count up to ten graffiti writings and then stop
        },1000)
    
    // make pointers to domain variable and HTTP call range in the console
    console.log({
        domain:x.domain,
        range:x.range
    })
}
noEvalFun.noEval=true
// HongGeesCar={color:"blue"}
// HongGeesCar.subClassOf('StefansCar.json',noEvalFun)



// selfUpdatedInheritance:
// keeping inherited attribute values updated

selfUpdatedInheritance=function(x){
    // find out what is new in the remote object
    var r = eval('('+x.range.responseText+')')
    var newAttr = {} // object with new attribute names

    // update new attributes only
    Object.getOwnPropertyNames(r).map(function(a){
        if(!x.domain[a]){
            newAttr[a]=true // noted for updating by newFun
            x.domain[a]=r[a] // up to here we're just mimicking the default behaviour
        }
    })
    var url = x.range.responseURL // link to where the remote prototype is
    
    // the new callback function that will be passed at regular intervals
    var newFun=function(x){ // This is the same as above 
                            // except that newAttr is borroed rather than determined anew
        var newr = eval('('+x.range.responseText+')')
        Object.getOwnPropertyNames(newr).map(function(a){
            if(newAttr[a]){x.domain[a]=newr[a]}
        })
        console.log(Date(),JSON.stringify(x.domain))
    }
    newFun.noEval=true

    // update new attribute values every 5 seconds
    var t = setInterval(function(){
        x.domain.subClassOf(url,newFun)
    },5000)
}
selfUpdatedInheritance.noEval=true
//HongGeesCar={color:"blue"}
//HongGeesCar.subClassOf('https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json',selfUpdatedInheritance)
