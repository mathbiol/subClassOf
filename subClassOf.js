console.log('subClassOf.js added .subClassOf to Object')

Object.prototype.subClassOf=function(x,fun){
    if(typeof(x)=='object'){ // prototype is an object in the local scope
        var k = Object.getOwnPropertyNames(x)
        for(i=0;i<k.length;i++){
            if(!this[k[i]]){this[k[i]]=x[k[i]]}
        }
        if(fun){fun(this)}
        else{console.log(this,'subClassOf',x)} // this could become annoying for someone looking at the console
    }else{ // assume x is the URL of prototype object and go get it
        var that = this, cbFun = fun
        var load = function(url){ // XMLHttpRequest
            var r = new XMLHttpRequest();
            r.onload=function(){
                var x = eval("("+this.responseText+")")
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
// HongGeesCar.subClassOf("https://0857f9879749e82d493945f8a805968a7c031889-www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/Prototypical/StefansCar.json")