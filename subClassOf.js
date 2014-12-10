console.log('subClassOf.js')

Object.prototype.subClassOf=function(x){
    console.log('subClassOf',x)
    if(typeof(x)=='object'){
        var k = Object.getOwnPropertyNames(x)
        for(i=0;i<k.length;i++){
            if(!this[k[i]]){this[k[i]]=x[k[i]]}
        }
    }else{
        throw("will load parent from URL, check back later")
    }
    
    return this
}

// example:
// a={b:9}
// a.subClassOf({c:10})