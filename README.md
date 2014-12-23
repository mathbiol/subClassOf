subClassOf
============
Live at [mathbiol.github.io/subClassOf](https://mathbiol.github.io/subClassOf). To add it to your app all you need is 
```html
<script src="https://mathbiol.github.io/subClassOf/subClassOf.js"></script>
```
### Synopsis 
This is an attempt to come up with an implementation of [Stefan Decker](http://www.stefandecker.org/)'s ideas for prototypal inheritance at web scale. The key document is [Stefan's presentation](http://www.slideshare.net/stefandecker1/stefan-decker-keynote-at-cshals) at [CSHALS 2013](http://www.iscb.org/cshals2013). Slide #34 will be used as an illustration for the proposed implementation. The approach explored here pollutes the Object prototype (you were warned :-) ) with a subClassOf method to estabish the proposed "horizontal dependency". This approach is inspired by type migration as in Semantic Web's [rdfs:subClassOf](http://www.w3.org/TR/rdf-schema/#ch_subclassof).

[![slide 34](https://raw.githubusercontent.com/mathbiol/SubClassOf/gh-pages/stefan-decker-keynote-at-cshals-34-638.png)](http://www.slideshare.net/stefandecker1/stefan-decker-keynote-at-cshals)
 
### Stefan's car

Let's start by putting Stefan's car somewhere, say


<a href="https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json" target=_blank>https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json</a>

As once can confirm by clicking on it, <a href="https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json" target=_blank>this URI</a> is dereferenced to
```javascript
{
  maker:"Volkswagen",
  color:"yellow",
  model:"Passat",
  ocm:2000
}
```
Therefore through define stefansCar by 

```javascript
stefansCar = "https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json"
```

So we should now be able to define hongGeesCar, which we hear is blue, by having all other types migrate from Stefan's car:

```javascript
hongGeesCar = {color:"blue"}  
hongGeesCar.subClassOf(stefansCar)
```

This takes a second or two to dereference the remote prototype and import the new attributes, reporting that HongGee's car is
 
```javascript
{
  maker:"Volkswagen",
  color:"blue",
  model:"Passat",
  ocm:2000
}
```

### Callback
As it always happens with [web computing](https://en.wikipedia.org/wiki/Web_computing), the dereferencing of the remote prototype, Stefan's car, introduces an asynchrony which we could, for example, address with a callback function. Accordingly, .subClassOf will accept a callback function as a second input argument. For example, you could get the stringified original and type inherited result result shown in the console by

```javascript
hongGeesCar.subClassOf(
  stefansCar,
  function(x){console.log(JSON.stringify(x))} // callback function
)
JSON.stringify(hongGeesCar) // it will become available before the callback had a chance to come back
```
and the console would show

```javascript
		{"color":"blue"}
		{"color":"blue","maker":"Volkswagen","model":"Passat","ocm":2000}
```
### Callback is at the interesting transition
The use of callback functions is pretty standard in asynchronous workflows, so it is easy to miss the opportunity to explore its scope. Unlike [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [.onload](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest), the call back function is executed within a scope that includes pointers to both the original object and the prototype with the remote attributes. For example, one can write callback functions that keep the inheritance up-to-date such that changes in the remote attributes will be updated in the domain object. In order to enable these exploits, the callback function will behave a differently when used with two input argument:

```javascript
function ( <Domain Object> , <Range Object URL>) { . . . }
```

### Enough about Stefan's car
Indeed, he is probably now driving something else than that ugly yellow car anyway!
In any case, we need a really good reason for polluting JavaScript's Object prototype. The specific motivation for this intrusion is the handling of a myriad of Biomedical data assets flooding a great diversity of BigData resources such as those managed by [NCBI](http://www.ncbi.nlm.nih.gov/) and [EBI](https://www.ebi.ac.uk/). The challenge is particularly complicated when the assets are in [ftp sites like NCBI's](ftp://ftp.ncbi.nlm.nih.gov/) or CORS-less [web folders like TCGA's](https://tcga-data.nci.nih.gov/tcgafiles/ftp_auth/distro_ftpusers/anonymous/tumor/), but even EBI's [impressive RDF platform](https://www.ebi.ac.uk/rdf/platform) will produce URI's to data files in formats that "everyone understands" but still need to be parsed. In this context, a pervasive .subClassOf comes with the promise of handling the format identification and parsing as a reward for the low level intrusion of .subClassOf into every Object. Lets get ready to try this out with some population health and also with some genomics data to see how this could help with real world data.

### subClassOf has two dozen lines of code already - time to stop :-)!

The subClassOf.js library was developed to enable the sort of horizontal inheritance proposed by Stefan Decker. Therefore, uses of that capability are best left out of the core library. Accordingly, the examples discussed in the next sections will use functions stored in the [subClassOfDemo.js](https://github.com/mathbiol/subClassOf/blob/gh-pages/subClassOfDemo.js). If you have your browser pointed to [mathbiol.github.io/subClassOf](https://mathbiol.github.io/subClassOf) then you already have it loaded. Otherwise add this additional source to your HTML:

```html
<script src="https://mathbiol.github.io/subClassOf/subClassOfDemo.js"></script>
```


### Do No Eval (which is to say <i>.noEval=true</i>)
Let's go back to the special place that the execution of the callback function is. In order to allow this experiment, the <i>.subClassOf</i> method will NOT evaluate the prototypal inheritance and instead it will allow for a callback function with the subject of object as the .domain of the input variable and the HTTP call to the remote prototype as the range. Taking lots of liberties mixing [rdf](http://www.w3.org/RDF) syntax with JavaScript functional style, this could be thought as

```javascript
callback=function(x){
      x.domain --(subClassOf)--> x.range
  ... some code specifying the nature of the "inheritance" ...
  ... no limits here, you can go far beyond type migration ...
}
```

Lets illustrate this experiment by going back to Stefan's car one last time. The important thing to remember is that this inheritance space is opened for additional business when the callback function has a <span style="color:red"><i><b>.noEval=true</b></i></span>.

```javascript
noEvalFun = function(x){
  // do something to the domain variable every second, for 10 seconds
  var i = 0
  var t=setInterval(function(){
  x.domain.graffiti="noEvalFun was here at "+Date() // write .grafiti onto domain object
  console.log(JSON.stringify(x.domain)) // display uggly domain graffiti in the console
    i++;if(i==10){clearInterval(t)} // count up to ten graffiti writings and then stop
  },1000)
  // make pointers to domain variable and HTTP call range available in the console
  console.log({
    domain:x.domain,
    range:x.range
  })
}
noEvalFun.noEval=true // <-- flagging callback function for noEval
```

Btw, the noEvalFun is included in [subClassOfDemo.js](https://github.com/mathbiol/subClassOf/blob/gh-pages/subClassOfDemo.js) so there is no need to copy it to the console, it is there already. Lets give it a go:

Let's start by recalling Hong Gee's car simply as something blue,

```javascript
HongGeesCar={color:"blue"}
```

And then let's see what happens when noEvalFun is passed as the callback function

![noEvalDemo](https://raw.githubusercontent.com/mathbiol/SubClassOf/gh-pages/noEvalDemo.png)

As illustrated by this example, the single input argument of the call back function:

1. Has to have a <i>.noEval=true</i> to trigger the advanced behavior.
2. Is automatically added a <i>.domain</i> attribute with a pointer to its subject, in this case Hong Gee's car.
3. Is automatically added a <i>.range</i> attribute with a pointer to the remote object, in this case a HTTP call to the JSON object describing Stefan's car.
4. Most importantly, the callback function benefits from the wonders of [lexical scoping](http://en.wikipedia.org/wiki/Scope_%28computer_science%29#Lexical_scoping) (javascript is a functional language). As illustrated by the graffitti attribute, these are lasting pointers, which can be used indefinitely by the callback function.

See next section for an example.

### Self-updated inheritance

The [default behavior](https://github.com/mathbiol/subClassOf/blob/gh-pages/subClassOf.js#L4) of <i>.subClassOf</i> will add to the domain object only the new attributes found in the range object. What if we want the value of those new attributes to be kept updated in case they change in the remote range object? Here we'll use the .noEval behavior to encode an alternative to the default behavior. The selfUpdatedInheritance function used below is included in the [subClassOfDemo.js](https://github.com/mathbiol/subClassOf/blob/gh-pages/subClassOfDemo.js) script. The example below is not as it may look, essentially it plays with a single line encoding for the attribute inheritance,

```javascript
x.domain[a]=r[a]
```

which is called twice - the first time to take note of the new attireibutes and the second time to force the update of the values in the remote range onto the local domain object:

```javascript
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
```

The dynamic nature of this example lends itself better to a screencast rather than a snapshot:

< youtube >

### Diving deeper




#### QMachine



#### Population health
...

#### Genomics example

...
