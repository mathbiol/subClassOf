console.log('subClassOf.js')

Object.prototype.subClassOf=function(x){
    if(typeof(x)=='object'){ // prototype is an object in the local scope
        var k = Object.getOwnPropertyNames(x)
        for(i=0;i<k.length;i++){
            if(!this[k[i]]){this[k[i]]=x[k[i]]}
        }
        console.log(this,'subClassOf',x)
    }else{ // assume x is the URL of prototype object and go get it
        var that = this
        var load = function(url){ // XMLHttpRequest
            var r = new XMLHttpRequest();
            r.onload=function(){
                var x = eval("("+this.responseText+")")
                that.subClassOf(x)
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
// car={color:"blue"}
// car.subClassOf("https://0857f9879749e82d493945f8a805968a7c031889-www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/Prototypical/StefansCar.json")