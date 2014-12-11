subClassOf
============
Live at [http://mathbiol.github.io/subClassOf](http://mathbiol.github.io/subClassOf) !

### Synopsis 
This is an attempt to come up with an implementation of Stephan Decker's ideas for prototypal inheritance at web scale. The key document is [Stefan's presentation]([http://mathbiol.github.io/subClassOf](http://mathbiol.github.io/subClassOf)) at [CSHALS 2013](http://www.iscb.org/cshals2013). Slide #34 will be used as an illustration for the proposed implementation. The approach explored here pollutes the Object prototype (you were warned :-) ) with a subClassOf method to estabish the proposed horizontal dependency. This approach is inspired by type migration in the Semantic Web's [rdfs:subClassOf](http://www.w3.org/TR/rdf-schema/#ch_subclassof).

![slide 34](https://mathbiol.github.io/subClassOf/stefan-decker-keynote-at-cshals-34-638.png)


To add it to your app all you need is 

		<script src="http://mathbiol.github.io/subClassOf/subClassOf.js"></script> 
