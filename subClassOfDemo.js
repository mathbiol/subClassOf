console.log('subClassOfDemo.js')

// noEvalFun

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

