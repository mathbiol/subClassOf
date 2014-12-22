console.log('subClassOf.js added .subClassOf to Object')

Object.prototype.subClassOf=function(x,fun){
    if(typeof(x)=='object'){ // prototype is an object in the local scope
        var k = Object.getOwnPropertyNames(x)
        for(i=0;i<k.length;i++){
            if(!this[k[i]]){this[k[i]]=x[k[i]]}
        }
        if(fun){fun(this)}
        //else{console.log(this,'subClassOf',x)} // this could become annoying for someone looking at the console
    }else{ // assume x is the URL of prototype object and go get it
        var that = this;cbFun = fun
        var load = function(url){ // XMLHttpRequest
            var r = new XMLHttpRequest();
            r.onload=function(){
                if(!cbFun){cbFun=function(){}}
                // notice check for .noEval flag in the callback function
                if(cbFun.noEval){
                    // if true then pack domain and range as attributes of the callback
                    // i.e. the relationship between domain and range if completely up to the callback
                    var x = {} // subClassOf will not migrate anything from range
                    fun.domain=that
                    fun.range=this
                    cbFun=function(x){
                        //var subClassOf_domain=fun.domain, subClassOf_range=fun.range
                        return fun(fun)
                    }
                } else {
                    var x = eval("("+this.responseText+")")
                }
                that.subClassOf(x,cbFun)
            }; 
            r.open("GET",url,true);
            r.send();
            return this
        }
        load(x)
    }
    return this
}

// examples:
//
// a={b:9}
// a.subClassOf({c:10})
//
// // slide 34 of http://www.slideshare.net/stefandecker1/stefan-decker-keynote-at-cshals
// HongGeesCar={color:"blue"}
// HongGeesCar.subClassOf("https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/Prototypical/StefansCar.json")

