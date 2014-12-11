subClassOf
============
Live at [mathbiol.github.io/subClassOf](https://mathbiol.github.io/subClassOf). To add it to your app all you need is 

		<script src="https://mathbiol.github.io/subClassOf/subClassOf.js"></script>
### Synopsis 
This is an attempt to come up with an implementation of [Stefan Decker](http://www.stefandecker.org/)'s ideas for prototypal inheritance at web scale. The key document is [Stefan's presentation](http://www.slideshare.net/stefandecker1/stefan-decker-keynote-at-cshals) at [CSHALS 2013](http://www.iscb.org/cshals2013). Slide #34 will be used as an illustration for the proposed implementation. The approach explored here pollutes the Object prototype (you were warned :-) ) with a subClassOf method to estabish the proposed "horizontal dependency". This approach is inspired by type migration in the Semantic Web's [rdfs:subClassOf](http://www.w3.org/TR/rdf-schema/#ch_subclassof).

[![slide 34](https://raw.githubusercontent.com/mathbiol/SubClassOf/gh-pages/stefan-decker-keynote-at-cshals-34-638.png)](http://www.slideshare.net/stefandecker1/stefan-decker-keynote-at-cshals)
 
### Stefan's car

Let's start by putting Stefan's car somewhere, say

		https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json		

As once can confirm by clicking on it, <a href="https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json" target=_blank>this URI</a> is dereferenced to

		{
			maker:"Volkswagen",
			color:"yellow",
			model:"Passat",
			ocm:2000
		}
Therefore through define stefansCar by 

		stefansCar = "https://www.googledrive.com/host/0BwwZEXS3GesiTjlHSmlOcEJaeDA/subClassOf/StefansCar.json"

So we should now be able to define hongGeesCar, which we hear is blue, by having all other types migrate from Stefan's car:

		hongGeesCar = {color:"blue"}  
		hongGeesCar.subClassOf(stefansCar)

This takes a second or two to dereference the remote prototype and import the new attributes, reporting that HongGee's car is 

		{
			maker:"Volkswagen",
			color:"blue",
			model:"Passat",
			ocm:2000
		}

### Callback
As it always happens with [web computing](https://en.wikipedia.org/wiki/Web_computing), the dereferencing of the remote prototype, Stefan's car, introduces an assynchrony which we could, for example, address with a callback function. Accordingly, .subClassOf will accept a callback function as a second input argument. For example, you could get the stringified original and type inherited result result shown in the console by

		hongGeesCar.subClassOf(
			stefansCar,
			function(x){console.log(JSON.stringify(x))} // callback function
		)
		JSON.stringify(hongGeesCar) // it will become available before the callback had a chance to come back

and the console would show

		"{"color":"blue"}
		"{"color":"blue","maker":"Volkswagen","model":"Passat","ocm":2000}

### Enough about Stefan's car
Indeed, he is probably now driving something else than that uggly yellow car anyway!
In any case, we need a really good reason for polluting JavaScript's Object prototype. The specific motivation for this intruson is the handling of a myriad of Biomedical data assets flooding a great diversity of BigData resources such as those managed by [NCBI](http://www.ncbi.nlm.nih.gov/) and [EBI](https://www.ebi.ac.uk/). The challange is particulalry complicated when the assets are in [ftp sites like NCBI's](ftp://ftp.ncbi.nlm.nih.gov/) or CORS-less [web folders like TCGA's](https://tcga-data.nci.nih.gov/tcgafiles/ftp_auth/distro_ftpusers/anonymous/tumor/), but even EBI's [impressive RDF platform](https://www.ebi.ac.uk/rdf/platform) will produce URI's to data files in formats that "everyone understands" but still need to be parsed. In this context, a pervasive .subClassOf comes with the promise of handling the format identification and parsing as a reward for the low level intrusion of .subClassOf into every Object. Lets try this out with some genomics data to see how it works.

### Genomics example

...
